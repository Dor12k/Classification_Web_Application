
from .models import Profile
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.decorators import login_required

# User profile page
@login_required(login_url='signIn')
def user_profile(request, user):
    
    if not isinstance(request.user, AnonymousUser):
        try:
            # Get user profile
            user_profile = Profile.objects.get(username=request.user.username)

            if request.method == "GET":
            
                return render(request, 'users/profile.html', {"user_profile": user_profile})
        
        except Profile.DoesNotExist:
            if request.user.is_superuser:
                return HttpResponse("superuser profile does not exist.")
            else:
                return HttpResponse("Profile does not exist.")
    else:   
        return HttpResponse("The page you are looking for doesn't exist.")
