const cafeList = document.querySelector('#cafe-list'); // change all references to the new db
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');    

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    city.textContent = doc.data().City;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        let tupla_id = ev.target.parentElement.getAttribute('data-id'); // parent of cross is li, one data-id for each document (aka tupla)
        db.collection('Cafes').doc(tupla_id).delete();
    })
}

// getting data
db.collection('Cafes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
}); 

// saving data
form.addEventListener('submit', (callback_event) => {
    callback_event.preventDefault();
    db.collection('Cafes').add({ //object document
        Name: form.name.value,
        City: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});