// getting html elements and access to them 
const start = document.querySelector('.start-quiz');
const info = document.querySelector('.info-container');
const exitQuiz = document.querySelector('.exit-button');
const cntinue = document.querySelector('.continue-button');
const infoContainer = document.querySelector('.questions-container');
let questionTitle = document.querySelector('.question-title');
let ul = document.querySelector('ul');
const quescounter = document.querySelector('.question-counter');
var timerNumb = document.querySelector('.timer-number');
var timeContent = document.querySelector('.time-content');
var timerLine = document.querySelector('.timer-line');
var nextBtn = document.querySelector('.next-button');
var quesContainer = document.querySelector('.questions-container');
var quizResult = document.querySelector('.result-content');
var resultContainer = document.querySelector('.result-container');
var quitBtn = document.querySelector('.quitBtn');
var replayBtn = document.querySelector('.replayBtn');
// --------------------------------------------------

// global variables 
var timeLeft = 15;
var timerlineWidth = 100;
var userScore = 0;
var questionsIndex = 0;
var countdown;
var counterLine;
// -----------------------

// functions -----------------------------------

// when questions ends show the result of quiz 
function showResult() {
    quesContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // if user score be less than 2 the text will be nice and if more than 3 text will be congratulation
    quizResult.innerHTML = `${(userScore <= 2) ? `and nice 😎`: `congratulations 😍`}` + `,You got <strong>${userScore}
    </strong> of <strong>${questions.length}</strong>`;
}

// show the questions in li tag and set attributer for eachone 
function quesHandler (numbIndex) {
    // question title and its number
    questionTitle.innerHTML = `<span>${questions[numbIndex].numb}.</span> ${questions[numbIndex].question}`;

    for (let i=0; i< questions[numbIndex].options.length; i++){
        var li = document.createElement('li');

        // all li-hover because we can access hover style
        li.classList.add('li-hover')

        // if the option we are handling is the answer put the check icon or we put the times icon
        li.innerHTML = (questions[numbIndex].answer === questions[numbIndex].options[i]) ? 
        `${questions[numbIndex].options[i]} <span class='check-icon'><i class="fas fa-check"></i></span>`: 
        `${questions[numbIndex].options[i]} <span class='times-icon'><i class="fas fa-times"></i></span>` ;
        ul.appendChild(li);

        // set a onclick for each one of li to access them all 
        li.setAttribute('onclick', `ansSelect(this, ${numbIndex})`)
    }
}

// number of the questions 
function quesCounter (index) {
    quescounter.innerHTML = `<strong>${questions[index].numb}</strong> of <strong>${questions.length}</strong> Questions`;
}

//  handle timer coountdown 
function startTimer() {
    // first we call startTimer func we want firts call timer with no delay after that interval runs 
    Timer()
    
    countdown = setInterval(Timer ,1000)
    function Timer() {
        timerNumb.innerText = timeLeft

        // when timeLeft is one number put a zero behind it 
        if (timeLeft < 10){
            timerNumb.innerText = '0' + timeLeft;
        }
        // ------------

        // when time is over interval will clear, and call auto select that show the correct answer
        if (timeLeft === 0){
            clearInterval(countdown)
            timeContent.innerText = 'Time Off'
            for (let i=0; i<4; i++){
                if (ul.childNodes[i].innerText === questions[questionsIndex].answer){
                autoSelect(ul.childNodes[i])
                }
            }
        } else{timeLeft --} 
    }    
}

// handle timer line and every 15 ms decrease timerlineWidth 
function startTimerline() {
    counterLine = setInterval(timer, 15)
    //  every 15 ms we minus the timerline width by 1/10 and the backgroun color will be shown with the 1/10 value 
    function timer() {
        timerlineWidth -= 1/10
        timerLine.style.width = `${timerlineWidth}%`
         
        // when times up we stop it 
        if (timerlineWidth === 0){
            clearInterval(counterLine)
        }
    }
}

// show the correct answer and also disable all options 
function autoSelect (index) {
    // call the coorect func to display correct answer 
    correctHandler(index);
    disable_optionHandler(index);
    nextbutn_styleHandler();
    
    // set questions state to true that means we are done with this question and can go to the next 
    questions[questionsIndex].state = true;

    // clear both intervals after autoselect occurs
    clearInterval(countdown);
    clearInterval(counterLine);
}

// disable options and set some styles when user select 
function disable_optionHandler(userSlct) {

    // change some styles to li tags after user clicks on the options or auto select will be called 
    for (let i=0; i<4; i++){
        ul.childNodes[i].style.cursor = 'default'
        ul.childNodes[i].style.userSelect = 'none'
        ul.childNodes[i].style.border = 'none';
        ul.childNodes[i].classList.remove('li-hover')

        //  after user selected or autoselect called user cannot select anymore
        ul.childNodes[i].setAttribute('onclick', 'function userClick(){return null}')
    }
}

// when user select the correct answer 
function correctHandler(userSlct) {
    const checkIcon = document.querySelector('.check-icon');
    checkIcon.style.display = 'block';
    userSlct.style.backgroundColor = 'rgb(203, 241, 200)';
}

// whwn user select wrong answer 
function wrongHandler(userSlct) {
    const timesIcon = document.querySelectorAll('.times-icon')

    // because we dont access li we should find the li that user has selected and display its times icon
        for (let i=0; i<3; i++){
            if (timesIcon[i].previousSibling.textContent === userSlct.textContent){
                timesIcon[i].style.display = 'block'
            }
        }
        userSlct.style.backgroundColor = 'rgb(255, 198, 198)'

        // show the correct answer when user select wrong 
        for (let i=0; i<4; i++){
            if (ul.childNodes[i].innerText === questions[questionsIndex].answer){
                correctHandler(ul.childNodes[i])
            }
        }
}

// handle the user selection 
function ansSelect(userAnswer, ansIndex) {

    // set its state to true to access the next question 
    questions[ansIndex].state = true

    clearInterval(countdown)
    clearInterval(counterLine)
    disable_optionHandler(userAnswer)

    // if the option user is selected is the answer call correct handler to have check icon and increase user score
   if (userAnswer.innerText === questions[ansIndex].answer){
       userScore += 1;
       correctHandler(userAnswer)
    } 
    else{
        wrongHandler(userAnswer)
    }

    // after user select any option we give some styles to next button
    nextbutn_styleHandler();
}

// after user select option or after autoselect calls this function will be call to change nextBtn style 
function nextbutn_styleHandler() {
    nextBtn.style.opacity = 1;
    nextBtn.style.cursor = 'pointer';
}

// when next question displays we should set next button style to its initial
function Reset_nextBtn_styleHandler() {
    nextBtn.style.opacity = .7;
    nextBtn.style.cursor = 'default';
}

// end of functions ----------------------------

// ------------------------------------------------------------------

// event handlers ----------------

// user click on the Start Quiz change the curren page style to none to be disappeared and next page eill be shown
start.onclick = function() {
    start.style.display ='none';
    info.style.display = 'flex';
};

// user click on the Exit Quiz back to the previos page by changing its display 
exitQuiz.onclick = function() {
    start.style.display = 'block';
    info.style.display = 'none';
};

// user click on the continue the questions will handle  
cntinue.onclick = function continueHandler() {
    // current page disappear and questions will be displayed 
    info.style.display = 'none';
    infoContainer.style.display = 'block';

    // call these funcs to have questions and timers
    quesHandler(questionsIndex)
    quesCounter(questionsIndex);
    startTimer(questionsIndex)
    startTimerline()
};

// user clicks on the continue 
nextBtn.onclick = function() {

    // if user doesnt click or autoselec doesnt call continue onclick doesnt do anything 
    if (questions[questionsIndex].state === false ){
        return null

    } else{
        // increase questions index to have next questions 
        questionsIndex ++

        /* after get all questions and when index is out of questionsIndex, we show results
        with calling its func and set return to null because index is out of questionsIndex and we
         dont wanna read next line and exit from code*/
        if (questionsIndex === 5){
            showResult()
            return null
        }
         // remove ul chillnodes to replace current questions with next questions 
         ul.innerHTML =''; 

         // reset nextbutton style to it's initial
         Reset_nextBtn_styleHandler()

        // reset timer and counterline to start from beginning
        timeLeft = 15;
        timerlineWidth = 100
        startTimer(questionsIndex)
        startTimerline()
        // 
        
        // call question handlers to have questions
        quesCounter( questionsIndex);
        quesHandler(questionsIndex);

        // if we got last question next button would be finish and give finish style
        if (questionsIndex === 4){
            nextBtn.innerText = 'Finish';
            nextBtn.style.letterSpacing = '1px'
        }
        
    }
}

// user clicks on the quit quiz button
quitBtn.onclick = function() {
    location.reload();
}

// user clicks on the replay quiz button
replayBtn.onclick = function() {

    // reset all global values
    ul.innerHTML = '';
    timeLeft = 15;
    timerlineWidth = 100;
    userScore = 0;
    questionsIndex = 0;

    // set next button styles to its initial
    nextBtn.innerText = 'Next Question'
    nextBtn.style.letterSpacing = '0'

    // set all questions state to false
    questions.map((row) => {
        row.state = false
    })
    //  display questions page
    resultContainer.style.display = 'none';
    quesContainer.style.display = 'block'

    // call all functions by reset valus 
    quesHandler(questionsIndex)
    quesCounter(questionsIndex);
    startTimer(questionsIndex)
    startTimerline()
    Reset_nextBtn_styleHandler()
}