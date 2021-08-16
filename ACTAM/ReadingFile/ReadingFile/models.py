from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    text = models.FileField(upload_to="books/texts")
    check = models.BooleanField(default=False)
    cover = models.ImageField(upload_to="books/covers", null = True, blank = True)
    audiobook = models.FileField(upload_to="books/audiobooks", null = True, blank = True)


    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        self.text.delete()
        self.cover.delete()
        self.audiobook.delete()

        super().delete(*args, **kwargs)
