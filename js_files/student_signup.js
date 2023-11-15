import { signupNewStudentAccount } from "./restapi.js";

function getStudentSignupInfo() {
  let firstName = document.getElementById("first_name").value;
  let lastName = document.getElementById("last_name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  console.log(firstName + lastName + email + password);
  return [firstName, lastName, email, password];
}

function createStudentObjectFromArray(studentInfo) {
  return {
    firstName: studentInfo[0],
    lastName: studentInfo[1],
    username: studentInfo[2],
    password: studentInfo[3],
  };
}

function areAllFieldsOccupied() {
  let firstName = document.getElementById("first_name").value;
  let lastName = document.getElementById("last_name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  return firstName != "" && lastName != "" && email != "" && password != "";
}

async function addSignupOnButton() {
  document
    .getElementById("signup")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!areAllFieldsOccupied()) {
        console.log("Fields empty!!!");
        return;
      }
      let studentAccountObject = createStudentObjectFromArray(
        getStudentSignupInfo()
      );

      console.log(studentAccountObject);

      const response = await signupNewStudentAccount(studentAccountObject);

      location.href = "../main_pages/application_management.html";
    });
}

window.addEventListener("load", async function (e) {
  await addSignupOnButton();
});
