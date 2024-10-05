
/* -------------------------------- Nav bar ----------------------------------------------*/

var sun = document.getElementById("sun-icon")
var moon = document.getElementById("moon-icon")
var body = document.getElementsByTagName("body")[0]
var headernav = document.querySelector("header")
var bran_logo = headernav.getElementsByTagName("img")[0]

var homep = document.getElementsByTagName("a")[1]
var shopp = document.getElementsByTagName("a")[2]
var signupp = document.getElementsByTagName("a")[3]
var profilep = document.getElementsByTagName("a")[4]

body.style.background = "#e4d7c5"

function darkMode(){

    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Dark Mode")
    
    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo2.png"

    sun.style.display="none"
    moon.style.display="block"
    // body.classList.toggle("body-dark")
    headernav.style.background = "rgb(33, 33, 33)"    
    
    body.style.background = "#1E1E1E"
    // body.style.background = "rgb(233 233 233)"

    homep.style.color = "rgb(220, 220, 220)"
    shopp.style.color = "rgb(220, 220, 220)"
    signupp.style.color = "rgb(220, 220, 220)"
    profilep.style.color = "rgb(220, 220, 220)"
}

function lightMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Light Mode")
    
    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo1.png"
    
    sun.style.display="block"
    moon.style.display="none"
    // body.classList.toggle("body-dark")
    headernav.style.background = "rgb(237, 237, 237)"
    
    body.style.background = "#e4d7c5"

    homep.style.color = "rgb(50, 50, 50)"
    shopp.style.color = "rgb(50, 50, 50)"
    signupp.style.color = "rgb(50, 50, 50)"
    profilep.style.color = "rgb(50, 50, 50)"
}
if(localStorage.getItem("darkMode") == 'true'){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    darkMode()
}
else{
    console.log("Light Mode")
}
/* -------------------------------- Articales cards --------------------------------------*/
function showReview(event){
    var card = event.currentTarget;
    card.querySelector(".review-con").classList.toggle("hover-review");
    card.querySelector(".article-img").classList.toggle("hover-img");
}
 
function hideReview(event){
    var card = event.currentTarget;
    card.querySelector('.review-con').classList.toggle("hover-review");
    card.querySelector(".article-img").classList.toggle("hover-img");
}

var articleImg = document.querySelectorAll(".article-card")

articleImg.forEach(function(card){
    card.addEventListener("mouseover",showReview)
    card.addEventListener("mouseout",hideReview)
});


/* -------------------------------- Horizontal card --------------------------------------*/


function showReviewHorz(event){
    var card = event.currentTarget;
    card.querySelector(".horizontal-review-con").classList.toggle("hover-horizontal-review-con");
    card.querySelector(".article-horizontal-img").classList.toggle("hover-img");
   
    var img = document.querySelector(".locker-horizontal-img")
    img.style.display = "flex"
}
 
function hideReviewHorz(event){
    var card = event.currentTarget;
    card.querySelector('.horizontal-review-con').classList.toggle("hover-horizontal-review-con");
    card.querySelector(".article-horizontal-img").classList.toggle("hover-img");

    var img = document.querySelector(".locker-horizontal-img")
    img.style.display = "none"
}

var articleHorzImg = document.querySelectorAll(".article-horizontal-card")

articleHorzImg.forEach(function(card){
    card.addEventListener("mouseover",showReviewHorz)
    card.addEventListener("mouseout",hideReviewHorz)
});


/* -------------------------------- Vartical card --------------------------------------*/

function showReviewVert(event){
    var card =event.currentTarget;
    card.querySelector(".vertical-review-con").classList.toggle("hover-vertical-review-con");
    card.querySelector(".article-vertical-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-vertical-img")
    img.style.display = "flex"
}
 
function hideReviewVert(event){
    var card =event.currentTarget;
    card.querySelector('.vertical-review-con').classList.toggle("hover-vertical-review-con");
    card.querySelector(".article-vertical-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-vertical-img")
    img.style.display = "none"
}

var articleVertImg = document.querySelectorAll(".article-vertical-card")

articleVertImg.forEach(function(card){
    card.addEventListener("mouseover",showReviewVert)
    card.addEventListener("mouseout",hideReviewVert)
});

/* -------------------------------- Mid card --------------------------------------*/

function showReviewMid(event){
    var card =event.currentTarget;
    card.querySelector(".mid-review-con").classList.toggle("hover-mid-review-con");
    card.querySelector(".article-mid-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-mid-img")
    img.style.display = "flex"
}
 
function hideReviewMid(event){
    var card =event.currentTarget;
    card.querySelector('.mid-review-con').classList.toggle("hover-mid-review-con");
    card.querySelector(".article-mid-img").classList.toggle("hover-img");

    var img = document.querySelector(".locker-mid-img")
    img.style.display = "none"
}

var articleMidImg = document.querySelectorAll(".article-mid-card")

articleMidImg.forEach(function(card){
    card.addEventListener("mouseover",showReviewMid)
    card.addEventListener("mouseout",hideReviewMid)
});

/* -------------------------------- Flat card --------------------------------------*/

function showReviewFlat(event){
    var card = event.currentTarget;
    card.querySelector(".flat-review-con").classList.toggle("hover-flat-review-con");
    card.querySelector(".article-flat-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-flat-img")
    img.style.display = "flex"
}
 
function hideReviewFlat(event){
    var card = event.currentTarget;
    card.querySelector('.flat-review-con').classList.toggle("hover-flat-review-con");
    card.querySelector(".article-flat-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-flat-img")
    img.style.display = "none"
}

var articleFlatImg = document.querySelectorAll(".article-flat-card")

articleFlatImg.forEach(function(card){
    card.addEventListener("mouseover",showReviewFlat)
    card.addEventListener("mouseout",hideReviewFlat)
});
/* -------------------------------- End card --------------------------------------*/

function showReviewEnd(event){
    var card =event.currentTarget;
    card.querySelector(".end-review-con").classList.toggle("hover-end-review-con");
    card.querySelector(".article-end-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-end-img")
    img.style.display = "flex"
}
 
function hideReviewEnd(event){
    var card =event.currentTarget;
    card.querySelector('.end-review-con').classList.toggle("hover-end-review-con");
    card.querySelector(".article-end-img").classList.toggle("hover-img");
    
    var img = document.querySelector(".locker-end-img")
    img.style.display = "none"
}

var articleEndImg = document.querySelectorAll(".article-end-card")

articleEndImg.forEach(function(card){
    card.addEventListener("mouseover",showReviewEnd)
    card.addEventListener("mouseout",hideReviewEnd)
});
