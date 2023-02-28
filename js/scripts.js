//console.log("localStorage.user: " + JSON.stringify(localStorage.user);
window.onload = function (event) {
    if (localStorage.getItem("user") === null) { //check if localStorage is null object //from https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists
        // console.log("There is no \"user\" in localStorage");
        //fetch api data
        getRandomProfile();
        //print User data into html (userObj) (function)
    }
    else {
        //fetch localStore user
        //print User data (localStorage)
        setUserData(JSON.parse(localStorage.getItem("user")));
        //    console.log("localStorage.getItem(\"user\"): " + JSON.parse(localStorage.getItem("user")));
    }
    window.location.reload();
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
function getRawData(userObj) {
    let newUserData = new Object();
    let data = ["cell", "email", "gender"];
    for (let d in data) {
        newUserData[data[d]] = userObj.results[0][data[d]];
    }
    newUserData.dni = userObj.results[0].id.name + " " + userObj.results[0].id.value;
    newUserData.dob = userObj.results[0].dob.date;
    newUserData.age = userObj.results[0].dob.age;
    newUserData.picture = userObj.results[0].picture.large;
    newUserData.address = userObj.results[0].location.street.name + " N " + userObj.results[0].location.street.number;
    newUserData.name = userObj.results[0].name.title + ". " + userObj.results[0].name.last + ", " + userObj.results[0].name.first;
    let locationArr = ["city", "state", "country", "postcode"];
    for (let l in locationArr) {
        newUserData[locationArr[l]] = userObj.results[0].location[locationArr[l]];
    }
    let social = ["twitter", "facebook", "youtube", "linkedin"];
    for (let a in social) {
        newUserData[social[a]] = clipBefore(userObj.results[0].email, "@") + "@" + social[a];
        let ln = "";
        if (social[a] === "linkedin") {
            ln = "in/"
        }
        newUserData[social[a] + "_url"] = "https://www." + social[a] + ".com/" + ln + clipBefore(userObj.results[0].email, "@");
    }
    localStorage.setItem("user", JSON.stringify(newUserData));

    //    console.log("newUserData: " + newUserData);
    //    console.log("newUserData: " + JSON.stringify(newUserData));
    return newUserData;
}
function setUserData(newUserData) {
    //    console.log(newUserData);
    let userArr = ["name", "profession", "cell", "email", "website", "dni", "dob", "age", "gender",
        "picture", "address", "city", "state", "country", "postcode",
        "facebook", "twitter", "youtube", "linkedin",
        "facebook_url", "twitter_url", "youtube_url", "linkedin_url"];
    for (let i in userArr) {
        //        console.log("i: " + i + " userArr[" + i + "]: " + userArr[i]);
        //failsafe: element exists?
        let elem = document.getElementById(userArr[i]);
        if (elem !== null) {
            //            console.log("element userArr[" + i + "]: " + userArr[i] + " exists");
            const myUrl = new RegExp('_url');
            if (userArr[i] === "picture") { // it's a picture? => use src
                //                console.log("it's a picture!");
                document.getElementById(userArr[i]).src = newUserData[userArr[i]];
            } else if (userArr[i] === "dob") { // it's a date? => clip only date
                //                console.log("it's a date");
                document.getElementById(userArr[i]).innerHTML = clipBefore(newUserData[userArr[i]], "T");
                //                console.log("date" + clipBefore(newUserData[userArr[i]],"T"));
            } else if (myUrl.test(userArr[i])) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
                document.getElementById(userArr[i]).href = newUserData[userArr[i]];
                //                console.log("element userArr[" + i + "]: " + myUrl.test(userArr[i]) + " test");
            } else if (userArr[i] === "email" || userArr[i] === "website") {
                let new_a = document.createElement("a");
                if (userArr[i] === "email") {
                    new_a.href = "mailto:" + newUserData[userArr[i]];
                    new_a.innerHTML = newUserData[userArr[i]];
                } else {
                    let website = document.getElementById("website").innerHTML;
                    new_a.href = "https://" + website.trim();
                    new_a.innerHTML = website;
                    new_a.target = "_blank"
                }
                new_a.className = "data"
                new_a.style.textDecoration = "none";
                new_a.style.cursor = "pointer";
                document.getElementById(userArr[i]).innerHTML = "";
                document.getElementById(userArr[i]).appendChild(new_a);
            } else if (newUserData[userArr[i]] === undefined) { //has not ramndom value? => left default value
                //                console.log("value userArr[" + i + "]: " + userArr[i] + " has no value");
            } else {
                document.getElementById(userArr[i]).innerHTML = newUserData[userArr[i]];
            }
        }
        else {
            //            console.log("element userArr[" + i + "] with id: " + userArr[i] + " does not exists");
        }
    }
}
//anonymous Functions didn't work moved to window.onclick
// hide everything inside classArray...
let classArrayWork = ["left", "about", "education", "hobby"];
let classArrayEducation = ["left", "about", "work", "hobby"];
let classArrayDetails = ["right"];
let classArrayburger = ["burger"];
//document.getElementById('work_experience').onclick = function(){ //gives null comming from external link, moved to window.addEventListener()
let work_exp = document.getElementById('work_experience');
// hide everything but education
let educ = document.getElementById('education');
// hide everything but details
let details = document.getElementById('details');
// refresh the page
let my_home = document.getElementById('home');
// Refresh (clear localStorage)
let refresh_me = document.getElementsByClassName('refresh_btn')[0];
// login -> pops up login form
let login_me = document.getElementById('login');
// close modal
let close_modal = document.getElementsByClassName('close')[0];
// burger
let my_burger = document.getElementById('burger_button');
// close menu
let close_menu = document.getElementById('close');
// submit form
let submit_my_form = document.getElementById('login_submit');
// forgot pasword
let forgot_pwd = document.getElementById('forgot');
// Get the modal
var modal = document.getElementById('login_form');
window.addEventListener("click", function (event) {
    // Hides everything but
    if (event.target == work_exp) {
        showMeThisClass(classArrayWork, "work", "right");
    }
    else if (event.target == educ) {
        showMeThisClass(classArrayEducation, "education", "right");
    }
    else if (event.target == details) {
        showMeThisClass(classArrayDetails, "left", "left");
    }
    else if (event.target == my_home) {
        window.location.reload();
    }
    else if (event.target == refresh_me) {
        localStorage.clear();
        window.location.reload();
    }
    else if (event.target == login_me) {
        document.getElementById('login_form').style.display = 'block';
    }
    else if (event.target == close_modal) {
        document.getElementById('login_form').style.display = 'none';
        document.getElementById('sorry').style.display = 'none';
    }
    else if (event.target == my_burger) {
        showMeThisClass(classArrayburger, "menu", "menu");
    }
    else if (event.target == close_menu) {
        showMeThisClass(["menu"], "burger", "burger");
    }
    else if (event.target == submit_my_form) {
        submit_form("submit.php");
    }
    else if (event.target == forgot_pwd) {
        submit_form("forgot.php");
    }
    else if (event.target == modal) {// When the user clicks anywhere outside of the modal, close it
        modal.style.display = "none";
        document.getElementById('sorry').style.display = 'none';
    }

});
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     console.log(typeof my_burger + " 01");
//     if (event.target == modal) {
//         modal.style.display = "none";
//         document.getElementById('sorry').style.display='none';
//     }
// }
// function clicked(event){
// }

// aux functions
function submit_form(link) {
    // is any field empty?
    let uname = document.getElementById('uname').value;
    let psw = document.getElementById('psw').value;
    if (uname == "" || psw == "") {
        document.getElementById('fill').style.display = "block";
    }
    else {
        document.getElementById('fill').style.display = "none";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    // you're logged in you can edit your resume
                }
                if (this.status >= 404) { // has to be >= 404 because github pages gives 405 error instead of 404 https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
                    document.getElementById('sorry').style.display = "block";
                }
            }
        };
        xhttp.open("POST", link, true);
        xhttp.send();
    }
}
function showMeThisClass(classArray, showClass, expandClass = "right") { // (classArray = hides classes, showClass = class to show, expandClass = set width to 900px)
    for (let r in classArray) {
        document.getElementsByClassName("resume_" + classArray[r])[0].style.display = "none";
    }
    document.getElementsByClassName("resume_" + expandClass)[0].style.width = "900px";
    document.getElementsByClassName("resume_" + showClass)[0].style.display = ""; //
    document.getElementsByClassName("resume_" + expandClass)[0].style.display = ""; // redundant? Maybe, but in some cases necesary
    if (showClass === "menu") {
        document.getElementsByClassName("resume_" + showClass)[0].style.display = "flex"; // for some reason "style.display = "";" doesn't work on "display:none;" from external stylesheet
    }
    if (showClass === "left") {
        document.getElementsByClassName("resume_profile")[0].style.width = "350px";
        document.getElementsByClassName("resume_profile")[0].style.float = "left";
        document.getElementsByClassName("resume_content")[0].style.float = "right";
        document.getElementsByClassName("resume_content")[0].style.width = "550px";
        document.getElementsByClassName("resume_content")[0].style.padding = "12px 120px";
        document.getElementsByClassName("resume_details")[0].style.display = "block";
    }
}

function clipBefore(myText, myChar) {// copy text before certain character
    //let indexChar = myText.indexOf(myChar);
    //let beforeAt = myText.slice(0, indexChar);
    //    beforeAt = beforeAt.replace(".","");
    let beforeMyChar = myText.slice(0, myText.indexOf(myChar)).replace(".", "");
    //        console.log(beforeMyChar);
    return beforeMyChar;
}