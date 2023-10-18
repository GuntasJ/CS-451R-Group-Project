async function getAllPositions() {
    const response = await fetch('http://10.205.3.224:8080/tags/api/v1/positions')
    const data = await response.json()
    return data
}

async function displayAllPositions() {
    const positions = await getAllPositions()
    console.log(positions)
    for(let i = 0; i < positions.length; i++) {
        displayPosition(positions[i])
    }
}

function displayPosition(position) {
    let div = document.getElementById("card")
    let h5 = document.createElement('h5')
    h5.innerHTML = position["classType"] + " " + position["courseNumber"]
    h5.className = 'card-header target'
    div.append(h5)
}
window.onload = function() {
    displayAllPositions()
}