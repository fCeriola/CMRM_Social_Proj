//listen for auth status changes
//retrieve data only if we are logged in 
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
    } else {
        setupUI();
        
    }
})

//signup form
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const nickname = signupForm['signup-nickname'].value;
    // const uploadProfileImg = document.getElementById('profile-img');


    
    //signup the user anda save img+nickname in db
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
            var profileImg = document.querySelector('#profile-img').files[0];
            const fileName = nickname+'_prof-img.png';
            const metadata = {
                contentType: fileName.type
            }
            mediaStorage.child(fileName).put(profileImg, metadata).then(() =>{ 
                    mediaStorage.child(fileName).getDownloadURL().then((url)=>{ 
                        return db.collection('users').doc(cred.user.uid).set(
                            {
                                nick: nickname, 
                                img: url}
                            );
                });
            });
    }).then(() => {
        const modal = document.querySelector('#modal-signup')
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }).catch(err => { alert(err.message) });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault;
    auth.signOut()
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault;
    
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err => {
        alert(err.message)
    })
})
