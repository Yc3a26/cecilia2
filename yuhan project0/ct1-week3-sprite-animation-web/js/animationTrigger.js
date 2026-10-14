const inputPlay = document.getElementById("btn-play");
const inputStop = document.getElementById("btn-stop");
const image = document.getElementById("sprite");

const inputSpeed = document.getElementById("speed");

var speedValue = inputSpeed.value/10;

inputPlay.addEventListener("click", () => {
    document.getElementById("brush").style.animationPlayState = "running";
    image.style.animation=`${4 - speedValue}s steps(7, jump-none) my-animation infinite`
});

inputStop.addEventListener("click", () => {
    image.style.animation = ""
}); 

inputSpeed.addEventListener("change", () => {
    speedValue = inputSpeed.value/10;
    if(image.style.animation != "") {
        image.style.animation =`${4 - speedValue}s steps(7, jump-none) my-animation infinite`
    }
});