var numberOfDrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        playSound(this.innerHTML);
        animate(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event) {
    playSound(event.key);
    animate(event.key);
});

function playSound(key) {
    switch (key) {
        case "w":
                var audio = new Audio("./sounds/crash.mp3");
                audio.play();
                break;
            case "a":
                var audio = new Audio("./sounds/kick-bass.mp3");
                audio.play();
                break;
            case "s":
                var audio = new Audio("./sounds/snare.mp3");
                audio.play();
                break;
            case "d":
                var audio = new Audio("./sounds/tom-1.mp3");
                audio.play();
                break;
            case "j":
                var audio = new Audio("./sounds/tom-2.mp3");
                audio.play();
                break;
            case "k":
                var audio = new Audio("./sounds/tom-3.mp3");
                audio.play();
                break;
            case "l":
                var audio = new Audio("./sounds/tom-4.mp3");
                audio.play();
                break;
            default:
                console.log(this.innerHTML);
                break;
    }
}

function animate(key) {
    var drum = document.querySelector("." + key);
    drum.classList.add("pressed");
    setTimeout(function() {
        drum.classList.remove("pressed");
    }, 200);    
}

