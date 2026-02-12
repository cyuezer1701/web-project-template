/**
 * App Template - Main Entry Point
 *
 * This module initializes Firebase auth, sets up the render bridge,
 * and wires up all application modules.
 */

// Styles
import './styles/main.css';
import './styles/components.css';
import './styles/ui.css';
import './styles/animations.css';

// Firebase
import { auth } from './config/firebase.js';
import { signInAnonymously } from 'firebase/auth';
import { initConnectionMonitor } from './services/connection-monitor.js';

// State
import state from './state/app-state.js';

// UI
import { showScreen } from './ui/ui-manager.js';
import { notify } from './core/utils.js';

// App modules
import { initNoteHandlers } from './ui/event-handlers.js';
import { renderNoteList } from './ui/renderer.js';

/* ==================== FIREBASE AUTH ==================== */

console.log('Connecting to Firebase...');
try {
  await signInAnonymously(auth);
  state.userId = auth.currentUser.uid;
  console.log('Firebase connected! User ID:', state.userId);
} catch (error) {
  console.error('Firebase connection error:', error);
  notify('Firebase connection error: ' + error.message, 'error');
}

initConnectionMonitor();

/* ==================== RENDER BRIDGE ==================== */

function renderApp() {
  renderNoteList(state.notes);
}

/* ==================== INITIALIZE ALL MODULES ==================== */

initNoteHandlers(renderApp);

// Remove skeleton loader
const skeleton = document.getElementById('skeleton-loader');
if (skeleton) {
  skeleton.style.transition = 'opacity 0.3s';
  skeleton.style.opacity = '0';
  setTimeout(() => skeleton.remove(), 300);
}

showScreen('start-screen');

console.log('App initialized');
