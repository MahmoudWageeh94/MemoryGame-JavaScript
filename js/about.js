var userObject ={};


//get the tag of player name 
var PlayerName = document.getElementsByTagName("h5")[0];
// get all label to store score and moves
var labels = document.getElementsByTagName("label")[0];
// locate our img of our charater
var cardsArr=document.getElementsByTagName("img");



checkForLogin();
// console.log(user);

// check if there is already login user r not  if no then go to login
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
        labels.innerHTML="last Score : "+userObject.score;

          console.log(PlayerName);
          
    }
}