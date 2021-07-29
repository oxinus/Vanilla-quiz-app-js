const start = document.querySelector('.start-quiz');
const info = document.querySelector('.info-container');
const exitQuiz = document.querySelector('.exit-button');
const cntinue = document.querySelector('.continue-button');
const infoContainer = document.querySelector('.questions-container');
let questionTitle = document.querySelector('.question-title');
let ul = document.querySelector('ul');
const quescounter = document.querySelector('.question-counter');
var timer = document.querySelector('#timer');
var headerTimer = document.querySelector('.header-timer');

var timeLeft = 15;
var userScore = 0
// number of the questions 
function quesCounter (index) {
    quescounter.innerHTML = `<strong>${questions[index].numb}</strong> of <strong>${questions.length}</strong> Questions`;
}
// show the questions in li tag and set attributer for eachone 
function quesHandler (numbIndex) {
    let quesindex  = numbIndex - 1
    questionTitle.innerHTML = `<span>${questions[quesindex].numb}.</span> ${questions[quesindex].question}`;
    for (let i=0; i< questions[quesindex].options.length; i++){
        var li = document.createElement('li');
        li.classList.add('li-hover')
        li.innerHTML = (questions[quesindex].answer === questions[quesindex].options[i]) ? 
        `${questions[quesindex].options[i]} <span class='check-icon'><i class="fas fa-check"></i></span>`: 
        `${questions[quesindex].options[i]} <span class='times-icon'><i class="fas fa-times"></i></span>` ;
        ul.appendChild(li);
        li.setAttribute('onclick', `ansSelect(this, ${quesindex})`)
    }
}
//  handle timer coountdown 
function startTimer() {
    const countdown = setInterval(Timer ,1000)
    function Timer() {
        timer.innerText = timeLeft
        timeLeft -- 
        if (timeLeft < 0){
            clearInterval(countdown)
            headerTimer.innerText = 'Time Off'
        }  
    }    
}
function disable_optionHandler(userSlct) {
    userSlct.style.border = 'none';
    for (let i=0; i<4; i++){
        ul.childNodes[i].style.cursor = 'default'
        ul.childNodes[i].classList.remove('li-hover')
        ul.childNodes[i].setAttribute('onclick', 'function userClick(){return null}')
    }
}
// handle the user selection 
function ansSelect(userAnswer, ansIndex) {
    // disable all options after ckicked on the option 
    disable_optionHandler(userAnswer)
    // when user click on the right answer 
   if (userAnswer.innerText === questions[ansIndex].answer){
       userScore += 1;
        const checkIcon = document.querySelector('.check-icon');
        checkIcon.style.display = 'block';
        userAnswer.style.backgroundColor = 'rgb(203, 241, 200)';
    } 
    // when click on the uncorrect answer 
    else{
        const timesIcon = document.querySelectorAll('.times-icon')
        for (let i=0; i<3; i++){
            if (timesIcon[i].previousSibling.textContent === userAnswer.textContent){
                timesIcon[i].style.display = 'block'
            }
        }
        userAnswer.style.backgroundColor = 'rgb(255, 198, 198)'
    }
}
// user click on the Start Quiz 
start.onclick = function() {
    start.style.display ='none';
    info.style.display = 'flex';
};
// user click on the Exit Quiz 
exitQuiz.onclick = function() {
    start.style.display = 'block';
    info.style.display = 'none';
};
// user click on the continue 
cntinue.onclick = function() {
    info.style.display = 'none';
    infoContainer.style.display = 'block';
    quesHandler(questions[0].numb)
    quesCounter(0);
    startTimer()
};
