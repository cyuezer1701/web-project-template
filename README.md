# Vite + Firebase + PWA Template

A production-ready project template for vanilla JavaScript web apps with Firebase, PWA support, and a complete CI/CD pipeline.

## Features

- **Vite 7.3** — Lightning-fast dev server and optimized builds
- **Firebase 12.9** — Firestore real-time database + Anonymous Auth
- **PWA** — Service worker, offline fallback, installable app
- **CI/CD** — GitHub Actions: lint, test, build, deploy
- **Testing** — Vitest with jsdom, unit + integration tests, Firebase mocks
- **Code Quality** — ESLint 10 (flat config) + Prettier
- **Tailwind CSS** — CDN + custom CSS architecture

## Quick Start

1. Click **"Use this template"** on GitHub
2. Clone your new repository
3. Install dependencies:

```bash
nvm use         # Uses Node 22 from .nvmrc
npm install
```

4. Set up Firebase (see below)
5. Start developing:

```bash
npm run dev     # Dev server at http://localhost:3000
```

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Anonymous Authentication** (Authentication > Sign-in method)
3. Create a **Cloud Firestore** database
4. Copy your Firebase config values
5. Create a `.env` file from the template:

```bash
cp .env.example .env
```

6. Fill in your Firebase credentials in `.env`
7. Update `.firebaserc` with your project ID
8. Update `deploy.yml` with your project ID and service account secret name

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Run tests with visual UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code |
| `npm run format:check` | Check formatting |

## Project Structure

```
src/
├── main.js                    # Entry point & orchestrator
├── config/
│   └── firebase.js            # Firebase initialization
├── constants/
│   └── app-constants.js       # Application constants
├── core/
│   ├── note-logic.js          # Pure business logic (no side effects)
│   └── utils.js               # Utility functions
├── services/
│   ├── connection-monitor.js  # Online/offline detection
│   └── note-service.js        # Firestore CRUD + real-time
├── state/
│   └── app-state.js           # Singleton state object
├── ui/
│   ├── event-handlers.js      # DOM event wiring
│   ├── renderer.js            # DOM rendering functions
│   └── ui-manager.js          # Screen/modal management
└── styles/
    ├── main.css               # Base styles & backgrounds
    ├── components.css          # Component-specific styles
    ├── ui.css                  # Shared UI components
    └── animations.css          # Keyframe animations
```

## Architecture

### Folder Responsibilities

| Folder | Purpose | Example |
|--------|---------|---------|
| `config/` | External service configuration | Firebase init |
| `constants/` | Application-wide constants | Collection names, limits |
| `core/` | Pure business logic (no side effects) | Validation, sorting |
| `services/` | External service integrations | Firestore CRUD, connection monitor |
| `state/` | Application state management | Singleton state object |
| `ui/` | DOM manipulation and rendering | Screen management, event handlers |
| `styles/` | CSS files | Base, components, UI, animations |

### Design Patterns

- **Singleton State** — Single shared state object imported by all modules
- **Render Bridge** — `main.js` provides a `renderApp()` function to modules
- **Module Init Pattern** — Each module exports an `init*()` function
- **Pure Logic Separation** — Business logic in `core/` has no dependencies on DOM or Firebase

## GitHub Secrets

For CI/CD to work, add these secrets in your repository settings:

- All `VITE_FIREBASE_*` variables (same as `.env`)
- `FIREBASE_SERVICE_ACCOUNT` — Firebase service account JSON (for deployment)

## CI/CD Pipeline

```
Push/PR to main
    └─> CI: Install → Format Check → Lint → Test → Coverage → Build
              └─> CD (on main): Build → Deploy to Firebase Hosting
```

## License

MIT
