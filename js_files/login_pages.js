import { loginUser } from "./restapi.js";

function getUserLoginInfo() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  return [email, password];
}

function createUserObject(studentInfo) {
  return {
    username: studentInfo[0],
    password: studentInfo[1],
  };
}

function areAllFieldsOccupied() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  return email != "" && password != "";
}

async function addLoginOnButton() {
  document
    .getElementById("login")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!areAllFieldsOccupied()) {
        console.log("Fields empty!!!");
        return;
      }
      let userAccountObject = createUserObject(getUserLoginInfo());

      console.log(userAccountObject);

      const response = await loginUser(userAccountObject);

      if (response.ok) {
        let body = await response.json();
        let jwtToken = body["jwtToken"];
        sessionStorage.setItem("jwtToken", jwtToken);
        sessionStorage.setItem(
          "logged_in_student_email",
          userAccountObject["username"]
        );
        if (body["role"] == "STUDENT") {
          location.href = "../student_pages/student_dashboard.html";
        } else {
          location.href = "../admin_pages/admin.html";
        }
      } else {
        alert("Email and password do not match!");
      }
    });
}

window.addEventListener("load", async function (e) {
  await addLoginOnButton();
});
