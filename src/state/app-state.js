/**
 * Shared application state singleton.
 * All modules import this object and read/write its properties directly.
 */
const state = {
  userId: null,
  notes: [],
  unsubscribe: null,
  currentScreen: 'start-screen',
};

export default state;
