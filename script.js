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

document.addEventListener("scroll", onScroll);

function onScroll(e) {
  const curPos = window.scrollY;
  document.querySelectorAll("section").forEach(el => {
    if (
      el.offsetTop - 95.5 < curPos &&
      el.offsetTop - 95.5 + el.offsetHeight > curPos
    ) {
      links.forEach(a => {
        a.classList.remove("nav__link--active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.classList.add("nav__link--active");
        }
      });
    } else if (window.pageYOffset > 2500) {
      links.forEach(a => {
        a.classList.remove("nav__link--active");
      });
      links[links.length - 1].classList.add("nav__link--active");
    } else if (window.pageYOffset == 0) {
      links.forEach(a => {
        a.classList.remove("nav__link--active");
      });
      links[0].classList.add("nav__link--active");
    }
  });
}

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
let slideIndex = 0;
let isEnabled = true;

function slideShow(n) {
  slideIndex = (n + slides.length) % slides.length;
}

function hideItem(direction) {
  isEnabled = false;
  slides[slideIndex].classList.add(direction);
  slides[slideIndex].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  slides[slideIndex].classList.add("next", direction);
  slides[slideIndex].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem("to-left");
  slideShow(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  slideShow(n - 1);
  showItem("from-left");
}

prevBtn.addEventListener("click", function() {
  if (isEnabled) {
    previousItem(slideIndex);
  }
});

nextBtn.addEventListener("click", function() {
  if (isEnabled) {
    nextItem(slideIndex);
  }
});

// Activating Phone Screens

let phoneVertical = slider.querySelector(".phone-vertical");
let phoneHorizontal = slider.querySelector(".phone-horizontal");
let screenExistV = 0;
let screenExistH = 0;

phoneVertical.addEventListener("click", () => {
  if (screenExistV) {
    slider.querySelector("#phone-vertical").src =
      "assets/img/slider/phone-vertical.png";
    screenExistV = 0;
  } else {
    slider.querySelector("#phone-vertical").src =
      "assets/img/slider/phone-vertical--off.png";
    screenExistV = 1;
  }
});

phoneHorizontal.addEventListener("click", () => {
  if (screenExistH) {
    slider.querySelector("#phone-horizontal").src =
      "assets/img/slider/phone-horizontal.png";
    screenExistH = 0;
  } else {
    slider.querySelector("#phone-horizontal").src =
      "assets/img/slider/phone-horizontal--off.png";
    screenExistH = 1;
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

// Menu

const btnMenu = document.querySelector(".main-header__btn");
const logoMenu = header.querySelector(".main-header__logo");
const menuWrap = header.querySelector(".main-header__menu");

btnMenu.addEventListener("click", e => {
  e.preventDefault();
  MENU.classList.toggle("nav--active");
  logoMenu.classList.toggle("logo--active");
  btnMenu.classList.toggle("main-header__btn--active");
  overlay.classList.toggle("overlay--active");
  menuWrap.classList.toggle("main-header__menu--active");
});

MENU.addEventListener("click", e => {
  if (e.target.classList.contains("nav__link")) {
    MENU.classList.remove("nav--active");
    logoMenu.classList.remove("logo--active");
    btnMenu.classList.remove("main-header__btn--active");
    overlay.classList.remove("overlay--active");
    menuWrap.classList.remove("main-header__menu--active");
  }
});

overlay.addEventListener("click", e => {
  MENU.classList.remove("nav--active");
  logoMenu.classList.remove("logo--active");
  btnMenu.classList.remove("main-header__btn--active");
  overlay.classList.remove("overlay--active");
  menuWrap.classList.remove("main-header__menu--active");
});
