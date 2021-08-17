const guideList = document.querySelector('.guide')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = (user) => {
    if (user) {
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}


//setup guides
const setupGuides = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            //così non funziona, bisogna che farlo visualizzare con la funzione display come fatto per i tasti nella Navbar

            //with backtick we're going to define a template 
            const li = `

            <li>
              <!--  <div class="collapsible-header grey lighten-4"> <b>${guide.title}</b> - ${guide.content} </div>
                 <div class="collapsible-body white"> <p><i>Play button and respective chords of the song</i></p>  </div> -->

                 <div>
                 <link rel="stylesheet" type="text/css" href="{% static 'css/navbar.css'%}">
                 <ul>
                     <li><a href="{% url 'index' %}" styile="btn blue darken-2 z-depth-1">Home</a></li>
                     <li><a href="{% url 'upload' %}">Upload</a></li>
                     <li><a href="{% url 'db_posts' %}">Pool</a></li>
                 </ul>
             </div>
            </li>
        `;
            html += li;
        });
        guideList.innerHTML = html
    } else {
        guideList.innerHTML = `<div class="center">
        <header><h1>About "Need Chords ?"</h1></header>
    
        <p></p>
        <div>
            <p> <b>"Need Chords?"</b>  is a web app that allows you to retrieve chords from file. You have only to access with Google, go into the account page and upload a song. 
                Once you have uploaded it, press the "Need Chords" button and the system will automatically give you all the triades with the relative timestamps.
            </p>
    
            <p>However, the algorhytm is not perfect, so the system may declare that some chords are imprecise or even wrong. 
                This is how the app become a <b>social media</b>. It is up to you to eventually start a pool, asking to the other connected users
                to send a feedback. You can also set how many answer you need to complete the pool in the specific format provided.</p>
        </div>
        
    </div>`
    }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});