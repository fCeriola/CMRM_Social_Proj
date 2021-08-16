"""ReadingFile URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from ReadingFile import settings, views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.Home.as_view(), name="home"),
    path('upload/', views.upload, name="upload"),
    path('books/', views.book_list, name="book_list"),
    path('books/upload/', views.book_upload, name="book_upload"),
    path('class/books/', views.BookListView.as_view(), name="class_book_list"),
    path('class/books/upload/', views.BookUploadView.as_view(), name="class_book_upload"),
    path('books/delete/<int:pk>', views.delete_book, name="book_delete"),
    path('books/audio/<int:pk>', views.audiobook_view, name="book_audiobook")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)