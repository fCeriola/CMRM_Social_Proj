from django.shortcuts import redirect, render
from django.views.generic import TemplateView, ListView, CreateView
from  django.core.files.storage import FileSystemStorage
from django.views.generic.base import View
# from .form import BookForm
# from .models import Book



def db_posts(request):
    return render(request, "private/db_posts.html")

def index(request):
    return render(request, "public/index.html")