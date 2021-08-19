const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = (user) => {
    if (user) {
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



//set logo image
mediaStorage.child('logo.png').getDownloadURL().then((url) => {
    var img = document.getElementById('image-box');
    img.setAttribute('src', url)
});


//PROVA PER VEDERE SE TRAMITE LINK FUNZIONA---->sarà dinamico
//set audio
songsStorage.child('poi-poi.wav').getDownloadURL().then((url) => {
    var song = document.getElementById('prova-audio');
    song.setAttribute('src', url)
    console.log(url);
})



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});