var uploadButton = document.getElementById("upload_button");
var audioControls = document.getElementById("audio_controls");
var output = document.getElementById("output");
var analyze = document.getElementById("analyze");


uploadButton.onclick = function() {
    const myStorage = firebase.storage().ref("Songs/");

    const uploadedFile = document.querySelector("#uploaded_song").files[0];

    const nameOfFile = document.getElementById("artist").value + "-" + document.getElementById("title").value + ".wav";

    const metadata = {
        contentType: nameOfFile.type
    }

    const task = myStorage.child(nameOfFile).put(uploadedFile, metadata);

    task.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("process").innerHTML = "Uploading..." + progress.toFixed(2) + "%";
    });

}