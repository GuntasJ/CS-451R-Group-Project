//applications

//video
var source = "RPReplay_Final1697402842.mov"
var audio = document.createElement("audio"); audio.src = source;

$("#playBtn").click(function () {
    audio.play();
});

$("#pauseBtn").click(function () {
    audio.pause();
});

$("#stopBtn").click(function () {
    audio.pause();
    audio.currentTime = 0;
});