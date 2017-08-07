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
var arrset = []
var j = 0
function getrankedQuestions() {
	document.getElementById("rankedstatus").style.display = "none"
	readTextFile("../sciencebowlquestions.json", function(text) {
		var result
		//via category
		var data = JSON.parse(text);
			//console.log(data);
			var categoryValue = $('#rankedcategory').val()
			var sourceValue = $('#rankedsource').val()
			var statusValue = $('#rankedstatus').val()
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
		while(arrset.length != 25){
			var randQuestion = Math.floor(Math.random() * result.length) + 1
			var questionObject = result[randQuestion]
			var questionTossup = questionObject.tossup_question
			var questionTossupAnswer = questionObject.tossup_answer
			// for(var i = 0; i < 25; i++){
			if (questionObject.tossup_format !== "Multiple Choice") {
				getrankedQuestions()
			} else{
				arrset.push(questionObject)
			}
		}
	});
	
	if(arrset.length == 25){
		initQuestions()
	}
}
function checkCorrect(right){
	return right = "correct"
}
function initQuestions(){
	var database = firebase.database()
	var user = firebase.auth().currentUser
	var uid = user.uid
	var uidRef = database.ref('/'+uid)
	var arrayRef = database.ref('/'+uid+'/array')
	var rankRef = database.ref('/'+uid+'/rank')
	var uid = user.uid
	
	var correctObj = {}
	var incorrectObj = {}
	var unansweredObj = {}
	for (var x = 0, y = arrset.length; x < y; x++) {
		correctObj[arrset[x]] = (correctObj[arrset[x]] || 0) + 1;
		incorrectObj[arrset[x]] = (incorrectObj[arrset[x]] || 0) + 1;
		unansweredObj[arrset[x]] = (unansweredObj[arrset[x]] || 0) + 1;
	}
	
	var corr = correctObj['correct']
	var incorr = incorrectObj['incorrect']
	var unans = unansweredObj['unanswered']
	var rank
	if(corr - 0.25*incorr > 20){
		rank = 100
	} else {
		rank = 100-3*(20-(corr-0.25*incorr))
	}
	// var arrayRef = database.ref('/'+uid+)
	var button = document.getElementsByTagName("button")
	
	document.getElementById('Wranked').style.display = "inline"
	document.getElementById('Xranked').style.display = "inline"
	document.getElementById('Yranked').style.display = "inline"
	document.getElementById('Zranked').style.display = "inline"
	for (var i = 4; i <= 7; i++) {
		
		if (button[i].id.charAt(0) == arrset[j].tossup_answer.charAt(0)) {
			button[i].setAttribute("value", arrset[j].tossup_answer)
		}
		button[i].removeAttribute("disabled")
	}
	document.getElementById("rankedquestion").innerHTML = arrset[j].tossup_question
	console.log(j)
	j += 1
	if(typeof(arrset[j-2]) == "object"){
		arrset[j-2] = "unanswered"
		console.log(arrset)
	}
	if(j > 24){
		if(typeof(arrset[j-1]) == "object"){
			arrset[j-1] = "unanswered"
			console.log(arrset)
		}
		j = 0
		document.getElementById('Wranked').style.display = "none"
		document.getElementById('Xranked').style.display = "none"
		document.getElementById('Yranked').style.display = "none"
		document.getElementById('Zranked').style.display = "none"
		document.getElementById("rankedquestion").style.display= "none"
		document.getElementById("rankedanswer").innerHTML = "Your rank is: " + rank
		return arrayRef.set(arrset) && rankRef.set(rank)
		
	}
}

function rankedcheckAnswerW() {
	var answer = document.getElementById("rankedanswer").innerHTML
	var button = document.getElementById("Wranked")
	if (button.value == arrset[j-1].tossup_answer) {
		console.log("correct")
		document.getElementById("rankedstatus").style.display = "inline"
		document.getElementById("rankedstatus").innerHTML = "Correct"
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "correct"
		console.log(arrset)
	}
	else {
		console.log("incorrect")
		document.getElementById("rankedstatus").innerHTML = "Incorrect. The correct answer is: " + arrset[j-1].tossup_answer
		document.getElementById("rankedstatus").style.display = "inline"
		button.setAttribute("disabled", true)
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "incorrect"
		console.log(arrset)
	}
}

function rankedcheckAnswerX() {
	var answer = document.getElementById("rankedanswer").innerHTML
	var button = document.getElementById("Xranked")
	if (button.value == arrset[j-1].tossup_answer) {
		console.log("correct")
		document.getElementById("rankedstatus").style.display = "inline"
		document.getElementById("rankedstatus").innerHTML = "Correct"
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "correct"
		console.log(arrset)
	}
	else {
		console.log("incorrect")
		document.getElementById("rankedstatus").innerHTML = "Incorrect. The correct answer is: " + arrset[j-1].tossup_answer
		document.getElementById("rankedstatus").style.display = "inline"
		button.setAttribute("disabled", true)
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "incorrect"
		console.log(arrset)
	}
}

function rankedcheckAnswerY() {
	var answer = document.getElementById("rankedanswer").innerHTML
	var button = document.getElementById("Yranked")
	if (button.value == arrset[j-1].tossup_answer) {
		console.log("correct")
		document.getElementById("rankedstatus").style.display = "inline"
		document.getElementById("rankedstatus").innerHTML = "Correct"
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "correct"
		console.log(arrset)
	}
	else {
		console.log("incorrect")
		document.getElementById("rankedstatus").innerHTML = "Incorrect. The correct answer is: " + arrset[j-1].tossup_answer
		document.getElementById("rankedstatus").style.display = "inline"
		button.setAttribute("disabled", true)
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Zranked").setAttribute("disabled", true)
		arrset[j-1] = "incorrect"
		console.log(arrset)
	}
}

function rankedcheckAnswerZ() {
	var answer = document.getElementById("rankedanswer").innerHTML
	var button = document.getElementById("Zranked")
	if (button.value == arrset[j-1].tossup_answer) {
		console.log("correct")
		document.getElementById("rankedstatus").style.display = "inline"
		document.getElementById("rankedstatus").innerHTML = "Correct"
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		arrset[j-1] = "correct"
		console.log(arrset)
	}
	else {
		console.log("incorrect")
		document.getElementById("rankedstatus").innerHTML = "Incorrect. The correct answer is: " + arrset[j-1].tossup_answer
		document.getElementById("rankedstatus").style.display = "inline"
		button.setAttribute("disabled", true)
		document.getElementById("Wranked").setAttribute("disabled", true)
		document.getElementById("Xranked").setAttribute("disabled", true)
		document.getElementById("Yranked").setAttribute("disabled", true)
		arrset[j-1] = "incorrect"
		console.log(arrset)
	}
}