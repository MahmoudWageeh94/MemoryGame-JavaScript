  // obj of login btn
var login = document.getElementById("loginBtn");
// list if all obj in form without seelec
var textArray = document.getElementsByTagName("input");
var containe = document.getElementsByClassName('contain');


login.addEventListener("click", general);
var arryOfObj = [];


// boolean to decid with one is not modified by user
var radioo=true;
var selecto=true;

GetLocalData();
function general() {
    event.preventDefault();
    if(arryOfObj==null){
        containe[0].classList.add('blur');
        var popUp = document.createElement('div');
        popUp.classList.add('userPop');
        var header = document.createElement('h1');
        header.textContent = "opps!"
        var para = document.createElement('p');
        para.textContent = "This user Name is not exist ";
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
else{
var user = textArray[0].value;
var password = textArray[1].value;
var notFound = true;

for (const oneUser of arryOfObj) {
    if(oneUser.password==password&&oneUser.user==user){
        notFound=false;
        localStorage.setItem("currentUser",JSON.stringify(oneUser));
    }
}
if(notFound)
{
        containe[0].classList.add('blur');
        var popUp = document.createElement('div');
        popUp.classList.add('userPop');
        var header = document.createElement('h1');
        header.textContent = "opps!"
        var para = document.createElement('p');
        para.textContent = "This user Name is not exist ";
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
else{
  
    location.replace("index.html");
}
}
}


function GetLocalData() {
    arryOfObj = JSON.parse(localStorage.getItem("users"));
   // console.log(arryOfObj);
    //console.log( JSON.parse(localStorage.getItem("currentUser")));
}

var rowObject = function(){
    this.id;
    this.Fname;
    this.Lname
    this.password;
    this.user;
    
}