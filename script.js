const number = document.getElementById("number");
const start = document.getElementById("start");

let minutes = 5;

let startY = 0;

let timer;

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

        minutes = Math.max(1,Math.min(60,minutes));

        update();

        startY = e.clientY;

    }

});


// Start countdown
start.onclick=()=>{

    clearInterval(timer);

    let remaining = minutes;

    number.textContent = remaining;

    timer = setInterval(()=>{

        remaining--;

        number.animate([
            {
                transform:"scale(1.15)"
            },
            {
                transform:"scale(1)"
            }
        ],{
            duration:180
        });

        number.textContent = remaining;

        if(remaining<=0){

            clearInterval(timer);

            number.textContent="0";

            alert("Time's Up!");

        }

    },1000); // Change to 60000 later
};