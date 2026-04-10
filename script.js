// add javascript here
let name1 = window.prompt("Enter First Name").trim();
let first1 = name1.charAt(0).toUpperCase();
let first2 = name1.slice(1).toLowerCase();
let nameFinal = first1 + first2;
let range;
let guess = 0;
let answer = 0;
let guessCount = 0;
const scores = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play(){
    range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }    
    document.getElementById("msg").textContent = "Guess a number 1-" + range + " " + nameFinal;
    answer = Math.floor(Math.random()*range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
    startTimer();
}

let startTime;
const times = [];
function startTimer(){
    startTime = Number(new Date().getTime());
}
function endTimer(){
    let endTime = Number(new Date().getTime());
    let elapsed = Number((endTime - startTime)/1000).toFixed(3);
    let timeSum = 0;
    times.push(elapsed);
    for (let i=0;i<times.length;i++){
        timeSum += Number(times[i]);
    }
    let average = Number(timeSum/times.length).toFixed(3);
    avgTime.textContent = "Average Time: " + average;
    times.sort(function(a,b){return a-b;});
    fastest.textContent = "Fastest Game: " + times[0];
}



function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number " + nameFinal;
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took " + guessCount + " tries " + nameFinal;
        updateScore(guessCount);
        resetGame();
    }
    else if (guess < answer){
        msg.textContent = "Too low, try again. " + nameFinal;
    }
    else{
        msg.textContent = "Too high, try again. " + nameFinal;
    }
    if (Math.abs(guess - answer) <= 2){
        msg.textContent += "Your guess: hot";
    }
    else if (Math.abs(guess - answer) <= 5){
        msg.textContent += "Your guess: warm";
    }
    else {
        msg.textContent += "Your guess: cold";
    }
}
 
function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for(let i =0; i < scores.length; i++){
        sum+= scores[i]; // sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;}); //sorts scores by increasing

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores [i];
        }
    }
}

function resetGame(){
    msg.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.checked = true;
    h.checked = false;
    m.checked = false;
    e.disabled = false;
    h.disabled = false;
    m.disabled = false;
    endTimer();
}

function giveUp(){
    resetGame();
    updateScore(range);
    endTimer();
}

let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthA = Number(new Date().getMonth());
monthA = month[monthA];
let day = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
let dayA = Number(new Date().getDate());
dayA = day[dayA - 1];
date.textContent = monthA + " " + dayA + ", " + new Date().getFullYear() + ". ";
setInterval(() => {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let seconds = new Date().getSeconds()
    let livetime;
    if (minutes < 10 && seconds < 10) {
        livetime = "Current time: " + hours + ":0" + minutes + ":0" + seconds;
    }
    else if (minutes < 10){
        livetime = "Current time: " + hours + ":0" + minutes + ":" + seconds;
    }
    else if (seconds < 10){
        livetime = "Current time: " + hours + ":" + minutes + ":0" + seconds;
    }
    else {
        livetime = "Current time: " + hours + ":" + minutes + ":" + seconds;
    }
    date.textContent = monthA + " " + dayA + ", " + new Date().getFullYear() + ". " + livetime;
}, 1000);
