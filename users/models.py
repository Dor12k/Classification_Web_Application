
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):

    email = models.EmailField()
    username = models.CharField(max_length = 50)
    password = models.CharField(max_length= 14)
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
        
    def __str__(self):
        return f"{self.username}"
    
    