// Global variables
const menuToggleIcon = document.getElementById('menu-toggle-icon')
const navMobile = document.getElementById('nav');
const headerElement = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-mobile .list-link');



console.log(navLinks);

// Toggle navigation
const toggleMenu = () =>{
    navMobile.classList.toggle('active');
    headerElement.classList.toggle('active');
}

menuToggleIcon.addEventListener('click', toggleMenu);

//Add/remove header border bottom on scroll
const headerScorllEvent = () => {
    if(this.scrollY >= 30){
        headerElement.classList.add('active-scroll');
    }else{
        headerElement.classList.remove('active-scroll');
    }
}

window.addEventListener('scroll', headerScorllEvent)

// Add selected link styles to the link clicked and close navigation when clicking the links
navLinks.forEach(Link => Link.addEventListener('click', () => {
    navMobile.classList.remove('active');
    headerElement.classList.remove('active');

    let current = document.getElementsByClassName('current');
    current[0].className = current[0].className.replace('current', "");
    Link.className += " current";
}));

// Scroll Reveal
const sr = ScrollReveal({
    distance: '25px',
    duration: 2500
});

sr.reveal(`.image-left, .popular-destinations-data,
.plan-trip-data`, {
    origin: 'left'
})

sr.reveal('.image-center', {
    origin: 'bottom'
})

sr.reveal(`.image-right, .showcase-data`, {
    origin: 'right'
})

sr.reveal('beach-data-wrapper', {
    origin: 'bottom',
    interveral: 250
})

sr.reveal('.newsletter-container', {
    origin: 'top'
})

sr.reveal(`.footer-container-inner > div, .footer-separaor,
.copyright`, {
    origin: 'bottom',
    interval: 250
})


// Trigger the server start
function startServer() {
    fetch('/start-server')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to start server.');
        }
        console.log('Server started successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Trigger the build process
  function runBuild() {
    fetch('/run-build')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to run build.');
        }
        console.log('Build process completed successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  }



//click changing page
document.getElementById("Plantravel").onclick = function(){
    // Trigger the server and build process when the user clicks a button
    startServer();
    runBuild();
    console.log("click success")
    window.location.href = "./src/client/views/index.html"
}