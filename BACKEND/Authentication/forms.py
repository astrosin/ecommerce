from django import forms
from allauth.account.forms import SignupForm
from .models import User


class CustomAdminCreationForm(SignupForm):
    name = forms.CharField(max_length=25, required=True)
    mobile = forms.CharField(max_length=50, required=True)
    password = forms.CharField(widget=forms.PasswordInput)

    def signup(self, request, user):
        user.name = self.cleaned_data.get['name']
        user.mobile = self.cleaned_data.get('mobile')
        user.save()
        return user
