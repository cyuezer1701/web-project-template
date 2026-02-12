/**
 * UI Event Handlers
 * Wires up button clicks, modal interactions, and custom events.
 */
import state from '../state/app-state.js';
import { showScreen, showModal, hideModal } from './ui-manager.js';
import { notify } from '../core/utils.js';
import { validateNote } from '../core/note-logic.js';
import { createNote, deleteNote, subscribeToNotes } from '../services/note-service.js';

let _renderApp = null;

export function initNoteHandlers(renderAppFn) {
  _renderApp = renderAppFn;

  // "Get Started" button on start screen
  document.getElementById('btn-get-started').onclick = () => {
    showScreen('app-screen');
    if (state.userId) {
      subscribeToNotes(state.userId, _renderApp);
    }
  };

  // "Add Note" button
  document.getElementById('btn-add-note').onclick = () => {
    document.getElementById('note-title-input').value = '';
    document.getElementById('note-content-input').value = '';
    showModal('create-note-modal');
    document.getElementById('note-title-input').focus();
  };

  // Save note
  document.getElementById('btn-save-note').onclick = async () => {
    const title = document.getElementById('note-title-input').value;
    const content = document.getElementById('note-content-input').value;

    const validation = validateNote({ title, content });
    if (!validation.valid) {
      notify(validation.message, 'error');
      return;
    }

    try {
      await createNote(state.userId, { title, content });
      hideModal('create-note-modal');
      notify('Note created!', 'success');
    } catch (error) {
      console.error('Error creating note:', error);
      notify('Failed to create note: ' + error.message, 'error');
    }
  };

  // Cancel create note
  document.getElementById('btn-cancel-note').onclick = () => {
    hideModal('create-note-modal');
  };

  // Delete note via custom event
  document.addEventListener('delete-note', async (e) => {
    const { noteId } = e.detail;
    if (!confirm('Delete this note?')) return;

    try {
      await deleteNote(noteId);
      notify('Note deleted', 'success');
    } catch (error) {
      console.error('Error deleting note:', error);
      notify('Failed to delete note: ' + error.message, 'error');
    }
  });

  // Back to start
  const backBtn = document.getElementById('btn-back-to-start');
  if (backBtn) {
    backBtn.onclick = () => {
      showScreen('start-screen');
    };
  }
}
