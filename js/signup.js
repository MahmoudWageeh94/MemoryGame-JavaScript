  // obj of submit btn
var sub = document.getElementById("saveForm");
// list if all obj in form without seelec
var inputs = document.getElementsByTagName("input");
var containe = document.getElementsByClassName('contain');


//obj div to post data in it
sub.addEventListener("click", submit);
var arryOfObj = [];

// boolean to decid with one is not modified by user
var radioo=true;
var selecto=true;
// array to carry message for Validation
var message = [] ;
// get all users in our database
GetLocalData();
function submit() {  
message=[];    
    event.preventDefault();

    // loop on all inputs to validate it
   for (const a of inputs) {

     if(a.type=="text"||a.type=="password"){
         // if there is no data
        if (a.value=="") {

            if (a.id=="fNmae") {
                inputs[0].style.borderColor = 'red';
                inputs[0].style.borderWidth = '3px';
                
                inputs[0].placeholder = 'Please enter your First name';
                message.push(" 1");
            }
            
            if (a.id=="lNmae") {
                
                inputs[1].style.borderColor = 'red';
                inputs[1].style.borderWidth = '3px';
                inputs[1].placeholder = 'Please enter your last name';
                message.push(" 2");
            }
           
            if (a.id=="uNmae") {
            
                inputs[2].style.borderColor = 'red';
                inputs[2].style.borderWidth = '3px';
                inputs[2].placeholder = 'Please enter your username';
                message.push(" 3");
            }
            if (a.id=="Password") {
                inputs[3].style.borderColor = 'red';
                inputs[3].style.borderWidth = '3px';
                inputs[3].placeholder = 'Please enter your password';
                message.push(" 4");
            }
            
        }
        else{
            if (a.id=="Password") {
            
            if(a.value.length<8)
                {
                    inputs[3].style.borderColor = 'red';
                    inputs[3].style.borderWidth = '3px';
                    inputs[3].value="";
                    inputs[3].placeholder = 'The password can not be less than 8 character';
                    message.push(" 4");
        
                }

            }
            if (a.id=="uNmae") {
                // chek if user name is less than 6 ch or start with num
            if(!nameIsValid(a.value)){ 
                inputs[2].style.borderColor = 'red';
                inputs[2].style.borderWidth = '3px';
                inputs[2].value="";
                inputs[2].placeholder = ' Please insert at least 6 character in username and dose not start with num';
                message.push("3")
            }
                else{
                    // check if the user already exit to not save two wtih same user name
                    if (checkIfUserExist(a.value)) {  
                        containe[0].classList.add('blur');
                        var popUp = document.createElement('div');
                        popUp.classList.add('userPop');
                        var header = document.createElement('h1');
                        header.textContent = "opps!"
                        var para = document.createElement('p');
                        para.textContent = "This user Name is already exist";
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
                        message.push("5");
                    }
                }
            }

        }  
     }
     
     if(a.type=="radio"){
    
         
        if(a.checked)
        {
            radioo=false;
        }
    }
   
   }
   if (radioo)
    {
        message.push("5");
        var radioValidation =  document.getElementById('radioValid');
        radioValidation.innerHTML = "please select your character";
        radioValidation.style.color = 'red';
    }
  console.log(message);


if (!(message.length>0))
{

    saveData();
}
 
}







function GetLocalData() {
    arryOfObj = JSON.parse(localStorage.getItem("users"));
    console.log(arryOfObj);
    console.log(arryOfObj==null);
    
    
    
}
function checkIfUserExist(checkedname) {
    var flag=false
    if(arryOfObj!=null){
    for (const chUser of arryOfObj) {
        if(chUser.user==checkedname){
            flag =true
        }
        
    }
}
        return flag ;
    }

    // save data to database
function saveData() {
    var NewObj =new rowObject();
    NewObj.Fname= inputs[0].value;
    NewObj.Lname= inputs[1].value;
    NewObj.user= inputs[2].value;   
    NewObj.password= inputs[3].value;
    for (const a of inputs) {
    if(a.type=="radio"){
        //  console.log(a.type);
          
         if(a.checked)
         {
            NewObj.profile=a.value;
         }
     }
    }
    // NewObj.profile=profile.value;   
    // if there is no data in database then id =1
    // else get id = last id +1
    if (arryOfObj==null){
        arryOfObj = [];
        NewObj.id = 1;
    }
    else{
        NewObj.id=arryOfObj[arryOfObj.length-1].id+1
    }
    arryOfObj.push(NewObj)
    localStorage.setItem("users",JSON.stringify(arryOfObj));
    localStorage.setItem("currentUser",JSON.stringify(NewObj));
    inputs[0].value = "";
    inputs[1].value ="";
    inputs[2].value ="";
    inputs[2].value ="";
    location.replace('index.html');
}

//our user obect 
var rowObject = function(){
    this.id;
    this.Fname;
    this.Lname;
    this.password;
    this.user;
    this.score = 0;
    this.profile; 
}
 // func to validate if the name is not start with num or less that 6 ch
function nameIsValid (name) {
    return /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(name)
  }