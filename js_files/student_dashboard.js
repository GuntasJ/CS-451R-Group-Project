import { findUserByEmail } from "./restapi.js";

function getReferenceToTableBody() {
  let tableBody = document
    .getElementById("dashboard-table")
    .getElementsByTagName("tbody")[0];
  return tableBody;
}

window.addEventListener("load", async function (e) {
  let response = await findUserByEmail(
    this.sessionStorage.getItem("logged_in_student_email"),
    this.sessionStorage.getItem("jwtToken")
  );
  let data = await response.json();
  let applications = data["applications"];

  let tableBody = getReferenceToTableBody();

  for (let i = 0; i < applications.length; i++) {
    let application = applications[i];
    let row = tableBody.insertRow();
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();

    cell1.innerHTML = application["desiredClasses"];
    cell2.innerHTML = application["desiredTypes"];
    cell3.innerHTML = application["applicationStatus"];

    let div = this.document.createElement("div");
    div.setAttribute("class", "umkc-delete-application");

    let button = this.document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "delete-button");
    button.appendChild(this.document.createTextNode("🗑️"));

    div.appendChild(button);
    cell4.appendChild(div);

    /*
    <div class="umkc-delete-application">
                                <button type="submit" class="delete-button">
                                    🗑️
                                </button>
    */
  }
});
