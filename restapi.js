const baseApiPath = 'http://localhost:8080/tags/api/v1'

//Students API

export async function getAllStudents() {
    const response = await fetch(`${baseApiPath}/students`)
    const data = await response.json()
    return data
}

export async function addNewStudent(student) {
    const response = await fetch(`${baseApiPath}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    const data = await response.json()
    return data
}

export async function updateStudent(id, student) {
    const response = await fetch(`${baseApiPath}/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    const data = await response.json()
    return data
}

export async function deleteStudent(id) {
    fetch(`${baseApiPath}/students/${id}`, {
        method: 'DELETE'
    })
}

//Positions API

export async function getAllPositions() {
    const response = await fetch(`${baseApiPath}/positions`)
    const data = await response.json()
    return data
}

export async function addNewPosition(position) {
    const response = await fetch(`${baseApiPath}/positions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(position)
    })
    const data = await response.json()
    return data
}

export async function updatePosition(id, position) {
    const response = await fetch(`${baseApiPath}/positions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(position)
    })
    const data = await response.json()
    return data
}

export async function deletePosition(id) {
    fetch(`${baseApiPath}/positions/${id}`, {
        method: 'DELETE'
    })
}

//Admin API

export async function getAllAdmins() {

}

export async function addNewAdmin() {

}

export async function updateAdmin() {

}

export async function deleteAdmin() {

}

//application

export async function getAllApplications() {

}

export async function addNewApplication() {

}

export async function updateApplication() {

}

export async function deleteApplication() {

}

//file transfer

export async function getAllFiles() {

}

export async function uploadFile() {

}

export async function updateFile() {

}

export async function deleteFile() {

}