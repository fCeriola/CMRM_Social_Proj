const userData = document.querySelector('.info');

const setupInfo = (user) => {
    if (user){
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
              <p>Logged in as:</p>
              <p><big><b>${doc.data().nick}</b></big></p>
              
            `;
        userData.innerHTML = html
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


//set images
//navbar 
mediaStorage.child('ncw.png').getDownloadURL().then((url) => {
    var img = document.getElementById('navbar-img');
    img.setAttribute('src', url)
});