

from django.db import models
from users.models import Profile
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class Subject(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.title}"

class Author(models.Model):
    picture = models.ImageField(blank=True, upload_to='author-img')
    name = models.CharField(max_length=70)
    subject = models.ManyToManyField(Subject)

    def __str__(self):
        return f"{self.name}"

class Article(models.Model):

    title = models.CharField(max_length=43)
    description = models.TextField(max_length=95)
    introduction = models.TextField(max_length=330)

    first_paragraph = models.TextField()
    first_image = models.ImageField(blank=True, upload_to='article-img')

    second_paragraph = models.TextField()
    second_image = models.ImageField(blank=True, upload_to='article-img')

    third_paragraph = models.TextField()
    third_image = models.ImageField(blank=True, upload_to='article-img')

    slug = models.SlugField(blank=True)
    subject = models.ManyToManyField(Subject)
    is_bestSeller = models.BooleanField(default=False)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True)

    num_of_reviews = models.PositiveBigIntegerField(default=0)
    average_rating = models.FloatField(default=0, validators=[MinValueValidator(0)])

    card = models.CharField(max_length=20, default='regular', null=True)

    def __str__(self):
        return f"{self.title}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.slug = self.id
        super().save(*args, **kwargs)

class Feedback(models.Model):
    
    text = models.TextField()
    username = models.CharField(max_length=40)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True)
    rating = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(5)])

    def __str__(self):
        return f"{self.article} - Rating {self.rating}"
   
