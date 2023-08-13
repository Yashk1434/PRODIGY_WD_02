const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime, intervalId, elapsedTime = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    return date.toISOString().substr(11, 8) + '.' + String(time).slice(-3);
}

startButton.addEventListener('click', startTimer);

pauseButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    isRunning = false;
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});

// Initialize the display
display.textContent = formatTime(elapsedTime);

