/**
 * Utility functions
 * General-purpose helpers used across the application.
 */

import { UI } from '../constants/app-constants.js';

/**
 * Generates a random alphanumeric ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Formats a timestamp for display
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted time string
 */
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formats a date for display
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Shows a notification to the user
 * @param {string} message - Notification message
 * @param {string} type - Notification type: 'info', 'success', 'error', 'warning'
 */
export function notify(message, type = 'info') {
  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(() => notif.remove(), 300);
  }, UI.NOTIFICATION_DURATION_MS || 3000);
}
