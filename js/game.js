// our user object to cary  user data
var userObject ={};

// all img that could be hiden behind cards
var imgPaths=["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png","26.png",]
//array that is cary the number of imag which will be choosen from imagPaths  that will be differnt evey game
var imgsrc = [];
// to map every card with ts status as false mean card on back side true mean the pic is active  and card on front side
var imgstatus = []
// our level  will be used to decide the next page
var Levels = {
    "3":"medium.html",
    
    "6":"hard.html",
    "12" : "index.html"
}
// get all html tags as object that we needed
var PlayerName = document.getElementsByTagName("h5")[0];
var scoreLabel = document.getElementsByTagName("label")[0];
var cardsArr=document.getElementsByTagName("img");
var minut = document.getElementById("minut");
var second = document.getElementById("second");
var move = document.getElementById("moves");
var clickAudio = document.getElementById('card-audio');
var disapperAudio = document.getElementById('card-audio2');
var containe = document.getElementsByClassName('contain');


for(var i in imgPaths){
    console.log(imgPaths[i]);
    
}


// our init values
var currentimage=null;
var totalMovement=(cardsArr.length-1)/2
var moves=0;
var match=0;
var total=0;
var filbedCard=0
var time ;
var timeout=false
// start the timer for the game
startTime()
//check if the user is logged in to prevent get the page by url and user not signed
checkForLogin();
// choose some of our imgs to be stored    the num is half of the cards in the page
getRandomImg(((cardsArr.length-1)/2));

giveFuncToCards();
// test for us
console.log(totalMovement);
console.log(totalMovement.type);
// console.log(user);

console.log(Levels[String(totalMovement)]);

function checkForLogin() {
   userObject= JSON.parse(localStorage.getItem("currentUser"));
   console.log(userObject);
   
    if (userObject==null)
    {
        location.replace("login.html");

    }
    else{

        cardsArr[0].src = userObject.profile; 
        PlayerName.innerHTML= userObject.Fname + " " + userObject.Lname;
        scoreLabel.innerHTML="last Score : "+userObject.score;

          console.log(PlayerName);
          
    }
}
// get random image from images our img folders to play with it
function getRandomImg(params) {
   var loop =0
    while (loop<params)  
       {
    var rand = imgPaths[Math.floor(Math.random() * imgPaths.length)];
    if (!imgsrc.includes(rand,0))
    {
        imgsrc.push(rand);
        imgsrc.push(rand);
        imgstatus.push(false);
        imgstatus.push(false);

        loop=loop+1;   
    }
      }
      // make the selected imgs in random position
      reOrderImages();
        console.log(imgsrc)
        console.log(imgstatus);

}
// geniric function to make the image random in the cards
function reOrderImages() {
    var ctr = imgsrc.length
    var temp ;
    var index;
    while (ctr > 0) {
        // Pick a random index
                index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
                ctr--;
        // And swap the last element with it
                temp = imgsrc[ctr];
                imgsrc[ctr] = imgsrc[index];
                imgsrc[index] = temp;
            }
}
function giveFuncToCards() {
    for (let index =1 ; index < cardsArr.length; index++) {
    cardsArr[index].addEventListener("click", flibCard)
    
    cardsArr[index].id=index
    
    }
}
// show the other side of the card which call this func
function flibCard() {
    // console.log(this.id);
    clickAudio.play();
    // to make sure that user dose not make more than 2 cards on the img side
    if(filbedCard<2){

    var targetCard = this
    //check the status of card to know its position 
    if(!imgstatus[targetCard.id-1]){
    showImg(targetCard);
    // check if there is not any img on img side
    if (currentimage==null){
        currentimage=targetCard
    
    }    
    // if there is an img on its img side check it with curren filebed card
    else{
        // if there is matching remove the two cards
        if(targetCard.src ==currentimage.src ){
            match++;
            console.log(match);
            
            //  alert("done")
            setTimeout(function() {
                 disaper(targetCard);
                disaper(currentimage);
                  currentimage=null;
            } , 800);
           if(match==totalMovement)
           {
               matchedDone()
           }
           
        }
        // if there is no matching flibed the two cards 
        else{
       
            setTimeout(function() {
            backImg(targetCard);
            backImg(currentimage);
            currentimage=null;
            disapperAudio.play();
        } , 600);
            
        }
    }
   
    }
    // if the card was on its img side  befor beeing clicked then get it back to the back side
    else{
        backImg(targetCard)
        currentimage=null;
        disapperAudio.play();

    }
    
    scoreCalculation();
}}
// show the front img
function showImg(img) {
    img.src="img/"+imgsrc[img.id-1]
    imgstatus[img.id-1]=true;
    moves++;
    filbedCard++;
    console.log(moves);
    
}
// make cards on back side
function backImg(img) {
    img.src="img/back/back2.jpg";
        imgstatus[img.id-1]=false;
        filbedCard--;
        // console.log(imgstatus);
}
// for hidden effect of the card
function disaper(img) {
    img.parentElement.removeChild(img)
    filbedCard=0;
}

function matchedDone() {
   scoreCalculation();
//    var loc =Levels[totalMovement]
time=minut.innerHTML + ":"+second.innerHTML;
   saveToDataBase(total);
   if(!timeout){
        winnerPopUP(Levels[String(totalMovement)]);
   }
  //  window.location.replace(String( Levels[String(totalMovement)]));
    


}
function saveToDataBase(total) {
    localStorage.setItem("currentUser",JSON.stringify(userObject));
   var arryOfObj = JSON.parse(localStorage.getItem("users"));
    
    for (let index = 0; index < arryOfObj.length; index++)  {
        if(arryOfObj[index].id=userObject.id){
        arryOfObj[index].score=total;
        localStorage.setItem("users",JSON.stringify(arryOfObj));
    }
}
}

function startTime() {
   
    setTimeout(function(){ 
        timeout= true;
        matchedDone();
        loserPopUP();
    }, 60000);


}
function scoreCalculation() {
    total = (match*50)-(moves*5)
    // alert("your score is "+ total)
    
    
    userObject.score=total;   
    scoreLabel.innerHTML="Score : "+userObject.score;
    move.innerHTML="Moves : "+moves;
console.log(move);

}


function winnerPopUP(nextLevel){
    
        
    containe[0].classList.add('blur');
   
    var popUp = document.createElement('div');
    popUp.classList.add('winnerPop');
    var header = document.createElement('h1');
    header.textContent = "Congratulation!"
    var para = document.createElement('p');
    para.textContent = "Congratulation you're a winner";
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');
    span1.textContent = "Your score is "+userObject.score;
    span2.textContent = "You made "+moves+" moves";
    span3.textContent = "Your time is "+time+" sec";
    var next = document.createElement('button');
    next.textContent = "Next Level";
    next.classList.add('btn');
    next.classList.add('btn-outline-danger');
    next.classList.add('btn-lg');
    var menu = document.createElement('button');
    menu.textContent = "Menu";
    menu.classList.add('btn');
    menu.classList.add('btn-outline-primary');
    menu.classList.add('btn-lg');
    // locate next level
    next.addEventListener('click',function(){
        location.replace(nextLevel);
    });
    menu.addEventListener('click',function(){
        location.replace('index.html');
    });
    popUp.appendChild(header);
    popUp.appendChild(para);
    popUp.appendChild(span1);
    popUp.appendChild(span2);
    popUp.appendChild(span3);
    popUp.appendChild(menu);
    popUp.appendChild(next);
    popUp.style.top = '15%';
    popUp.style.transition  = 'all 0.5s ease-in-out';
    document.body.appendChild(popUp);
    
}
function loserPopUP(){
    containe[0].classList.add('blur');
    var popUp = document.createElement('div');
    popUp.classList.add('winnerPop');
    var header = document.createElement('h1');
    header.textContent = "Game Over!"
    var para = document.createElement('p');
    para.textContent = "Good luck in a next time";
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    span1.textContent = "Your score is "+total;
    span2.textContent = "You made "+moves+" moves";
    var again = document.createElement('button');
    again.textContent = "Try again";
    again.classList.add('btn');
    again.classList.add('btn-outline-danger');
    again.classList.add('btn-lg');
    again.addEventListener('click',function(){
        location.replace("index.html");
    });
    popUp.appendChild(header);
    popUp.appendChild(para);
    popUp.appendChild(span1);
    popUp.appendChild(span2);
    popUp.appendChild(again);
    popUp.style.top = '15%';
    document.body.appendChild(popUp);
}