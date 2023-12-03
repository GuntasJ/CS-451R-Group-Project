import {
  findUserByEmail,
  approveApplication,
  deleteApplication,
} from "./restapi.js";

let selectedRows = new Set();

function getReferenceToTableBody() {
  let tableBody = document
    .getElementById("dashboard-table")
    .getElementsByTagName("tbody")[0];
  return tableBody;
}

window.addEventListener("load", async function (e) {
  this.document
    .getElementById("withdraw-confirmation-button")
    .addEventListener("click", function (e) {
      console.log("clicked");
      for (const application of selectedRows) {
        deleteApplication(
          application["id"],
          sessionStorage.getItem("jwtToken")
        );
      }
      selectedRows.clear();
      location.reload();
    });

  let response = await findUserByEmail(
    this.sessionStorage.getItem("logged_in_student_email"),
    this.sessionStorage.getItem("jwtToken")
  );
  let data = await response.json();

  let textNode = this.document.createTextNode(
    `Welcome, ${data["firstName"]} ${data["lastName"]}`
  );
  let studentName = this.document.getElementById("student-name");
  studentName.appendChild(textNode);

  let applications = data["applications"];

  let tableBody = getReferenceToTableBody();

  for (let i = 0; i < applications.length; i++) {
    let application = applications[i];
    let row = tableBody.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();

    row.addEventListener("click", function (e) {
      if (!selectedRows.has(application)) {
        selectedRows.add(application);
        console.log(selectedRows);
      } else {
        selectedRows.delete(application);
      }
      this.classList.toggle("selected-row");
    });
    //let cell4 = row.insertCell();

    cell1.innerHTML = application["desiredClasses"];
    cell2.innerHTML = application["desiredTypes"];
    cell3.innerHTML = application["applicationStatus"];

    // let div = this.document.createElement("div");
    // div.setAttribute("class", "umkc-delete-application");

    // let button = this.document.createElement("button");
    // button.setAttribute("type", "submit");
    // button.setAttribute("class", "delete-button");
    // button.appendChild(this.document.createTextNode("🗑️"));

    // div.appendChild(button);
    // cell4.appendChild(div);

    /*
    <div class="umkc-delete-application">
                                <button type="submit" class="delete-button">
                                    🗑️
                                </button>
    */
  }
});
