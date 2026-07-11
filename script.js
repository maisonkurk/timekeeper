console.log(interact);

const number = document.getElementById("number");

let minutes = 5;

let startY = 0;

// Update number
function update(){

    number.textContent = minutes;

}

update();


// Finger touches screen
document.addEventListener("pointerdown",(e)=>{

    startY = e.clientY;

});


// Finger moves
document.addEventListener("pointermove",(e)=>{

    if(e.buttons!==1) return;

    const diff = startY - e.clientY;

    if(Math.abs(diff) > 35){

        if(diff > 0){

            minutes++;

        }else{

            minutes--;

        }

        minutes = Math.max(0,Math.min(60,minutes));

        update();

        startY = e.clientY;

    }

});

const timerTab = document.getElementById("timerTab");
const messageTab = document.getElementById("messageTab");

const timerScreen = document.getElementById("timerScreen");
const messageScreen = document.getElementById("messageScreen");

timerTab.onclick = ()=>{

    timerScreen.style.display="flex";
    messageScreen.style.display="none";

    timerTab.classList.add("active");
    messageTab.classList.remove("active");

}

messageTab.onclick = ()=>{

    timerScreen.style.display="none";
    messageScreen.style.display="flex";

    messageTab.classList.add("active");
    timerTab.classList.remove("active");

}