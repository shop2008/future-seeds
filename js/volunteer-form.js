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

        if (form.checkValidity()) {
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
          }
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
}

// Call the validation function when the DOM is loaded
document.addEventListener("DOMContentLoaded", validateVolunteerForm);
