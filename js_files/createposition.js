import { addNewPosition } from "./restapi.js";

//Returns an array object holding position information. 
function getAllPositionInfoFromPage() {
    let positionClass = document.getElementById("CourseType").value
    let requiredStanding = document.getElementById("level").value
    let positionSemester = []

    if(document.getElementById("checkbox_0").checked) {
        positionSemester.push("Fall")
    }
    if(document.getElementById("checkbox_1").checked) {
        positionSemester.push("Spring")
    }
    if(document.getElementById("checkbox_2").checked) {
        positionSemester.push("Summer")
    }

    let positionType = document.getElementById("position").value
    let positionNotes = document.getElementById("notes").value

    return [positionClass, requiredStanding, positionSemester, positionType, positionNotes]
}

function createPositionObjectFromArrayWithoutId(positionInfo) {
    return {
        positionClass: positionInfo[0],
        requiredStanding: positionInfo[1],
        semesters: positionInfo[2],
        positionType: positionInfo[3],
        notes: positionInfo[4]
    }
}



window.addEventListener('load', function() {
    //getAllPositions().then(data => console.log(data))
    document.getElementById("courseform").addEventListener('submit', async function(e) {
        e.preventDefault()
        let positionInfo = getAllPositionInfoFromPage()
        console.log("creating position")
        const response = await addNewPosition(createPositionObjectFromArrayWithoutId(positionInfo))
        if(!response.ok) {
            alert(`The position with class name ${positionInfo[0]} and position type ${positionInfo[3]} already exists!`)
            location.reload()
        }
        else {
            location.href = "admin.html"
        }
    })
})