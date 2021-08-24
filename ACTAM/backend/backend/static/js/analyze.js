const form = document.querySelector('#add-pool-form');
var userID = "";
var show_plot_button = document.getElementById("show-plot");
const ploty = document.querySelectorAll('.ploty');
var show_audio_button = document.getElementById("show-aud");
const ploty2 = document.querySelectorAll('.ploty2');

const setupInfo = (user) => {
    if (user) {
        userID = user.uid;
    } else {
        userData.innerHTML = ''
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        setupInfo(user);
    } else {
        setupInfo();
    }
});


show_plot_button.addEventListener('click', (e) => {
    e.preventDefault();
    var image_name = show_plot_button.value;
    mediaStorage.child(image_name).getDownloadURL().then((url) => {
        var img = document.getElementById('plot-img');
        img.setAttribute('src', url)
    });
    ploty.forEach(item => {
        if (item.style.display == 'none') {
            ploty.forEach(item => item.style.display = 'block');
        } else { ploty.forEach(item => item.style.display = 'none'); }
    })
});

show_audio_button.addEventListener('click', (e) => {
    e.preventDefault();
    var audio_name = show_audio_button.value;
    songsStorage.child(audio_name).getDownloadURL().then((url) => {
        var aud = document.getElementById('song-aud');
        aud.setAttribute('src', url)
    });
    ploty2.forEach(item => {
        if (item.style.display == 'none') {
            ploty2.forEach(item => item.style.display = 'block');
        } else { ploty2.forEach(item => item.style.display = 'none'); }
    })
});

mediaStorage.child('ncw.png').getDownloadURL().then((url) => {
    var img = document.getElementById('navbar-img');
    img.setAttribute('src', url)
});

// saving data 
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    const task = db.collection('Pools3').add({
        Chords: form.chords.value,
        NameOfSongFile: form.nameOfFile.value,
        PoolDescription: form.description.value,
        TimestampsInSec: form.timestamps.value,
        UserID: userID
    });


    task.then(()=>{
        if(confirm("Pool has been created\nGo to Pools?")){
            window.location.href = "/db_posts_temp"
        }
        else{
            
        }
    });
    
    form.chords.value = '';
    form.nameOfFile.value = '';
    form.description.value = '';
    form.timestamps.value = '';

});