const userData = document.querySelector('.info');

const setupInfo = (user) => {
    if (user){
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
              <p>Logged in as:</p>
              <p><big><b>${doc.data().nick}</b></big></p>
            `;
        userData.innerHTML = html
        document.getElementById('user-img').setAttribute('src', doc.data().img)
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

// const uploadProfileImg = document.getElementById('profile-img');
// const nickname = document.getElementById('signup-nickname');
// const email = document.getElementById('signup-email');

// uploadProfileImg.onclick = function(){
    
//     const fileName = email+'_'+nickname;
//     const metadata = {
//         contentType: nameOfFile.type
//     }
//     const task = mediaStorage.child(fileName).put(uploadProfileImg, metadata);

//     mediaStorage.child(fileName).getDownloadURL().then((url) => {
//         var imgURL = url
//     });

// }
    
