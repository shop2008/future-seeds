// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", initializeApp);

// Global Variables
let currentPathname = location.pathname;

// Main Initialization Function
function initializeApp() {
  includeHTML("body > header", "header.html", setActiveNavItem);
  includeHTML("body > footer", "footer.html");
  setupEventListeners();
}

// Event Listeners Setup
function setupEventListeners() {
  document.body.addEventListener("click", handleNavigation);
  window.addEventListener("popstate", handlePopState);
}

// Navigation Handler
function handleNavigation(event) {
  if (
    event.target.matches("a.nav-link") ||
    event.target.matches("a[href='contact.html']") ||
    event.target.matches("a[href='about.html']") ||
    event.target.matches("a[href='projects.html']") ||
    event.target.matches("a[href='get-involved.html']")
  ) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    navigateTo(url);
  } else {
    console.log(
      `Not a navigation link or contact link: ${event.target.tagName}`
    );
  }
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
  const main = document.querySelector("main");
  console.log(`Loading content from ${url}`);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      main.innerHTML = doc.querySelector("main").innerHTML;
      setActiveNavItem();
      initializeSwiper();
      window.scrollTo(0, 0);
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
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
  const menuLength = menuItems.length;
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
}

// Initialize Swiper
function initializeSwiper() {
  const swiperContainer = document.querySelector(".gallery-swiper");
  if (!swiperContainer) {
    console.log("No Swiper container found on this page.");
    return;
  }

  console.log("Initializing Swiper");
  new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

//contact us page form validation//

document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("message").addEventListener("input", validateMessage);


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
    if (name.value.trim().length >= 2) {
      name.classList.add("is-valid");
      name.classList.remove("is-invalid");
    } else {
      name.classList.add("is-invalid");
      name.classList.remove("is-valid");
    }
}

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
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.classList.remove('is-valid', 'is-invalid'); // Remove both classes
  });
}

// Form submission function
function formValidation() {
    validateEmail();
    validateName();
    validateMessage();
    
    const isValid = document.querySelectorAll('.is-valid').length === 3; // All 3 fields valid
    return isValid;
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
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
    

        var submissionModal = new bootstrap.Modal(document.getElementById('submissionModal'));
        submissionModal.show();

        document.getElementById("contactForm").reset(); // Reset form
        resetValidationClasses();
      } else {
        console.log("Form is not valid!");
      }
});


