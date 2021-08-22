from django.shortcuts import render
from .form import SongForm2
from .chromogram import chromogram_f

def index(request):
    return render(request, "index.html")

def upload(request):
    in_form = SongForm2()
    context = {
        "in_form": in_form
    }
    return render(request, 'upload.html' , context)

def analyze(request):
    if request.method == "POST":
        f = SongForm2(request.POST)
        if(f.is_valid()):
            print("form: ok")
            artist = f.cleaned_data['artist']
            title = f.cleaned_data['title']
        else:
            print("invalid form")

        nameOfFile = artist + '-' + title + '.wav'
        #print(nameOfFile)
        chords, timestamps = chromogram_f(nameOfFile)
        #print(chords, timestamps)
        results = {
            "c": chords,
            "t": timestamps,
        }
        args = {
            #"f": f,
            "nameOfFile": nameOfFile,
            "r": results
        }
        return render(request, 'analyze.html', args)
    return render(request, 'analyze.html')

def user_account(request):
    return render(request, "user_account.html")

def db_posts_temp(request):
    return render(request, "db_posts_temp.html")