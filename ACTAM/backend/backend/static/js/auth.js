//listen for auth status changes
//retrieve data only if we are logged in 
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs)
            setupUI(user);
        });
    } else {
        setupUI();
        //empty array if we aren't logged in 
        setupGuides([]);
    }
})

//create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value, //in square bracket is referring to the input field of the form, not to the db 
        content: createForm['content'].value
    }).then(() => {
        //close the modal and reset form
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message)
    })
})

//signup form
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred)
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err => { alert(err.message) })
})

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
        signupForm.reset();
    })


})