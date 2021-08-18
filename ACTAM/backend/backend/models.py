from django.db import models

class Song(models.Model):
    artist = models.CharField(max_length=100)
    title = models.CharField(max_length=100)