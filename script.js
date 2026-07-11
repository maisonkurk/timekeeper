// ====================================
// ELEMENTS
// ====================================

const number = document.getElementById("number");
const label = document.getElementById("label");

const timerTab = document.getElementById("timerTab");
const messageTab = document.getElementById("messageTab");

const timerScreen = document.getElementById("timerScreen");
const messageScreen = document.getElementById("messageScreen");

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");

const personalTab = document.getElementById("personalTab");
const personalScreen = document.getElementById("personalScreen");

// ====================================
// VARIABLES
// ====================================

let minutes = 5;
let startY = 0;

let x = 0;
let y = 0;

let selected = false;

// ====================================
// TIMER
// ====================================

function update(){

    number.textContent = minutes;

}

update();

timerScreen.addEventListener("pointerdown",(e)=>{

    startY = e.clientY;

});

timerScreen.addEventListener("pointermove",(e)=>{

    if(e.pointerType==="mouse" && e.buttons!==1) return;

    const diff = startY - e.clientY;

    if(Math.abs(diff)>35){

        minutes += diff>0 ? 1 : -1;

        minutes = Math.max(0,Math.min(60,minutes));

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

messageBox.addEventListener("click", () => {

    selected = !selected;

    messageBox.classList.toggle("selected");

});

// ====================================
// DRAGGING
// ====================================

interact("#messageBox").draggable({

    listeners: {

        move(event) {

            if (!selected) return;

            x += event.dx;
            y += event.dy;

            event.target.style.transform =
                `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

        }

    }

});