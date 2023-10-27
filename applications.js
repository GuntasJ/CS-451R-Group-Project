import { getAllStudents } from "./restapi.js";


function getReferenceToTableBody() {
    let tableBody = document.getElementById('sortTable').getElementsByTagName('tbody')[0];
    return tableBody;
}

async function addStudentRows() {
    let studentList = await getAllStudents()
    console.log(studentList)
    let tableBody = getReferenceToTableBody()

    for(let i = 0; i < studentList.length; i++) {
        let row = tableBody.insertRow()
        let cell1 = row.insertCell()
        let cell2 = row.insertCell()
        let cell3 = row.insertCell()
        let cell4 = row.insertCell()
        let cell5 = row.insertCell()
        let cell6 = row.insertCell()
        let cell7 = row.insertCell()
        let cell8 = row.insertCell()
        let cell9 = row.insertCell()

        cell1.innerHTML = studentList[i]["studentId"]
        cell2.innerHTML = studentList[i]["firstName"] + " " + studentList[i]["lastName"]
        cell3.innerHTML = studentList[i]["umkcEmail"]
        cell4.innerHTML = studentList[i]["standing"]
        cell5.innerHTML = studentList[i]["currentMajor"]
        cell6.innerHTML = studentList[i]["umkcGPA"]
        cell7.innerHTML = studentList[i]["hoursDoneAtUmkc"]
        cell8.innerHTML = "TODO: Add GTA Functionality"
        
        let link = document.createElement("a")
        link.setAttribute("href", "http://www.microsoft.com")

        let file = studentList[i]["file"]

        let linkText = document.createTextNode(file["name"])
        link.appendChild(linkText)

        cell9.appendChild(link)
    }
}


window.addEventListener('load', async function() {
    await addStudentRows()
})