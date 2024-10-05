
from django.contrib import admin
from .models import Feedback, Article, Author, Subject

# Register your models here.
admin.site.register(Author)
admin.site.register(Subject)
admin.site.register(Article)
admin.site.register(Feedback)