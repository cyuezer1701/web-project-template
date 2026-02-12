/**
 * Note Logic - Pure business logic functions
 * All functions are pure (no side effects, no DOM, no Firebase).
 * This makes them easy to unit test.
 */

import { UI } from '../constants/app-constants.js';

/**
 * Validates a note before saving
 * @param {Object} note - Note object { title, content }
 * @returns {Object} { valid: boolean, message: string }
 */
export function validateNote(note) {
  if (!note || typeof note !== 'object') {
    return { valid: false, message: 'Invalid note object' };
  }
  if (!note.title || note.title.trim().length === 0) {
    return { valid: false, message: 'Title is required' };
  }
  if (note.title.length > UI.MAX_TITLE_LENGTH) {
    return { valid: false, message: `Title must be under ${UI.MAX_TITLE_LENGTH} characters` };
  }
  if (note.content && note.content.length > UI.MAX_CONTENT_LENGTH) {
    return { valid: false, message: `Content must be under ${UI.MAX_CONTENT_LENGTH} characters` };
  }
  return { valid: true, message: '' };
}

/**
 * Sorts notes by creation date (newest first)
 * @param {Array} notes - Array of note objects
 * @returns {Array} Sorted copy of notes array
 */
export function sortNotes(notes) {
  if (!notes || !Array.isArray(notes)) return [];
  return [...notes].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * Filters notes by search query (matches title and content)
 * @param {Array} notes - Array of note objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered notes
 */
export function filterNotes(notes, query) {
  if (!query || query.trim().length === 0) return notes;
  const lowerQuery = query.toLowerCase().trim();
  return notes.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(lowerQuery)) ||
      (note.content && note.content.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Creates a preview of note content
 * @param {string} content - Full note content
 * @param {number} maxLength - Maximum preview length (default: 100)
 * @returns {string} Truncated preview with ellipsis if needed
 */
export function formatNotePreview(content, maxLength = 100) {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}
