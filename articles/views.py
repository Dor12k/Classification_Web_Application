
from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render

from users.models import Profile
from articles.forms import FeedbackForm
from articles.models import Feedback, Article
from django.contrib.auth.models import AnonymousUser

# Product page
def article_page(request, article_slug):
    
    form = FeedbackForm()
    article = Article.objects.get(slug = article_slug)
    article_reviews = Feedback.objects.filter(article = article)

    if not isinstance(request.user, AnonymousUser):

        try:
            updating_comment = False

            # Get user profile
            user_profile = Profile.objects.get(username=request.user.username)

            # Search a review that wrote by the user
            for review in article_reviews:
                
                if review.user == user_profile:
                    
                    updating_comment = True
                    
                    form = FeedbackForm(instance = review)
                    break                
        
        except Profile.DoesNotExist:
            return HttpResponse("Please logout and sign in again.")
    else:
        user_profile = None
        updating_comment = False

    if request.method == "GET":
        return render(request, "articles/article.html", {"article": article, "reviews": article_reviews, "form": form})

    if request.method == "POST":    

        form = FeedbackForm(request.POST)

        if isinstance(request.user, AnonymousUser):

            messages.error(request, "You must sign in")
            
            return render(request, "articles/article.html", {"article": article, "reviews": article_reviews, "form": form})
        else:

            # User already commented
            if updating_comment:

                form = FeedbackForm(request.POST, instance = review)

                if form.is_valid():

                    user_feedback = Feedback.objects.get(user = user_profile, article = article)

                    # Update article fields 
                    avrage_rating = article.average_rating
                    num_of_reviews = article.num_of_reviews

                    sum_of_rating = (avrage_rating * num_of_reviews) - user_feedback.rating
                    updated_rating = ((sum_of_rating + form.cleaned_data["rating"]) / (num_of_reviews))

                    updated_rating = round(updated_rating, 1)

                    article.num_of_reviews = num_of_reviews
                    article.average_rating = updated_rating
                    article.save()

                    messages.success(request, "Your feedback was updated successfully.")
                    form.save()
            else:     

                form = FeedbackForm(request.POST)
                
                if form.is_valid():
                        
                    # Update article fields 
                    avrage_rating = article.average_rating
                    num_of_reviews = article.num_of_reviews

                    updated_rating = (((avrage_rating * num_of_reviews) + form.cleaned_data["rating"]) / (num_of_reviews + 1))

                    updated_rating = round(updated_rating, 1)

                    article.num_of_reviews = num_of_reviews + 1
                    article.average_rating = updated_rating
                    article.save()

                    # Create feedback model to our databaes
                    feedback = Feedback(article = article,
                                        text = form.cleaned_data["text"],
                                        rating = form.cleaned_data["rating"],
                                        username = form.cleaned_data["username"],
                                        user = user_profile,
                                        )
                    feedback.save()

                    messages.success(request, "Your feedback was submited successfully.")

            return render(request, "articles/article.html", {"article": article, "reviews": article_reviews, "form": form})

# Product category page
def article_cat(request):
        
    if request.method == "GET":

        # Sort articles list by article rating
        articles = Article.objects.all().order_by("-average_rating")

        return render(request, 'articles/articles.html', {"articles": articles})

