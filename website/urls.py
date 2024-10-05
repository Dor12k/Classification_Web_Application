

from . import views
from users import views as users_views
from articles import views as articles_views
from classification import views as classification_views

from django.urls import path

urlpatterns = [
    path('', views.IndexView.as_view(), name="home"),

    path("SignUp/", views.signUp, name="signUp"), # Sign up page
    path("SignIn/", views.signIn, name="signIn"), # Sign in page
    path("signOut/", views.signOut, name="signOut"), # Log out page

    path('about/', views.about, name="about"), # About page
    path('profile/<user>/', users_views.user_profile, name="profile"), # Profile page

    path('articles/', articles_views.article_cat, name="articlecat"), # Articles category
    path('articles/<article_slug>/', articles_views.article_page, name="article_page"), # Article page
    
    path('gallery/', classification_views.gallery, name='gallery'), # Gallery page
    path('prediction/', classification_views.prediction, name='prediction'),

]