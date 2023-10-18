async function getAllPositions() {
    const response = await fetch('http://10.205.3.224:8080/tags/api/v1/positions')
    const data = await response.json()
    return data
}

async function addNewPosition() {
    let classType = document.getElementById("CourseType").value
    let courseNumber = document.getElementById("CourseNumber").value
    let degree = document.getElementById("level").value
    let semester = ""
    if(document.getElementById("checkbox_0").checked) {
        semester += " " + document.getElementById("checkbox_0").value
    }
    if(document.getElementById("checkbox_1").checked) {
        semester += " " + document.getElementById("checkbox_1").value
    }
    if(document.getElementById("checkbox_2").checked) {
        semester += " " + document.getElementById("checkbox_2").value
    }
    let positionType = document.getElementById("position").value
    let notes = document.getElementById("notes").value

    const response = await fetch('http://10.205.3.224:8080/tags/api/v1/positions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classType: classType,
            courseNumber: courseNumber,
            degree: degree,
            semester: semester,
            positionType: positionType,
            notes: notes
        })
    })
}

async function printAllPositions() {
    let positions = await getAllPositions()
    for(let i = 0; i < positions.length; i++) {
        printPosition(positions[i])
    }
}

function printPosition(position) {
    console.log(`${position["id"]} ${position["classType"]} ${position["degree"]} ${position["semester"]} ${position["positionType"]} ${position["notes"]}`)
}

function changePageFromAddPositionToPositionsBoard() {
    location.href = "admin.html"
}

window.onload = function() {
    printAllPositions
    document.getElementById("create-btn").addEventListener('click', addNewPosition)
    document.getElementById("create-btn").addEventListener('click', changePageFromAddPositionToPositionsBoard)
}