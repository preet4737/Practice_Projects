from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect,HttpResponse, JsonResponse
from django.contrib.auth import authenticate,login,logout
from git_app.forms import UserForm,GitUserInfoForm
import requests
import json
# Create your views here.

def index(request):
    return render(request,'index.html')

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

# This function is to allow new members to register
def register(request):
    registered = False

    if request.method == "POST":
        user_form = UserForm(data = request.POST)

        if user_form.is_valid():

            user = user_form.save()
            user.set_password(user.password)
            user.save()

        else:
            return(user_form.errors)

        registered = True

    else:
        user_form = UserForm()

    return render(request,'registration.html',{'user_form':user_form,'register':registered})

# The function below is for the user to login
def user_login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username = username ,password = password)
        login_user = False
        if user:
            if user.is_active:
                login(request,user)
                return render(request,'search.html')

            else:
                return HttpResponse("Account Not active")
        else:
            login_user = True
            return render(request,'login.html',{'login_user':login_user})

    else:
        return render(request,'login.html',{})

# This function will display the information of the user you searched for
def git_user(request,name):

            url = requests.get("https://api.github.com/users/{}".format(name))
            json_object = url.json()

            if 'message' in json_object:
                return render(request,'error.html',{})

            else:
                url1 = requests.get("https://api.github.com/users/{}/repos".format(name))
                json_object_1 = url1.json()

                return render(request,'git_details.html',{'json_object':json_object,
                                                                   'json_object_1':json_object_1})

# This function will produce a list of users with the username you enter
def search (request):

    if request.method == "POST":
        git_form = GitUserInfoForm(request.POST)

        if git_form.is_valid():
            git_user_form = git_form.save()
            par = {'q' : git_user_form.username}
            url = requests.get("https://api.github.com/search/users?",par)
            js = url.json()

            return render (request,'git_user.html',{'js':js})
        else:
            return render(request,'error.html',{})

    else:
        return render (request,'search.html',{})


# This function will display the commit history of the Repository you select
def git_repo(request,username,params):
    url2 = requests.get("https://api.github.com/repos/{}/{}/commits".format(username,params))
    json_object_2 = url2.json()
    return render(request,'git_repo.html',{'json_object_2':json_object_2})
