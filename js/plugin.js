var minuts = document.getElementById('minut');
var seconds = document.getElementById('second');
var info = document.getElementById('helpBox');

var totalSeconds = 0;
var clicked = false;
setInterval(setTime,1000);
function setTime() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minuts.innerHTML = pad(parseInt(totalSeconds / 60));
  }
  
  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
// play audio function
function play(id){
    var audio = document.getElementById(id);
    audio.play();
 }
 function playAudio(id) {
    var playIcon = document.getElementById(id);
    var audio = document.getElementById('back-audio');
    if (audio.paused) {
        audio.play();
        playIcon.classList.add("fa-volume-up");
        playIcon.classList.remove("fa-volume-mute");
    }else{
        audio.pause();
        audio.currentTime = 0
        playIcon.classList.add("fa-volume-mute");
        playIcon.classList.remove("fa-volume-up");
    }
}
//Showing game information function
function helpInfo(){
  if(!clicked){
    info.style.display = 'block';
    clicked = true;
  }else{
    info.style.display = 'none';
    clicked = false;
  }
  
}