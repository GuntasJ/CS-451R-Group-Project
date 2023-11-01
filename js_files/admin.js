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

function cleanId(positionClass, positionType) {
    console.log(positionClass)
    console.log(positionType)
    console.log(positionClass.split(" ").join(''))
    return (positionClass.split(" ").join('') + "_" + positionType);
}

function displayPosition(position) {
    let mainDiv = document.getElementById("sample")
    let div = document.createElement("div")
    let collapseDiv = document.createElement("div")
    let positionLabel = document.createElement("label")
    let graderSpan = document.createElement("span")
    let br = document.createElement("br")

    let a = document.createElement("a")
    let h5 = document.createElement("h5")
    let span1 = document.createElement("span")
    let span2 = document.createElement("span")
    let span3 = document.createElement("span")
    let span4 = document.createElement("span")
    
    let notesLabel = document.createElement("label")
    let notesDiv = document.createElement("div")
    let notesSpan = document.createElement("span")

    let applicantButtonA = document.createElement("a")

    let cleanPositionId = cleanId(position["positionClass"], position["positionType"])

    let positionClass = document.createTextNode(position["positionClass"])
    let leftParenthesis = document.createTextNode(" (")
    let positionSemester = document.createTextNode(getSemesterAsString(position))
    let rightParenthesis = document.createTextNode(")")
    let standingRequired = document.createTextNode(`: ${position["requiredStanding"]}`)
    let applicantCount = document.createTextNode(`${position["applicants"].length} Applicants`)
    let positionLabelText = document.createTextNode("Position: ")
    let graderSpanText = document.createTextNode(`${position["positionType"]}`)
    let noteLabelText = document.createTextNode("Notes: ")
    let noteSpanText = document.createTextNode(`${position["notes"]}`)

    let applicantButtonAText = document.createTextNode("See Applicants")

    applicantButtonA.setAttribute("id", `seebutton_${cleanPositionId}`)
    applicantButtonA.setAttribute("href", "")
    applicantButtonA.setAttribute("value", "")
    applicantButtonA.setAttribute("class", "mt-2 btn open-position-btn btn-card")
    applicantButtonA.setAttribute("style", "height:50px; line-height:35px;")

    notesLabel.setAttribute("class", "card-title float-start")
    positionLabel.setAttribute("class", "card-title mt-2 mb-3")
    graderSpan.setAttribute("id", `position_${cleanPositionId}`)

    notesDiv.setAttribute("class", "notes-wrapper admin-notes")
    notesSpan.setAttribute("id", `notes_${cleanPositionId}`)
    
    div.setAttribute("class", "card mb-3 class-card")
    div.setAttribute("id", `card_${cleanPositionId}`)

    a.setAttribute("id", `title_${cleanPositionId}`)
    a.setAttribute("data-bs-toggle", "collapse")
    a.setAttribute("data-bs-target", `#collapse_${cleanPositionId}`)

    collapseDiv.setAttribute("class", "card-body collapse")
    collapseDiv.setAttribute("id", `collapse_${cleanPositionId}`)

	h5.setAttribute("class","card-header target");
	span1.setAttribute("id", `${cleanPositionId}_class`)
	span2.setAttribute("id", `${cleanPositionId}_semester`)
	span3.setAttribute("class","float-end right-card-title")
	span3.setAttribute("id", `${cleanPositionId}_applicants`)
    span4.setAttribute("id", `${cleanPositionId}_degree`)

    /*
                    <a id="seebutton" href="" value="" class="mt-2 btn open-position-btn btn-card"
                        style="height:50px; line-height:35px;">See Applicants</a>
                    <div class="mt-2 open-position-input-group input-group float-end">
                        <a id="editbutton" href="" value="" class="input-group-btn btn btn-card">Edit Notes</a>
                        <button id="closebutton" value="" class="input-group-btn btn btn-card">Close Position</button>
                    </div>
                    <br>
                    */

    positionLabel.appendChild(positionLabelText)
    graderSpan.appendChild(graderSpanText)
    positionLabel.appendChild(graderSpan)
    collapseDiv.appendChild(positionLabel)
    collapseDiv.appendChild(br)

    notesLabel.appendChild(noteLabelText)
    collapseDiv.appendChild(notesLabel)

    notesDiv.appendChild(notesSpan)
    notesSpan.appendChild(noteSpanText)
    collapseDiv.appendChild(notesDiv)

    applicantButtonA.appendChild(applicantButtonAText)
    collapseDiv.appendChild(applicantButtonA)




    mainDiv.appendChild(div)
    div.append(a)
    div.append(collapseDiv)

    a.appendChild(h5)

    h5.appendChild(span1)
    span1.appendChild(positionClass)

    h5.appendChild(leftParenthesis)
    h5.appendChild(span2)
    span2.appendChild(positionSemester)

    h5.appendChild(rightParenthesis)

    h5.appendChild(span4)
    span4.appendChild(standingRequired)

    h5.appendChild(span3)
    span3.appendChild(applicantCount)
}
window.onload = function() {
    displayAllPositions()
}

/*
        <div class="col-sm-4" id="sample">
            <div class="card mb-3 class-card" id="card">
                <a id="title" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    <h5 class="card-header target">
                        <span id="classname">IT 451R </span> (<spanid="semester">Fall/Spring</span>)<span class="float-end right-card-title" id="applicants">0 Applicants</span></h5>
                </a>
                <div class="card-body collapse" id="collapseOne">
                    <label class="card-title mt-2 mb-3">Position: <span id="position">Grader</span></label> <br>
                    <label class="card-title float-start">Notes: </label>
                    <div class="notes-wrapper admin-notes">
                        <span id="notes">None</span>
                    </div>
                    <a id="seebutton" href="" value="" class="mt-2 btn open-position-btn btn-card"
                        style="height:50px; line-height:35px;">See Applicants</a>
                    <div class="mt-2 open-position-input-group input-group float-end">
                        <a id="editbutton" href="" value="" class="input-group-btn btn btn-card">Edit Notes</a>
                        <button id="closebutton" value="" class="input-group-btn btn btn-card">Close Position</button>
                    </div>
                    <br>
                </div>
            </div>
        </div>  
*/