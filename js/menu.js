var userObject ={};

checkForLogin();

var AvatarImage = document.getElementById("avatar");
var PlayerName = document.getElementById("PlayerName");
var selectLevel=document.getElementsByTagName("select")[0];
var labels = document.getElementsByTagName("label")[0];
var btns = document.getElementsByTagName("button");
var containe = document.getElementsByClassName('contain');
console.log(btns);
btns[1].addEventListener("click", logOut);
btns[0].addEventListener("click", start);
labels.innerHTML="Score : "+userObject.score;

AvatarImage.src = userObject.profile;
PlayerName.innerHTML= userObject.Fname + " " + userObject.Lname;
  
function checkForLogin() {
   userObject= JSON.parse(localStorage.getItem("currentUser"));
   console.log(userObject);
   
    if (userObject==null)
    {
        location.replace("login.html");

    }
}
function logOut() {
    localStorage.setItem("currentUser",null);
    location.replace("login.html");

}
function start() {
    if(selectLevel.value!="LEVELS"){
     location.replace(selectLevel.value);
    // console.log(selectLevel.value);
    }
    else{
        containe[0].classList.add('blur');
        var popUp = document.createElement('div');
        popUp.classList.add('userPop');
        var header = document.createElement('h1');
        header.textContent = "opps!"
        var para = document.createElement('p');
        para.textContent = "please choose the level first";
        var button = document.createElement('button');
        button.textContent = "Ok";
        button.classList.add('btn');
        button.classList.add('btn-outline-danger');
        button.classList.add('btn-lg');
        // locate next level
        button.addEventListener('click',function(){
            document.body.removeChild(popUp);
            containe[0].classList.remove('blur');
        });
        popUp.appendChild(header);
        popUp.appendChild(para);
        popUp.appendChild(button);
        popUp.style.top = '15%';
        document.body.appendChild(popUp);

    }

}