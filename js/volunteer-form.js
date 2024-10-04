// Form validation
function validateVolunteerForm() {
  "use strict";

  let forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Custom phone number validation
        let phoneInput = form.querySelector("#phone");
        if (phoneInput) {
          let phoneNumber = phoneInput.value.replace(/\D/g, "");
          if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            phoneInput.setCustomValidity(
              "Please enter a valid phone number with 10-15 digits."
            );
          } else {
            phoneInput.setCustomValidity("");
          }
        }

        if (form.checkValidity()) {
          // If the form is valid, show the modal
          let modal = new bootstrap.Modal(
            document.getElementById("submissionModal")
          );
          modal.show();

          // Reset the form and remove validation classes
          form.reset();
          form.classList.remove("was-validated");

          // Clear any remaining invalid feedback
          form.querySelectorAll(".is-invalid").forEach((element) => {
            element.classList.remove("is-invalid");
          });

          // Clear custom validity on phone input
          if (phoneInput) {
            phoneInput.setCustomValidity("");
          }
        } else {
          // If the form is invalid, add the was-validated class
          form.classList.add("was-validated");
        }
      },
      false
    );
  });
}

// Call the validation function when the DOM is loaded
document.addEventListener("DOMContentLoaded", validateVolunteerForm);
