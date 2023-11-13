import { getAllApplications, getPositionById } from "./restapi.js";


function getReferenceToTableBody() {
    let tableBody = document.getElementById('sortTable').getElementsByTagName('tbody')[0];
    return tableBody;
}

function deconstructPositionId(modifiedPositionId) {
    let positionClass = ""
    let positionType = ""
    let i = 1;
    while(true) {
        if(modifiedPositionId[i] == ']') {
            break
        }
        positionClass += modifiedPositionId[i]
        i++
    }
    i += 2
    while(true) {
        if(modifiedPositionId[i] == ']') {
            break
        }
        positionType += modifiedPositionId[i]
        i++
    }

    return [positionClass, positionType]
}

async function addStudentRows() {

    console.log(sessionStorage.getItem("positionId"))
    let positionId = deconstructPositionId(sessionStorage.getItem("positionId"))

    let positionResponse = await getPositionById(positionId[0], positionId[1])
    let position = await positionResponse.json()
    //console.log(position)
    let applicationList = position["applicants"]

    let tableBody = getReferenceToTableBody()

    //console.log(applicationList.length)
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
        cell8.innerHTML = "TODO"

    
        cell9.setAttribute("class", "overflow-auto")
        
        //console.log(applicationList[i])
        let fileList = applicationList[i]["files"]
        //console.log(fileList)

        for(let j = 0; j < fileList.length; j++) {
            let fileObject = new Blob([new Int8Array(fileList[j]["data"])], { type: 'application/pdf' });

            let link = document.createElement("a")
        
            link.setAttribute("href", fileList[j]["uriDownload"])
            link.setAttribute("target", "_blank")
            link.setAttribute("class", "text-truncate")
            let linkText = document.createTextNode(fileList[j]["name"])
            console.log(fileList[j]["name"])
            link.appendChild(linkText)
            cell9.append(link)
        }

        //cell9.appendChild(link)
    }
}


window.addEventListener('load', async function() {
    document.getElementById("position_id").innerHTML = sessionStorage.getItem("cleanPositionId")

    await addStudentRows()
})