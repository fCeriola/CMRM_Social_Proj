const poolList = document.querySelector('#post-list');

// create element
//doc => Posts--->NameOfSong,Analytics,usernick
function renderPost(docPost){
    
    
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
    songsStorage.child(docPost.data().NameOfSongFile).getDownloadURL().then((url) => {
       audio.setAttribute('src', url);
    });
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
    

    li.setAttribute('data-id', docPost.id);
    ChordsString.textContent = docPost.data().Chords;
    NameOfSongFile.innerHTML = `<strong style="font-size: large;">${docPost.data().NameOfSongFile}</strong> <em style="font-size: small;">uploaded by</em> <strong>${docPost.data().UserNick}</strong>`
    TimestampsInSec.textContent = docPost.data().TimestampsInSec;
    Description.textContent = 'Description: '+docPost.data().Description;

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
        // db.collection('Posts').doc(docPost.data().NameOfSongFile).collection('Comments').get().then(snapshot => {
        //     snapshot.docs.forEach(doccomm => {
        //         renderComments(doccomm, commentsList);
        //     });
        //  }); 

    content.appendChild(commentsList);


    //-----Comment button function-------//

    function commentFunc(user){
        const comment = newComment['comment-text'].value;
        // db.collection('users').doc(user.uid).get().then((doc)=>{
        //     console.log(doc.data().nick);
        // });

        db.collection('users').doc(user.uid).get().then((doc)=>{
            
            db.collection('Posts').doc(docPost).get().then(() => {
                console.log(docPost.data())
            })
            // .collection('Comments')
            // .doc().set({
            //     Text: comment,
            //     User: doc.data().nick
            // });
        })
        .then(() => {
                newComment.reset();
            })
    }
    //----------submit comment-----------//
    auth.onAuthStateChanged(user => {
        if (user) {
            newComment.addEventListener('submit', (e) =>{
                e.preventDefault();
                commentFunc(user)
            })
        }        
    })

    
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


// getting Post data
db.collection('Posts').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderPost(doc);
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