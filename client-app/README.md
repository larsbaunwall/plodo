# Plodo Client App

Vue.js web application for audience feedback submission.

## 📋 Quick Reference

- **Technology**: Vue.js + Bulma/Buefy
- **Platform**: Web browsers (mobile-responsive)
- **Development**: Hot reload with `npm run serve`
- **Build**: Static site with `npm run build`

## 🚀 Development Setup

### Prerequisites
- Node.js 14.x - 16.x (avoid Node 18+ due to legacy dependencies)
- npm package manager (recommended over yarn for this app)

### Installation
```bash
# Skip problematic downloads
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install
```

### Development Commands
```bash
# Development server with hot reload
npm run serve
# Serves at http://localhost:8080

# Production build
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Lint and fix code
npm run lint

# Serve built files locally
npm run serve:dist
```

## 🏗️ Architecture

```
src/
├── components/           # Vue components
│   ├── SessionConnect.vue   # Join session interface
│   ├── TopBar.vue          # Navigation bar
│   ├── GithubRibbon.vue    # GitHub ribbon
│   └── ...
├── views/               # Vue pages/views
│   ├── Start.vue           # Landing page
│   ├── Session.vue         # Active session view
│   └── ...
├── store/               # Vuex state management
│   └── index.js            # Main store
├── common/              # Shared utilities
│   └── ApiService.js       # API communication
├── router/              # Vue Router configuration
├── assets/              # Static assets
│   └── scss/               # SCSS stylesheets
└── App.vue              # Root component
```

## 🔧 Key Features

- **Session Joining**: Enter session ID to join feedback sessions
- **Real-time Voting**: Submit feedback in real-time
- **Mobile-Responsive**: Optimized for mobile devices
- **Progressive Web App**: Offline capabilities and app-like experience
- **Analytics**: Application insights integration

## 🎨 UI Framework

Built with Vue.js + Buefy (Bulma for Vue):
- **Bulma CSS**: Modern CSS framework
- **Buefy Components**: Vue.js Bulma components
- **FontAwesome Icons**: Comprehensive icon set
- **Custom SCSS**: Project-specific styling

## 📱 Mobile Optimization

- Responsive design with Bulma grid system
- Touch-friendly interface
- Optimized for various screen sizes
- Fast loading for mobile networks

## 📊 State Management

Vuex store manages:
- Active session data
- User authentication
- Voting state
- Application version info

## 🌐 API Integration

Communicates with backend API for:
- Session joining and validation
- Vote submission
- Real-time updates via EventSource
- Application insights tracking

## 🔧 Build Process

### Development Build
```bash
npm run serve
```
- Hot module replacement
- Source maps for debugging
- Development-optimized bundles

### Production Build
```bash
NODE_OPTIONS="--openssl-legacy-provider" npm run build
```
- Minified and optimized bundles
- Modern and legacy builds (--modern flag)
- Static assets for CDN deployment

## 🚀 Deployment

This is a static single-page application that can be deployed to:
- Static hosting services (Netlify, Vercel)
- CDN distributions (CloudFront, CloudFlare)
- Web servers (nginx, Apache)

### Build Output
```
dist/
├── index.html              # Main HTML file
├── css/                    # Compiled CSS
├── js/                     # JavaScript bundles
├── img/                    # Optimized images
└── manifest.json           # PWA manifest
```

## 🐛 Common Issues

### Node.js Compatibility
Use Node.js 14-16. For Node 18+:
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
```

### node-sass Issues
Use npm instead of yarn:
```bash
rm -rf node_modules yarn.lock
npm install
```

### SCSS Compilation
If SCSS compilation fails:
```bash
npm rebuild node-sass
```

## 🧪 Testing

Currently no formal testing framework. Recommended additions:
- **Unit Tests**: Jest + Vue Test Utils
- **E2E Tests**: Cypress
- **Component Tests**: Vue Testing Library

## 📈 Performance Optimization

- Bundle analysis with webpack-bundle-analyzer
- Image optimization
- Lazy loading for routes
- Service worker for caching

## 📚 Documentation

- [AGENT_INSTRUCTIONS.md](../AGENT_INSTRUCTIONS.md) - Comprehensive development guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - Common issues and solutions

## 🔗 Related

- [Presenter App](../presenter-app/) - Electron desktop application
- [API Documentation](../api/) - Backend API integration
- [Project README](../README.md) - Overall project information

## 🌍 Live Demo

Visit [https://www.plodo.io](https://www.plodo.io) to see the live application.
