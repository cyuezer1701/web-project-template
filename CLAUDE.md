# Project: Vite + Firebase + PWA Template

## Architecture Overview

TypeScript web application template using Vite as the build tool, Firebase for backend services (Firestore + Anonymous Auth), and PWA support. Includes a component library built with native Web Components, i18n support, and Tailwind CSS v4.

## Directory Structure

```
src/
  config/          - External service configuration (Firebase)
  constants/       - Application-wide constants
  core/            - Pure business logic (no side effects, no DOM, no Firebase)
  services/        - External service integrations (Firestore CRUD, connection)
  state/           - Application state management (singleton)
  ui/              - DOM manipulation, rendering, event handlers
  styles/          - CSS files (Tailwind v4 + custom)
  components/      - Web Components (custom elements)
  i18n/            - Internationalization (locales, translation engine)
  types/           - TypeScript type definitions
tests/
  unit/            - Pure logic tests
  integration/     - Firebase-dependent tests with mocks
  mocks/           - Shared mock modules
  helpers/         - Test data factories
```

## Key Patterns

- **Singleton State**: `src/state/app-state.ts` - single shared state object
- **Render Bridge**: `main.ts` provides `renderApp()` to modules
- **Module Init Pattern**: each module exports an `init*()` function
- **Pure Logic Separation**: `core/` has ZERO dependencies on DOM or Firebase
- **Web Components**: `src/components/` using Shadow DOM + BaseComponent class
- **i18n**: `src/i18n/` with JSON locales and `t()` function

## Commands

- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Type-check + production build
- `npm test` - Run tests in watch mode
- `npm test -- --run` - Run tests once
- `npm run lint` - ESLint check
- `npm run typecheck` - TypeScript type checking
- `npm run format:check` - Prettier check

## Testing Conventions

- Unit tests in `tests/unit/` test pure logic only
- Integration tests in `tests/integration/` use Firebase mocks from `tests/mocks/`
- Test files match source file names: `item-logic.ts` -> `item-logic.test.ts`
- Use factory helpers from `tests/helpers/` for test data

## Agent Roles

Use the slash commands for specialized agent roles:
- `/designer` - UI/UX design decisions, component styling, accessibility
- `/pm` - Project management, feature planning, task breakdown
- `/dev` - Implementation, debugging, code review
- `/tester` - Test writing, coverage analysis, quality assurance

## Rules

- Always run `npm run typecheck` after modifying TypeScript files
- Always run `npm test -- --run` after modifying logic or service files
- Never commit `.env` files - use `.env.example` as template
- Follow existing patterns: pure logic in `core/`, services for Firebase, types in `types/`
- All user-facing strings must use `t()` from `src/i18n/i18n.ts`
- New UI elements should be Web Components in `src/components/`
