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
    let a = document.getElementById("title")
    let h5 = document.createElement("h5")
    let span1 = document.createElement("span")
    let span2 = document.createElement("span")
    let span3 = document.createElement("span")

    let positionClass = document.createTextNode(position["positionClass"])
    let leftParenthesis = document.createTextNode("(")
    let positionSemester = document.createTextNode(getSemesterAsString(position))
    let rightParenthesis = document.createTextNode(")")
    let applicantCount = document.createTextNode(`${position["applicants"].length} Applicants`)

	h5.setAttribute("class","card-header target");
	span1.setAttribute("id", `classname_${position["positionClass"]}`);
	span2.setAttribute("id",`${position["positionClass"]}_semester`);
	span3.setAttribute("class","float-end right-card-title");
	span3.setAttribute("id",`${position["positionClass"]}_applicants`);

    a.appendChild(h5)
    h5.appendChild(span1)
    span1.appendChild(positionClass)
    h5.appendChild(leftParenthesis)
    h5.appendChild(span2)
    span2.appendChild(positionSemester)
    h5.appendChild(rightParenthesis)
    h5.appendChild(span3)
    span3.appendChild(applicantCount)



}
window.onload = function() {
    displayAllPositions()
}

/*
<h5 class="card-header target"> <span id="classname">IT 451R 
</span> (<span id="semester">Fall/Spring </span>)
<span class="float-end right-card-title" id="applicants">0 Applicants</span></h5>
                            */