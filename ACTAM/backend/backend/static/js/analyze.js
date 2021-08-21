var keep = document.getElementById('KeepChord');
var keepChords = []; // set length or make it 2D: [position, value]
keep.addEventListener('click', (event) => {
    var keepChordPosition = document.getElementById("ChordPosition").value;
    var keepChordName = event.target.value
    keepChords[keepChordPosition] = keepChordName;

    console.log("keepChords[" + keepChordPosition + "] = " + keepChordName)
});


var select = document.getElementById('newChordName');
var newChords = []; // set length or make it 2D: [position, value]
select.addEventListener('change', (event) => {
    var newChordPosition = document.getElementById("ChordPosition").value;
    var newChordName = event.target.value;
    newChords[newChordPosition] = newChordName

    console.log("newChords[" + newChordPosition + "] = " + newChordName)
});



var doubtChordCheckbox = document.getElementById("doubtChord");
var arrayDoubtChords = []; // set length or make it 2D: [position, value]
doubtChordCheckbox.addEventListener('click', (event) => {
    arrayDoubtChords[event.target.value] = true;
    console.log("arrayDoubtChords[" + doubtChordCheckbox.value + "] = " + arrayDoubtChords[doubtChordCheckbox.value])
});

//merge the 3 arrays
//merged array = 

//document.getElementById("chordss").value = merged_array; // new created list / string of chords from keep/change/doubt



const form = document.querySelector('#add-pool-form');
// saving data 
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    const task = db.collection('Pools').add({
        Chords: form.chords.value,
        NameOfSongFile: form.nameOfFile.value,
        Timestamps_in_sec: form.timestamps.value
    });

    form.chords.value = '';
    form.nameOfFile.value = '';
    form.timestamps.value = '';

    task.then(alert("Pool has been created"));
});
