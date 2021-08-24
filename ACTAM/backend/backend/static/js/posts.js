const poolList = document.querySelector('#post-list');

// create element
//doc => Posts--->NameOfSong,Analytics,usernick
function renderPosts(doc){
    
    
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
            console.log(url)
            audio.setAttribute('src', url)
        })
    source.type ='audio/mpeg'
    audio.controls = true;

    //New comment form
    let newComment = document.createElement('form');
    let commentText = document.createElement('input');
    commentText.type = 'text';
    commentText.id = 'comment-text'
    commentText.placeholder = 'Your comment...';
    let commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.id = 'comment-btn'
    commentButton.classList.add('btn', 'btn-primary');
    newComment.appendChild(commentText);
    newComment.appendChild(commentButton);
    commentButton.textContent = 'comment'
        
    
    let ChordsString = document.createElement('p')
    let NameOfSongFile = document.createElement('p');
    let TimestampsInSec = document.createElement('p'); 
    let Description = document.createElement('p')
    

    li.setAttribute('data-id', doc.id);
    ChordsString.textContent = doc.data().ChordsString;
    NameOfSongFile.textContent = doc.data().NameOfSongFile +`<i>uploaded by</i> ${doc.data().UserNick}`
    TimestampsInSec.textContent = doc.data().TimestampsInSec;
    Description.textContent = 'Description: '+doc.data().Description;

    //append in the right order
    li.appendChild(header);   
    li.appendChild(content);
    audio.appendChild(source);
    content.appendChild(audio);
    header.appendChild(NameOfSongFile);
    content.appendChild(Description);
    content.appendChild(audio);
    content.appendChild(ChordsString);
    content.appendChild(TimestampsInSec);
    content.appendChild(newComment);
    

    poolList.appendChild(li);  

    

    let commentsList = document.createElement('ul')
    commentsList.innerHTML = `
    <br></br>
    <h5>Comments from other users</h5>`

    //getting Comments Data
        db.collection('Comments').doc(doc.data().NameOfSongFile).collection('comments').get().then(snapshot => {
            snapshot.docs.forEach(doccomm => {
                renderComments(doccomm, commentsList);
            });
         }); 

    content.appendChild(commentsList);


    //-----Comment button function-------//
    //----------submit comment-----------//
    auth.onAuthStateChanged(user => {
        if (user) {
            newComment.addEventListener('submit', (e) =>{
                e.preventDefault();
                comment(user)
            })
        }        
    })

    function comment(user){
        const comment = newComment['comment-text'].value;
        db.collection('Posts').doc(doc.data().NameOfSongFile)
            .collection('Comments').doc().set({
                Text: comment,
                User: db.collection('users').doc(user.uid).nick
            }).then(() => {
                newComment.reset();
            })
            .then(() => {
                renderComments(db.collection('Comments').doc(doc.data().NameOfSongFile), commentsList);
            })
    }
    //------------------------------------//

}




function renderComments(doc, commentsList){
    //Comment List
    let li = document.createElement('li');
    let user = document.createElement('b')
    let comment = document.createElement('span')

    li.setAttribute('data-id', doc.id);
    user.textContent = doc.data().user+' - ';
    comment.textContent = doc.data().comment;

    commentsList.appendChild(li);
    li.appendChild(user);
    li.appendChild(comment);
}


// getting Pool data
db.collection('Posts').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderPosts(doc);
    });
}); 

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