"use strict";

const MENU = document.querySelector(".nav");
const header = document.querySelector(".main-header");
const links = document.querySelectorAll(".nav__link");
const anchors = document.querySelectorAll('a[href^="#"]');

// Active menu item

MENU.addEventListener("click", evt => {
  links.forEach(el => el.classList.remove("nav__link--active"));
  evt.target.classList.add("nav__link--active");
});

// Smooth scroll

for (let i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener("click", evt => {
    evt.preventDefault();
    const blockID = anchors[i].getAttribute("href");
    document.querySelector(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

// Menu fixed position

window.addEventListener("scroll", function() {
  if (pageYOffset >= 100) {
    header.classList.add("menu--fixed");
  } else {
    header.classList.remove("menu--fixed");
  }
});
