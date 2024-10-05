/* ---------------------------------------------- Dark / Light Mode ------------------------------------ */
if(true) {
    var sun = document.getElementById("sun-icon")
    var moon = document.getElementById("moon-icon")
    var body = document.getElementsByTagName("body")[0]
    var headernav = document.querySelector("header")
    var bran_logo = headernav.getElementsByTagName("img")[0]

    var homep = document.getElementsByTagName("a")[1]
    var shopp = document.getElementsByTagName("a")[2]
    var signupp = document.getElementsByTagName("a")[3]
    var profilep = document.getElementsByTagName("a")[4]

    var darkmodeFlag = 0;
}

function darkMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Dark Mode")

    darkmodeFlag = 1;

    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo2.png"

    sun.style.display="none"
    moon.style.display="block"
    body.classList.toggle("body-dark")
    headernav.style.background = "rgb(33, 33, 33)"      
    
    homep.style.color = "rgb(220, 220, 220)"
    shopp.style.color = "rgb(220, 220, 220)"
    signupp.style.color = "rgb(220, 220, 220)"
    profilep.style.color = "rgb(220, 220, 220)"
}

function lightMode(){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    console.log("Light Mode")
    
    darkmodeFlag = 0;
    
    bran_logo.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/logo1.png"

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