const poolList = document.querySelector('#pool-list');

// create element & render cafe
function renderPools(doc){
    let li = document.createElement('li');
    let header = document.createElement('div');
    header.classList.add('collapsible-header', 'grey', 'lighten-4');
    let content = document.createElement('div');
    content.classList.add('collapsible-body', 'white');
    let audio = document.createElement('audio');
    let source = document.createElement('source');
    songsStorage.child(doc.data().NameOfSongFile).getDownloadURL().then((url) =>{
        source.setAttribute('src', url)
    })
    source.type ='audio/mpeg'
    // const url = 'https://firebasestorage.googleapis.com/v0/b/need-chords.appspot.com/o/Songs%2Ferf-erf.wav?alt=media&token=4e8d63ac-7fe6-4843-8887-e8e89bf6d2fb'
    // source.setAttribute('src', url)
    // source.type ='audio/mpeg'
    // audioPlayer(doc, content);

    // <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
    //       <div class="collapsible-body white"> ${guide.content} </div>

    
    let ChordsString = document.createElement('p')
    let NameOfSongFile = document.createElement('p');
    let TimestampsInSec = document.createElement('p'); 

    li.setAttribute('data-id', doc.id);
    ChordsString.textContent = doc.data().ChordsString;
    NameOfSongFile.textContent = doc.data().NameOfSongFile;
    TimestampsInSec.textContent = doc.data().TimestampsInSec;

    li.appendChild(header);   
    li.appendChild(content);
    audio.appendChild(source)
    content.appendChild(audio);
    header.appendChild(NameOfSongFile);
    content.appendChild(audio);
    content.appendChild(ChordsString);
    content.appendChild(TimestampsInSec);

    audio.controls = true;
    

    poolList.appendChild(li);  

}

function audioPlayer(doc, content){
    // let audio = document.createElement('audio');
    // let source = document.createElement('source');
    // source.type ='audio/wav'
    // songsStorage.child(doc.data().NameOfSongFile).getDownloadURL().then((url) =>{
    //     source.setAttribute('src', url)
    // })
    // audio.appendChild(source)
    // content.appendChild(audio);
}

// getting data
db.collection('Pools').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderPools(doc);
    });
}); 

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


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});