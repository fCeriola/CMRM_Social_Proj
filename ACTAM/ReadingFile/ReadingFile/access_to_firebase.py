import pyrebase

config = {
     "apiKey": "AIzaSyD69dMji8qEyg_72e-JZ8pkLpcWFhboxbg",
            "authDomain": "need-chords.firebaseapp.com",
            "projectId": "need-chords",
            "storageBucket": "need-chords.appspot.com",
            "messagingSenderId": "93635873893",
            "appId": "1:93635873893:web:64c4ea4c5a723fa39c8a8c"

}

firebase_connection = pyrebase.initialize_app(config)
storage = firebase_connection.storage()

url_inside_firestore = "images/a_image.png"
local_url = "D:/Documenti/Politecnico/ACTAM/public/auth/img/Logo_Politecnico_Milano.png" #inside the same dir, update to dynamic
storage.child(url_inside_firestore).put(local_url)

# storage.child(url_inside_firestore).download("downloaded.jpg")
