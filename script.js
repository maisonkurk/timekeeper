// ====================================
// ELEMENTS
// ====================================

const manualMode =
document.getElementById("manualMode");

const countdownMode =
document.getElementById("countdownMode");

const manualModeBtn =
document.getElementById("manualModeBtn");

const countdownModeBtn =
document.getElementById("countdownModeBtn");

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

    running: false,

    interval: null

};

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

    timer.mode = "manual";

    manualMode.style.display = "flex";
    countdownMode.style.display = "none";

    manualModeBtn.classList.add("active");
    countdownModeBtn.classList.remove("active");

};

countdownModeBtn.onclick = () => {

    timer.mode = "countdown";

    manualMode.style.display = "none";
    countdownMode.style.display = "flex";

    manualModeBtn.classList.remove("active");
    countdownModeBtn.classList.add("active");

};