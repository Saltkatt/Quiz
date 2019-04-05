// AJAX

var url = "https://opentdb.com/api.php?amount=10&type=boolean";
var questions = [];
var answeredQuestions = 0;
var correctAnswers = 0;
var progressBarLength;
var article = document.querySelector('article');
var main = document.querySelector('main');



// Get QuizAPI with random questions.

function getQuiz(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      questions =  xhttp.response;
      showQuestions(questions);
      progressBarLength = questions.results.length;
    }

  };
  xhttp.open("GET", url, true );
  xhttp.responseType = "json";
  xhttp.send();
}

//presentera frågorna
getQuiz();

function showQuestions(questions){
  console.log(questions);
  //button id.
  var btnid = 0;
  //int for idStr.
  var i=1;
  //List all 10 questions.
  questions.results.forEach( function (q, index) {
    console.log(q.question)
    //create element.
    var idStr = "Q" + i;
    i++;
    var qList = document.getElementById(idStr)
    var qStr = `<li>${idStr + '. ' + q.question}</li>
    <button type="button" id="${btnid++}" value = "True" name="trueButton">TRUE</button>
    <button type="button" id="${btnid++}" value = "False" name="falseButton">FALSE</button>`
    qList.innerHTML = qStr
  })
}

//receives input and makes second button unclickable.
main.addEventListener('click', function(e) {
  if (e.target.nodeName == "BUTTON") {
    var id = parseInt(e.target.id, 10);
    var questionIndex;
    document.getElementById(id).classList.add('unclickable');
    if (id % 2 == 0) {
      document.getElementById(id + 1).classList.add('unclickable');
      questionIndex = id / 2;
    } else {
      document.getElementById(id - 1).classList.add('unclickable');
      questionIndex = (id - 1) / 2;
    }
    checkAnswer(e, questionIndex);
  }
})

//checks answer and counts answered and correct questions.
function checkAnswer(e, questionIndex){
      let answer = e.target.value;
      let apiAnswer = questions.results[questionIndex].correct_answer;

      //compares input answer to apiAnswer
      if(answer == apiAnswer){
        console.log("Correct answer!")
        //if correct change button colour to green.
        e.target.classList.add('buttonGreen');
        correctAnswers++;
      }
      else {
        console.log("Incorrect answer!")
        //otherwise change button colour to red.
        e.target.classList.add('buttonRed');
      }
      answeredQuestions++;
      progressbar();
}

//prints quiz score!
function score(){

  correctAnswers;
  var score = document.getElementById(myScore)
  var scoreResult = '<h2>SCORE:"${correctAnswers++}"</h2>'
  if(answeredQuestions == progressBarLength){
    scoreResult.innerHTML = score;
  }

}

// shows quiz progress.
function progressbar(){

  var bar = document.getElementById("myBar");
  bar.style.width = answeredQuestions * 10 + '%';
  
}
