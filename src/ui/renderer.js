/**
 * Renderer
 * Pure DOM rendering functions for the notes list.
 */

import { formatDate } from '../core/utils.js';
import { formatNotePreview } from '../core/note-logic.js';

/**
 * Renders a single note card element
 * @param {Object} note - Note data object
 * @param {Function} onDelete - Delete handler
 * @returns {HTMLElement} Note card DOM element
 */
export function renderNoteCard(note, onDelete) {
  const card = document.createElement('div');
  card.className = 'note-card glass-panel card-enter';
  card.dataset.noteId = note.id;

  const title = document.createElement('h3');
  title.className = 'note-title';
  title.textContent = note.title;

  const preview = document.createElement('p');
  preview.className = 'note-preview';
  preview.textContent = formatNotePreview(note.content);

  const footer = document.createElement('div');
  footer.className = 'note-footer';

  const meta = document.createElement('span');
  meta.className = 'note-meta';
  const timestamp = note.createdAt?.toDate ? note.createdAt.toDate() : new Date(note.createdAt);
  meta.textContent = formatDate(timestamp.getTime());

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  footer.append(meta, deleteBtn);
  card.append(title, preview, footer);
  return card;
}

/**
 * Renders the full note list into the container
 * @param {Array} notes - Array of note objects
 */
export function renderNoteList(notes) {
  const container = document.getElementById('note-list');
  if (!container) return;

  container.innerHTML = '';

  if (!notes || notes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML =
      '<div class="empty-icon">📝</div><p>No notes yet. Create your first note!</p>';
    container.appendChild(empty);
    return;
  }

  notes.forEach((note) => {
    const card = renderNoteCard(note, handleDeleteNote);
    container.appendChild(card);
  });
}

function handleDeleteNote(noteId) {
  document.dispatchEvent(new CustomEvent('delete-note', { detail: { noteId } }));
}
