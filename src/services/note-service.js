/**
 * Note Service
 * Manages Firestore operations for notes: CRUD + real-time subscription.
 */
import { db } from '../config/firebase.js';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { COLLECTIONS } from '../constants/app-constants.js';
import state from '../state/app-state.js';

/**
 * Creates a new note in Firestore
 * @param {string} userId - Author's user ID
 * @param {Object} noteData - { title, content }
 * @returns {Promise<string>} Document ID of created note
 */
export async function createNote(userId, noteData) {
  const docRef = await addDoc(collection(db, COLLECTIONS.NOTES), {
    ...noteData,
    authorUid: userId,
    createdAt: serverTimestamp(),
    status: 'active',
  });
  return docRef.id;
}

/**
 * Deletes a note from Firestore
 * @param {string} noteId - Note document ID
 * @returns {Promise<void>}
 */
export async function deleteNote(noteId) {
  await deleteDoc(doc(db, COLLECTIONS.NOTES, noteId));
}

/**
 * Subscribes to real-time note updates for a user
 * @param {string} userId - User ID to filter notes by
 * @param {Function} renderCallback - Called after state updates
 */
export function subscribeToNotes(userId, renderCallback) {
  if (state.unsubscribe) state.unsubscribe();

  const q = query(
    collection(db, COLLECTIONS.NOTES),
    where('authorUid', '==', userId),
    orderBy('createdAt', 'desc')
  );

  state.unsubscribe = onSnapshot(q, (snapshot) => {
    state.notes = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    renderCallback();
  });
}
