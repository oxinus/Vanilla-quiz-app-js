const start = document.querySelector('.start-quiz');
const info = document.querySelector('.info-container');
const exitQuiz = document.querySelector('.exit-button');
const cntinue = document.querySelector('.continue-button');
const infoContainer = document.querySelector('.questions-container');
let questionTitle = document.querySelector('.question-title');
let ul = document.querySelector('ul');
const quescounter = document.querySelector('.question-counter');
var timer = document.querySelector('#timer');

let counter = 15;
var li;

function quesCounter (index) {
    quescounter.innerHTML = `<strong>${questions[index].numb}</strong> of <strong>${questions.length}</strong> Questions`;
}
function quesHandler (index) {
    questionTitle.innerHTML = `<span>${questions[index-1].numb}.</span> ${questions[index-1].question}`;
    for (var i=0; i< questions[index-1].options.length; i++){
        li = document.createElement('li');
        li.innerHTML = (questions[index-1].answer === questions[index-1].options[i]) ? 
        `${questions[index-1].options[i]} <span class='check-icon'><i class="fas fa-check"></i></span>`: 
        `${questions[index-1].options[i]} <span class='times-icon'><i class="fas fa-times"></i></span>` ;
        ul.appendChild(li);
        li.setAttribute('onclick', 'ansSelect(this, 0)')
    }
}
function ansSelect(userAnswer, ansIndex) {
   if (userAnswer.innerText === questions[ansIndex].answer){
        
    }
}

start.onclick = function() {
    start.style.display ='none';
    info.style.display = 'flex';
};
exitQuiz.onclick = function() {
    start.style.display = 'block';
    info.style.display = 'none';
};
cntinue.onclick = function() {
    info.style.display = 'none';
    infoContainer.style.display = 'block';
    quesHandler(questions[0].numb)
    quesCounter(0);
};