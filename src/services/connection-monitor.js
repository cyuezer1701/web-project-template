/**
 * Connection Monitor
 * Detects browser online/offline state and shows a banner to the user.
 */

let connectionBanner = null;

export function initConnectionMonitor() {
  connectionBanner = document.getElementById('connection-banner');

  window.addEventListener('offline', () => showDisconnected());
  window.addEventListener('online', () => showReconnected());

  if (!navigator.onLine) {
    showDisconnected();
  }
}

function showDisconnected() {
  if (!connectionBanner) return;
  connectionBanner.textContent = 'Connection lost...';
  connectionBanner.className = 'connection-banner disconnected';
}

function showReconnected() {
  if (!connectionBanner) return;
  connectionBanner.textContent = 'Connected!';
  connectionBanner.className = 'connection-banner connected';
  setTimeout(() => {
    connectionBanner.classList.add('hidden');
  }, 3000);
}
