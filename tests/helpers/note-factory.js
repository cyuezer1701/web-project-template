/**
 * Test data factory helpers for integration tests.
 * Creates realistic note data and manages test state.
 */
import state from '../../src/state/app-state.js';

let noteIdCounter = 1;

export function resetNoteIds() {
  noteIdCounter = 1;
}

export function createNote(overrides = {}) {
  const id = noteIdCounter++;
  return {
    id: `note-${id}`,
    title: `Test Note ${id}`,
    content: 'This is test content for the note.',
    authorUid: 'test-user-1',
    createdAt: Date.now() - id * 1000,
    status: 'active',
    ...overrides,
  };
}

export function createNoteList(count = 3) {
  return Array.from({ length: count }, () => createNote());
}

export function setupState(overrides = {}) {
  state.userId = 'test-user-1';
  state.notes = [];
  state.unsubscribe = null;
  state.currentScreen = 'start-screen';
  Object.assign(state, overrides);
}

export function resetState() {
  state.userId = null;
  state.notes = [];
  state.unsubscribe = null;
  state.currentScreen = 'start-screen';
}
