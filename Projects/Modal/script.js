'use strict';


const btnShowModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");


const showModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const hideModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

for (let i = 0; i < 3; i++) {
    btnShowModal[i].addEventListener("click", showModal);
}

btnCloseModal.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

// keyboard event is so called global event because it does not happen on one specific type of event so we listen on the whole document 

// information about which key was pressed will be stored in The event object that is gonna occur as soon As any key is pressed. 
document.addEventListener("keydown", function (e) { // e-> event object 
    if (e.key === "escape" && !modal.classList.contains("hidden")) {
        hideModal();
    }
})