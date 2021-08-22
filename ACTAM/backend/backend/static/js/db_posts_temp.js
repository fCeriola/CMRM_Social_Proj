const poolList = document.querySelector('#pool-list');

// create element & render cafe
function renderPools(doc){
    
    let li = document.createElement('li');
    //header
    let header = document.createElement('div');
    header.classList.add('collapsible-header', 'grey', 'lighten-4');

    //content
    let content = document.createElement('div');
    content.classList.add('collapsible-body', 'white');

    //audio
    let audio = document.createElement('audio');
    let source = document.createElement('source');
    songsStorage.child(doc.data().NameOfSongFile).getDownloadURL().then((url) =>{
            source.setAttribute('src', url)
        })
    source.type ='audio/mpeg'
    audio.controls = true;

    //New comment form
    let newComment = document.createElement('form');
    let commentText = document.createElement('input');
    commentText.type = 'text';
    commentText.placeholder = 'Your comment...';
    let commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.id = 'comment-form'
    commentButton.classList.add('btn', 'btn-primary');
    newComment.appendChild(commentText);
    newComment.appendChild(commentButton);
    commentButton.textContent = 'comment'
        
    
    let ChordsString = document.createElement('p')
    let NameOfSongFile = document.createElement('p');
    let TimestampsInSec = document.createElement('p'); 

    li.setAttribute('data-id', doc.id);
    ChordsString.textContent = doc.data().ChordsString;
    NameOfSongFile.textContent = doc.data().NameOfSongFile;
    TimestampsInSec.textContent = doc.data().TimestampsInSec;

    //append in the right order
    li.appendChild(header);   
    li.appendChild(content);
    audio.appendChild(source)
    content.appendChild(audio);
    header.appendChild(NameOfSongFile);
    content.appendChild(audio);
    content.appendChild(ChordsString);
    content.appendChild(TimestampsInSec);
    content.appendChild(newComment)

    
    

    poolList.appendChild(li);  

}



// getting Pool data
db.collection('Pools').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderPools(doc);
    });
}); 

//getting Comments Data
db.collection('Documents').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderComments(doc);
    });
}); 

function renderComments(doc){
    let li = document.createElement('li');
    let user = document.createElement('b')
    let comment = document.createElement('span')

    li.setAttribute('data-id', doc.id);
    user.textContent = doc.data().user;
    comment
}

//saving Comments in db

// saving data 
/*
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    db.collection('Cafes').add({ //object document
        Name: form.name.value,
        City: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});
*/

//set images
//navbar 
mediaStorage.child('ncw.png').getDownloadURL().then((url) => {
        var img = document.getElementById('navbar-img');
        img.setAttribute('src', url)
});

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});