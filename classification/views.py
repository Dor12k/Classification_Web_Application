

from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import AngularLeafspot, AnthracnoseFruitRot, BlossomBlight, GrayMold, LeafSpot, PowderyMildewFruit, PowderyMildewLeaf

from classification.classification import ModelPrediction

prediction_requests = 0

# Create your views here.
@csrf_exempt
def prediction(request):
    
    global prediction_requests

    if request.method == "GET":
        return JsonResponse({"prediction_requests": prediction_requests})
    
    if request.method == "POST":

        image = request.FILES['file']

        model = ModelPrediction()

        predicted_class, confidence, prediction_status, log, prediction_requests = model.predict(image)

        if(predicted_class == "Angular Leaf Spot"):
            slug = 10
        elif(predicted_class == "Anthracnose Fruit Rot"):
            slug = 11
        elif(predicted_class == "Blossom Blight"):
            slug = 12
        elif(predicted_class == "Gray Mold"):
            slug = 13
        elif(predicted_class == "Leaf Spot"):
            slug = 14
        elif(predicted_class == "Powdery Mildew Fruit"):
            slug = 15
        elif(predicted_class == "Powdery Mildew Leaf"):
            slug = 16
        elif(predicted_class == "None"):
            slug = 17
        else:
            slug = 18

        result = {"label": predicted_class, "score": str(confidence) +"%", "slug": slug, "prediction_status": prediction_status, "log": log}
        return JsonResponse(result)

# Gallery page
def gallery(request):

    angular_leafspot = AngularLeafspot.objects.all();
    Anthracnose_fruit_rot = AnthracnoseFruitRot.objects.all();
    blossom_blight = BlossomBlight.objects.all();
    gray_mold = GrayMold.objects.all();
    leaf_spot = LeafSpot.objects.all();
    powdery_mildew_fruit = PowderyMildewFruit.objects.all();
    powdery_mildew_leaf = PowderyMildewLeaf.objects.all();

    strawberry_diseases = [angular_leafspot, Anthracnose_fruit_rot, blossom_blight, gray_mold, leaf_spot, powdery_mildew_fruit, powdery_mildew_leaf]

    if request.method == "GET":
        
        return render(request, "classification/gallery.html", {"strawberry_diseases": strawberry_diseases})
    else:
        return HttpResponse(f"Error.")
  