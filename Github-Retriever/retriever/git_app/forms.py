from django.contrib.auth.models import User
from git_app.models import GitUserInfo
from django import forms

class UserForm(forms.ModelForm):
    password = forms.CharField(widget = forms.PasswordInput())
    class Meta():
        model = User
        fields = ('username','email','password')

class GitUserInfoForm(forms.ModelForm):
    class Meta():
        model = GitUserInfo
        fields = '__all__'
