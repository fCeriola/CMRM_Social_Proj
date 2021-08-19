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
    const task = db.collection('Pools').add({ //object document
                                                ChordsString: form.chords.value,
                                                NameOfSongFile: form.nameOfFile.value,
                                                TimestampsInSec: form.timestamps.value
                                            });

    task.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("process").innerHTML = "Uploading..." + progress.toFixed(2) + "%";
    });
    
    form.chords.value = '';
    form.nameOfFile.value = '';
    form.timestamps.value = '';
});
