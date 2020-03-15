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

// Activating Phone Screens

let phoneVertical = slider.querySelector(".phone-vertical");
let phoneHorizontal = slider.querySelector(".phone-horizontal");
let screenExist = 0;

phoneVertical.addEventListener("click", () => {
  if (screenExist) {
    slider.querySelector("#phone-vertical").src =
      "assets/img/slider/phone-vertical.png";
    screenExist = 0;
  } else {
    slider.querySelector("#phone-vertical").src =
      "assets/img/slider/phone-vertical--off.png";
    screenExist = 1;
  }
});

phoneHorizontal.addEventListener("click", () => {
  if (screenExist) {
    slider.querySelector("#phone-horizontal").src =
      "assets/img/slider/phone-horizontal.png";
    screenExist = 0;
  } else {
    slider.querySelector("#phone-horizontal").src =
      "assets/img/slider/phone-horizontal--off.png";
    screenExist = 1;
  }
});

// Tab Switching

const filter = document.querySelector(".filter");
const tabs = filter.querySelectorAll(".filter__btn");
const layouts = document.querySelector(".layouts");
const layoutsItm = document.querySelectorAll(".layouts__item");
const layoutsImg = layouts.querySelectorAll(".layouts__item  img");

filter.addEventListener("click", evt => {
  evt.preventDefault();
  let target = evt.target;
  if (
    target.classList.contains("filter__btn") &&
    !target.classList.contains("filter__btn--active")
  ) {
    for (let tab of tabs) {
      tab.classList.remove("filter__btn--active");
    }
    evt.target.classList.add("filter__btn--active");
    for (let i = 0; i < layoutsItm.length; i++) {
      layoutsItm[i].style.order = Math.round(
        1 - 0.5 + Math.random() * (layoutsItm.length - 1 + 1)
      );
    }
  }
});

// Image Interaction

layouts.addEventListener("click", evt => {
  evt.preventDefault();
  let target = evt.target;
  for (let img of layoutsImg) {
    img.classList.remove("layouts__item--active");
  }
  if (target.classList.contains("layouts__img")) {
    evt.target.classList.add("layouts__item--active");
  }
});

// Popup

const submit = document.querySelector(".form__btn");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const popupBtn = popup.querySelector(".popup__btn");
const name = document.getElementById("name");
const mail = document.getElementById("email");
const subject = document.getElementById("subject");
const detail = document.getElementById("detail");
const subjectPopup = popup.querySelector(".popup__subject");
const detailPopup = popup.querySelector(".popup__detail");

submit.addEventListener("click", evt => {
  evt.preventDefault();
  if (name.value != "" || mail.value != "") {
    overlay.classList.add("overlay--active");
    document.querySelector("body").style.overflow = "hidden";
    popup.classList.add("popup--active");
    subjectPopup.textContent =
      subject.value == "" ? "Без темы" : `Тема: ${subject.value}`;
    detailPopup.textContent =
      detail.value == "" ? "Без описания" : `Описание: ${detail.value}`;
  }
});

popupBtn.addEventListener("click", evt => {
  evt.preventDefault();
  overlay.classList.remove("overlay--active");
  document.querySelector("body").style.overflow = "visible";
  popup.classList.remove("popup--active");
  name.value = "";
  mail.value = "";
  subject.value = "";
  detail.value = "";
});

overlay.addEventListener("click", evt => {
  evt.preventDefault();
  overlay.classList.remove("overlay--active");
  document.querySelector("body").style.overflow = "visible";
  popup.classList.remove("popup--active");
  name.value = "";
  mail.value = "";
  subject.value = "";
  detail.value = "";
});
