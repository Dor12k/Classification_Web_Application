
from django import forms
from .models import Feedback
from users.models import Profile

class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['username', 'rating', 'text']
        labels = {'name': 'Full Name', 'text': 'Your Feedback'}
