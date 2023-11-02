import { getAllApplications } from "./restapi.js";


function getReferenceToTableBody() {
    let tableBody = document.getElementById('sortTable').getElementsByTagName('tbody')[0];
    return tableBody;
}

async function addStudentRows() {
    let applicationList = await getAllApplications()
    console.log(applicationList)
    let tableBody = getReferenceToTableBody()

    console.log(applicationList.length)
    for(let i = 0; i < applicationList.length; i++) {
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

        cell1.innerHTML = applicationList[i]["studentId"]
        cell2.innerHTML = applicationList[i]["firstName"] + " " + applicationList[i]["lastName"]
        cell3.innerHTML = applicationList[i]["umkcEmail"]
        cell4.innerHTML = applicationList[i]["standing"]
        cell5.innerHTML = applicationList[i]["currentMajor"]
        cell6.innerHTML = applicationList[i]["umkcGPA"]
        cell7.innerHTML = applicationList[i]["hoursDoneAtUmkc"]
        cell8.innerHTML = "TODO: Add GTA Functionality"
        
        let fileList = applicationList[i]["file"]

        for(let j = 0; j < fileList.length; j++) {
            let link = document.createElement("a")
            link.setAttribute("href", "http://www.microsoft.com")
            let linkText = document.createTextNode(fileList[j]["name"])
            link.appendChild(linkText)
        }

        cell9.appendChild(link)
    }
}


window.addEventListener('load', async function() {
    document.getElementById("position_id").innerHTML = sessionStorage.getItem("positionId")

    await addStudentRows()
})