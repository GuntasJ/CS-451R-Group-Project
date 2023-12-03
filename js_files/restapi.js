const baseApiPath = "http://localhost:8080/tags/api/v1";

//Students API

//This is the code that is used for all the requests

// export async function getAllStudents() {
//     const response = await fetch(`${baseApiPath}/students`)
//     const data = await response.json()
//     return data
// }

// export async function addNewStudent(student) {
//     const response = await fetch(`${baseApiPath}/students`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(student)
//     })
//     const data = await response.json()
//     return data
// }

// export async function addNewStudentWithFile(student, fileId) {
//     const response = await fetch(`${baseApiPath}/students?file_id=${fileId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(student)
//     })
//     const data = await response.json()
//     return data
// }

// export async function updateStudent(id, student) {
//     const response = await fetch(`${baseApiPath}/students/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(student)
//     })
//     const data = await response.json()
//     return data
// }

// export async function updateStudentStatus(id, status) {
//     const response = await fetch(`${baseApiPath}/students/${id}/${status}`, {
//         method: 'PUT',
//     })
//     const data = await response.json()
//     return data
// }

// export async function deleteStudent(id) {
//     fetch(`${baseApiPath}/students/${id}`, {
//         method: 'DELETE'
//     })
// }

export async function signupNewStudentAccount(student) {
  const response = await fetch(`${baseApiPath}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response;
}

export async function loginUser(user) {
  const response = await fetch(`${baseApiPath}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

export async function findUserByEmail(email, token) {
  const response = await fetch(`${baseApiPath}/user/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

//Positions API

export async function getAllPositions(token) {
  const response = await fetch(`${baseApiPath}/admin/positions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getPositionById(positionClass, positionType, token) {
  const response = await fetch(
    `${baseApiPath}/admin/positions/${positionClass}/${positionType}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function addNewPosition(position, token) {
  const response = await fetch(`${baseApiPath}/admin/positions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(position),
  });
  return response;
}

export async function updateNotesOfPosition(
  positionClass,
  positionType,
  notes,
  token
) {
  const response = await fetch(
    `${baseApiPath}/admin/positions/${positionClass}/${positionType}/notes`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    }
  );
  return response;
}

// export async function updatePosition(id, position) {
//     const response = await fetch(`${baseApiPath}/positions/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(position)
//     })
//     const data = await response.json()
//     return data
// }

export async function deletePosition(positionClass, positionType, token) {
  const response = fetch(
    `${baseApiPath}/admin/positions/${positionClass}/${positionType}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

//application

export async function getAllApplications(token) {
  const response = await fetch(`${baseApiPath}/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function addNewApplication(application, token) {
  const response = await fetch(`${baseApiPath}/applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });
  const data = await response.json();
  return data;
}

export async function addNewApplicationWithFile(
  application,
  fileId,
  studentId,
  token
) {
  const response = await fetch(
    `${baseApiPath}/applications?file_id=${fileId}&student_id=${studentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    }
  );
  const data = await response.json();
  return data;
}

export async function approveApplication(applicationId, token) {
  const response = await fetch(
    `${baseApiPath}/applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify("APPROVED"),
    }
  );
  const data = await response.json();
  return data;
}

export async function rejectApplication(applicationId, token) {
  const response = await fetch(
    `${baseApiPath}/applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify("REJECTED"),
    }
  );
  const data = await response.json();
  return data;
}

export async function restoreApplicationToPending(applicationId, token) {
  const response = await fetch(
    `${baseApiPath}/applications/${applicationId}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify("PENDING"),
    }
  );
  const data = await response.json();
  return data;
}

export async function updateApplication() {}

export async function deleteApplication(applicationId, token) {
  const response = fetch(`${baseApiPath}/applications/${applicationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

//file transfer

export async function getAllFiles(token) {
  const response = await fetch(`${baseApiPath}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function uploadFile(formData, token) {
  const response = await fetch(`${baseApiPath}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  return data;
}

// export async function updateFile() {

// }

// export async function deleteFile() {

// }
