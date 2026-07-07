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

let typed = "";

document.addEventListener("keydown", (e)=> {

    typed += e.key.toLowerCase();

    typed = typed.slice(-20);

    if(typed.includes("karafi")){

        const img = document.getElementById("easterEgg");

        img.style.display = "block";

        setTimeout(() => {
            img.style.display = "none";
        }, 200);

        typed = "";

    }

});