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

    var introText = document.querySelector("#intro p")
    var introHeadl = document.querySelector("#intro h1")

    var classifaction = document.querySelector(".classification")

    var explanation = document.querySelector(".explanation")
    var explanationTXT = document.querySelector(".explanation p")
    var explanationH = document.querySelector(".explanation h1")

    var imgViewBG = document.querySelector(".img-view")
    var dragNdropTXT = document.querySelector(".img-view p")
    var dragNdropSPAN = document.querySelector(".img-view span")
    var dragNdropBG = document.querySelector("#drop-area")

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

    introText.style.color = "#EEEFF1"
    introHeadl.style.color = "#EEEFF1"

    var classifaction = document.querySelector(".classification")
    var explanation = document.querySelector(".explanation")
    var dragNdropTXT = document.querySelector(".img-view p")
    var dragNdropSPAN = document.querySelector(".img-view span")

    dragNdropBG.style.background = "rgb(66, 66, 66)"
    
    // if null tham image uploaded
    if( dragNdropTXT !=  null ){
        dragNdropTXT.style.color = "#EEEFF1"
        imgViewBG.style.background = "rgb(33, 33, 33)"
        imgViewBG.style.border = "3px dashed #7c7c7c"
    }
    if( dragNdropSPAN !=  null ){
        dragNdropSPAN.style.color = "#EEEFF1"
    }
    
    classifaction.style.background = "rgb(33, 33, 33)"
    explanation.style.background = "rgb(33, 33, 33)"
    explanationTXT.style.color = "#EEEFF1"
    explanationH.style.color = "#EEEFF1"
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

    homep.style.color = "rgb(50, 50, 50)"
    shopp.style.color = "rgb(50, 50, 50)"
    signupp.style.color = "rgb(50, 50, 50)"
    profilep.style.color = "rgb(50, 50, 50)"
    headernav.style.background = "rgb(237, 237, 237)"

    introText.style.color = "#3C404A"
    introHeadl.style.color = "#3C404A"

    classifaction.style.background = "antiquewhite"
    explanation.style.background = "antiquewhite"
    explanationTXT.style.color = "#3C404A"
    explanationH.style.color = "#3C404A"

    var dragNdropTXT = document.querySelector(".img-view p")
    var dragNdropSPAN = document.querySelector(".img-view span")

    dragNdropBG.style.background = "#fff"

    if( dragNdropTXT !=  null ){
        dragNdropTXT.style.color = "#3C404A"
        imgViewBG.style.background = "#f7f8ff"
    }
    if( dragNdropSPAN !=  null ){
        dragNdropSPAN.style.color = "#3C404A"
    }
}

if(localStorage.getItem("darkMode") == 'true'){
    const wasDarkMode = localStorage.getItem("darkMode") == 'true';
    localStorage.setItem("darkMode", !wasDarkMode);
    darkMode()
}
else{
    console.log("Light Mode")
}
/* ---------------------------------------------------------------------------------------------------------------- */

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

var video = document.querySelector("video")

if(video){
    video.addEventListener("ended", function(){console.log("The video ended.")})
}



/* ---------------------------------------------------- Classification ------------------------------------ */

const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.querySelector(".img-view");

// Flag if img-view is clear
var prediction_flag = 0;

var button = document.getElementById("btn");

inputFile.addEventListener("change", uploadImage)

function uploadImage(){

    if(prediction_flag == 0 ){

        // Design image view
        design_imgView();
    
        // predict img and set result
        model_prediction(inputFile);

        prediction_flag = 1;
    }
}

// function design img-view
function design_imgView(){

    let imgLink = URL.createObjectURL(inputFile.files[0]);

    imageView.style.backgroundImage = `url(${imgLink})`;   

    imageView.classList.remove("img-view");
    imageView.classList.add("img-view-prediction")

    // Design image view
    imageView.textContent = ""
}

// function call model prediction in set the results
function model_prediction(input_file){
    
    // Ensure .img-view is clear
    if(prediction_flag == 0){

        var image = input_file.files[0];
        var formData = new FormData();
    
        formData.append('file', image);
        
        design_prediction_card()

        // Call python function wich make the model prediction
        var prediction = $.ajax({   
                                    url : "http://127.0.0.1:8000/prediction/", // In localhost
                                    type : "POST", 
                                    data : formData,
                                    processData: false,
                                    contentType: false,
            // handle a successful response
            success : function(json_response) {
                console.log("Successful Ajax Request"); 
                if(json_response.prediction_status == "Successful"){
                    console.log("Successful Prediction")
                    console.log(json_response); 
                    design_prediction_values(json_response);
                }
                else if(json_response.prediction_status == "Field"){
                    console.log("Field Prediction")
                    console.log(json_response); 
                    field_prediction(json_response);
                }
            },
            // handle a non-successful response
            error : function(xhr, errmsg, err) {
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });

        prediction_flag = 1;
    }
}


// Function design the prediction card in homepage
function design_prediction_card(json_prediction){

    var drop_area_label = document.getElementById("drop-area-label");

    imageView.style.borderRadius = "30px 30px 0px 0px"
    imageView.style.border = ""

    // Create tempale result
    var result = document.querySelector(".result");
    if(result != null){
        result.classList.remove("result-hidden");
        result.classList.add("result");
    }
    else{
        var result = document.createElement('div');
        result.className = "result";
        result.classList.add("result");
    }

    drop_area_label.appendChild(result);

    // Create block1 temple with "label" and "confiddence"
    var block1 = document.createElement('div');
    block1.id = "block1";
    var label_div = document.createElement('div');
    label_div.style.width = "50%"
    var label_txt = document.createElement('p');
    label_txt.style.width = "70%";
    label_txt.style.marginTop = "10px";
    var confidence_div = document.createElement('div');
    confidence_div.style.widh = "50%"
    var confidace_txt = document.createElement('p');
    confidace_txt.style.width = "45%";
    confidace_txt.style.marginTop = "10px";
    label_txt.textContent = "Label";
    confidace_txt.textContent = "Confidance";



    // Create block2 temple
    var block2 = document.createElement('div');
    block2.id = "block2";
    var prediction_div = document.createElement('div');
    prediction_div.id = "prediction_div"
    prediction_div.style.width = "50%"
    var prediction_txt = document.createElement('p');
    prediction_txt.id = "prediction_txt"
    prediction_txt.style.marginBottom = "10px";
    var score_div = document.createElement('div');
    score_div.style.width = "50%"
    var score_txt = document.createElement('p');
    score_txt.id = "score_txt"
    score_txt.style.marginLeft = "35%";
    prediction_txt.textContent = "Predicting..";
    score_txt.textContent = "0%";

    // Create prediction linkable
    // var prediction_a = document.createElement('a');
    // prediction_a.id = "labelLink";
    // prediction_txt.id = "labelLink";
    // prediction_a.style.color = "#496ff6";
    // prediction_txt.style.color = "#496ff6";
    // var url = "http://127.0.0.1:8000/articles/" + json_prediction.slug + "/"
    // prediction_a.setAttribute("href", url)
    // prediction_a.appendChild(prediction_txt);
    


    // Build the temple
    result.appendChild(block1);
    block1.appendChild(label_div);
    label_div.appendChild(label_txt);
    block1.appendChild(confidence_div);
    confidence_div.appendChild(confidace_txt);

    result.appendChild(block2);
    block2.appendChild(prediction_div);
    prediction_div.appendChild(prediction_txt);
    block2.appendChild(score_div);
    score_div.appendChild(score_txt);
}

// Function design the prediction card with values
function design_prediction_values(json_prediction){

    var prediction_txt = document.getElementById("prediction_txt");
    var score_txt = document.getElementById("score_txt");
    var prediction_a = document.getElementById(".prediction_a");
    var prediction_div = document.getElementById("prediction_div");

    prediction_txt.textContent = json_prediction.label;
    score_txt.textContent = json_prediction.score

    // Create prediction linkable
    var prediction_a = document.createElement('a');
    prediction_a.id = "labelLink";
    // prediction_txt.id = "labelLink";
    prediction_a.style.color = "rgb(0 56 255)";
    prediction_txt.style.color = "rgb(0 56 255)";
    var url = "http://127.0.0.1:8000/articles/" + json_prediction.slug + "/"
    prediction_a.setAttribute("href", url)
    prediction_a.appendChild(prediction_txt);

    prediction_div.appendChild(prediction_a);
}

// Handle field prediction
function field_prediction(json_response){

    console.log("Prediction status: " + json_response.prediction_log + " Error: " + json_response.message)

    var drop_area_label = document.getElementById("drop-area-label");

    // Create tempale result
    var result = document.createElement('div');
    result.className = "result";
    result.classList.add("result");

    drop_area_label.appendChild(result);

    // Create block1 temple with "label" and "confiddence"
    var block1 = document.createElement('div');
    block1.id = "block1";
    var label_div = document.createElement('div');
    label_div.style.width = "50%"
    var label_txt = document.createElement('p');
    label_txt.style.width = "70%";
    label_txt.style.marginTop = "10px";
    var confidence_div = document.createElement('div');
    confidence_div.style.widh = "50%"
    var confidace_txt = document.createElement('p');
    confidace_txt.style.width = "45%";
    confidace_txt.style.marginTop = "10px";
    label_txt.textContent = "Label";
    confidace_txt.textContent = "Confidance";
    // End of Create block1 temple



    // Create block2 temple
    var block2 = document.createElement('div');
    block2.id = "block2";
    var prediction_div = document.createElement('div');
    prediction_div.style.width = "50%"
    var prediction_txt = document.createElement('p');
    prediction_txt.style.marginBottom = "10px";
    var score_div = document.createElement('div');
    score_div.style.width = "50%"
    var score_txt = document.createElement('p');
    score_txt.style.marginLeft = "35%";
    prediction_txt.textContent = "Predicting..";
    score_txt.textContent = ""

    // ERROR CASE: Cancell the linkable
    // Create prediction linkable
    // var prediction_a = document.createElement('a');
    // prediction_a.id = "labelLink";
    prediction_txt.id = "label";
    // prediction_a.style.color = "#496ff6";
    prediction_txt.style.color = "#496ff6";
    // var url = "http://127.0.0.1:8000/articles/" + json_response.slug + "/"
    // prediction_a.setAttribute("href", url)
    // prediction_a.appendChild(prediction_txt);
    // End of Create block2 temple


    // Build the temple
    result.appendChild(block1);
    block1.appendChild(label_div);
    label_div.appendChild(label_txt);
    block1.appendChild(confidence_div);
    confidence_div.appendChild(confidace_txt);

    result.appendChild(block2);
    block2.appendChild(prediction_div);
    prediction_div.appendChild(prediction_txt);
    block2.appendChild(score_div);
    score_div.appendChild(score_txt);
}

// Function clear img-view area
function clear_imgView(){

    if(prediction_flag == 1){
        
        imageView.style.background = "";
        imageView.style.borderRadius = "30px 30px 30px 30px"

        var input_vile = document.getElementById("input-file");
        input_vile.value = ""; 

        var editImage = document.createElement('img');
        editImage.src = "https://strawberries-bucket.s3.amazonaws.com/static/website/img/upload.png";
        imageView.appendChild(editImage);
    
        var text = document.createElement('p')
        text.textContent = "Drag and Drop or Click here to upload an image of a Strawberry Plant Leaf to Process"
        imageView.appendChild(text);
    
        var br = document.createElement('br')
        imageView.appendChild(br);
        imageView.appendChild(br);
    
        var span = document.createElement('span')
        span.textContent = "Image must be less than 50 MB";
        span.style.marginTop = "8px";
        imageView.appendChild(span);
    
        if(darkmodeFlag == 1){
            text.style.color = "white"
            span.style.color = "white"
        }
        else{
            text.style.color = "black"
            span.style.color = "gray"
        }
        
        imageView.classList.remove("img-view-prediction");
        imageView.classList.add("img-view");

        if(darkmodeFlag == 1){
            imgViewBG.style.background = "rgb(33, 33, 33)"
            imgViewBG.style.border = "3px dashed #7c7c7c"
        }
        else{
            imageView.style.background = "#f7f8ff";
        }
            
        result = document.querySelector(".result");
        
        if(result != null){
            result.classList.remove("result");
            result.classList.remove("result-hidden")
            // result.classList.add("result-hidden");
        
            result.textContent = '';
        }
        
        prediction_flag = 0;
    }
}

/* ------------------------------------------------------ Drop and Drag Event-------------------------------------------------------- */
dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files; 
    uploadImage();
});

