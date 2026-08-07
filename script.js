// ====================================
// ELEMENTS
// ====================================

const countdownDisplay =
document.getElementById("countdownDisplay");

const manualMode =
document.getElementById("manualMode");

const countdownMode =
document.getElementById("countdownMode");

const manualModeBtn =
document.getElementById("manualModeBtn");

const countdownModeBtn =
document.getElementById("countdownModeBtn");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const number = document.getElementById("number");
const label = document.getElementById("label");

const timerTab = document.getElementById("timerTab");
const messageTab = document.getElementById("messageTab");

const timerScreen = document.getElementById("timerScreen");
const messageScreen = document.getElementById("messageScreen");

const messageInput = document.getElementById("messageInput");
const messageText = document.getElementById("messageText");

const personalTab = document.getElementById("personalTab");
const personalScreen = document.getElementById("personalScreen");

const fullscreenBtn = document.getElementById("fullscreenBtn");
const fullscreenIcon = document.getElementById("fullscreenIcon");

// ====================================
// TIMER STATE
// ====================================

const timer = {

    mode: "manual",

    unit: "minutes",

    hours: 0,
    minutes: 5,
    seconds: 0,

    remaining: 0,

    running: false,

    interval: null

};

// ====================================
// HELPER FUNCTIONS
// ====================================

function getTotalSeconds(){

    return (

        timer.hours * 3600 +

        timer.minutes * 60 +

        timer.seconds

    );

}

function loadCountdown(){

    timer.remaining = getTotalSeconds();

}

function updateCountdown(){

    const overtime = timer.remaining < 0;

    const total = Math.abs(timer.remaining);

    const hours = Math.floor(total / 3600);

    const minutes = Math.floor((total % 3600) / 60);

    const seconds = total % 60;

    countdownDisplay.textContent =

        `${overtime ? "-" : ""}` +

        `${String(hours).padStart(2,"0")}:` +

        `${String(minutes).padStart(2,"0")}:` +

        `${String(seconds).padStart(2,"0")}`;

    if(timer.remaining > 10){

        countdownDisplay.style.color = "#121212";

    }else if(timer.remaining >= 0){

        countdownDisplay.style.color = "#ffb703";

    }else{

        countdownDisplay.style.color = "#d62828";

    }

    if(timer.remaining === 0){

        countdownDisplay.classList.add("pulse");

        setTimeout(() => {

            countdownDisplay.classList.remove("pulse");

        },400);

    }

}

function showMode(mode){

    if(timer.running) return;

    timer.mode = mode;

    if(mode === "manual"){

        manualMode.style.display = "flex";
        countdownMode.style.display = "none";

        manualModeBtn.classList.add("active");
        countdownModeBtn.classList.remove("active");

}else{

    loadCountdown();

    updateCountdown();

    manualMode.style.display = "none";
    countdownMode.style.display = "flex";

    manualModeBtn.classList.remove("active");
    countdownModeBtn.classList.add("active");

}

}


// ====================================
// GESTURES
// ====================================


let startY = 0;

// ====================================
// TIMER
// ====================================

function update(){

let currentValue;

if (timer.unit === "hours"){

    currentValue = timer.hours;

}else if(timer.unit === "minutes"){

    currentValue = timer.minutes;

}else{

    currentValue = timer.seconds;

}

number.textContent = Math.abs(currentValue);

if(currentValue >= 0){

        number.style.color = "#121212";
        label.style.color = "#121212";

switch (timer.unit) {

    case "hours":
        label.textContent = "HOURS ↻";
        break;

    case "minutes":
        label.textContent = "MINUTES ↻";
        break;

    case "seconds":
        label.textContent = "SECONDS ↻";
        break;

}

    }else{

        number.style.color = "#d62828";
        label.style.color = "#d62828";

if(timer.unit === "hours"){

    label.textContent = "HOURS OVERTIME ↻";

}else if(timer.unit === "minutes"){

    label.textContent = "MINUTES OVERTIME ↻";

}else{

    label.textContent = "SECONDS OVERTIME ↻";

}

    }

}

update();

timerScreen.addEventListener("pointerdown",(e)=>{

    startY = e.clientY;

});

timerScreen.addEventListener("pointermove",(e)=>{

    if(e.pointerType==="mouse" && e.buttons!==1) return;

    if(timer.running) return;

    const diff = startY - e.clientY;

    if(Math.abs(diff)>35){

        const change = diff > 0 ? 1 : -1;

if(timer.unit === "hours"){

    timer.hours += change;

}else if(timer.unit === "minutes"){

    timer.minutes += change;

}else{

    timer.seconds += change;

}

if(timer.unit === "hours"){

    timer.hours = Math.min(24, timer.hours);

}else if(timer.unit === "minutes"){

    timer.minutes = Math.min(59, timer.minutes);

}else{

    timer.seconds = Math.min(59, timer.seconds);

}

        update();

        startY = e.clientY;

    }

});

// ====================================
// TABS
// ====================================

timerTab.onclick = () => {

    timerScreen.style.display = "flex";
    messageScreen.style.display = "none";
    personalScreen.style.display = "none";

    timerTab.classList.add("active");
    messageTab.classList.remove("active");
    personalTab.classList.remove("active");

};

messageTab.onclick = () => {

    timerScreen.style.display = "none";
    messageScreen.style.display = "flex";
    personalScreen.style.display = "none";

    timerTab.classList.remove("active");
    messageTab.classList.add("active");
    personalTab.classList.remove("active");

};

personalTab.onclick = () => {

    timerScreen.style.display = "none";
    messageScreen.style.display = "none";
    personalScreen.style.display = "flex";

    timerTab.classList.remove("active");
    messageTab.classList.remove("active");
    personalTab.classList.add("active");

};

// ====================================
// UNIT TOGGLE
// ====================================

label.addEventListener("click", () => {

    if(timer.running) return;

    if(navigator.vibrate){

        navigator.vibrate(10);

    }

if(timer.unit === "hours"){

    timer.unit = "minutes";

}else if(timer.unit === "minutes"){

    timer.unit = "seconds";

}else{

    timer.unit = "hours";

}

update();

});

// ====================================
// MESSAGE
// ====================================

messageInput.addEventListener("input", () => {

    if (messageInput.value.trim() === "") {

        messageText.textContent = "Enter Text Above";

    } else {

        messageText.textContent = messageInput.value;

    }

});

// ====================================
// FULLSCREEN
// ====================================

fullscreenBtn.addEventListener("click", async () => {

    if (!document.fullscreenElement){

        await document.documentElement.requestFullscreen();

    }else{

        await document.exitFullscreen();

    }

});

document.addEventListener("fullscreenchange", () => {

    if(document.fullscreenElement){

        fullscreenIcon.src = "images/fullscreen_exit.png";

    }else{

        fullscreenIcon.src = "images/fullscreen.png";

    }

});

manualModeBtn.onclick = () => {

    showMode("manual");

};

countdownModeBtn.onclick = () => {

    showMode("countdown");

};

startBtn.onclick = () => {

    if(timer.running) return;

    timer.running = true;

    timer.interval = setInterval(() => {

        timer.remaining--;

        updateCountdown();

    },1000);

};

pauseBtn.onclick = () => {

    clearInterval(timer.interval);

    timer.running = false;

};

resetBtn.onclick = () => {

    clearInterval(timer.interval);

    timer.running = false;

    loadCountdown();

    updateCountdown();

};