# Technology Decisions

This document explains the technology choices made in the plodo project and provides context for future development decisions.

## 🏗️ Architecture Decisions

### Why Two Separate Applications?

**Decision**: Separate client-app (web) and presenter-app (Electron) instead of a single application.

**Rationale**:
- **Different user contexts**: Presenters need desktop features (system tray, always-on-top), audience uses mobile browsers
- **Performance**: Lightweight web app for audience, feature-rich desktop app for presenters
- **Distribution**: Web app can be accessed instantly, desktop app provides offline capabilities
- **Development**: Separate concerns allow specialized optimization for each use case

**Trade-offs**:
- ✅ Optimized UX for each user type
- ✅ Easier maintenance of platform-specific features
- ❌ Code duplication between applications
- ❌ More complex deployment pipeline

### Why Electron for Desktop App?

**Decision**: Electron over native desktop frameworks.

**Rationale**:
- **Code reuse**: Share Vue.js components and patterns with web app
- **Rapid development**: Familiar web technologies for the team
- **Cross-platform**: Single codebase for Windows and macOS
- **Rich ecosystem**: Access to npm packages and web libraries

**Trade-offs**:
- ✅ Faster development with web technologies
- ✅ Cross-platform compatibility
- ❌ Larger bundle size and memory usage
- ❌ Platform-specific optimizations harder to implement

## 🎨 Frontend Technology Choices

### Vue.js 2.6 vs React/Angular

**Decision**: Vue.js 2.6 as the primary frontend framework.

**Rationale**:
- **Learning curve**: Easier for the team to adopt
- **Template syntax**: More familiar for designers
- **Performance**: Good runtime performance for real-time features
- **Ecosystem**: Good integration with build tools

**Trade-offs**:
- ✅ Faster onboarding for new developers
- ✅ Clear separation of concerns (template/script/style)
- ❌ Smaller ecosystem compared to React
- ❌ Vue 2 is now in maintenance mode

**Future Considerations**: Migrate to Vue 3 for better performance and TypeScript support.

### Bulma + Buefy vs Material UI/Bootstrap

**Decision**: Bulma CSS framework with Buefy Vue components.

**Rationale**:
- **Modern design**: Clean, professional appearance
- **Flexbox-based**: Responsive layouts without grid complexity
- **Customizable**: Easy to theme and extend
- **Vue integration**: Buefy provides Vue-specific components

**Trade-offs**:
- ✅ Modern, responsive design system
- ✅ Good Vue.js integration
- ❌ Smaller community compared to Bootstrap
- ❌ Fewer third-party themes

### SCSS vs CSS-in-JS

**Decision**: SCSS for styling.

**Rationale**:
- **Designer-friendly**: Familiar syntax for CSS developers
- **Bulma compatibility**: Bulma is built with Sass
- **Build integration**: Good Vue CLI support
- **Scoped styles**: Vue's scoped CSS prevents style leaking

**Trade-offs**:
- ✅ Familiar to most frontend developers
- ✅ Good integration with Bulma
- ❌ No runtime theming capabilities
- ❌ Potential for style bloat

## 🔧 Build and Development Tools

### Vue CLI vs Vite/Webpack

**Decision**: Vue CLI 4 with Webpack 4.

**Rationale** (at time of development):
- **Mature ecosystem**: Stable, well-tested build pipeline
- **Plugin system**: Good integration with Electron Builder
- **Team familiarity**: Established workflow

**Current Status**: This decision is now outdated. Future work should consider:
- **Vite**: Faster development builds
- **Vue CLI 5**: Updated tooling
- **Webpack 5**: Better performance and tree-shaking

### Yarn vs npm

**Decision**: Mixed usage (yarn for Electron, npm for web app).

**Current Reality**:
- `presenter-app` uses yarn (legacy choice)
- `client-app` works better with npm (dependency issues)

**Future Recommendation**: Standardize on npm for consistency.

### ESLint + Prettier vs Alternative Linters

**Decision**: ESLint with Prettier for code formatting.

**Rationale**:
- **Industry standard**: Widely adopted configuration
- **Vue.js support**: Good integration with Vue components
- **Team consistency**: Automated formatting reduces style debates

**Trade-offs**:
- ✅ Consistent code style across team
- ✅ Catches common errors
- ❌ Additional build complexity
- ❌ Learning curve for configuration

## 🔄 State Management

### Vuex vs Alternatives

**Decision**: Vuex for state management.

**Rationale**:
- **Vue.js integration**: Official Vue state management
- **DevTools**: Excellent debugging capabilities
- **Predictable patterns**: Clear data flow
- **Real-time features**: Good for managing live updates

**Trade-offs**:
- ✅ Excellent Vue.js integration
- ✅ Time-travel debugging
- ❌ Boilerplate for simple state
- ❌ Learning curve for new developers

**Future Considerations**: Pinia (new Vue state management) offers better TypeScript support and less boilerplate.

## 🌐 API and Communication

### REST API vs GraphQL

**Decision**: RESTful API with additional real-time features.

**Rationale**:
- **Simplicity**: Easier to implement and debug
- **Caching**: HTTP caching strategies well-understood
- **Real-time**: EventSource for server-sent events

**Trade-offs**:
- ✅ Simple to understand and implement
- ✅ Good browser support
- ❌ Over/under-fetching of data
- ❌ Multiple endpoints to manage

### Axios vs Fetch API

**Decision**: Axios for HTTP requests.

**Rationale**:
- **Feature-rich**: Request/response interceptors
- **Error handling**: Better error handling than fetch
- **Browser support**: Works in older browsers

**Trade-offs**:
- ✅ Rich feature set
- ✅ Good error handling
- ❌ Additional dependency
- ❌ Larger bundle size than fetch

## 📱 Real-time Communication

### EventSource vs WebSockets

**Decision**: EventSource (Server-Sent Events) for real-time updates.

**Rationale**:
- **Unidirectional**: Fits the use case (server pushes updates)
- **Simpler**: Less complex than WebSocket implementation
- **Automatic reconnection**: Built-in reconnection logic
- **HTTP compatible**: Works with existing HTTP infrastructure

**Trade-offs**:
- ✅ Simpler implementation
- ✅ Automatic reconnection
- ❌ One-way communication only
- ❌ Less flexible than WebSockets

## 🔒 Security Considerations

### Electron Security Model

**Current State**: Basic security implementation with known issues.

**Issues**:
- `nodeIntegration: true` (security risk)
- Context isolation disabled
- No preload scripts for secure IPC

**Future Work Needed**:
```javascript
// Recommended secure configuration
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  preload: path.join(__dirname, 'preload.js')
}
```

## 📊 Performance Considerations

### Bundle Size vs Feature Set

**Current Approach**: Include all features in main bundle.

**Optimization Opportunities**:
- **Code splitting**: Route-based splitting
- **Lazy loading**: Load components on demand
- **Tree shaking**: Remove unused code
- **Image optimization**: Optimize artwork assets

### Memory Management

**Electron Considerations**:
- **Multiple processes**: Main + renderer processes
- **Memory leaks**: Careful event listener cleanup
- **Process communication**: Efficient IPC patterns

## 🧪 Testing Strategy

### Current State

**No formal testing framework** - This is a significant gap.

**Recommended Future Implementation**:

1. **Unit Testing**: Jest + Vue Test Utils
   ```javascript
   // Example test structure
   describe('Component', () => {
     it('should render correctly', () => {
       // Test implementation
     })
   })
   ```

2. **E2E Testing**: Cypress or Playwright
   ```javascript
   // Example E2E test
   cy.visit('/session/12345')
   cy.get('[data-testid="vote-button"]').click()
   ```

3. **Electron Testing**: Spectron (legacy) or modern alternatives

## 🚀 Deployment and Distribution

### Web App Deployment

**Decision**: Static site deployment.

**Rationale**:
- **Simple**: No server-side rendering needed
- **Scalable**: CDN distribution
- **Cost-effective**: Minimal hosting requirements

### Electron App Distribution

**Decision**: Multiple distribution channels.

**Channels**:
- Direct download (GitHub releases)
- Windows Store (AppX packages)
- Mac App Store (mas builds)
- Auto-updater for direct installs

**Signing and Notarization**:
- Windows: Code signing certificate
- macOS: Apple Developer account + notarization

## 🔮 Future Technology Decisions

### Recommended Modernization Path

1. **Vue 3 Migration**:
   - Better performance
   - Composition API
   - Better TypeScript support

2. **Build Tool Updates**:
   - Migrate to Vite or Vue CLI 5
   - Update to Webpack 5
   - Node.js 18+ compatibility

3. **TypeScript Integration**:
   - Gradual migration to TypeScript
   - Better type safety
   - Improved developer experience

4. **Testing Implementation**:
   - Add comprehensive test suite
   - CI/CD integration
   - Automated testing

5. **Security Hardening**:
   - Secure Electron configuration
   - Security audits
   - Dependency updates

## 📝 Decision Record Template

For future decisions, use this template:

```markdown
## Decision: [Title]

**Status**: Proposed/Accepted/Deprecated

**Context**: What is the issue that we're seeing?

**Decision**: What is the change that we're proposing?

**Rationale**: Why are we making this change?

**Consequences**: What are the positive and negative outcomes?

**Alternatives Considered**: What other options did we consider?
```

---

This document should be updated as technology decisions evolve. Each major change should be documented with rationale and trade-offs to help future developers understand the context.