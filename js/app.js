/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//Reset all the section and navigation items to not be active
const cleanActive = () => {
    const navItems = document.querySelectorAll('.menu__link');
    const sections = document.querySelectorAll('section');

    navItems.forEach(navitem => navitem.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav= () => {
    const navUl = document.getElementById('navbar__list');
    const fragment = document.createDocumentFragment();
    const sections =  document.querySelectorAll('section');

    //add each nav bar item to the fragment for performace purpose
    sections.forEach(section => {
        const li = document.createElement('li');
        li.innerHTML = section.dataset.nav
        li.dataset.sectionid = section.id;
        li.classList.add('menu__link')
        fragment.appendChild(li);
    })

    navUl.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
const  makeActive = () => {
    console.log("We are here");
    const sections =  document.querySelectorAll('section');
    const VALUE = 150;
    cleanActive();
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        
        if (box.top <= VALUE && box.bottom >= VALUE) {
            section.classList.add('active');
            document.querySelector(`.menu__link[data-sectionid="${section.id}"]`).classList.add('active');
        }
    }
}

// Scroll to anchor ID using scrollTO event
const ScrollToSection = (event) => {
    //make sure that nav item for the section are the once being clicked
    //not other area of the nav bar
    if(event.target.tagName.toLowerCase() == 'li'){
        cleanActive();
        event.target.classList.add('active')
        const section = document.querySelector(`[data-nav="${event.target.innerHTML}"]`);
        section.classList.add('active');
        section.scrollIntoView({ behavior: "smooth"});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', buildNav );
// Scroll to section on link click
const ulNav = document.getElementById('navbar__list');
ulNav.addEventListener('click', ScrollToSection);
// Set sections as active
window.addEventListener('scroll', makeActive);


