import {
  getPositionById,
  approveApplication,
  rejectApplication,
  restoreApplicationToPending,
} from "./restapi.js";

let selectedRows = new Set();

function getReferenceToTableBody() {
  let tableBody = document
    .getElementById("sortTable")
    .getElementsByTagName("tbody")[0];
  return tableBody;
}

function deconstructPositionId(modifiedPositionId) {
  let positionClass = "";
  let positionType = "";
  let i = 1;
  while (true) {
    if (modifiedPositionId[i] == "]") {
      break;
    }
    positionClass += modifiedPositionId[i];
    i++;
  }
  i += 2;
  while (true) {
    if (modifiedPositionId[i] == "]") {
      break;
    }
    positionType += modifiedPositionId[i];
    i++;
  }

  return [positionClass, positionType];
}

function removeStudentRows() {
  // let table = document.getElementById("sortTable");
  // table.style.display = "none";
  // let emptyTBody = document.createElement("tbody");

  // if (table.tBodies.length > 0) {
  //   table.replaceChild(emptyTBody, table.tBodies[0]);
  // } else {
  //   table.appendChild(emptyTBody);
  // }
  // table.style.display = "";

  ///////
  // let table = document.getElementById("sortTable");
  // table.style.display = "none";

  // let fragment = document.createDocumentFragment();

  // let emptyTBody = document.createElement("tbody");
  // fragment.appendChild(emptyTBody);

  // if (table.tBodies.length > 0) {
  //   table.replaceChild(emptyTBody, table.tBodies[0]);
  // } else {
  //   table.appendChild(emptyTBody);
  // }
  // table.style.display = "";
  let tableContainer = document.getElementById("table-container");
  tableContainer.style.display = "none";
  let table = document.getElementById("sortTable");
  table.removeChild(table.getElementsByTagName("tbody")[0]);
}

async function addStudentRows() {
  console.log(sessionStorage.getItem("positionId"));
  let positionId = deconstructPositionId(sessionStorage.getItem("positionId"));

  let positionResponse = await getPositionById(
    positionId[0],
    positionId[1],
    sessionStorage.getItem("jwtToken")
  );
  let position = await positionResponse.json();
  //console.log(position)
  let applicationList = position["applicants"];

  let table = document.getElementById("sortTable");
  table.style.display = "none";

  //let tableBody = getReferenceToTableBody();
  let tableBody = document.createElement("tbody");
  tableBody.style.display = "none";

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < applicationList.length; i++) {
    if (
      !document.getElementById("pending-status").checked &&
      applicationList[i]["applicationStatus"] == "PENDING"
    ) {
      continue;
    }

    if (
      !document.getElementById("rejected-status").checked &&
      applicationList[i]["applicationStatus"] == "REJECTED"
    ) {
      continue;
    }

    if (
      !document.getElementById("approved-status").checked &&
      applicationList[i]["applicationStatus"] == "APPROVED"
    ) {
      continue;
    }

    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    let cell5 = document.createElement("td");
    let cell6 = document.createElement("td");
    let cell7 = document.createElement("td");
    //let cell8 = document.createElement("td");
    let cell9 = document.createElement("td");
    let cell10 = document.createElement("td");

    row.addEventListener("click", function (e) {
      if (!selectedRows.has(applicationList[i])) {
        selectedRows.add(applicationList[i]);
      } else {
        selectedRows.delete(applicationList[i]);
      }
      this.classList.toggle("selected-row");
    });

    cell1.innerHTML = applicationList[i]["studentId"];
    cell2.innerHTML =
      applicationList[i]["firstName"] + " " + applicationList[i]["lastName"];
    cell3.innerHTML = applicationList[i]["umkcEmail"];
    cell4.innerHTML = applicationList[i]["standing"];
    cell5.innerHTML = applicationList[i]["currentMajor"];
    cell6.innerHTML = applicationList[i]["umkcGPA"];
    cell7.innerHTML = applicationList[i]["hoursDoneAtUmkc"];
    //cell8.innerHTML = "TODO";

    cell3.setAttribute("class", "overflow-auto");

    cell9.setAttribute("class", "overflow-auto");
    cell9.setAttribute("style", "word-break:break-all");

    cell10.innerHTML = applicationList[i]["applicationStatus"];

    //console.log(applicationList[i])
    let fileList = applicationList[i]["files"];
    //console.log(fileList)

    for (let j = 0; j < fileList.length; j++) {
      let link = document.createElement("a");

      link.setAttribute("href", fileList[j]["uriDownload"]);
      link.setAttribute("target", "_blank");
      let linkText = document.createTextNode(fileList[j]["name"]);
      link.appendChild(linkText);
      cell9.append(link);
    }
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);
    row.appendChild(cell7);
    //row.appendChild(cell8);
    row.appendChild(cell9);
    row.appendChild(cell10);

    fragment.appendChild(row);
  }
  tableBody.appendChild(fragment);
  table.appendChild(tableBody);
  tableBody.style.display = "";
  table.style.display = "";
  document.getElementById("table-container").style.display = "";
}

window.addEventListener("load", async function () {
  document.getElementById("position_id").innerHTML =
    sessionStorage.getItem("cleanPositionId");
  removeStudentRows();
  await addStudentRows();

  this.document
    .getElementById("approve-button")
    .addEventListener("click", function (e) {
      console.log(`Approved the following: ${selectedRows}`);
      console.log(selectedRows);
      for (const application of selectedRows) {
        approveApplication(
          application["id"],
          sessionStorage.getItem("jwtToken")
        );
      }
      selectedRows.clear();
      location.reload();
    });

  this.document
    .getElementById("reject-button")
    .addEventListener("click", function (e) {
      console.log(`Rejected the following: ${selectedRows}`);
      console.log(selectedRows);
      console.log(selectedRows);
      for (const application of selectedRows) {
        rejectApplication(
          application["id"],
          sessionStorage.getItem("jwtToken")
        );
      }
      selectedRows.clear();
      location.reload();
    });

  this.document
    .getElementById("revert-button")
    .addEventListener("click", function (e) {
      console.log(`Reverted the following: ${selectedRows}`);
      console.log(selectedRows);
      console.log(selectedRows);
      for (const application of selectedRows) {
        restoreApplicationToPending(
          application["id"],
          sessionStorage.getItem("jwtToken")
        );
      }
      selectedRows.clear();
      location.reload();
    });

  this.document
    .getElementById("pending-status")
    .addEventListener("click", async function (e) {
      removeStudentRows();
      await addStudentRows();
    });

  this.document
    .getElementById("rejected-status")
    .addEventListener("click", async function (e) {
      removeStudentRows();
      await addStudentRows();
    });
  this.document
    .getElementById("approved-status")
    .addEventListener("click", async function (e) {
      removeStudentRows();
      await addStudentRows();
    });
});
