from django import forms

class SongForm2(forms.Form):
    artist = forms.CharField()
    title = forms.CharField()