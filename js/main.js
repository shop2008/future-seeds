document.addEventListener("DOMContentLoaded", function () {
  // Include header and footer
  includeHTML("body > header", "header.html", setActiveNavItem);
  includeHTML("body > footer", "footer.html");

  // Handle navigation clicks
  document.body.addEventListener("click", function (event) {
    // Check if the clicked element is a navigation link
    if (event.target.matches("a.nav-link")) {
      event.preventDefault(); // Prevent the default link behavior
      const url = event.target.getAttribute("href"); // Get the URL from the link
      console.log(`Navigating to ${url}`);
      loadContent(url); // Load the content for the new URL
      history.pushState(null, null, url); // Update the browser history
    }
  });

  // Handle back/forward navigation
  window.addEventListener("popstate", function () {
    console.log(`Popstate event: navigating to ${location.pathname}`);
    loadContent(location.pathname); // Load content based on the current URL
  });

  // Initial content load
  console.log(`Initial load: navigating to ${location.pathname}`);
  loadContent(location.pathname); // Load content for the initial page load
});

// Function to include HTML content from a file into a specified element
function includeHTML(selector, filePath, callback) {
  const element = document.querySelector(selector);
  if (!element) return;

  console.log(`Including HTML from ${filePath} into ${selector}`);
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      element.outerHTML = data; // Replace the element's outer HTML with the fetched content
      if (callback && typeof callback === "function") {
        callback(); // Call the callback function if provided
      }
    })
    .catch((error) => console.error(`Error loading ${filePath}:`, error));
}

// Function to load content dynamically into the main element
function loadContent(url) {
  const main = document.querySelector("main");
  console.log(`Loading content from ${url}`);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      main.innerHTML = doc.querySelector("main").innerHTML; // Update the main element's content
      setActiveNavItem(); // Update the active navigation item
      initializeSwiper(); // Reinitialize Swiper after content load
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
}

// Function to set the active navigation item based on the current URL
function setActiveNavItem() {
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll("nav .nav-link");
  const menuLength = menuItems.length;
  const isRootPage =
    currentLocation.endsWith("/") || currentLocation.endsWith("/index.html");

  console.log(`Setting active navigation item for ${currentLocation}`);
  for (let i = 0; i < menuLength; i++) {
    const menuItem = menuItems[i];

    if ((isRootPage && i === 0) || menuItem.href === currentLocation) {
      menuItem.classList.add("active"); // Add active class to the current menu item
    } else {
      menuItem.classList.remove("active"); // Remove active class from other menu items
    }
  }
}

// Function to initialize the Swiper instance
function initializeSwiper() {
  const swiperContainer = document.querySelector(".gallery-swiper");
  if (!swiperContainer) {
    console.log("No Swiper container found on this page.");
    return; // Exit if no Swiper container is found
  }

  console.log("Initializing Swiper");
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
}
