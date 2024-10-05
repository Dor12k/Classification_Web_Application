
from django.db import models

# Create your models here.
class AngularLeafspot(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="angular-leafspot-img")

    def __ste__(self):
        return self.description

class AnthracnoseFruitRot(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="anthracnose-fruit-rot-img")

    def __ste__(self):
        return self.description
    
class BlossomBlight(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="blossom-blight-img")

    def __ste__(self):
        return self.description
    
class GrayMold(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="gray-mold-img")

    def __ste__(self):
        return self.description
    
class LeafSpot(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="leaf-spot-img")

    def __ste__(self):
        return self.description
    
class PowderyMildewFruit(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="powdery-mildew-fruit-img")

    def __ste__(self):
        return self.description
    
class PowderyMildewLeaf(models.Model):
    
    title = models.CharField(max_length=43)
    description = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to="powdery-mildew-leaf-img")

    def __ste__(self):
        return self.description

