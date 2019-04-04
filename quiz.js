// AJAX

var url = "https://opentdb.com/api.php?amount=10&type=boolean";
var questions = [];
var answers = [];
var correctAnswers = [];
var numberOfClicks = 0;
var clickedQuestions = [];
var oneClick = {
   clicks:0 };
var article = document.querySelector('article');
var main = document.querySelector('main');



// Get QuizAPI with random questions.

function getQuiz(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      questions =  xhttp.response;
      showQuestions(questions);
      countClicks();
      checkAnswer();
    }

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
//should only allow one answer per question.
function countClicks(){
  main.addEventListener('click', function(e){

    oneClick.clicks++;
    if(numberOfClicks < 1){
      console.log(e.target);
      if(e.target.nodeName == "BUTTON"){
        e.target.parentNode.classList.add('unclickable');
        clickedQuestions.push(e.target.id);
      }
    }
    numberOfClicks++;
    if(numberOfClicks == 1){
      checkAnswer();
      if (questions.length == answers.length){
        console.log("End of Quiz");
        //var endQuiz = '<p> You have finished the quiz</p>'
        score()
      }
    }

  })
}

//receives input and checks answer.
function checkAnswer(){
  document.querySelector('article').addEventListener('click', (e) =>{
    if(e.target.nodeName == "BUTTON") {
      let buttonId = e.target.id;
      let answer = e.target.value;
      let apiAnswer = questions.results[buttonId].correct_answer
      console.log(buttonId)
      console.log(e.target.value)
      answers.push(e.target.value);

      //compares input answer to apiAnswer
      if(answer == apiAnswer){
        console.log("Correct answer!")
        //if correct change button colour to green.
        e.target.classList.add('buttonGreen');
        clickedQuestions.push(e.target.id);
        correctAnswers.push(e.target.id);
      }
      else {
        console.log("Incorrect answer!")
        //otherwise change button colour to red.
        e.target.classList.add('buttonRed');
        clickedQuestions.push(e.target.id);
      }
    }
    clickedQuestions = [];
  })
}

//prints quiz score!
function score(){
  var count = 0;
  for ( var i = 0; i < correctAnswers.length; ++i){
    count++;
  }

  //print correctAnswers.length;
}

// shows quiz progress.
function progressbar(){


}
