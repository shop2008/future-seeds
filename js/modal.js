/**
 * Create a reusable Bootstrap modal with dynamic content.
 * @param {Object} options - Options for the modal configuration.
 * @param {String} options.title - The title of the modal.
 * @param {String} options.body - The HTML content for the modal body.
 * @param {String} [options.confirmText] - The text for the confirm button (optional).
 * @param {Function} [options.onConfirm] - Function to run when the confirm button is clicked (optional).
 * @param {String} [options.cancelText] - The text for the cancel button (optional).
 * @param {Function} [options.onCancel] - Function to run when the cancel button is clicked (optional).
 */
function createDynamicModal({ title, body, confirmText = '', onConfirm, cancelText = '', onCancel }) {
    const modalId = 'dynamicModal';
    const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer">
                        ${cancelText ? `<button type="button" class="btn btn-secondary" id="cancelBtn">${cancelText}</button>` : ''}
                        ${confirmText ? `<button type="button" class="btn btn-primary" id="confirmBtn">${confirmText}</button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal into the container
    const modalContainer = document.getElementById('dynamicModalContainer');
    modalContainer.innerHTML = modalHTML;

    // Initialize the modal using Bootstrap's modal functionality
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();

    // Add confirm and cancel button functionality
    if (onConfirm) {
        document.getElementById('confirmBtn')?.addEventListener('click', function () {
            onConfirm();
            modal.hide();
        });
    }
    if (onCancel) {
        document.getElementById('cancelBtn')?.addEventListener('click', function () {
            onCancel();
            modal.hide();
        });
    }

    // Clean up the modal after it's hidden
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
        modalContainer.innerHTML = ''; // Clean up modal from DOM
    });
}
