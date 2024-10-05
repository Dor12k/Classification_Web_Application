
var sun = document.getElementById("sun-icon")
var moon = document.getElementById("moon-icon")
var body = document.getElementsByTagName("body")[0]
var headernav = document.querySelector("header")
var bran_logo = headernav.getElementsByTagName("img")[0]

var homep = document.getElementsByTagName("a")[1]
var shopp = document.getElementsByTagName("a")[2]
var signupp = document.getElementsByTagName("a")[3]
var profilep = document.getElementsByTagName("a")[4]


var title = document.querySelector(".details h1")
var description = document.querySelector(".details p")
var paragraph_1 = document.getElementById("#paragraph_1")
var paragraph_2 = document.getElementById("#paragraph_2")
var paragraph_3 = document.getElementById("#paragraph_3")
var author_name = document.querySelector("#author-profile p")

var product_h3 = document.getElementsByTagName("h3")[0]
var product_label = document.getElementsByTagName("label")[0]
var product_label1 = document.getElementsByTagName("label")[1]
var product_label2 = document.getElementsByTagName("label")[2]


function darkMode(){

    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Dark Mode")

    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo2.png"

    sun.style.display="none"
    moon.style.display="block"
    body.classList.toggle("body-dark")
    headernav.style.background = "rgb(33, 33, 33)"    
    
    product_h3.style.color = "rgb(50, 50, 50)"
    product_label.style.color = "rgb(50, 50, 50)"
    product_label1.style.color = "rgb(50, 50, 50)"
    product_label2.style.color = "rgb(50, 50, 50)"

    
    title.style.color= "rgb(50, 50, 50)"
    description.style.color= "rgb(50, 50, 50)"
    author_name.style.color= "rgb(50, 50, 50)"
    paragraph_1.style.color = "rgb(50, 50, 50)"
    paragraph_2.style.color = "rgb(50, 50, 50)"
    paragraph_3.style.color = "rgb(50, 50, 50)"

    homep.style.color = "rgb(220, 220, 220)"
    shopp.style.color = "rgb(220, 220, 220)"
    signupp.style.color = "rgb(220, 220, 220)"
    profilep.style.color = "rgb(220, 220, 220)"


}
function lightMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Light Mode")
    
    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo2.png"

    sun.style.display="block"
    moon.style.display="none"
    body.classList.toggle("body-dark")
    headernav.style.background = "rgb(237, 237, 237)"
    

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