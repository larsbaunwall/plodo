# Plodo Presenter App

A modern implementation of the Plodo presenter application using Vue 3 and Tauri.

## Features

- Create and manage voting sessions
- Real-time voting results
- Celebration screen for audience engagement
- System tray integration
- Multi-screen support

## Tech Stack

- Vue 3 with Composition API
- Tauri for cross-platform desktop app
- Pinia for state management
- Vue Router for navigation
- Bulma for styling
- FontAwesome for icons

## Development

### Prerequisites

- Node.js (v16+)
- Rust (latest stable)
- Tauri system dependencies (see [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites))

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run tauri dev
```

### Building

```bash
# Build for production
npm run tauri build
```

## Project Structure

- `src/` - Vue application code
  - `assets/` - Static assets and styles
  - `components/` - Reusable Vue components
  - `views/` - Page components
  - `stores/` - Pinia stores
  - `services/` - API and UI services
  - `router/` - Vue Router configuration
- `src-tauri/` - Tauri/Rust code
  - `src/` - Rust source code
  - `Cargo.toml` - Rust dependencies
  - `tauri.conf.json` - Tauri configuration
