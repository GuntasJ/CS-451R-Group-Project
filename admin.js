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
    let div = document.getElementById("card")
    let h5 = document.createElement('h5')

    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    
    span1.innerHTML = `${position["positionClass"]} (${getSemesterAsString(position)})`

    h5.className = 'card-header target'
    span2.className = "float-end right-card-title"

    h5.appendChild(span1)
    h5.appendChild(span2)
    h5.innerHTML = 
    div.append(h5)
    
    /*
    //Create Elements
	var element_1 = document.createElement("h5");
	var element_1_1 = document.createElement("span");
	var element_1_2 = document.createElement("span");
	var element_1_3 = document.createElement("span");
	//Create Text Nodes
	var textNode_1_1_1 = document.createTextNode("IT 451R");
	var textNode_1_1 = document.createTextNode("(");
	var textNode_1_2_1 = document.createTextNode("Fall/Spring");
	var textNode_1_2 = document.createTextNode(")");
	var textNode_1_3_1 = document.createTextNode("0 Applicants");
	//Set Attributes
	element_1.setAttribute("class","card-header target");
	element_1_1.setAttribute("id","classname");
	element_1_2.setAttribute("id","semester");
	element_1_3.setAttribute("class","float-end right-card-title");
	element_1_3.setAttribute("id","applicants");
	//Append Children
	element.appendChild(element_1);
	element_1.appendChild(element_1_1);
	element_1_1.appendChild(textNode_1_1_1);
	element_1.appendChild(textNode_1_1);
	element_1.appendChild(element_1_2);
	element_1_2.appendChild(textNode_1_2_1);
	element_1.appendChild(textNode_1_2);
	element_1.appendChild(element_1_3);
	element_1_3.appendChild(textNode_1_3_1);
    */

}
window.onload = function() {
    displayAllPositions()
}

/*
<h5 class="card-header target"> <span id="classname">IT 451R 
</span> (<span id="semester">Fall/Spring </span>)
<span class="float-end right-card-title" id="applicants">0 Applicants</span></h5>
                            */