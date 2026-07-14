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

// ====================================
// VARIABLES
// ====================================

let minutes = 5;
let startY = 0;

// ====================================
// TIMER
// ====================================

function update(){

    if(minutes >= 0){

        number.textContent = minutes;
        label.textContent = "MINUTES";

        number.style.color = "#121212";
        label.style.color = "#121212";

    }else{

        number.textContent = Math.abs(minutes);
        label.textContent = "MINUTES OVERTIME";

        number.style.color = "#d62828";
        label.style.color = "#d62828";

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

        minutes += diff > 0 ? 1 : -1;

        // Optional upper limit
        minutes = Math.min(60, minutes);

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
// MESSAGE
// ====================================

messageInput.addEventListener("input", () => {

    if (messageInput.value.trim() === "") {

        messageText.textContent = "Still WIP, do not use";

    } else {

        messageText.textContent = messageInput.value;

    }

});