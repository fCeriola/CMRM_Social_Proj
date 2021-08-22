var uploadButton = document.getElementById("upload_button");
var progress = 0

uploadButton.onclick = function() {
    // document.getElementById('analyze_form').attr = "block";
    //document.getElementById('analyze_form').prop('hidden', false); 
    var artistName = document.getElementById('artist').value;
    var songName = document.getElementById('title').value;  

    document.getElementById('id_artist').value = artistName; 
    document.getElementById('id_title').value = songName; 

    const uploadedFile = document.querySelector("#uploaded_song").files[0];

    const nameOfFile = document.getElementById("artist").value + "-" + document.getElementById("title").value + ".wav";

    const metadata = {
        contentType: nameOfFile.type
    }
    
    if (document.querySelector("#uploaded_song").files[0]){
        if (document.getElementById("artist").value != 0 && document.getElementById("title").value){
            const task = songsStorage.child(nameOfFile).put(uploadedFile, metadata);
            task.on('state_changed', function(snapshot) {
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById("process").innerHTML = "Uploading..." + progress.toFixed(2) + "%";
            });
        }else{
            alert('insert artist and title');
        }
    }else{
        alert('upload a song')
    }
}

//set images
//navbar 
mediaStorage.child('ncw.png').getDownloadURL().then((url) => {
        var img = document.getElementById('navbar-img');
        img.setAttribute('src', url)
});