from django import forms
from django.forms import fields
from .models import Song
from django import forms

class SongForm(forms.ModelForm):
    class Meta:
       model = Song
       fields = (
           'artist', 'title'
       )

class SongForm2(forms.Form):
    artist = forms.CharField()
    title = forms.CharField()