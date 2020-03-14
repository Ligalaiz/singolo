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

// Slide switch

const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".slider__btn--prev");
const nextBtn = document.querySelector(".slider__btn--next");
const slides = slider.querySelectorAll(".slider__item");
let slideIndex = 1;

slideShow(slideIndex);

function slideShow(n) {
  if (n < 1) {
    slideIndex = slides.length;
  } else if (n > slides.length) {
    slideIndex = 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}

function slideSwitch(n) {
  slideShow((slideIndex += n));
}

prevBtn.addEventListener("click", () => {
  slideSwitch(-1);
  slider.classList.toggle("slider--active");
});

nextBtn.addEventListener("click", () => {
  slideSwitch(1);
  slider.classList.toggle("slider--active");
});
