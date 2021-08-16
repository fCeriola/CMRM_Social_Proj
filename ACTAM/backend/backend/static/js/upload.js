var uploadButton = document.getElementById("upload_button");
var audioControls = document.getElementById("audio_controls");



uploadButton.onclick = function(){
    const myStorage = firebase.storage().ref();

    const uploadedFile = document.querySelector("#uploaded_song").files[0];

    const nameOfFile = new Date() +  "-" + uploadedFile.name;
    // change to: artist-nameOfSong
    // const nameOfFile = document.getElementById("#artist") +  "-" + document.getElementById("#title")

    const metadata = {
        contentType: nameOfFile.type
    }

    const task = myStorage.child(nameOfFile).put(uploadedFile, metadata);

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Audio has been uploaded")
        const imageElement = document.querySelector("#song")
        imageElement.src = url
    });

    /* if()
        audioControls.style.display = 'block';
    else
        audioControls.style.display = 'none'; */

}
