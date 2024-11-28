const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');

let seconds = 0;
let tens = 0;
let interval;

buttonStart.onclick = function() {
    interval = setInterval(startTimer ,10); 
}

buttonStop.onclick = function() {
    clearInterval(interval);
}

buttonReset.onclick = function() {
    clearInterval(interval);
    seconds = 0;
    tens = 0;
    appendTens.innerText = 0;
    appendSeconds.innerText = 0;
}

function startTimer() {
    tens++;

    if(tens>99){
        //seconds 1 올리기
        seconds++;

        //appendSeconds에도 반영하기
        appendSeconds.innerText = seconds;

        // tens, appendsTens 는 0으로 만들어주면 됨
        tens = 0;
        appendTens.innerText = 0;
    }
    else {
        appendTens.innerText = tens
    }
}