const timer = {
  pomodoroTime: 2,
  breakTime: 1,
  teste: 10,
};

let interval;

document.addEventListener("DOMContentLoaded", () => {
  resetMode("pomodoroTime");
});

const pomodorobutton = document.getElementById("pomodoro-btn");
pomodorobutton.addEventListener("click", () => {
  resetMode("pomodoroTime");
});

const shortbreakbutton = document.getElementById("break-btn");
shortbreakbutton.addEventListener("click", () => {
  resetMode("breakTime");
});

const startStopButton = document.getElementById("startstop-btn");
startStopButton.addEventListener("click", () => {
  if (startStopButton.innerHTML === "Start") {
    startStopButton.innerHTML = "Stop";
    startTimer();
  } else {
    startStopButton.innerHTML = "Start";
    clearInterval(interval);
  }
});

function startTimer() {
  interval = setInterval(updateClock, 1000);
}

function resetMode(mode) {
  clearInterval(interval);
  timer.timeRemaining = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };
  drawClock();
}

function updateClock() {
  if (timer.timeRemaining.total === 0) {
    clearInterval(interval);
  } else if (timer.timeRemaining.seconds === 0) {
    timer.timeRemaining.minutes--;
    timer.timeRemaining.seconds = 59;
  } else {
    timer.timeRemaining.seconds--;
  }
  timer.timeRemaining.total--;
  drawClock();
}

function drawClock() {
  let minutes = `${timer.timeRemaining.minutes}`.padStart(2, "0");
  let seconds = `${timer.timeRemaining.seconds}`.padStart(2, "0");

  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;
}
