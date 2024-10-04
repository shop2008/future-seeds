document.addEventListener('DOMContentLoaded', function () {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const selectedAmountDisplay = document.getElementById('selectedAmount');
    const donationForm = document.getElementById('donationForm');
    const oneTimeButton = document.querySelector('label[for="oneTime"]');
    const monthlyButton = document.querySelector('label[for="monthly"]');
    const amountAlert = document.getElementById('amountAlert');
    let selectedAmount = 20; // Default amount

    // Handle donation type button clicks
// Handle donation type button clicks
document.querySelectorAll('input[name="donationType"]').forEach(button => {
    button.addEventListener('change', function () {
        // Toggle active state for One-Time and Monthly buttons
        if (this.id === 'oneTime') {
            oneTimeButton.classList.add('active');
            monthlyButton.classList.remove('active');
        } else {
            monthlyButton.classList.add('active');
            oneTimeButton.classList.remove('active');
        }
    });
});

// Ensure initial state is correct (in case the page loads with a checked button)
if (document.getElementById('oneTime').checked) {
    oneTimeButton.classList.add('active');
} else {
    monthlyButton.classList.add('active');
}

    // Handle donation amount button clicks
    amountButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedAmount = parseInt(this.getAttribute('data-amount'), 10);
            customAmountInput.value = ''; // Clear custom amount when a button is clicked
            selectedAmountDisplay.innerText = `$${selectedAmount}`; // Ensure dollar sign is shown
            amountAlert.classList.add('d-none'); // Hide any previous error message

            // Remove active class from all amount buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');
        });
    });

    // Handle custom amount input
    customAmountInput.addEventListener('input', function () {
        const customAmount = parseFloat(customAmountInput.value);
        if (customAmount >= 0) {
            selectedAmount = customAmount;
            selectedAmountDisplay.innerText = `$${selectedAmount}`; // Ensure dollar sign is shown
            amountAlert.classList.add('d-none'); // Hide any previous error message

            // Remove active class from all buttons when custom amount is typed
            amountButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            selectedAmountDisplay.innerText = '$0'; // Display $0 for invalid input
            amountAlert.classList.remove('d-none'); // Show error message if the amount is invalid
        }
    });

    // Eye icon toggle for CVV
    const cvvInput = document.getElementById('cvv');
    const eyeIcon = document.getElementById('cvv-eye');

    eyeIcon.addEventListener('click', function () {
        if (cvvInput.type === 'password') {
            cvvInput.type = 'text'; // Show CVV
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye'); // Change to eye icon
        } else {
            cvvInput.type = 'password'; // Hide CVV
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash'); // Change to eye -slash icon
        }
    });

    // Validate and submit form
    donationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Run the validation and check if it's valid
        const isValid = validateForm();

        if (!isValid) {
            donationForm.classList.add('was-validated'); // Show validation error
        } else {
            showConfirmationModal(selectedAmount); // Show confirmation modal if all fields are valid
        }
    });

    // Custom validation function
    function validateForm() {
        let isValid = true;

        // Validate First Name and Last Name
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        isValid = validateTextField(firstName, 'Please enter your first name.') && isValid;
        isValid = validateTextField(lastName, 'Please enter your last name.') && isValid;

        // Validate Email with regex
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = validateFieldWithRegex(email, emailRegex, 'Please enter a valid email address.') && isValid;

        // Validate Card Number with regex (16 digits)
        const cardNumber = document.getElementById('cardNumber');
        const cardNumberRegex = /^\d{16}$/;
        isValid = validateFieldWithRegex(cardNumber, cardNumberRegex, 'Please enter a valid 16-digit card number.') && isValid;

        // Validate Expiry Date with regex (MM/YY)
        const expiryDate = document.getElementById('expiryDate');
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        isValid = validateFieldWithRegex(expiryDate, expiryDateRegex, 'Please enter a valid expiration date (MM/YY).') && isValid;

        // Validate CVV with regex (3 digits)
        const cvv = document.getElementById('cvv');
        const cvvRegex = /^\d{3}$/;
        isValid = validateFieldWithRegex(cvv, cvvRegex, 'Please enter a valid cvv).') && isValid;

        // Validate the custom amount or selected amount
        if (selectedAmount <= 0 || isNaN(selectedAmount)) {
            amountAlert.classList.remove('d-none'); // Show alert if amount is invalid
            isValid = false;
        }

        return isValid; // Form will proceed only if all validations are true
    }

    // Validate text fields (first and last name)
    function validateTextField(field, errorMessage) {
        if (!field.value.trim()) {
            setInvalidField(field, errorMessage);
            return false;
        } else {
            clearErrorField(field); // Clear error message without adding 'is-valid' class
            return true;
        }
    }

    // Validate fields with regex
    function validateFieldWithRegex(field, regex, errorMessage) {
        if (!regex.test(field.value)) {
            setInvalidField(field, errorMessage);
            return false;
        } else {
            clearErrorField(field); // Clear error message without adding 'is-valid' class
            return true;
        }
    }

    // Set a field as invalid and show error message
    function setInvalidField(field, errorMessage) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid'); // Ensure valid class is removed
        field.nextElementSibling.textContent = errorMessage;
    }

    // Clear error message without showing the green tick (no 'is-valid' class)
    function clearErrorField(field) {
        field.classList.remove('is-invalid');
        field.nextElementSibling.textContent = ''; // Clear error message
    }

    // Show confirmation modal
    function showConfirmationModal(amount) {
        createDynamicModal({
            title: 'Confirm Your Donation',
            body: `<p>You are about to donate <strong>$${amount}</strong>. Do you want to proceed?</p>`,
            confirmText: 'Confirm Donation',
            onConfirm: function () {
                replaceContentWithSuccessMessage(amount); // Replace content with success message
            },
            cancelText: 'Cancel',
            onCancel: function () {
                console.log('Donation canceled');
            }
        });
    }

    // Replace the content of the donate.html page with a success message and feedback form
    function replaceContentWithSuccessMessage(amount) {
        const contentArea = document.querySelector('main'); // Replace main content area
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="container my-5 text-center">
                    <h2 class="mb-4">Thank You for Your Donation!</h2>
                    <p>We sincerely appreciate your generous donation of <strong>$${amount}</strong>.</p>
                    <p>Your support helps us continue our mission to provide education and healthcare to children in need.</p>

                    <div class="mt-5">
                        <h3>We Value Your Feedback</h3>
                        <form id="feedbackForm" class="mt-3">
                            <div class="form-group">
                                <textarea class="form-control" id="feedback" rows="4" placeholder="Please leave your feedback..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-success mt-3">Submit Feedback</button>
                        </form>
                    </div>
                </div>
            `;

            document.getElementById('feedbackForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const feedback = document.getElementById('feedback').value.trim();
                if (feedback) {
                    console.log('Feedback submitted:', feedback);
                    showThankYouModal();
                } else {
                    alert('Please enter your feedback.');
                }
            });
        }
    }

    // Show "Thank You for Feedback" modal with return to home button
    function showThankYouModal() {
        createDynamicModal({
            title: 'Thank You for Your Feedback!',
            body: `<p>We truly appreciate your feedback. Your input helps us to improve our services.</p>`,
            confirmText: 'Return to Home',
            onConfirm: function () {
                window.location.href = 'index.html'; // Redirect to home page
            }

        });
    }
});


