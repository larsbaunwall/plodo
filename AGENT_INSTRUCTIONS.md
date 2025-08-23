# Plodo Agent Instructions

Welcome to **plodo** - a real-time audience feedback application built with Electron and Vue.js. This document provides comprehensive instructions for AI agents and developers working on this project.

## 🎯 Project Overview

Plodo is a presentation feedback tool consisting of two applications:
- **Presenter App**: Electron desktop application for session management and real-time feedback viewing
- **Client App**: Web application for audience members to submit feedback via mobile/desktop browsers

### Key Features
- Real-time audience polling and feedback
- Cross-platform desktop application (Windows/macOS)
- Mobile-responsive web interface
- Session-based voting system
- Live data visualization and charts
- System tray integration
- Automatic updates
- Celebration animations for engagement

## 🏗️ Architecture Overview

```
plodo/
├── presenter-app/          # Electron desktop application
│   ├── src/
│   │   ├── background.js   # Electron main process
│   │   ├── components/     # Vue components
│   │   ├── views/          # Vue pages/views
│   │   ├── store/          # Vuex state management
│   │   ├── common/         # Shared utilities
│   │   └── windows/        # Electron window management
│   ├── build/              # Build configuration and scripts
│   └── public/             # Static assets
├── client-app/             # Vue.js web application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/          # Vue pages/views
│   │   ├── store/          # Vuex state management
│   │   └── common/         # Shared utilities
│   └── public/             # Static assets
├── api/                    # Backend API (separate service)
└── artwork/                # Brand assets and screenshots
```

## 🔧 Technology Stack

### Core Technologies
- **Frontend Framework**: Vue.js 2.6.11
- **Desktop Framework**: Electron 8.2.5
- **UI Framework**: Bulma CSS + Buefy components
- **State Management**: Vuex 3.x
- **Routing**: Vue Router 3.x
- **Styling**: SCSS/Sass
- **Icons**: FontAwesome 5.x
- **HTTP Client**: Axios
- **Build Tool**: Vue CLI 4.x + Webpack

### Electron-Specific
- **Builder**: Electron Builder (cross-platform packaging)
- **Auto-Updater**: electron-updater
- **IPC**: electron-promise-ipc (Promise-based IPC)
- **Utilities**: electron-util, electron-log, electron-positioner

### Development Tools
- **Linting**: ESLint + Prettier
- **Testing**: No formal test suite currently
- **Package Manager**: npm/yarn (mixed usage)

## 🚀 Development Setup

### Prerequisites
- Node.js 14.x - 16.x (avoid Node 18+ due to legacy dependency issues)
- npm or yarn package manager
- For Electron builds: Windows or macOS (Linux not supported for builds)

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/larsbaunwall/plodo.git
   cd plodo
   ```

2. **Install Client App dependencies**:
   ```bash
   cd client-app
   npm install
   # Note: Use npm instead of yarn to avoid node-sass issues
   ```

3. **Install Presenter App dependencies** (Windows/macOS only):
   ```bash
   cd presenter-app
   yarn install
   # Note: This will fail on Linux due to OS restrictions
   ```

### Legacy Dependency Issues

⚠️ **Important**: This project uses legacy dependencies that may not work with Node.js 18+:

- **node-sass**: Replace with dart-sass for better Node.js compatibility
- **Webpack 4**: Consider upgrading to Webpack 5
- **Vue CLI 4**: Consider upgrading to Vue CLI 5 or Vite

**Workarounds for immediate development**:
```bash
# For build issues with newer Node.js
export NODE_OPTIONS="--openssl-legacy-provider"

# For node-sass issues
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

## 🛠️ Development Workflows

### Client App Development

```bash
cd client-app

# Development server with hot reload
npm run serve
# Serves at http://localhost:8080

# Production build
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Linting
npm run lint
```

### Presenter App Development

```bash
cd presenter-app

# Development with Electron hot reload
yarn electron:serve

# Production build for current platform
yarn electron:build

# Linting
yarn lint

# Generate app icons
yarn electron:generate-icons
```

### Build Configurations

The presenter app uses environment-specific configurations:

- **Local Development**: `IS_LOCAL=true` (skips code signing, notarization)
- **Production**: Full signing and notarization for distribution
- **Targets**: 
  - Windows: NSIS installer, portable, AppX store package
  - macOS: DMG, PKG, ZIP, Mac App Store

## 📁 Code Organization Patterns

### Vue Component Structure
```vue
<template>
  <!-- UI structure using Bulma classes -->
</template>

<script>
export default {
  name: 'ComponentName',
  components: { /* child components */ },
  props: { /* component props */ },
  data() { /* reactive data */ },
  computed: { /* computed properties */ },
  methods: { /* component methods */ },
  mounted() { /* lifecycle hooks */ }
}
</script>

<style lang="scss" scoped>
/* Component-specific styles */
</style>
```

### Vuex Store Pattern
```javascript
// State management structure
const store = {
  state: { /* application state */ },
  mutations: { /* synchronous state changes */ },
  actions: { /* asynchronous operations */ },
  getters: { /* computed state values */ }
}
```

### Electron Window Management
```javascript
// Window creation pattern
import { BrowserWindow } from 'electron'

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Note: Security consideration
    }
  })
  return window
}
```

## 🔄 Real-time Communication

### API Integration
- Uses Axios for HTTP requests
- EventSource for server-sent events (real-time updates)
- Promise-based IPC between Electron main/renderer processes

### State Synchronization
- Vuex actions handle API calls
- Mutations update local state
- Components react to state changes automatically

## 🎨 Styling Guidelines

### Bulma + Custom SCSS
```scss
// Import Bulma base
@import "~bulma/sass/utilities/_all";

// Custom variables
$primary: #your-color;

// Component styles
.custom-component {
  @extend .box; // Extend Bulma classes
  // Custom overrides
}
```

### Responsive Design
- Uses Bulma's responsive utilities
- Mobile-first approach for client app
- Desktop-optimized for presenter app

## 🧪 Testing Strategy

**Current State**: No formal testing framework implemented

**Recommended Additions**:
- Unit tests: Jest + Vue Test Utils
- E2E tests: Cypress or Playwright
- Electron testing: Spectron (legacy) or WebDriver

## 📦 Build and Deployment

### Client App Deployment
- Built as static SPA
- Deployed to web servers/CDN
- Modern build with legacy fallback

### Presenter App Distribution
- Cross-platform Electron builds
- Code signing for Windows/macOS
- Auto-updater integration
- Store distribution (Windows Store, Mac App Store)

### Environment Variables
```bash
# Build environment
IS_LOCAL=true|false          # Local vs production builds
PACKAGE_VERSION=1.0.2        # App version
NODE_OPTIONS=--openssl-legacy-provider  # Node.js compatibility
```

## 🐛 Common Issues and Solutions

### 1. Node.js Compatibility
**Problem**: Build failures with Node.js 18+
**Solution**: Use Node.js 14-16, or add legacy OpenSSL provider

### 2. node-sass Issues
**Problem**: Native compilation failures
**Solution**: Switch to dart-sass or use prebuilt binaries

### 3. Electron Security
**Problem**: nodeIntegration enabled (security risk)
**Solution**: Migrate to contextIsolation + preload scripts

### 4. Platform Dependencies
**Problem**: Some dependencies only work on specific platforms
**Solution**: Use optional dependencies or platform checks

## 🤝 Contributing Guidelines

### Code Style
- ESLint + Prettier configuration enforced
- Vue.js style guide compliance
- SCSS/BEM naming conventions

### Commit Messages
- Conventional commits format recommended
- Clear, descriptive commit messages
- Reference issues when applicable

### Pull Request Process
1. Fork repository
2. Create feature branch
3. Implement changes with tests
4. Run linting and builds
5. Submit PR with description

## 🔍 Debugging and Development Tips

### Vue.js Debugging
- Vue DevTools browser extension
- `console.log` with component names
- Vuex DevTools for state inspection

### Electron Debugging
- DevTools available in development
- Main process debugging with VS Code
- Remote debugging capabilities

### Performance Optimization
- Vue.js performance tips
- Electron memory management
- Bundle size optimization

## 📚 Additional Resources

### Documentation
- [Vue.js 2 Guide](https://vuejs.org/v2/guide/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Bulma Documentation](https://bulma.io/documentation/)
- [Buefy Components](https://buefy.org/)

### Project-Specific
- API documentation (in `/api` folder)
- Brand guidelines (in `/artwork` folder)
- Build scripts (in `/presenter-app/build`)

---

## 🎯 Quick Start for AI Agents

For AI agents working on this project:

1. **Understand the domain**: Real-time presentation feedback tool
2. **Respect the architecture**: Two separate Vue.js applications with different purposes
3. **Mind the dependencies**: Legacy stack with Node.js compatibility issues
4. **Follow Vue.js patterns**: Component-based, reactive state management
5. **Consider platform constraints**: Electron app is platform-specific
6. **Maintain real-time features**: Don't break live updates or event handling
7. **Preserve UI consistency**: Bulma-based design system throughout

**Most Common Tasks**:
- Adding new Vue components following existing patterns
- Updating Vuex store for new features
- Modifying Electron window behavior
- Styling with Bulma/SCSS
- API integration improvements
- Build configuration updates

Remember: This is a user-facing application focused on presentation engagement, so UX and performance are critical considerations.