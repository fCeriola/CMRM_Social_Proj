const countersList = document.querySelector('#counters');
const buttonNew = document.querySelector('#buttonNew')
c=0;


function renderCounters(doc) {
  let li = document.createElement('li');
  let click = document.createElement('span');
  click.id = "counter";
  let cross = document.createElement('div');
  cross.id = "cross"
  

  li.setAttribute('data-id', doc.id);

  click.textContent = doc.data().value
  cross.textContent = 'x';

  li.appendChild(click);

  countersList.appendChild(li);
  li.appendChild(cross);

  //delete counter
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('counter').doc(id).delete();
  });

  click.addEventListener('click', (e)=>{
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('counter').doc(id).get().then((doc)=>{
        let current = doc.data().onSnapshot
        console.log(current)
        db.collection('counter').doc(id).update({value: current.data() + 1})
        console.log('now: '+current)
    });

    
    // db.collection('counter').doc(id).set({value: current+1})
  })
}


//add a document to the db
buttonNew.addEventListener('click', (e)=>{
  e.preventDefault;
  //salviamo in una variabile i dati in uscita dal server pyton e la aggiungiamo al database
  db.collection('counter').add({ value: c });
})



db.collection('counter').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
      console.log(change.doc.data());
      if(change.type == 'added'){
          renderCounters(change.doc);
      } else if (change.type == 'removed'){
          let li = countersList.querySelector('[data-id=' + change.doc.id + ']');
          countersList.removeChild(li);
      }
  });
});




