// AJAX

var url = "https://opentdb.com/api.php?amount=10&type=boolean";
var questions = [];
var answers = [];
var article = document.querySelector('article');


// Get QuizAPI with random questions.

function getQuiz(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      //document.getElementByID("demo").innerHTML = this.responseText;
      questions =  xhttp.response;
      showQuestions(questions);
      checkAnswer();
    }
    // else {
    //   //There was a problem with the request.
    //   console.log("HTTP-status is not 200, HTTP-status is: " + xhttp.status);
    // }
    // else {
    //   console.log(xhttp.readyState);
    // }
  };
  xhttp.open("GET", url, true );
  xhttp.responseType = "json";
  xhttp.send();
}

//presentera frågorna
getQuiz();

function showQuestions(questions){
  console.log(questions)
//int for idStr
var i=1;
//List all 10 questions.
  questions.results.forEach( function (q, index) {
    console.log(q.question)
//create element
    var idStr = "Q" + i;
    i++;
    var qList = document.getElementById(idStr)
    var qStr = `<li>${idStr + '. ' + q.question}</li>
    <button type="button" id="${index}" value = "True" name="trueButton">TRUE</button>
    <button type="button" id="${index}" value = "False" name="falseButton">FALSE</button>`
    qList.innerHTML = qStr
  })

}

//receives input and checks answer.
function checkAnswer(){

  document.querySelector('article').addEventListener('click', (e) =>{
    if(e.target.nodeName == "BUTTON") {
      let answerId = e.target.id;
      let answer = e.target.value;
      let apiAnswer = questions.results[answerId].correct_answer
      console.log(answerId)
      console.log(e.target.value)
      answers.push(e.target.value);

      if(answer == apiAnswer){
        console.log("Correct answer!")
      }
      else {
        console.log("Incorrect answer!")
      }
    }
  })

}




//visa rätt eller fel
// function setColour(){
//   var property = answerId;
//
// }

// progressbar i html
