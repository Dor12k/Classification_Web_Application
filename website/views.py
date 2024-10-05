
from django.views import View
from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import authenticate, login, logout

from users.models import Profile
from articles.models import Article
from website.forms import CreateUserForm, LoginForm


# Home page
class IndexView(View):
    
    def get(self, request):   

        articles_numb = 4
        articles = Article.objects.all().order_by('-average_rating')[:articles_numb]

        return render(request, "website/home.html", {"articles": articles, "articles_numb": articles_numb})

# About page
def about(request):

    if request.method == "GET":
        
        return render(request, "website/about.html")
    else:
        return HttpResponse(f"Something get wrong.")

# Signup page
def signUp(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)

        if form.is_valid():
            checkbox = request.POST.get("terms")
            
            if checkbox is None:
                messages.error(request, "Please confirm the terms")
            elif checkbox is not None:
                messages.success(request, "Registration successful! You can now sign in.")
                
                # Create a user profile
                user_profile = Profile( email = form.cleaned_data["email"],
                                        username = form.cleaned_data["username"],
                                        password = form.cleaned_data["password1"],)
                user_profile.save()

                form.save()
                return redirect("signIn")
        else:
            # Add error messages for invalid login credentials
            for error in form.non_field_errors():
                messages.error(request, error)

    context = {'form': form}

    return render(request, 'signUp.html', context=context)

# Login page
def signIn(request):
    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect("home")
            else:
                messages.error(request, "Invalid username or password.")
        else:
            # Add error messages for invalid login credentials
            for error in form.non_field_errors():
                messages.error(request, error)

    context = {'form': form}
    return render(request, 'signIn.html', context=context)

#  Logout page
def signOut(request):

    logout(request)

    return redirect("home")

