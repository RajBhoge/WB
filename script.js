'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Ensure that clicking on the "Blogs" link shows the blog section
const blogNavLink = document.querySelector("[data-nav-link='blog']");
const blogPage = document.querySelector("[data-page='blog']");

blogNavLink.addEventListener("click", function() {
  blogPage.classList.add("active");
});


// awards swipe hint
const awardsList = document.querySelector(".testimonials-list");
const swipeHint = document.querySelector("[data-swipe-hint]");
const swipeBtns = document.querySelectorAll("[data-swipe-btn]");

if (awardsList && swipeHint) {
  const updateSwipeHint = function () {
    const maxScroll = awardsList.scrollWidth - awardsList.clientWidth;
    swipeBtns[0].disabled = awardsList.scrollLeft <= 5;
    swipeBtns[1].disabled = awardsList.scrollLeft >= maxScroll - 5;
    swipeHint.classList.toggle("done", awardsList.scrollLeft >= maxScroll - 5);
    swipeHint.style.display = maxScroll <= 5 ? "none" : "";
  }

  swipeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = awardsList.querySelector(".testimonials-item");
      const step = card ? card.offsetWidth + 15 : awardsList.clientWidth;
      awardsList.scrollBy({ left: step * Number(btn.dataset.swipeBtn), behavior: "smooth" });
    });
  });

  awardsList.addEventListener("scroll", updateSwipeHint);
  window.addEventListener("resize", updateSwipeHint);
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    link.addEventListener("click", function () { setTimeout(updateSwipeHint, 50); });
  });
  updateSwipeHint();
}



// 3d avatar: tilt toward the cursor, flip on click
const avatar = document.querySelector("[data-avatar-3d]");
const avatarInner = document.querySelector("[data-avatar-inner]");

if (avatar && avatarInner) {
  let flipped = false;
  let tiltX = 0;
  let tiltY = 0;

  const renderAvatar = function () {
    avatarInner.style.transform =
      "perspective(600px) rotateX(" + tiltX + "deg) rotateY(" + (tiltY + (flipped ? 180 : 0)) + "deg)";
  }

  avatar.addEventListener("mousemove", function (e) {
    const rect = avatar.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    tiltY = (x - 0.5) * 30;
    tiltX = (0.5 - y) * 30;
    avatarInner.style.setProperty("--shine-x", x * 100 + "%");
    avatarInner.style.setProperty("--shine-y", y * 100 + "%");
    avatarInner.classList.add("tracking");
    renderAvatar();
  });

  avatar.addEventListener("mouseleave", function () {
    tiltX = 0;
    tiltY = 0;
    avatarInner.classList.remove("tracking");
    renderAvatar();
  });

  avatar.addEventListener("click", function () {
    flipped = !flipped;
    avatarInner.classList.remove("tracking");
    avatarInner.classList.toggle("flipped", flipped);
    renderAvatar();
  });
}



// bento tiles: spotlight follows the cursor
document.querySelectorAll("[data-bento-tile]").forEach(function (tile) {
  tile.addEventListener("mousemove", function (e) {
    const rect = tile.getBoundingClientRect();
    tile.style.setProperty("--mx", e.clientX - rect.left + "px");
    tile.style.setProperty("--my", e.clientY - rect.top + "px");
  });
});




// journey: split-flap board
const journeyStops = [
  {
    code: "BOM", city: "Mumbai, India", years: "2005 — 2021",
    what: "Grew up in Dombivli. School, junior college and a B.E. in Electronics & Telecommunication at Terna Engineering College."
  },
  {
    code: "PNQ", city: "Pune, India", years: "2021 — 2024",
    what: "Cloud Engineer at Atos, then DevOps Engineer at Eviden: AWS, Terraform, CI/CD and cloud migrations."
  },
  {
    code: "NUE", city: "Nuremberg, Germany", years: "2024 — Present",
    what: "M.Sc. ICT at FAU Erlangen-Nürnberg and AI Engineer at Innomotics, building RAG assistants and LLM evaluation."
  },
  {
    code: "MUC", city: "Munich, Germany", years: "2026 — Present",
    what: "Software Engineer Intern at Google, now Solution Architect at Speexx building an agentic RAG assistant."
  }
];

const flapCode = document.querySelector("[data-flap-code]");
const flapCity = document.querySelector("[data-flap-city]");
const flapYears = document.querySelector("[data-flap-years]");
const flapWhat = document.querySelector("[data-flap-what]");
const flapStatus = document.querySelector("[data-flap-status]");
const stopsList = document.querySelector("[data-journey-stops]");
const flapChars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ,.-";

// spin each cell through the alphabet until it lands on its letter
const setFlapText = function (row, text) {
  text = text.toUpperCase();
  while (row.children.length < text.length) {
    const cell = document.createElement("span");
    cell.className = "flap-cell blank";
    cell.textContent = " ";
    row.appendChild(cell);
  }
  while (row.children.length > text.length) row.lastChild.remove();

  Array.from(row.children).forEach(function (cell, i) {
    const target = text[i];
    clearInterval(cell.flapTimer);
    let steps = 0;
    const maxSteps = 4 + i + Math.floor(Math.random() * 4);
    cell.flapTimer = setInterval(function () {
      steps++;
      const done = steps >= maxSteps || cell.textContent === target;
      cell.textContent = done ? target : flapChars[Math.floor(Math.random() * flapChars.length)];
      cell.classList.toggle("blank", cell.textContent === " ");
      cell.classList.remove("flip");
      void cell.offsetWidth;
      cell.classList.add("flip");
      if (done) clearInterval(cell.flapTimer);
    }, 70);
  });
}

let activeStop = -1;
let tourTimer = null;

const showStop = function (index) {
  if (index === activeStop) return;
  activeStop = index;
  const stop = journeyStops[index];

  setFlapText(flapCode, stop.code);
  setFlapText(flapCity, stop.city);
  flapYears.textContent = stop.years;
  flapWhat.textContent = stop.what;
  flapStatus.textContent = index === journeyStops.length - 1 ? "Now based in" : "Stop " + (index + 1) + " of " + journeyStops.length;

  stopsList.querySelectorAll(".journey-stop").forEach(function (btn, i) {
    btn.classList.toggle("active", i === index);
  });
}

const stopTour = function () {
  clearInterval(tourTimer);
  tourTimer = null;
}

const startTour = function () {
  stopTour();
  tourTimer = setInterval(function () {
    showStop((activeStop + 1) % journeyStops.length);
  }, 5000);
}

journeyStops.forEach(function (stop, i) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.className = "journey-stop";
  [["journey-stop-code", stop.code], ["journey-stop-city", stop.city], ["journey-stop-years", stop.years]].forEach(function (part) {
    const span = document.createElement("span");
    span.className = part[0];
    span.textContent = part[1];
    btn.appendChild(span);
  });
  btn.addEventListener("click", function () {
    stopTour();
    showStop(i);
  });
  li.appendChild(btn);
  stopsList.appendChild(li);
});

document.querySelectorAll("[data-nav-link]").forEach(function (link) {
  link.addEventListener("click", function () {
    if (this.innerHTML.toLowerCase() === "journey") {
      if (activeStop === -1) showStop(0);
      if (!tourTimer) startTour();
    } else {
      stopTour();
    }
  });
});
