import { addNewStudent, addNewStudentWithFile, uploadFile } from "./restapi.js"

function getAllStudentInformationFromPage() {
    let firstName = document.getElementById('first_name').value
    let lastName = document.getElementById('last_name').value
    let studentId = parseInt(document.getElementById('student_id').value)
    let umkcEmail = document.getElementById('umkc_email').value
    let currentLevel = document.getElementById('current_level').value
    let graduatingSemester = document.getElementById('graduating_semester').value
    let umkcGPA = parseFloat(document.getElementById('umkc_gpa').value)
    let hoursUMKC = parseInt(document.getElementById('hours_completed').value)
    let degree = document.getElementById('undergraduate_degree').value
    let currentMajor = document.getElementById('current_major').value

    return [
        firstName, lastName, studentId, umkcEmail, currentLevel, 
        graduatingSemester, umkcGPA, hoursUMKC, degree, currentMajor
    ]
} 

function createStudentObjectFromArrayWithoutId(studentInfo) {
    return {
        firstName: studentInfo[0],
        lastName: studentInfo[1],
        studentId: studentInfo[2],
        umkcEmail: studentInfo[3],
        currentLevel: studentInfo[4],
        graduatingSemester: studentInfo[5],
        umkcGPA: studentInfo[6],
        hoursDoneAtUmkc: studentInfo[7],
        undergraduateDegree: studentInfo[8],
        currentMajor: studentInfo[9]
    }
}

window.onbeforeunload = function() {
    window.scrollTo(0, 0)
}

window.addEventListener('load', function() {
    document.getElementById('application').addEventListener('submit', async function(event) {
        event.preventDefault()
        let studentInfo = getAllStudentInformationFromPage()

        let file = document.getElementById('file_upload').files[0]
        let formData = new FormData()
        formData.append("file", file)

        let response = await uploadFile(formData)
        let fileId = response["id"]
        console.log(fileId)

        let response1 = await addNewStudentWithFile(createStudentObjectFromArrayWithoutId(studentInfo), fileId)
        console.log(response1)

        location.reload()
    })
   
})

