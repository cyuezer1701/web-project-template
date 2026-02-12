import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../mocks/firebase-mock.js';
import { addDoc, deleteDoc, onSnapshot, doc, collection } from 'firebase/firestore';
import { createNote, deleteNote, subscribeToNotes } from '../../src/services/note-service.js';
import state from '../../src/state/app-state.js';
import { setupState, resetState } from '../helpers/note-factory.js';

describe('Note Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupState();
  });

  afterEach(() => {
    resetState();
  });

  describe('createNote', () => {
    it('should call addDoc with correct data', async () => {
      const noteData = { title: 'Test', content: 'Content' };
      await createNote('user-1', noteData);

      expect(addDoc).toHaveBeenCalledTimes(1);
      const callArgs = addDoc.mock.calls[0][1];
      expect(callArgs.title).toBe('Test');
      expect(callArgs.content).toBe('Content');
      expect(callArgs.authorUid).toBe('user-1');
      expect(callArgs.status).toBe('active');
    });

    it('should return the document ID', async () => {
      const result = await createNote('user-1', { title: 'Test', content: '' });
      expect(result).toBe('mock-doc-id');
    });
  });

  describe('deleteNote', () => {
    it('should call deleteDoc with correct reference', async () => {
      await deleteNote('note-123');

      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith({}, 'notes', 'note-123');
    });
  });

  describe('subscribeToNotes', () => {
    it('should call onSnapshot to subscribe', () => {
      const renderFn = vi.fn();
      subscribeToNotes('user-1', renderFn);

      expect(onSnapshot).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe previous listener', () => {
      const mockUnsubscribe = vi.fn();
      state.unsubscribe = mockUnsubscribe;

      subscribeToNotes('user-1', vi.fn());

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should update state and call render on snapshot', () => {
      const renderFn = vi.fn();
      subscribeToNotes('user-1', renderFn);

      // Get the onSnapshot callback
      const snapshotCallback = onSnapshot.mock.calls[0][1];

      // Simulate a snapshot
      const mockSnapshot = {
        docs: [
          {
            id: 'note-1',
            data: () => ({ title: 'Note 1', content: 'Content 1', authorUid: 'user-1' }),
          },
          {
            id: 'note-2',
            data: () => ({ title: 'Note 2', content: 'Content 2', authorUid: 'user-1' }),
          },
        ],
      };

      snapshotCallback(mockSnapshot);

      expect(state.notes).toHaveLength(2);
      expect(state.notes[0].id).toBe('note-1');
      expect(state.notes[0].title).toBe('Note 1');
      expect(renderFn).toHaveBeenCalledTimes(1);
    });
  });
});
