// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", initializeApp);

// Global Variables
let currentPathname = location.pathname;
let isLoading = false;

// Main Initialization Function
function initializeApp() {
  includeHTML("body > header", "header.html", () => {
    setActiveNavItem();
  });
  includeHTML("body > footer", "footer.html");
  setupEventListeners();
  setupFormListeners();
  AOS.init();
}

// Event Listeners Setup
function setupEventListeners() {
  window.addEventListener("popstate", handlePopState);
  setupExploreMoreButtons();
}

function setupExploreMoreButtons() {
  const buttons = document.querySelectorAll(
    'a.btn-primary[href="about.html"], a.btn-primary[href="contact.html"], a.btn-primary[href="projects.html"], a.btn-primary[href="get-involved.html"]'
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      navigateTo(this.getAttribute("href"));
    });
  });
}

// Navigate to a new URL
function navigateTo(url) {
  console.log(`Navigating to ${url}`);
  loadContent(url);
  history.pushState(null, null, url);
}

// Handle Browser Back/Forward
function handlePopState(event) {
  const newPathname = location.pathname;
  console.log(
    `Popstate event: considering navigation from ${currentPathname} to ${newPathname}`
  );
  loadContent(newPathname);
  currentPathname = newPathname;
}

// Load Content
function loadContent(url) {
  if (isLoading) {
    console.log("Content is already loading. Ignoring this request.");
    return;
  }

  isLoading = true;
  const main = document.querySelector("main");
  console.log(`Loading content from ${url}`);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      destroyCarousel();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      main.innerHTML = doc.querySelector("main").innerHTML;
      setActiveNavItem();
      initializeCarousel();
      window.scrollTo(0, 0);
      setupFormListeners();
      setupExploreMoreButtons();
    })
    .catch((error) => console.error(`Error loading ${url}:`, error))
    .finally(() => {
      isLoading = false;
    });
}

// Include HTML Content
function includeHTML(selector, filePath, callback) {
  const element = document.querySelector(selector);
  if (!element) return;

  console.log(`Including HTML from ${filePath} into ${selector}`);
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      element.outerHTML = data;
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => console.error(`Error loading ${filePath}:`, error));
}

// Set Active Navigation Item
function setActiveNavItem() {
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll("nav .nav-link");
  const isRootPage =
    currentLocation.endsWith("/") || currentLocation.endsWith("/index.html");

  console.log(`Setting active navigation item for ${currentLocation}`);

  menuItems.forEach((menuItem, index) => {
    if ((isRootPage && index === 0) || menuItem.href === currentLocation) {
      menuItem.classList.add("active");
    } else {
      menuItem.classList.remove("active");
    }
  });

  // Remove existing event listener
  const nav = document.querySelector("nav");
  nav.removeEventListener("click", handleNavClick);
  // Add new event listener to the nav element
  nav.addEventListener("click", handleNavClick);
}

function handleNavClick(event) {
  const target = event.target;
  if (target.classList.contains("nav-link")) {
    event.preventDefault();
    const url = target.getAttribute("href");
    navigateTo(url);

    // Close the mobile menu after navigation
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  }
}

// Initialize Bootstrap Carousel
let carouselInstance = null;

function initializeCarousel() {
  const carouselElement = document.querySelector("#galleryCarousel");
  if (!carouselElement) {
    console.log("No Carousel container found on this page.");
    return;
  }

  if (carouselInstance) {
    console.log("Carousel already initialized. Skipping initialization.");
    return;
  }

  console.log("Initializing Bootstrap Carousel");

  carouselInstance = new bootstrap.Carousel(carouselElement, {
    interval: 3000,
    wrap: true,
    keyboard: false,
  });
}

function destroyCarousel() {
  if (carouselInstance) {
    carouselInstance.dispose();
    carouselInstance = null;
    console.log("Carousel destroyed");
  }
}

//contact us page form validation//

function validateEmail() {
  const email = document.getElementById("email");
  if (email.value.match(/^\S+@\S+\.\S+$/)) {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
  }
}

function validateName() {
  const name = document.getElementById("name");
  const nameValue = name.value.trim();

  const alphabetRegex = /^[a-zA-Z\s]*$/;

  if (nameValue.length >= 2 && alphabetRegex.test(nameValue)) {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
  } else {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
  }
}

//   if (name.value.trim().length >= 2) {
//     name.classList.add("is-valid");
//     name.classList.remove("is-invalid");
//   } else {
//     name.classList.add("is-invalid");
//     name.classList.remove("is-valid");
//   }
// }

function validateMessage() {
  const message = document.getElementById("message");
  if (message.value.trim() !== "") {
    message.classList.add("is-valid");
    message.classList.remove("is-invalid");
  } else {
    message.classList.add("is-invalid");
    message.classList.remove("is-valid");
  }
}

// Reset validation classes
function resetValidationClasses() {
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid"); // Remove both classes
  });
}

// Form submission function
function formValidation() {
  validateEmail();
  validateName();
  validateMessage();

  const isValid = document.querySelectorAll(".is-valid").length === 3; // All 3 fields valid
  return isValid;
}

// Setup form listeners
function setupFormListeners() {
  const emailElement = document.getElementById("email");
  if (emailElement) {
    emailElement.addEventListener("input", validateEmail);
  }
  const nameElement = document.getElementById("name");
  if (nameElement) {
    nameElement.addEventListener("input", validateName);
  }
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.addEventListener("input", validateMessage);
  }
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }
}

// Handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  if (formValidation()) {
    // Get the values from the form fields
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    // Print the form data to the console
    console.log("Email:", email);
    console.log("Full Name:", name);
    console.log("Message:", message);

    // Handle form submission if valid
    console.log("Form Submitted!");

    var submissionModal = new bootstrap.Modal(
      document.getElementById("submissionModal")
    );
    submissionModal.show();

    document.getElementById("contactForm").reset(); // Reset form
    resetValidationClasses();
  } else {
    console.log("Form is not valid!");
  }
}

// Attach form submission listener
document.getElementById("contactForm").addEventListener("submit", handleFormSubmission);
