/**
 * UI Manager
 * Handles screen navigation and modal show/hide.
 */

/**
 * Shows a specific screen and hides all others
 * @param {string} screenId - ID of screen to show
 */
export function showScreen(screenId) {
  ['start-screen', 'app-screen'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');
}

/**
 * Shows a modal by ID
 * @param {string} modalId - Modal element ID
 */
export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
}

/**
 * Hides a modal by ID
 * @param {string} modalId - Modal element ID
 */
export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

/**
 * Sets the status text
 * @param {string} message - Status message
 * @param {boolean} isError - Whether this is an error message
 */
export function setStatus(message, isError = false) {
  const statusEl = document.getElementById('status-message');
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? '#ef4444' : '#94a3b8';
  }
}
