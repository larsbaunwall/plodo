# Troubleshooting Guide

This guide helps resolve common issues when developing plodo.

## 🚨 Common Issues

### 1. Node.js Version Compatibility

**Problem**: Build failures with error messages about digital envelope routines or unsupported algorithms.

```
Error: error:0308010C:digital envelope routines::unsupported
```

**Cause**: Node.js 18+ changed OpenSSL, breaking webpack 4 and older build tools.

**Solutions**:

1. **Use compatible Node.js version** (Recommended):
   ```bash
   # Use Node.js 14-16
   nvm use 14
   # or
   nvm use 16
   ```

2. **Use legacy OpenSSL provider**:
   ```bash
   export NODE_OPTIONS="--openssl-legacy-provider"
   # Then run your build commands
   npm run build
   ```

3. **Add to package.json scripts**:
   ```json
   {
     "scripts": {
       "build": "NODE_OPTIONS='--openssl-legacy-provider' vue-cli-service build"
     }
   }
   ```

### 2. node-sass Compilation Issues

**Problem**: Native compilation failures for node-sass.

```
Error: Node Sass does not yet support your current environment
```

**Cause**: node-sass needs to compile native modules for your platform/Node.js version.

**Solutions**:

1. **Use npm instead of yarn**:
   ```bash
   rm -rf node_modules yarn.lock
   npm install
   ```

2. **Skip problematic downloads**:
   ```bash
   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install
   ```

3. **Force rebuild**:
   ```bash
   npm rebuild node-sass
   ```

4. **Upgrade to dart-sass** (Future improvement):
   ```bash
   npm uninstall node-sass
   npm install sass
   ```

### 3. Electron Platform Restrictions

**Problem**: Can't install presenter app dependencies on Linux.

```
error plodo@1.0.2: The platform "linux" is incompatible with this module.
```

**Cause**: The presenter app is configured to only work on Windows and macOS.

**Solutions**:

1. **Work on client app only** on Linux:
   ```bash
   cd client-app
   npm install
   npm run serve
   ```

2. **Remove platform restriction** (for development only):
   ```json
   // In presenter-app/package.json, remove or modify:
   "os": ["win32", "darwin"]
   ```

3. **Use Windows/macOS for Electron development**.

### 4. Dependencies Installation Failures

**Problem**: Various dependency installation issues.

**Generic Solutions**:

1. **Clear caches**:
   ```bash
   rm -rf node_modules package-lock.json yarn.lock
   npm cache clean --force
   yarn cache clean
   ```

2. **Use different package manager**:
   ```bash
   # Try npm if yarn fails
   npm install
   
   # Try yarn if npm fails
   yarn install
   ```

3. **Check Node.js version**:
   ```bash
   node --version
   npm --version
   ```

### 5. Build Performance Issues

**Problem**: Slow builds or high memory usage.

**Solutions**:

1. **Increase Node.js memory**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider"
   ```

2. **Disable source maps** for faster builds:
   ```javascript
   // In vue.config.js
   module.exports = {
     configureWebpack: {
       devtool: false // Disable in production
     }
   }
   ```

3. **Use development builds**:
   ```bash
   npm run serve  # Instead of build for development
   ```

### 6. Hot Reload Not Working

**Problem**: Changes not reflected during development.

**Solutions**:

1. **Check file watching limits** (Linux):
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Restart dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run serve
   ```

3. **Clear browser cache** or use incognito mode.

### 7. Electron DevTools Issues

**Problem**: DevTools not opening or crashing.

**Solutions**:

1. **Use development mode**:
   ```bash
   yarn electron:serve
   ```

2. **Manual DevTools opening**:
   ```javascript
   // In main process
   mainWindow.webContents.openDevTools()
   ```

3. **Check Electron version compatibility**.

### 8. API Connection Issues

**Problem**: Frontend can't connect to backend API.

**Solutions**:

1. **Check API server is running**:
   ```bash
   # Navigate to api folder and start server
   cd api
   # Follow API-specific start instructions
   ```

2. **Check CORS configuration** in API server.

3. **Verify API endpoints** in ApiService configuration.

### 9. Vue DevTools Not Working

**Problem**: Vue DevTools extension not detecting the app.

**Solutions**:

1. **Enable development mode**:
   ```javascript
   Vue.config.devtools = true
   Vue.config.debug = true
   ```

2. **Check Vue version compatibility** with DevTools.

3. **Use standalone Vue DevTools**:
   ```bash
   npm install -g @vue/devtools
   vue-devtools
   ```

### 10. Styling Issues

**Problem**: Bulma styles not applying or SCSS compilation errors.

**Solutions**:

1. **Check SCSS syntax**:
   ```scss
   // Correct import
   @import "~bulma/sass/utilities/_all";
   ```

2. **Verify Bulma installation**:
   ```bash
   npm list bulma
   npm list buefy
   ```

3. **Clear CSS cache** in browser.

## 🔧 Development Environment Debugging

### Check Your Setup

Run this diagnostic to check your development environment:

```bash
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Platform: $OSTYPE"
echo "Current directory: $(pwd)"

# Check if in correct directory
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    cat package.json | grep '"name"'
else
    echo "❌ package.json not found - are you in the right directory?"
fi

# Check Node.js compatibility
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    echo "⚠️  Node.js 18+ detected - may need legacy OpenSSL provider"
else
    echo "✅ Node.js version compatible"
fi
```

### Performance Monitoring

Monitor build performance:

```bash
# Time your builds
time npm run build

# Monitor memory usage
htop  # or Activity Monitor on macOS

# Check bundle sizes
npm run build
ls -la dist/
```

## 🆘 Getting Help

If you're still having issues:

1. **Check GitHub Issues** for similar problems
2. **Create a new issue** with:
   - Operating system and version
   - Node.js and npm versions
   - Complete error messages
   - Steps to reproduce
   - What you've already tried

3. **Use the setup script**:
   ```bash
   ./setup-dev.sh
   ```

4. **Ask in discussions** for general questions

## 📚 Additional Resources

- [Node.js Version Manager (nvm)](https://github.com/nvm-sh/nvm)
- [Vue CLI Troubleshooting](https://cli.vuejs.org/guide/troubleshooting.html)
- [Electron Debugging Guide](https://www.electronjs.org/docs/tutorial/debugging-main-process)
- [Webpack Migration Guide](https://webpack.js.org/migrate/)

---

Remember: Most issues are related to Node.js version compatibility or platform restrictions. Start with checking your Node.js version and using the legacy OpenSSL provider flag.