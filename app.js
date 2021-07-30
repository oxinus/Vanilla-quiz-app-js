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
// --------------------------------------------------

// global variables 
var timeLeft = 15;
var timerlineWidth = 100;
var userScore = 0;
var questionsIndex = 0;
var countdown;
var counterLine;
// -----------------------

// functions that use more than one time 

// number of the questions 
function quesCounter (index) {
    quescounter.innerHTML = `<strong>${questions[index].numb}</strong> of <strong>${questions.length}</strong> Questions`;
}

// show the questions in li tag and set attributer for eachone 
function quesHandler (numbIndex) {

    // minus one because the numb of questions start from 1 but index of questions list starts from 0 
    let quesindex  = numbIndex - 1
    // --------------------------------

    questionTitle.innerHTML = `<span>${questions[quesindex].numb}.</span> ${questions[quesindex].question}`;
    for (let i=0; i< questions[quesindex].options.length; i++){
        var li = document.createElement('li');
        li.classList.add('li-hover')
        li.innerHTML = (questions[quesindex].answer === questions[quesindex].options[i]) ? 
        `${questions[quesindex].options[i]} <span class='check-icon'><i class="fas fa-check"></i></span>`: 
        `${questions[quesindex].options[i]} <span class='times-icon'><i class="fas fa-times"></i></span>` ;
        ul.appendChild(li);

        // set a onclick for each one of li to access them all 
        li.setAttribute('onclick', `ansSelect(this, ${quesindex})`)
    }
}

//  handle timer coountdown 
function startTimer(index) {
    countdown = setInterval(Timer ,1000)
    function Timer() {
        timerNumb.innerText = timeLeft

        // when time is over interval will clear, and call auto select that show the correct answer
        if (timeLeft === 0){
            clearInterval(countdown)
            timeContent.innerText = 'Time Off'
            for (let i=0; i<4; i++){
                if (ul.childNodes[i].innerText === questions[0].answer){
                autoSelect(ul.childNodes[i])
                }
            }
        } else{timeLeft --} 
    }    
}

// start timer line and every 15 ms decrease timerlineWidth 
function startTimerline() {
    counterLine = setInterval(timer, 15)
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
    correctHandler(index);
    disable_optionHandler(index);
    nextbutn_styleHandler();
    questions[questionsIndex].state = true;
}

// disable options and set some styles when user select 
function disable_optionHandler(userSlct) {
    for (let i=0; i<4; i++){
        ul.childNodes[i].style.cursor = 'default'
        ul.childNodes[i].style.userSelect = 'none'
        ul.childNodes[i].style.border = 'none';
        ul.childNodes[i].classList.remove('li-hover')
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
        for (let i=0; i<3; i++){
            if (timesIcon[i].previousSibling.textContent === userSlct.textContent){
                timesIcon[i].style.display = 'block'
            }
        }
        userSlct.style.backgroundColor = 'rgb(255, 198, 198)'

        // show the correct answer when user select wrong 
        for (let i=0; i<4; i++){
            if (ul.childNodes[i].innerText === questions[0].answer){
                correctHandler(ul.childNodes[i])
            }
        }
}

// handle the user selection 
function ansSelect(userAnswer, ansIndex) {
    questions[ansIndex].state = true
    clearInterval(countdown)
    clearInterval(counterLine)
    disable_optionHandler(userAnswer)
   if (userAnswer.innerText === questions[ansIndex].answer){
       userScore += 1;
       correctHandler(userAnswer)
    } 
    else{
        wrongHandler(userAnswer)
    }
    nextbutn_styleHandler();
}

// after user select option or after sutoselect occurs this function will be call to change nextBtn style 
function nextbutn_styleHandler() {
    nextBtn.style.opacity = 1;
    nextBtn.style.cursor = 'pointer';
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
cntinue.onclick = function(e) {
    info.style.display = 'none';
    infoContainer.style.display = 'block';
    quesHandler(questions[0].numb)
    quesCounter(0);
    startTimer(0)
    startTimerline()
};

// user clicks on the continue 
nextBtn.onclick = function() {

    // if user doesnt click or autoselec doesnt call continue onclick doesnt do anything 
    if (questions[questionsIndex].state === false ){
        return null
    } else{
        // increase questions index to access next questions 
        questionsIndex ++
        
    }
}