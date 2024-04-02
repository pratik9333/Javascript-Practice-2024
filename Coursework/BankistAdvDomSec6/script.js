'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btn = document.querySelector(".btn--scroll-to");
const sec = document.querySelector("#section--1");

const h1 = document.querySelector("h1");
const header = document.querySelector('.header');

// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height + 20;


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// *** LEC WORK ***

// Selecting, Creating and Deleting elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll(".section");
console.log(allSections)

document.getElementById('section--1')

const allButtons = document.getElementsByClassName('btn');

console.log("All Buttons",allButtons);

console.log(document.getElementsByTagName('btn'));

// Creating And Inserting Elements

// insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

message.textContent = "We used cookie for the improved functionality and analytics"

message.innerHTML = 'We used cookie for the improved functionality and analytics. <button class="btn btn--close-cookie">Got it ! </button> '

header.prepend(message);

header.append(message);

// head.append(message.cloneNode(true))

header.before(message)

header.after(message)

// Delete Elements
document.querySelector('.cookie-message').addEventListener('click',() => {
    message.remove();
    // old way
    // message.parentElement.removeChild(message)
})

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%'

console.log(message.style.color)
console.log(message.style.backgroundColor)

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) +30+'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non Standard
console.log(logo.designer)
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist')

console.log(logo.src);
console.log(logo.getAttribute('src'))

const link = document.querySelector('.nav__link--btn');
console.log(link.href)
console.log(link.getAttribute("href"));

// data attributes
console.log(logo.dataset.versionNumber);

// classes

logo.classList.add("c", 'j')
logo.classList.remove("c", 'k')
logo.classList.contains("c")
logo.classList.toggle("c")

// Do not use this as this will overrite other classes 
// logo.className = 'jonas'

// smooth scrolling

// btn.addEventListener('click', () => {
//   sec.scrollIntoView({behavior: "smooth"});
// });


// Types of events and event handers
const mouseEnter = function (e){
  alert("you are reading the heading");
}

// adding event listener
h1.addEventListener("mouseenter", mouseEnter);

// removing event listener
setTimeout(() => {
  h1.removeEventListener("mouseenter", mouseEnter)
}, 3000);

// Event propagation

// rgb(255,255,255)

const randomInt = (min,max) => Math.floor(Math.random() * (max-min)+1);

const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;


document.querySelector(".nav__link").addEventListener("click", function(e) {
  // this pointing to the element on which the event handler is attached. 
  e.preventDefault();
  // this.style.backgroundColor = randomColor();
  //console.log("navlink", e.target, e.currentTarget);

  // e.currentTarget() === this

  // stop propagation
  //e.stopPropagation();
})

document.querySelector(".nav__links").addEventListener("keyup", function(e) {
  e.preventDefault();

  // this.style.backgroundColor = randomColor();
  //console.log("container", e.target, e.currentTarget);
})

document.querySelector(".nav").addEventListener("click", function(e) {
  e.preventDefault();

  // this.style.backgroundColor = randomColor();
  //console.log("nav", e.target, e.currentTarget);
})


// Using the power of event bubbling, using event delegation

// document.querySelectorAll(".nav__link").forEach(el => el.addEventListener("click", function(e) {
//   e.preventDefault();
//   const id  = this.getAttribute("href");

//   document.querySelector(id).scrollIntoView({behavior: "smooth"})
// }))


// 1. Add event listener to common parent element 

// 2. Determine what element orignated the event 

document.querySelector(".nav__links").addEventListener("click", function(e){
  e.preventDefault();
  // Matching strategy
  if(e.target.classList.contains("nav__link")){
    const id  = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"})
  }
})

// Tabbed Component
tabsContainer.addEventListener("click", function(e){
  const clicked = e.target.closest(".operations__tab");

  // guard clause
  if(!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));

  // activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")

})

// Menu Fade Animation
const handleHover = function(e){
  if(e.target.classList.contains("nav__link")){
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    })
  }
}








// Sticky Navigation: Intersection Observer API

// What is intersection obersver api ? -> It allows our code to basically observe changes to the way that the certain target element intersects another element or the way it intersects the viewport.

// this callback function will get called each time that the observered element is intersecting the root element at the threshold we defined. 
const obsCallback = (entries, observer) => {
  //entries.forEach(entry => console.log(entry))
};

const obsOptions = {
  root: null, // root is the element that the target is intersecting or null so that we will be able to observe target element intersecting the entire viewport.
  threshold: [0, 0.1], // percentage of intersection at which the observer callback will be called.
  // 0% means the callback will be called each time when target elememt moves completely out of the view and also as soon as it enters the view. opposite for 1 :))
}

const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(sec); // this is the target

const stickyNav = function([entry]){
  if(!entry.isIntersecting){
    nav.classList.add("sticky");
  }
  else{
    nav.classList.remove("sticky");
  }
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, 
  threshold: 0,
  rootMargin: "-"+navHeight+"px"
});

headerObserver.observe(header);


// Revealing Elements on scroll

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden")
})

// Lazy Loading Images

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function(){
    entry.target.classList.remove("lazy-img");
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});

imgTargets.forEach(img => imgObserver.observe(img));







// Bind method creates a copy of the function that is called on and it will set the this keyword in this function Call to whatever value we passed into bind. 

// Passing "argument" into handler 
document.querySelector(".nav").addEventListener("mouseover", handleHover.bind(0.5))

document.querySelector(".nav").addEventListener("mouseout", handleHover.bind(1))

// Dom Traversing - we can select element based on other elements, sometimes we need to select relative to Certain other element. eg - direct child or direct parent element. 


// Closest method is the opposite of querySelector method. both receive a query string, but querySelector find children no matter how deep in the dom tree while closest method find parents no matter how far up in the dom tree. 

// Going downwards: child
h1.querySelectorAll(".highlight")
h1.childNodes;
h1.children;

h1.firstElementChild.style.color = "white";

h1.lastElementChild.style.color = "orangered";

// Going upwards: parents

h1.parentNode;
h1.parentElement;
//console.log(h1.closest(".header"));
//h1.closest(".header").style.background = "var(--gradient-secondary)";

//h1.closest("h1").style.background = "var(--gradient-primary)";

// going sideways : siblings

h1.previousElementSibling;
h1.nextElementSibling;

h1.parentElement.children;



