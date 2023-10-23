import { getAllPositions } from "./restapi.js"

async function displayAllPositions() {
    const positions = await getAllPositions()
    console.log(positions)
    for(let i = 0; i < positions.length; i++) {
        displayPosition(positions[i])
    }
}

function getSemesterAsString(position) {
    let semesterList = position["semester"]
    let semesterString = ""
    for(let i = 0; i < semesterList.length; i++) {
        semesterString += semesterList[i] + "/"
    }
    return semesterString.slice(0, -1)
}

function displayPosition(position) {
    let div = document.getElementById("card")
    let h5 = document.createElement('h5')
    h5.innerHTML = `${position["classType"]} ${position["courseNumber"]} (${getSemesterAsString(position)})`
    h5.className = 'card-header target'
    div.append(h5)
}
window.onload = function() {
    displayAllPositions()
}