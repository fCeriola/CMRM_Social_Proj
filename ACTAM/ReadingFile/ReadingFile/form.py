from django import forms
from django.forms import fields
from .models import Book

class BookForm(forms.ModelForm):
    class Meta:
       model = Book
       fields = (
           'title', 'author', 'text', 'check', 'cover', 'audiobook'
       )