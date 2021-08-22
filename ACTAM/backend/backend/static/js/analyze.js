const form = document.querySelector('#add-pool-form');
var userNick = "";

const setupInfo = (user) => {
    if (user){
        db.collection('users').doc(user.uid).get().then(doc => {
            userNick = doc.data().nick
        });
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

// saving data 
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    
    const task = db.collection('Pools3').add({
        Chords: form.chords.value,
        NameOfSongFile: form.nameOfFile.value,
        PoolDescription: form.description.value,
        TimestampsInSec: form.timestamps.value,
        UserID: userNick
    });

    form.chords.value = '';
    form.nameOfFile.value = '';
    form.description.value = '';
    form.timestamps.value = '';
    
   // task.then(alert("Pool has been created"));
   window.location.href="/db_posts_temp"
});
