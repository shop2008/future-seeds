document.addEventListener("DOMContentLoaded", function () {
  // Include header and footer
  includeHTML("body > header", "header.html", setActiveNavItem);
  includeHTML("body > footer", "footer.html");

  const gallerySwiper = new Swiper(".gallery-swiper", {
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
});

function includeHTML(selector, filePath, callback) {
  const element = document.querySelector(selector);
  if (!element) return;

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

function setActiveNavItem() {
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll("nav .nav-link");
  const menuLength = menuItems.length;
  for (let i = 0; i < menuLength; i++) {
    if (menuItems[i].href === currentLocation) {
      menuItems[i].classList.add("active");
    } else {
      menuItems[i].classList.remove("active");
    }
  }
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


