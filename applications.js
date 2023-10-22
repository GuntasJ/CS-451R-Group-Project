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
        //let cell8 = row.insertCell()
        //let cell9 = row.insertCell(8)

        cell1.innerHTML = studentList[i]["studentId"]
        cell2.innerHTML = studentList[i]["firstName"] + " " + studentList[i]["lastName"]
        cell3.innerHTML = studentList[i]["umkcEmail"]
        cell4.innerHTML = studentList[i]["currentLevel"]
        cell5.innerHTML = studentList[i]["currentMajor"]
        cell6.innerHTML = studentList[i]["umkcGPA"]
        cell7.innerHTML = studentList[i]["hoursDoneAtUmkc"]
        
    }
}


window.addEventListener('load', async function() {
    await addStudentRows()
})