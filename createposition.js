import { getAllPositions, updatePosition, addNewPosition, deletePosition } from "./restapi.js";

//Returns an array object holding position information. 
function getAllPositionInfoFromPage() {
    let positionClass = document.getElementById("CourseType").value
    let positionDegree = document.getElementById("level").value
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

    return [positionClass, positionDegree, positionSemester, positionType, positionNotes]
}

function createPositionObjectFromArrayWithoutId(positionInfo) {
    return {
        positionClass: positionInfo[0],
        degree: positionInfo[1],
        semester: positionInfo[2],
        positionType: positionInfo[3],
        notes: positionInfo[4]
    }
}

window.addEventListener('load', function() {
    //getAllPositions().then(data => console.log(data))
    document.getElementById("courseform").addEventListener('submit',async function() {
        let positionInfo = getAllPositionInfoFromPage()
        console.log("creating position")
        await addNewPosition(createPositionObjectFromArrayWithoutId(positionInfo))
        location.href = "admin.html"
    })
})