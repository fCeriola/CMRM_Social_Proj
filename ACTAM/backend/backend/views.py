from django.shortcuts import redirect, render
# from django.views.generic import TemplateView, ListView, CreateView
# from  django.core.files.storage import FileSystemStorage
# from django.views.generic.base import View
import backend.chromogram as c



def db_posts(request):
    return render(request, "db_posts.html")

def index(request):
    return render(request, "index.html")

def upload(request):
    return render(request, "upload.html")

def analyze(request, audiofilename):
    print("inside chromogram view call")
    #c.
    return render(request, "analyze.html")

def user_account(request):
    return render(request, "user_account.html")

def db_posts_temp(request):
    return render(request, "db_posts_temp.html")