//const poolList = document.querySelector('#pool-list');
const form = document.querySelector('#add-pool-form');
//const chords_array = document.querySelector('#a_var');
const newChordOption = document.getElementById("newChord");
const doubtChordcheckBox = document.getElementById("doubtChord");

//newChord[newChord.selcetedIndex]

doubtChordcheckBox.onclick = function (){

}

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
