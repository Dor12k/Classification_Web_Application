
var sun = document.getElementById("sun-icon")
var moon = document.getElementById("moon-icon")
var body = document.getElementsByTagName("body")[0]
var headernav = document.querySelector("header")
var bran_logo = headernav.getElementsByTagName("img")[0]

var homep = document.getElementsByTagName("a")[1]
var shopp = document.getElementsByTagName("a")[2]
var signupp = document.getElementsByTagName("a")[3]
var profilep = document.getElementsByTagName("a")[4]

var background_page = document.querySelector(".about")
var background_descreption = document.querySelector(".description")
var background_technologies = document.querySelector(".technologies")
var textH1 = document.getElementsByTagName("h1")
var textP = document.getElementsByTagName("p")


function darkMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Dark Mode")

    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo2.png"

    sun.style.display="none"
    moon.style.display="block"
    body.classList.toggle("body-dark")
    headernav.style.background = "rgb(33, 33, 33)"    
    
    homep.style.color = "rgb(220, 220, 220)"
    shopp.style.color = "rgb(220, 220, 220)"
    signupp.style.color = "rgb(220, 220, 220)"
    profilep.style.color = "rgb(220, 220, 220)"

    background_page.style.background = "rgb(10, 10, 10)"
    background_descreption.style.background = "rgb(33, 33, 33)"
    background_technologies.style.background = "rgb(33, 33, 33)"

    for (var i = 0; i<textP.length-2; i++) {
        textP[i].style.color = "rgb(220, 220, 220)"
    }
    for (var i = 0; i<textH1.length; i++) {
        textH1[i].style.color = "rgb(220, 220, 220)"
    }
}

function lightMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Light Mode")

    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo1.png"

    sun.style.display="block"
    moon.style.display="none"
    body.classList.toggle("body-dark")
    headernav.style.background = "rgb(237, 237, 237)"
    
    homep.style.color = "rgb(50, 50, 50)"
    shopp.style.color = "rgb(50, 50, 50)"
    signupp.style.color = "rgb(50, 50, 50)"
    profilep.style.color = "rgb(50, 50, 50)"

    background_page.style.background = "antiquewhite"
    background_descreption.style.background = "aliceblue"
    background_technologies.style.background = "aliceblue"

    for (var i = 0; i<textP.length-2; i++) {
        textP[i].style.color = "rgb(50, 50, 50)"
    }
    for (var i = 0; i<textH1.length; i++) {
        textH1[i].style.color = "rgb(50, 50, 50)"
    }
}

console.log(localStorage.getItem("darkMode"))
console.log(localStorage.getItem("darkmode") == true)
console.log(localStorage.getItem("darkMode") == 'true')

if(localStorage.getItem("darkMode") == 'true'){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    darkMode()
}
else{
    console.log("Light Mode")
}