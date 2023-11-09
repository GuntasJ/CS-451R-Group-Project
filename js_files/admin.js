import { getAllPositions, updateNotesOfPosition, getPositionById} from "./restapi.js"

async function displayAllPositions() {
    const positions = await getAllPositions()
    for(let i = 0; i < positions.length; i++) {
        displayPosition(positions[i])
    }
}

function getSemesterAsString(position) {
    let semesterList = position["semesters"]
    let semesterString = ""
    for(let i = 0; i < semesterList.length; i++) {
        semesterString += semesterList[i] + "/"
    }
    return semesterString.slice(0, -1)
}

function cleanId(positionClass, positionType) {
    return (positionClass.split(" ").join('') + "_" + positionType.split(" ").join(''));
}

/*
<div class="mt-2 open-position-input-group input-group float-end">
    <a id="editbutton" href="" value="" class="input-group-btn btn btn-card">Edit Notes</a>
    <button id="closebutton" value="" class="input-group-btn btn btn-card">Close Position</button>
</div>
                    */

/* 
<button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#myModal">
<span class="glyphicon glyphicon-trash">LName FNmae</span>
*/

function createEditNotesButton(position) {
    let cleanPositionId = cleanId(position["positionClass"], position["positionType"])
    let editNotesButton = document.createElement("button")
    let editNotesText = document.createTextNode("Edit Notes")

    editNotesButton.setAttribute("id", `edit_notes_${cleanPositionId}`)
    editNotesButton.setAttribute("class", "input-group-btn btn btn-card")
    editNotesButton.setAttribute("data-bs-toggle", "modal")
    editNotesButton.setAttribute("data-bs-target", "#edit_notes_modal")

    editNotesButton.appendChild(editNotesText)

    editNotesButton.addEventListener('click', function() {
        document.getElementById("edit_notes_modal_text_area").defaultValue = position["notes"]
        sessionStorage.setItem("positionId", `[${position["positionClass"]}][${position["positionType"]}]`)
        console.log("cloekced")
    })

    return editNotesButton
}

function createClosePositionButton(cleanId) {
    let closePositionButton = document.createElement("button")
    let closePositionText = document.createTextNode("Close Position")

    closePositionButton.setAttribute("id", `close_button_${cleanId}`)
    closePositionButton.setAttribute("value", "")
    closePositionButton.setAttribute("class", "input-group-btn btn btn-card")

    closePositionButton.appendChild(closePositionText)
    return closePositionButton
}

//<div class="card-body collapse" id="collapseOne">
function createCollapseDiv(cleanId) {
    let collapseDiv = document.createElement("div")
    collapseDiv.setAttribute("class", "card-body collapse")
    collapseDiv.setAttribute("id", `collapse_${cleanId}`)
    return collapseDiv
}

//<label class="card-title mt-2 mb-3">Position: <span id="position">Grader</span></label> <br>
function createPositionLabel(cleanId, positionType) {
    let positionLabel = document.createElement("label")
    positionLabel.setAttribute("class", "card-title mt-2 mb-3")
    let positionText = document.createTextNode("Position: ")
    
    let positionSpan = document.createElement("span")
    positionSpan.setAttribute("id", `position_span_${cleanId}`)
    let positionSpanText = document.createTextNode(positionType)

    positionSpan.appendChild(positionSpanText)
    positionLabel.appendChild(positionText)
    positionLabel.appendChild(positionSpan)
    
    return positionLabel
}
//<div class="mt-2 open-position-input-group input-group float-end"></div>
function createEditNotesAndClosePositionDiv() {
    let div = document.createElement("div")
    div.setAttribute("class", "mt-2 open-position-input-group input-group float-end")
    return div
}







function displayPosition(position) {
    let mainDiv = document.getElementById("sample")
    let div = document.createElement("div")
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
    let noteLabelText = document.createTextNode("Notes: ")
    let noteSpanText = document.createTextNode(`${position["notes"]}`)

    let applicantButtonAText = document.createTextNode("See Applicants")

    applicantButtonA.setAttribute("id", `seebutton_${cleanPositionId}`)
    applicantButtonA.setAttribute("href", "../admin_pages/applications.html")
    applicantButtonA.setAttribute("value", "")
    applicantButtonA.setAttribute("class", "mt-2 btn open-position-btn btn-card")
    applicantButtonA.setAttribute("style", "height:50px; line-height:35px;")
    applicantButtonA.addEventListener('click', function() {
        sessionStorage.setItem("cleanPositionId", `${position["positionClass"]}: ${position["positionType"]}`)
    })

    notesLabel.setAttribute("class", "card-title float-start")

    notesDiv.setAttribute("class", "notes-wrapper admin-notes")
    notesSpan.setAttribute("id", `notes_${cleanPositionId}`)
    
    div.setAttribute("class", "card mb-3 class-card")
    div.setAttribute("id", `card_${cleanPositionId}`)

    a.setAttribute("id", `title_${cleanPositionId}`)
    a.setAttribute("data-bs-toggle", "collapse")
    a.setAttribute("data-bs-target", `#collapse_${cleanPositionId}`)

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

    let collapseDiv = createCollapseDiv(cleanPositionId)
    let positionLabel = createPositionLabel(cleanId, position["positionType"])
    let editNotesButton = createEditNotesButton(position)
    let closePositionButton = createClosePositionButton(cleanPositionId)
    let notesAndPositionDiv = createEditNotesAndClosePositionDiv()

    notesAndPositionDiv.appendChild(editNotesButton)
    notesAndPositionDiv.appendChild(closePositionButton)


    collapseDiv.appendChild(positionLabel)
    collapseDiv.appendChild(br)

    notesLabel.appendChild(noteLabelText)
    collapseDiv.appendChild(notesLabel)

    notesDiv.appendChild(notesSpan)
    notesSpan.appendChild(noteSpanText)
    collapseDiv.appendChild(notesDiv)

    applicantButtonA.appendChild(applicantButtonAText)
    collapseDiv.appendChild(applicantButtonA)

    collapseDiv.appendChild(notesAndPositionDiv)


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

function deconstructPositionId(modifiedPositionId) {
    let positionClass = ""
    let positionType = ""
    let i = 1;
    while(true) {
        if(modifiedPositionId[i] == ']') {
            break
        }
        positionClass += modifiedPositionId[i]
        i++
    }
    i += 2
    while(true) {
        if(modifiedPositionId[i] == ']') {
            break
        }
        positionType += modifiedPositionId[i]
        i++
    }

    return [positionClass, positionType]
}
window.onload = function() {
    displayAllPositions()
 
    document.getElementById("edit_notes_modal_button").addEventListener('click', async function(e) {
        let id = deconstructPositionId(sessionStorage.getItem("positionId"))
        let newNote = document.getElementById("edit_notes_modal_text_area").value

        console.log(id[0] + " " + id[1])

        let r = await getPositionById(id[0], id[1])
        console.log(await r.json())

        let response = await updateNotesOfPosition(id[0], id[1], {notes: newNote})
        console.log(response)

        let editNotesModal = bootstrap.Modal.getInstance(document.getElementById('edit_notes_modal'))
        editNotesModal.hide()
        location.reload()
    })
}

// function Search() {
//   var input = document.getElementById("Search");
//   var filter = input.value.toLowerCase();
//   var nodes = document.getElementsByClassName('target');

//   for (i = 0; i < nodes.length; i++) {
//     if (nodes[i].innerText.toLowerCase().includes(filter)) {
//       nodes[i].parentNode.parentNode.parentNode.style.display = "block";
//     } else {
//       nodes[i].parentNode.parentNode.parentNode.style.display = "none";
//     }
//   }
// }

// $(document).on("click", ".checkbox" ,function() {
// 	changeCheckbox();
// });

// async function changeCheckbox(ele){
// 	filter();
// }

// function filter(){
// 	var filters="";
// 	var majors="";
// 	var pos="";
// 	var semesters="";
// 	var grad="";
	
//     var majorcheckboxes = document.getElementsByClassName('major-checkbox');
// 	var poscheckboxes = document.getElementsByClassName('pos-checkbox');
// 	var semestercheckboxes = document.getElementsByClassName('semester-checkbox');
// 	var gradcheckboxes = document.getElementsByClassName('grad-checkbox');
	
// 	majors = filterField(majorcheckboxes);
// 	pos = filterField(poscheckboxes);
// 	semesters = filterField(semestercheckboxes);
// 	grad = filterField(gradcheckboxes);
	
	
// 	if(typeof getPagetype === "function"){
// 		var appcheckboxes = document.getElementsByClassName('app-checkbox');
// 		var app = filterField(appcheckboxes);
// 	}

// 	function filterField(checkboxes){
// 		var classes = "";
// 		var list=[];
// 		var counter = 0;
		
// 		var chekboxInputs = Array.from(checkboxes).map(a => a.querySelector('input'));
		
// 		var allAreUnselected = chekboxInputs.every(function(elem){
// 			return !elem.checked;
// 		});
// 		if(allAreUnselected){
// 			chekboxInputs.forEach(function(input){
// 				if(input){
// 					list[counter] = input.getAttribute("value"); 
// 					counter++;
// 					addFilter(list);
// 				}
// 			});
// 		}
// 		else {
// 			chekboxInputs.forEach(function(input){
// 				if(input.checked){
// 					list[counter] = input.getAttribute("value"); 
// 					counter++;
// 					addFilter(list);
// 				}
// 			});
// 		}


// 		function addFilter(list){
// 			classes = ":not(";
// 			for(var i=0;i<list.length;i++){
// 				classes+="."+list[i];
// 				if(i!==list.length-1)
// 					classes+=","
// 			}		
// 		}
// 		classes+=")"
		
// 		return classes;
// 	}
	
// 	filters=majors+", "+pos+", "+semesters+", "+grad
	
// 	if(typeof getPagetype === "function")
// 		filters+=", "+app;
	
// 	$('.all').show().filter(filters).hide();
// }

// function uncheck(ele){
// 	var classes =  ele.classList;
// 	 $('input.'+classes[1]).not(ele).prop('checked', false); 
// }

// function collapseCards(value){
// 	$('.collapse').collapse(value);
// }

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