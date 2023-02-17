//console.log("localStorage.user: " + JSON.stringify(localStorage.user);
if (localStorage.getItem("user") === null){ //check if localStorage is null object //from https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists
    console.log("There is no \"user\" in localStorage");
    //fetch api data
    getRandomProfile();
    //print User data into html (userObj) (function)
}
else{
    //fetch localStore user
    //print User data (localStorage)
    setUserData(JSON.parse(localStorage.getItem("user")));
//    console.log("localStorage.getItem(\"user\"): " + JSON.parse(localStorage.getItem("user")));
}

//Partially from https://stackoverflow.com/questions/67369829/fetch-random-user-api
function getRandomProfile() {
    fetch("https://randomuser.me/api/")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
//       console.log(data);
        // Access your data here
        let userObj = data;
        setUserData(getRawData(userObj));
    });
}
function getRawData(userObj){
    let newUserData = new Object();
    let data = ["cell", "email", "gender"];
    for(let d in data){
        newUserData[data[d]] = userObj.results[0][data[d]];
    }
    newUserData.dni = userObj.results[0].id.name + " " + userObj.results[0].id.value;
    newUserData.dob = userObj.results[0].dob.date;
    newUserData.age = userObj.results[0].dob.age;
    newUserData.picture = userObj.results[0].picture.large;
    newUserData.address = userObj.results[0].location.street.name + " N " + userObj.results[0].location.street.number;
    newUserData.name = userObj.results[0].name.title + ". " + userObj.results[0].name.last + ", " + userObj.results[0].name.first;
    let locationArr = ["city","state","country","postcode"];
    for(let l in locationArr){
        newUserData[locationArr[l]] = userObj.results[0].location[locationArr[l]];    
    }
    let social = ["twitter","facebook","youtube", "linkedin"];
    for(let a in social){
        newUserData[social[a]] = clipBefore(userObj.results[0].email, "@") + "@" + social[a];
        let ln = "";
        if(social[a] === "linkedin"){
            ln = "in/"
        }
        newUserData[social[a] + "_url"] = "https://www." + social[a] + ".com/" + ln + clipBefore(userObj.results[0].email, "@");
    }
    localStorage.setItem("user", JSON.stringify(newUserData));
    
//    console.log("newUserData: " + newUserData);
//    console.log("newUserData: " + JSON.stringify(newUserData));
    return newUserData; 
}
function setUserData(newUserData){
//    console.log(newUserData);
    let userArr = ["name", "profession", "cell", "email", "website", "dni", "dob", "age", "gender",
                   "picture", "address", "city", "state", "country", "postcode",
                   "facebook", "twitter", "youtube","linkedin",
                   "facebook_url", "twitter_url", "youtube_url", "linkedin_url"];
    for (let i in userArr){
//        console.log("i: " + i + " userArr[" + i + "]: " + userArr[i]);
        //failsafe: element exists?
        let elem = document.getElementById(userArr[i]);
        if(elem !== null){
//            console.log("element userArr[" + i + "]: " + userArr[i] + " exists");
            const myUrl = new RegExp('_url');
            if (userArr[i] === "picture"){ // it's a picture? => use src
//                console.log("it's a picture!");
                document.getElementById(userArr[i]).src = newUserData[userArr[i]];  
            }else if(userArr[i] === "dob"){ // it's a date? => clip only date
//                console.log("it's a date");
                document.getElementById(userArr[i]).innerHTML = clipBefore(newUserData[userArr[i]],"T");  
//                console.log("date" + clipBefore(newUserData[userArr[i]],"T"));
            }else if(myUrl.test(userArr[i])){ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
                document.getElementById(userArr[i]).href = newUserData[userArr[i]];  
//                console.log("element userArr[" + i + "]: " + myUrl.test(userArr[i]) + " test");
            }else if(userArr[i] === "email" || userArr[i] === "website"){
                let new_a = document.createElement("a");
                    if(userArr[i] === "email"){
                        new_a.href= "mailto:" + newUserData[userArr[i]];
                        new_a.innerHTML = newUserData[userArr[i]];
                    }else{
                        let website = document.getElementById("website").innerHTML;
                        new_a.href= "https://" + website.trim();
                        new_a.innerHTML = website;
                        new_a.target = "_blank"
                    }
                    new_a.className = "data"
                    new_a.style.textDecoration = "none";
                    new_a.style.cursor = "pointer";
                  document.getElementById(userArr[i]).innerHTML = "";
                  document.getElementById(userArr[i]).appendChild(new_a);
            }else if(newUserData[userArr[i]] === undefined){ //has not ramndom value? => left default value
//                console.log("value userArr[" + i + "]: " + userArr[i] + " has no value");
            }else{
                document.getElementById(userArr[i]).innerHTML = newUserData[userArr[i]];  
            }
        }
        else{
//            console.log("element userArr[" + i + "] with id: " + userArr[i] + " does not exists");
        }
    }
}
//anonymous Functions
// hide everything inside classArray...
let classArrayWork = ["left","about","education","hobby"];
let classArrayEducation = ["left","about","work","hobby"];
let classArrayDetails = ["right"];
let classArrayburger = ["burger"];
document.getElementById('work_experience').onclick = function(){
    showMeThisClass(classArrayWork, "work", "right");
}
// hide everything but education
document.getElementById('education').onclick = function (){
    showMeThisClass(classArrayEducation, "education", "right");
}
// hide everything but details
document.getElementById('details').onclick = function(){
    showMeThisClass(classArrayDetails, "left", "left");
}
// Get the modal
var modal = document.getElementById('login_form');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('sorry').style.display='none';
    }
}// refresh the page
document.getElementById('home').onclick = function (){
    window.location.reload();
}
// Refresh (clear localStorage)
document.getElementsByClassName('refresh_btn')[0].onclick = function (){
    localStorage.clear();
    window.location.reload();
}
// login -> pops up login form
document.getElementById('login').onclick = function (){
    document.getElementById('login_form').style.display='block';
}
// close modal
document.getElementsByClassName('close')[0].onclick = function (){
    document.getElementById('login_form').style.display='none';
    document.getElementById('sorry').style.display='none';
}

// burger
document.getElementById('burger_button').onclick = function (){
    showMeThisClass(classArrayburger, "menu", "menu");
}
// close menu
document.getElementById('close').onclick = function (){
    showMeThisClass(["menu"], "burger", "burger");
}
// submit form
document.getElementById('login_submit').onclick = function (){
    submit_form("submit.php");
}
// forgot pasword
document.getElementById('forgot').onclick = function (){
    submit_form("forgot.php");
}
// aux functions
function submit_form(link) {
    // is any field empty?
    let uname = document.getElementById('uname').value;
    let psw = document.getElementById('psw').value;
    if(uname == "" || psw == ""){
        document.getElementById('fill').style.display = "block";
    }
    else{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4){
          if (this.status == 200) {
           // you're logged in you can edit your resume
          }
          if (this.status >= 404) {
            document.getElementById('sorry').style.display = "block";
          }
        }
      };
      xhttp.open("POST", link, true);
      xhttp.send();
    }
}
function showMeThisClass(classArray, showClass, expandClass="right"){ // (classArray = hides classes, showClass = duh, expandClass = set width to 900px)
    for(let r in classArray){
        document.getElementsByClassName("resume_"+ classArray[r])[0].style.display = "none";
    }
    document.getElementsByClassName("resume_" + expandClass)[0].style.width = "900px";
    document.getElementsByClassName("resume_"+ showClass)[0].style.display = ""; //
    document.getElementsByClassName("resume_"+ expandClass)[0].style.display = ""; // redundant?
    if(showClass === "menu"){
        document.getElementsByClassName("resume_"+ showClass)[0].style.display = "flex"; // for some reason "style.display = "";" doesn't work on "display:none;" from external stylesheet
    }
    if(showClass === "left"){
        document.getElementsByClassName("resume_profile")[0].style.width = "350px";
        document.getElementsByClassName("resume_profile")[0].style.float = "left";
        document.getElementsByClassName("resume_content")[0].style.float = "right";
        document.getElementsByClassName("resume_content")[0].style.width = "550px";
        document.getElementsByClassName("resume_content")[0].style.padding = "12px 120px";
        document.getElementsByClassName("resume_details")[0].style.display = "block";
    }
}

function clipBefore(myText, myChar){// copy text before certain character
    //let indexChar = myText.indexOf(myChar);
    //let beforeAt = myText.slice(0, indexChar);
    //    beforeAt = beforeAt.replace(".","");
    let beforeMyChar = myText.slice(0, myText.indexOf(myChar)).replace(".","");
//        console.log(beforeMyChar);
    return beforeMyChar;
}