import {addNewApplicationWithFile, uploadFile } from "./restapi.js"

function getAllApplicationInformationFromPage() {
    let firstName = document.getElementById('first_name').value
    let lastName = document.getElementById('last_name').value
    let studentId = parseInt(document.getElementById('student_id').value)
    let umkcEmail = document.getElementById('umkc_email').value
    let standing = document.querySelector('input[name="level"]:checked').value
    let graduatingSemester = document.getElementById('graduating_semester').value
    let umkcGPA = parseFloat(document.getElementById('umkc_gpa').value)
    let hoursUMKC = parseInt(document.getElementById('hours_completed').value)
    let degree = document.getElementById('undergraduate_degree').value
    let currentMajor = document.getElementById('current_major').value

    let dropDownBox = document.getElementById('umkc_classes')
    let desiredClasses = Array.from(dropDownBox.options)
                    .filter((option) => option.selected)
                    .map((option) => option.value)
    
    let desiredTypes = []
    let positionChoice = document.getElementById("position_choice")
    if(positionChoice.value == "Both") {
        desiredTypes.push("Grader", "Instructor")
    }
    else {
        desiredTypes.push(positionChoice.value)
    }
    return [
        firstName, lastName, studentId, umkcEmail, standing, 
        graduatingSemester, umkcGPA, hoursUMKC, degree, currentMajor, desiredClasses, desiredTypes
    ]
} 

function createApplicationObjectFromArrayWithoutId(applicationInfo) {
    return {
        firstName: applicationInfo[0],
        lastName: applicationInfo[1],
        studentId: applicationInfo[2],
        umkcEmail: applicationInfo[3],
        standing: applicationInfo[4],
        graduatingSemester: applicationInfo[5],
        umkcGPA: applicationInfo[6],
        hoursDoneAtUmkc: applicationInfo[7],
        undergraduateDegree: applicationInfo[8],
        currentMajor: applicationInfo[9],
        desiredClasses: applicationInfo[10],
        desiredTypes: applicationInfo[11]
    }
}

window.onbeforeunload = function() {
    window.scrollTo(0, 0)
}

window.addEventListener('load', function() {
    document.getElementById('application').addEventListener('submit', async function(event) {
        event.preventDefault()
        let applicationInfo = getAllApplicationInformationFromPage()

        let file = document.getElementById('file_upload').files[0]
        let formData = new FormData()
        formData.append("file", file)

        let response = await uploadFile(formData)
        let fileId = response["id"]
        console.log(fileId)

        let response1 = await addNewApplicationWithFile(createApplicationObjectFromArrayWithoutId(applicationInfo), fileId)
        console.log(response1)

        //location.reload()
    })
   
})

