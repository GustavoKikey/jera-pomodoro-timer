const timer = {
  pomodoroTime: 1,
  breakTime: 2,
  teste: 10,
};

var pomodoroDone = new Audio("pomodoro.wav");
var breakDone = new Audio("break.wav");
let interval;
let sessionsDone = 0;
let sessionsBreak = 0;

document.addEventListener("DOMContentLoaded", () => {
  resetMode("pomodoroTime");
  Notification.requestPermission();
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

function notify(mode) {
  if (mode == "pomodoroTime") {
    text = "Pomodoro Done!";
  } else {
    text = "Break Done!";
  }
  const notification = new Notification(text, {
    body: "O timer acabou!",
  });
}

function startTimer() {
  interval = setInterval(updateClock, 1000);
}

function resetMode(mode) {
  clearInterval(interval);
  timer.mode = mode;
  timer.timeRemaining = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };
  drawClock();
}

function updateClock() {
  if (timer.timeRemaining.total === 0) {
    endClock();
  } else if (timer.timeRemaining.seconds === 0) {
    timer.timeRemaining.minutes--;
    timer.timeRemaining.seconds = 59;
  } else {
    timer.timeRemaining.seconds--;
  }
  timer.timeRemaining.total--;
  drawClock();
}

function endClock() {
  if (timer.mode === "pomodoroTime") {
    clearInterval(interval);
    startStopButton.innerHTML = "Start";
    resetMode(timer.mode);
    notify(timer.mode);
    pomodoroDone.play();
    sessionsDone++;
    sessionsBreak++;
    updateSessions();
  } else {
    clearInterval(interval);
    startStopButton.innerHTML = "Start";
    resetMode(timer.mode);
    notify(timer.mode);
    breakDone.play();
  }
}

function drawClock() {
  let minutes = `${timer.timeRemaining.minutes}`.padStart(2, "0");
  let seconds = `${timer.timeRemaining.seconds}`.padStart(2, "0");

  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;
}

function updateSessions() {
  document.getElementById("sessions").innerHTML = sessionsDone;
  if (sessionsBreak === 4) {
    const notification = new Notification("Você já fez 4 sessões!", {
      body: "Que tal fazer um descanso?",
    });
    sessionsBreak = 0;
  }
}
