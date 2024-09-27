document.addEventListener("DOMContentLoaded", function () {
  // Include header and footer
  includeHTML("body > header", "header.html", setActiveNavItem);
  includeHTML("body > footer", "footer.html");
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
    }
  }
}