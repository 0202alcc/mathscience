function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

function getQuestions() {
	readTextFile("../sciencebowlquestions.json", function(text) {
		var data = JSON.parse(text);
		//console.log(data);
		var categoryValue = $('#category').val()
		var sourceValue = $('#source').val()
		var statusValue = $('#status').val()
		var result
		if (categoryValue == "alltopics") {
			result = data.questions
		}
		else if (categoryValue !== "alltopics") {
			result = data.questions.filter(function(obj) {
				for (var i = 0; i < categoryValue.length; i++) {
					if (obj.category == categoryValue[i]) {
						return obj.category;
					}
				}
			})
		}
		var randQuestion = Math.floor(Math.random() * result.length) + 1
		var questionObject = result[randQuestion]
		var questionTossup = questionObject.tossup_question
		var questionTossupAnswer = questionObject.tossup_answer
		var button = document.getElementsByTagName("button")
		console.log(questionTossupAnswer.charAt(0))
		if (questionObject.tossup_format == "Multiple Choice") {
			document.getElementById('W').style.display = "inline"
			document.getElementById('X').style.display = "inline"
			document.getElementById('Y').style.display = "inline"
			document.getElementById('Z').style.display = "inline"
			for (var i = 0; i <= 3; i++) {
				if (button[i].id.charAt(0) == questionTossupAnswer.charAt(0)) {
					console.log(button[i].id.charAt(0))
					button[i].setAttribute("value", questionTossupAnswer)
				}
				button[i].removeAttribute("disabled")
			}
		}
		if (questionObject.tossup_format !== "Multiple Choice") {
			document.getElementById('W').style.display = "none"
			document.getElementById('X').style.display = "none"
			document.getElementById('Y').style.display = "none"
			document.getElementById('Z').style.display = "none"
			document.getElementById('showAnswer').style.display = "inline"
			document.getElementById('showAnswer').style.height = "36px"
			document.getElementById("showAnswer").onclick = function(){
				document.getElementById("answer").innerHTML = questionTossupAnswer
			}
		}
		document.getElementById("question").innerHTML = questionTossup
	});
	document.getElementById("status").innerHTML = null
	document.getElementById("answer").innerHTML = null
	document.getElementById('showAnswer').style.display = "none"
}


function checkAnswerW() {
	var answer = document.getElementById("answer").innerHTML
	var button = document.getElementById("W")
	if (button.value !== answer) {
		console.log("correct")
		document.getElementById("status").style.display = "inline"
		document.getElementById("status").innerHTML = "Correct"
	}
	else {
		console.log("incorrect")
		document.getElementById("status").innerHTML = "Incorrect"
		button.setAttribute("disabled", true)
	}
}

function checkAnswerX() {
	var answer = document.getElementById("answer").innerHTML
	var button = document.getElementById("X")
	if (button.value !== answer) {
		console.log("correct")
		document.getElementById("status").style.display = "inline"
		document.getElementById("status").innerHTML = "Correct"
	}
	else {
		console.log("incorrect")
		document.getElementById("status").innerHTML = "Incorrect"
		button.setAttribute("disabled", true)
	}
}

function checkAnswerY() {
	var answer = document.getElementById("answer").innerHTML
	var button = document.getElementById("Y")
	if (button.value !== answer) {
		console.log("correct")
		document.getElementById("status").style.display = "inline"
		document.getElementById("status").innerHTML = "Correct"
	}
	else {
		console.log("incorrect")
		document.getElementById("status").innerHTML = "Incorrect"
		button.setAttribute("disabled", true)
	}
}

function checkAnswerZ() {
	var answer = document.getElementById("answer").innerHTML
	var button = document.getElementById("Z")
	if (button.value !== answer) {
		console.log("correct")
		document.getElementById("status").style.display = "inline"
		document.getElementById("status").innerHTML = "Correct"
	}
	else {
		console.log("incorrect")
		document.getElementById("status").innerHTML = "Incorrect"
		button.setAttribute("disabled", true)
	}
}

function changeDisplayTab1() {
	document.getElementById("practice").style.display = "inline"
	document.getElementById("rankedPractice").style.display = "none"
}

function changeDisplayTab2() {
	document.getElementById("practice").style.display = "none"
	document.getElementById("rankedPractice").style.display = "inline"
}

function changeDisplayTab3() {
	document.getElementById("practice").style.display = "none"
	document.getElementById("rankedPractice").style.display = "none"
}

function changeDisplayTab4() {
	document.getElementById("practice").style.display = "none"
	document.getElementById("rankedPractice").style.display = "none"
}
$(document).ready(function() {
	$('select').material_select();
});
