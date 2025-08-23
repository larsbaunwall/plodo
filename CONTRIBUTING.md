# Contributing to Plodo

Thank you for your interest in contributing to plodo! This document provides guidelines for developers and AI agents working on this project.

## 🚀 Quick Start

1. **Read the documentation**:
   - [AGENT_INSTRUCTIONS.md](./AGENT_INSTRUCTIONS.md) - Comprehensive development guide
   - [README.md](./README.md) - Project overview

2. **Set up your environment**:
   ```bash
   ./setup-dev.sh
   ```

3. **Start coding**:
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Test thoroughly
   - Submit a pull request

## 🎯 Project Structure

Plodo consists of two main applications:

- **`client-app/`** - Vue.js web application for audience feedback
- **`presenter-app/`** - Electron desktop application for presenters

Both applications share similar Vue.js patterns but serve different purposes.

## 🛠️ Development Guidelines

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Run linting
cd client-app && npm run lint
cd presenter-app && yarn lint

# Auto-fix issues where possible
cd client-app && npm run lint -- --fix
cd presenter-app && yarn lint --fix
```

### Vue.js Best Practices

1. **Component Naming**: Use PascalCase for component names
2. **Props**: Always define prop types and defaults
3. **Events**: Use kebab-case for custom events
4. **Scoped Styles**: Always use `scoped` attribute for component styles

```vue
<template>
  <div class="my-component">
    <!-- Use Bulma classes for styling -->
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.my-component {
  // Component-specific styles
}
</style>
```

### Vuex Patterns

Follow these patterns for state management:

```javascript
// actions.js
export const fetchData = async ({ commit }) => {
  try {
    const data = await ApiService.getData()
    commit('SET_DATA', data)
  } catch (error) {
    commit('SET_ERROR', error.message)
  }
}

// mutations.js
export const SET_DATA = (state, data) => {
  state.data = data
}

// getters.js
export const getData = state => state.data
```

### Styling with Bulma

Use Bulma classes consistently throughout the application:

```vue
<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <div class="box">
          <h1 class="title">My Title</h1>
          <p class="subtitle">My subtitle</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

## 🧪 Testing

Currently, the project doesn't have a formal testing framework. When adding tests:

1. **Unit Tests**: Test individual components and utilities
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows

Recommended testing stack:
- Jest + Vue Test Utils for unit tests
- Cypress for E2E tests

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details**: OS, Node.js version, browser
2. **Steps to reproduce**: Clear, numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console errors**: Any relevant error messages

## ✨ Feature Requests

When requesting features:

1. **Use case**: Describe the problem you're solving
2. **Proposed solution**: How would you solve it?
3. **Alternatives**: What other solutions did you consider?
4. **Mockups**: Visual examples if applicable

## 🔧 Working with the Codebase

### Common Tasks

#### Adding a New Vue Component

1. Create the component file in appropriate directory
2. Follow the established naming convention
3. Use Bulma classes for styling
4. Add to parent component or router as needed

#### Adding a New API Endpoint

1. Update the ApiService in `src/common/ApiService.js`
2. Add corresponding Vuex actions/mutations
3. Update components to use the new data

#### Updating Styles

1. Use existing Bulma classes when possible
2. Add custom SCSS only when necessary
3. Follow SCSS/BEM naming conventions
4. Keep styles scoped to components

### Electron-Specific Development

When working on the presenter app:

1. **Main Process**: Code in `src/background.js`
2. **Renderer Process**: Vue.js components and views
3. **IPC Communication**: Use electron-promise-ipc
4. **Window Management**: Update files in `src/windows/`

### Build and Deploy

For local testing:
```bash
# Client app
cd client-app
npm run serve

# Presenter app
cd presenter-app
yarn electron:serve
```

For production builds:
```bash
# Client app
cd client-app
NODE_OPTIONS="--openssl-legacy-provider" npm run build

# Presenter app (Windows/macOS only)
cd presenter-app
yarn electron:build
```

## 🚨 Important Considerations

### Security

The Electron app currently has security considerations:
- `nodeIntegration: true` is enabled
- Context isolation is disabled

Future work should migrate to secure patterns:
- Enable context isolation
- Use preload scripts for IPC
- Disable node integration in renderer

### Performance

Keep performance in mind:
- Minimize bundle sizes
- Optimize images and assets
- Use lazy loading for routes
- Implement efficient state management

### Accessibility

Ensure the application is accessible:
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

## 📚 Resources

### Documentation
- [Vue.js 2 Guide](https://vuejs.org/v2/guide/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Bulma Documentation](https://bulma.io/documentation/)
- [Buefy Components](https://buefy.org/)

### Tools
- [Vue DevTools](https://github.com/vuejs/vue-devtools)
- [Electron DevTools](https://www.electronjs.org/docs/tutorial/devtools)

## 🤝 Code of Conduct

Please be respectful and constructive in all interactions. We're all here to learn and build something great together.

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions
- **Documentation**: Check AGENT_INSTRUCTIONS.md for detailed information

---

Thank you for contributing to plodo! 🎉