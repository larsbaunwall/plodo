# Plodo Presenter App

Electron desktop application for presentation feedback sessions.

## 📋 Quick Reference

- **Technology**: Electron + Vue.js + Bulma/Buefy
- **Platform**: Windows, macOS (Linux not supported)
- **Development**: Hot reload with `yarn electron:serve`
- **Build**: Cross-platform with `yarn electron:build`

## 🚀 Development Setup

### Prerequisites
- Node.js 14.x - 16.x (avoid Node 18+ due to legacy dependencies)
- Windows or macOS (required for Electron builds)
- yarn package manager

### Installation
```bash
yarn install
```

### Development Commands
```bash
# Development server with hot reload
yarn electron:serve

# Production build for current platform
yarn electron:build

# Lint and fix code
yarn lint

# Generate app icons from source
yarn electron:generate-icons
```

## 🏗️ Architecture

```
src/
├── background.js           # Electron main process
├── components/            # Vue components
├── views/                # Vue pages/views
├── store/                # Vuex state management
├── common/               # Shared utilities
│   ├── ApiService.js     # API communication
│   ├── Logging.js        # Application logging
│   └── UIService.js      # UI utilities
├── windows/              # Electron window management
│   ├── MainAppWindow.js  # Main application window
│   ├── Tray.js          # System tray integration
│   └── CelebrationWindow.js # Celebration animations
└── assets/               # Static assets
```

## 🔧 Key Features

- **Session Management**: Create and manage feedback sessions
- **Real-time Updates**: Live feedback visualization
- **System Tray**: Background operation with tray icon
- **Auto-updater**: Automatic application updates
- **Cross-platform**: Windows and macOS support
- **Celebrations**: Engagement animations

## 🛠️ Build Configuration

Build configuration is in `vue.config.js`:

- **Development**: Local builds without signing
- **Production**: Full signing and notarization
- **Targets**: 
  - Windows: NSIS, portable, AppX
  - macOS: DMG, PKG, ZIP, Mac App Store

## 📱 Electron Integration

### Main Process (`background.js`)
- Application lifecycle management
- Window creation and management
- System tray integration
- Auto-updater logic

### Renderer Process (Vue.js)
- User interface components
- Real-time data visualization
- User interactions

### IPC Communication
Uses `electron-promise-ipc` for Promise-based communication between processes.

## 🎨 UI Components

Built with Vue.js + Buefy (Bulma for Vue):
- Responsive design system
- Material design components
- Custom styling with SCSS

## 📊 State Management

Vuex store manages:
- Session data
- User preferences
- Real-time feedback data
- Application state

## 🔐 Security Notes

⚠️ **Current security configuration has known issues**:
- `nodeIntegration: true` (should be false)
- Context isolation disabled (should be enabled)

Future work should migrate to secure Electron patterns.

## 🚀 Deployment

### Local Development
```bash
yarn electron:serve
```

### Production Build
```bash
# Set environment for production
export IS_LOCAL=false

# Build for current platform
yarn electron:build

# Artifacts will be in dist_electron/
```

### Distribution Channels
- GitHub Releases (direct download)
- Windows Store (AppX packages)
- Mac App Store (MAS builds)
- Auto-updater for existing installations

## 🐛 Common Issues

### Node.js Compatibility
Use Node.js 14-16. For Node 18+:
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
```

### Platform Restrictions
This app only builds on Windows and macOS due to platform-specific dependencies and signing requirements.

### Development on Linux
Not supported for builds, but you can work on the client-app instead.

## 📚 Documentation

- [AGENT_INSTRUCTIONS.md](../AGENT_INSTRUCTIONS.md) - Comprehensive development guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - Common issues and solutions

## 🔗 Related

- [Client App](../client-app/) - Web application for audience feedback
- [API Documentation](../api/) - Backend API integration
- [Project README](../README.md) - Overall project information
