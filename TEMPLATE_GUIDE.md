# Template Customization Guide

This guide explains how to adapt this template for your own project.

## 1. Rename the Project

Update these files with your project name:

- `package.json` — Change `"name"` field
- `public/manifest.json` — Change `"name"` and `"short_name"`
- `index.html` — Change `<title>` and heading text
- `public/icon-*.svg` — Replace with your own app icons

## 2. Configure Firebase

1. Update `.firebaserc` with your Firebase project ID
2. Create `.env` from `.env.example` and fill in your credentials
3. Update `.github/workflows/deploy.yml`:
   - Change `projectId` to your Firebase project ID
   - Change `firebaseServiceAccount` secret name if needed
4. Update `firestore.rules` with your collection security rules

## 3. Replace the Example App

The template includes a Notes app as an example. Replace these files:

### Constants (`src/constants/app-constants.js`)

Replace `COLLECTIONS`, `UI`, and `NOTE_STATUS` with your own constants:

```javascript
export const COLLECTIONS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
};
```

### Business Logic (`src/core/note-logic.js`)

Replace with your domain logic. Keep functions pure (no DOM, no Firebase):

```javascript
// Example: src/core/product-logic.js
export function validateProduct(product) { ... }
export function calculateTotal(items) { ... }
```

### State (`src/state/app-state.js`)

Update the state object with your app's properties:

```javascript
const state = {
  userId: null,
  products: [],
  cart: [],
  unsubscribe: null,
};
```

### Services (`src/services/note-service.js`)

Replace with your Firestore operations. Follow the same pattern:

```javascript
// Example: src/services/product-service.js
export async function createProduct(userId, data) { ... }
export function subscribeToProducts(userId, renderCallback) { ... }
```

### UI Files (`src/ui/`)

- `renderer.js` — Replace `renderNoteCard()` / `renderNoteList()` with your rendering functions
- `event-handlers.js` — Wire up your buttons and events
- `ui-manager.js` — Add/remove screen IDs in `showScreen()`

### HTML (`index.html`)

Replace the start screen and app screen content with your own UI.

### Styles (`src/styles/components.css`)

Replace note-specific styles with your component styles.

## 4. Add New Firestore Collections

1. Define the collection name in `src/constants/app-constants.js`
2. Create a service file in `src/services/`
3. Add security rules in `firestore.rules`
4. Add Firestore indexes in `firestore.indexes.json` if needed

## 5. Add New Screens

The app uses a screen-toggling pattern instead of a router:

1. Add a new `<div id="my-screen" class="hidden">` in `index.html`
2. Register the screen ID in `ui-manager.js` `showScreen()` array
3. Call `showScreen('my-screen')` to navigate

## 6. Add New Tests

Follow the existing test structure:

- **Unit tests** in `tests/unit/` — Test pure logic functions
- **Integration tests** in `tests/integration/` — Test Firebase-dependent modules with mocks
- **Test factories** in `tests/helpers/` — Create test data
- Import `tests/mocks/firebase-mock.js` in integration tests

## 7. Customize PWA

- Update `public/manifest.json` with your app info
- Replace `public/icon-*.svg` with your icons
- Update `public/sw.js` cache name when deploying updates
- Update `public/offline.html` with your branding

## 8. Deploy

The CI/CD pipeline automatically deploys to Firebase Hosting on push to `main`:

1. Add GitHub Secrets (see README)
2. Push to `main`
3. CI runs: format check, lint, test, build
4. On CI success: CD deploys to Firebase Hosting

To deploy Firestore rules manually:

```bash
firebase deploy --only firestore:rules
```
