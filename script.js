// ====================================
// ELEMENTS
// ====================================

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

// ====================================
// VARIABLES
// ====================================

let timerValue = 5;
let unit = "minutes";
let startY = 0;

// ====================================
// TIMER
// ====================================

function update(){

    number.textContent = Math.abs(timerValue);

    if(timerValue >= 0){

        number.style.color = "#121212";
        label.style.color = "#121212";

        if(unit === "minutes"){

            label.textContent = "MINUTES ↻";

        }else{

            label.textContent = "SECONDS ↻";

        }

    }else{

        number.style.color = "#d62828";
        label.style.color = "#d62828";

        if(unit === "minutes"){

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

        timerValue += diff > 0 ? 1 : -1;

   if(unit === "minutes"){

    timerValue = Math.min(60, timerValue);

}else{

    timerValue = Math.min(59, timerValue);

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

    if(unit === "minutes"){
        unit = "seconds";

        if(Math.abs(timerValue) > 59){

            timerValue = timerValue >= 0 ? 59 : -59;

        }

    }else{

        unit = "minutes";

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

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

        fullscreenBtn.textContent = "Exit Fullscreen";

    } else {

        document.exitFullscreen();

        fullscreenBtn.textContent = "Fullscreen";

    }

});

document.addEventListener("fullscreenchange", () => {

    if (document.fullscreenElement) {

        fullscreenBtn.textContent = "Exit Fullscreen";

    } else {

        fullscreenBtn.textContent = "Fullscreen";

    }

});