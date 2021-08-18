from backend import chromogram
from django.shortcuts import render
from django.views.generic import TemplateView
# from  django.core.files.storage import FileSystemStorage
# from django.views.generic.base import View
#import backend.chromogram as c
from .form import SongForm, SongForm2
from .chromogram import chromogram_f

class upload_analyze_view(TemplateView):
    temp_name = 'upload.html'

def db_posts(request):
    return render(request, "db_posts.html")

def index(request):
    return render(request, "index.html")

def upload(request): #get
    in_form = SongForm()
    context = {
        "in_form": in_form
    }
    return render(request, 'upload.html' , context)

def analyze(request): #post
    if request.method == "POST":
        f = SongForm2(request.POST)
        if(f.is_valid()):
            print("hereeee")
            artist = f.cleaned_data['artist']
            title = f.cleaned_data['title']
        print("inside chromogram view call")

        nameOfFile = artist + '-' + title + '.wav'
        print(nameOfFile)
        chords, timestamps = chromogram_f(nameOfFile)
        #print(chords, timestamps)
        args = {
            "f": f,
            "nameOfFile": nameOfFile,
            "chords": chords,
            "timestamps": timestamps

        }
        return render(request, 'analyze.html', args)
    return render(request, 'analyze.html')

def user_account(request):
    return render(request, "user_account.html")

def db_posts_temp(request):
    return render(request, "db_posts_temp.html")