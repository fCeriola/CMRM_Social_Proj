import urllib.request
import pyrebase

# def dl_jpg(url, file_path, file_name):
#     fullpath = file_path + file_name + '.wav'
#     urllib.request.urlretrieve(url, fullpath)


# url = input("enter image url: ")

# file_name = input("file name to save: ")

# dl_jpg(url, "upload/", file_name)

config = {
    "apiKey": "AIzaSyD69dMji8qEyg_72e-JZ8pkLpcWFhboxbg",
    "authDomain": "need-chords.firebaseapp.com",
    "projectId": "need-chords",
    "databaseURL": "https://need-chords.firebaseio.com",
    "storageBucket": "need-chords.appspot.com",
    "messagingSenderId": "93635873893",
    "appId": "1:93635873893:web:64c4ea4c5a723fa39c8a8c"
}

firebase = pyrebase.initialize_app(config)

storage = firebase.storage()

my_image = "orario.PNG"

#storage.child(my_image).put(my_image)

storage.child(my_image).download(filename="downloaded.PNG", path='upload/')