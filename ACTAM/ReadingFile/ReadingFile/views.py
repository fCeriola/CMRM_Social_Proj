from django.shortcuts import redirect, render
from django.views.generic import TemplateView, ListView, CreateView
from  django.core.files.storage import FileSystemStorage
from django.views.generic.base import View
from .form import BookForm
from .models import Book
from django.urls import reverse_lazy #since we use it inside a class

class Home(TemplateView):
    template_name = 'home.html'

def upload(request):

    context = {}

    if request.method == "POST":

        uploaded_file = request.FILES["document"]

        print(uploaded_file.name)
        print(uploaded_file.size)

        filesystem = FileSystemStorage()
        filesystem.save(uploaded_file.name, uploaded_file)

        filename = filesystem.save(uploaded_file.name, uploaded_file)
        fileurl = filesystem.url(filename)

        print(fileurl)

        context = {
            "url" : filesystem.url(filename)
            } 


    return render(request, 'upload.html', context)

def book_list(request): # function-based view

    books = Book.objects.all()

    context = {
        "books" : books
    }

    return render(request, 'book_list.html', context)

def book_upload(request): #function-based view
    if request.method == "POST":
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("book_list")
    else:
        form = BookForm()

    context = {
        "form" : form
    }

    return render(request, 'book_upload.html', context)

def delete_book(request, pk):
    if request.method == "POST":
        a_book = Book.objects.get(pk = pk)
        a_book.delete()

    return redirect("book_list")

class BookListView(ListView): #class-based view
    model = Book
    template_name = "class_book_list.html"
    context_object_name = "books"

class BookUploadView(CreateView):
    model = Book
#    fields = (
#            'title', 'author', 'text', 'check', 'cover'
#        )
    form_class = BookForm
    success_url = reverse_lazy("class_book_list")  #aka where we send the user after the upload is done
    template_name = "book_upload.html"

def audiobook_view(request, pk):

    if request.method == "POST":
        an_audiobook = Book.objects.get(pk = pk).audiobook
        audio_url = an_audiobook.url

    context = {
        "audio" : audio_url
    }

    print(context)

    return render(request, "audio.html", context)