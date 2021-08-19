//const poolList = document.querySelector('#pool-list');
const form = document.querySelector('#add-pool-form');
/*
// create element & render cafe
function renderPools(doc){
    let li = document.createElement('li');
    let ChordsString = document.createElement('span');
    let NameOfSongFile = document.createElement('span');
    let TimestampsInSec = document.createElement('span'); 

    li.setAttribute('data-id', doc.id);
    ChordsString.textContent = doc.data().ChordsString;
    NameOfSongFile.textContent = doc.data().NameOfSongFile;
    TimestampsInSec.textContent = doc.data().TimestampsInSec;

    li.appendChild(ChordsString);
    li.appendChild(NameOfSongFile);
    li.appendChild(TimestampsInSec);

    poolList.appendChild(li);
    
}
*/

// getting data
/*
db.collection('Pools').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderPools(doc);
    });
}); 
*/

// saving data 
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    /*const task = db.collection('Pools').add({ //object document
        ChordsString: form.chords.value,
        NameOfSongFile: form.nameOfFile.value,
        TimestampsInSec: form.timestamps.value
    });*/
    const task = db.collection('Posts').add({ //object document
        Chords: form.chords.value,
        NameOfSongFile: form.nameOfFile.value,
        Timestamps_in_sec: form.timestamps.value
    });

    form.chords.value = '';
    form.nameOfFile.value = '';
    form.timestamps.value = '';

    task.then(alert("Pool has been created"));
        
    
});
