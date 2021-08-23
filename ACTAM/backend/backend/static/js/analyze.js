const form = document.querySelector('#add-pool-form');
var userID = "";
var show_plot_button = document.getElementById("show-plot");
const ploty = document.querySelectorAll('.ploty');

const setupInfo = (user) => {
    if (user){
        userID = user.uid;
    }else{
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

show_plot_button.addEventListener('click', (e) =>{
    e.preventDefault();
    ploty.forEach(item => item.style.display = 'inline-block');
    plotStorage.child(show_plot_button.value).getDownloadURL().then((url) => {
        var img = document.getElementById('plot-img');
        img.setAttribute('src', url)
    });
})

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

    form.chords.value = '';
    form.nameOfFile.value = '';
    form.description.value = '';
    form.timestamps.value = '';
    
   // task.then(alert("Pool has been created"));
   window.location.href="/db_posts_temp"
});
