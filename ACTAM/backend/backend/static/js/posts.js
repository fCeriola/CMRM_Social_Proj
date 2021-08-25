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
    commentText.id = 'comment-text';
    commentText.placeholder = 'Your comment...';
    let commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.id = 'comment-btn';
    commentButton.classList.add('btn', 'btn-primary');
    newComment.appendChild(commentText);
    newComment.appendChild(commentButton);
    commentButton.textContent = 'comment';
        
    let ChordsHeader = document.createElement('p');
    let ChordsString = document.createElement('p');
    let NameOfSongFile = document.createElement('p');
    let TimestampsHeader = document.createElement('p');
    let TimestampsInSec = document.createElement('p'); 
    let Description = document.createElement('p');
    

    li.setAttribute('data-id', docPost.id);
    ChordsHeader.innerHTML = `<strong>Chords: </strong>`
    ChordsString.textContent = docPost.data().Chords;
    NameOfSongFile.innerHTML = `<strong style="font-size: large;">${docPost.data().NameOfSongFile}</strong> <em style="font-size: small;">uploaded by</em> <strong>${docPost.data().UserNick}</strong>`;
    TimestampsHeader.innerHTML = `<strong>Timestamps: </strong>`
    TimestampsInSec.textContent = docPost.data().TimestampsInSec;
    Description.innerHTML = `<strong> Description: </strong>`+docPost.data().Description;

    //append in the right order
    li.appendChild(header);   
    li.appendChild(content);
    audio.appendChild(source);
    content.appendChild(audio);
    header.appendChild(NameOfSongFile);
    content.appendChild(audio);
    content.appendChild(Description);
    content.appendChild(ChordsHeader);
    content.appendChild(ChordsString);
    content.appendChild(TimestampsHeader);
    content.appendChild(TimestampsInSec);
    content.appendChild(newComment);
    
    poolList.appendChild(li);  
    

    let commentsList = document.createElement('ul');
    commentsList.innerHTML = `
    <br></br>
    <h5>Comments for this post</h5> `
   

    //----------submit comment-----------//
    var usernick = "";
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                usernick = doc.data().nick
            });
            newComment.addEventListener('submit', (e) =>{
                e.preventDefault();
                commentFunc(usernick, commentText, docPost, newComment)
                
            })
        }        
    });  
    db.collection('Comments').orderBy('Date').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.doc.data().Docu == docPost.id){
                if (change.type == 'added'){
                    renderComments(change.doc, content)
                }
            }
        })
    }); 

}

//-----Comment button function-------//

function commentFunc(user, comment, docu, commentForm){
    
    console.log(comment.value, user, docu.id)
    if (comment.value){ 
        const myDate = new Date();
        var day = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        var h = myDate.getHours();
        var min = myDate.getMinutes();

        var formDate = day+'.'+month+'.'+year+' at '+h+':'+min
        db.collection('Comments')
        .add({
            Text: comment.value,
            User: user,
            Docu: docu.id,
            Date: formDate
        }) 
    .then(() => {
            commentForm.reset();
        });
    }else{alert('Please enter a comment')}   
}



//---------Render comment Function-------//
function renderComments(docComm, content){
console.log('renderComments')

    //Comment List
    let li = document.createElement('p');
    let user = document.createElement('b');
    let comment = document.createElement('span');
    let date = document.createElement('span');
    let form = document.createElement('div');

    li.setAttribute('data-id', docComm.id);
    user.textContent = docComm.data().User;
    comment.textContent = docComm.data().Text;
    date.innerHTML = `     (<em style="font-size: small;">${docComm.data().Date}</em>)   :  `;
    
    content.appendChild(li);
    li.appendChild(form);
    form.appendChild(user);
    form.appendChild(date);
    form.appendChild(comment);
}


// // getting Post 
// db.collection('Posts').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderPost(doc);
//     });
// }); 

db.collection('Posts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
            if (change.type == 'added'){
                renderPost(change.doc)
            }
    })
}); 

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