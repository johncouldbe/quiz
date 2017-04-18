$(function(){
  /*********==========     Data     ==========**********/
  /*********========== ************ ==========**********/
  //Global counter for our array of questions
  var counter = 0;
  //Array that determines what random questions are asked
  var questionsArray = [];
  //How many questions in our quiz
  var quizLength = 5;
  //Holds how many correct answers the user has given
  var score = 0;
  //Commendation Object
  var commendationObj = {
    good: 'Wow! You know you\'re stuff! All the huskies gaze upon you with fond indifference.',
    ok: 'Not too shabby. But you still have much to learn young Husky-one Kenobi.',
    bad: 'Even though you know nothing about them... the huskies still love you.'
  };
  var commendation = '';
  var tallied = 0;
  /*********======== State Functions =========**********/
  /*********========== ************ ==========**********/
  //Fills the question array with random numbers that aren't repeated
  function setQuestions(){
    for(i = 0; i < quizLength; i++){
      var randomNum = Math.floor(Math.random() * quiz.length);
      if(questionsArray.indexOf(randomNum) != -1){
        i--;
      } else {
        questionsArray.push(randomNum);
      }
    }
  }
  //Used to calculate the percentage of right answers and dictate the ending message
  function tally() {
    tallied = Math.floor((100 / quizLength) * score);
    if(tallied >= 80){
      commendation = commendationObj.good;
    } else if (tallied >= 66.66){
      commendation = commendationObj.ok;
    } else {
      commendation = commendationObj.bad;
    }
  }
  //Reset everything!
  function reset(){
    score = 0;
    counter = 0;
    questionsArray = [];
  }
  /*********======== Render Functions ========**********/
  /*********========== ************ ==========**********/
  //Renders the question and answer field
  function renderQuestion(questionField){
    var questionNum = questionsArray[counter];
    var questionSelection = '';
    var questionCount = 1;
    var totalQuestion = '';

    Object.keys(quiz[questionNum].selection).forEach(function (key){
      questionSelection += '<label for="answer' + questionCount + '">' + '<input type="radio" value="answer' + questionCount + '" name="answer" required>' + key + '</label><br  />';
      questionCount++;
    });

    totalQuestion = '<h2>' + quiz[questionNum].question + '</h2>' +
    '<form name="questions" method="POST" class="js-form">' +questionSelection +
    '<button type="submit">Submit</button>' + '</form>';

    questionField.html(totalQuestion);
  }
  //Renders the response to the users answer
  function renderResponse(responsePopUp){
    var selected = $('[name="answer"]:checked').closest('label').text();
    var response = '';
    if(quiz[questionsArray[counter]].selection[selected] === true){
      response = '<h1>Correct!</h1>' +
      '<h3>' + quiz[questionsArray[counter]].true + '</h3>' +
      '<button class="next-question">Next Question</button>';
      //Increase score by 1
      score++;
    } else {
      response = '<h1>Wrong!</h1>' +
      '<h3>' + quiz[questionsArray[counter]].false + '</h3>' +
      '<button class="next-question">Next Question</button>';
    }
    responsePopUp.html(response);
  }

  //Renders the users score
  function renderScore(currentScore){
    currentScore.text(score);
  }
  //Renders the current question number
  function renderQNum(currentQuestion){
    currentQuestion.text((counter + 1) + ' of ' + quizLength);
  }
  //Render the ending
  function renderEnd(ending){
    var endResponse =
    '<h1>' + tallied + '%!</h1>' +
    '<h3>' + commendation + '</h3>' +
    '<button class="js-restart-quiz">Play Again?</button>';
    ending.html(endResponse);
  }
  /*********========== Click Events ==========**********/
  /*********========== ************ ==========**********/

  $('.js-start-section button').click(function(){
    setQuestions();
    renderQNum($('.js-question-num'));
    renderQuestion($('.js-question'));
    renderScore($('.js-score'));
    $('.js-start-section').addClass('hidden');
    $('.js-quiz').removeClass('hidden');
  });

  $(document).on('submit', '.js-form', function(e){
    e.preventDefault();
    renderResponse($('.js-response'));
    $('.js-response').removeClass('hidden');
  });

  $('.js-response').on('click', 'button', function(){
    counter++;
    if (counter == quizLength){
      tally();
      renderEnd( $('.js-end-section'));
      $('.js-quiz').addClass('hidden');
      $('.js-end-section').removeClass('hidden');
    } else {
      renderQNum($('.js-question-num'));
      renderQuestion($('.js-question'));
      renderScore($('.js-score'));
    }
    $('.js-response').addClass('hidden');
  });

  $('.js-end-section').on('click', 'button', function(){
    reset();
    setQuestions();
    renderQNum($('.js-question-num'));
    renderQuestion($('.js-question'));
    renderScore($('.js-score'));
    $('.js-end-section').addClass('hidden');
    $('.js-quiz').removeClass('hidden');
  });
});

//questionsArray = []; counter = 0; score = 0;
