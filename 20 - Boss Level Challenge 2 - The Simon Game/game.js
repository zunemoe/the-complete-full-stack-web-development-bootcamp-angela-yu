var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

$("button").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
});

$("button").click(function() {
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
});


