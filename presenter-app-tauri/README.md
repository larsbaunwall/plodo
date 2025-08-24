# Plodo Presenter - Tauri + Vue 3 + TypeScript

A modern desktop presentation application built with Tauri v2, Vue 3, and TypeScript featuring system tray integration.

## 🚀 Features

- **System Tray Icon**: Click to show/hide the application window
- **Vue 3 + TypeScript**: Modern frontend with full type safety
- **Pinia State Management**: Reactive state management for Vue
- **Bulma CSS Framework**: Clean and responsive UI components
- **Tauri v2**: Secure and lightweight desktop application framework

## 🛠️ Tech Stack

- **Backend**: Tauri v2 (Rust)
- **Frontend**: Vue 3 + TypeScript + Vite
- **State Management**: Pinia
- **UI Framework**: Bulma
- **Package Manager**: Yarn

## 📦 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Rust (latest stable)
- Yarn package manager

### Getting Started

1. **Install dependencies**:

   ```bash
   yarn install
   ```

2. **Start development server**:

   ```bash
   yarn tauri dev
   ```

3. **Build for production**:

   ```bash
   yarn tauri build
   ```

## 🎯 System Tray Functionality

The application features a system tray icon that provides:

- **Left Click**: Toggle window visibility (show/hide)
- **Right Click**: Context menu with options:
  - Show Window
  - Quit Application
- **Tooltip**: "Plodo Presenter" on hover
- **Auto-hide**: Window starts hidden and can only be accessed via tray

## 🏗️ Project Structure

```text
├── src/                    # Vue 3 frontend source
├── src-tauri/             # Rust backend source
│   ├── src/lib.rs         # Main application logic
│   ├── tauri.conf.json    # Tauri configuration
│   └── Cargo.toml         # Rust dependencies
├── public/                # Static assets
└── package.json          # Node.js dependencies
```

## 🔧 Configuration

The tray icon is configured in `src-tauri/tauri.conf.json`:

```json
{
  "app": {
    "trayIcon": {
      "iconPath": "icons/icon.png",
      "tooltip": "Plodo Presenter",
      "showMenuOnLeftClick": false
    },
    "windows": [{
      "visible": false  // Start hidden
    }]
  }
}
```

## 📋 Available Scripts

- `yarn dev` - Start Vite development server
- `yarn build` - Build frontend for production
- `yarn tauri dev` - Start Tauri in development mode
- `yarn tauri build` - Build Tauri application for distribution

### Linting & Formatting

- `yarn lint` - Lint JavaScript/TypeScript/Vue files
- `yarn lint:fix` - Lint and auto-fix JavaScript/TypeScript/Vue files
- `yarn lint:rust` - Lint Rust code with Clippy
- `yarn lint:rust:fix` - Lint and auto-fix Rust code
- `yarn format` - Format JavaScript/TypeScript/Vue files with Prettier
- `yarn format:check` - Check if files are formatted correctly
- `yarn format:rust` - Format Rust code with rustfmt
- `yarn format:rust:check` - Check if Rust code is formatted correctly
- `yarn type-check` - Run TypeScript type checking
- `yarn lint:all` - Run all linting (JS/TS/Vue + Rust)
- `yarn format:all` - Run all formatting (JS/TS/Vue + Rust)

## 🔍 Code Quality & Linting

This project uses comprehensive linting and formatting tools to maintain code quality:

### Frontend (JavaScript/TypeScript/Vue)

- **ESLint**: JavaScript, TypeScript, and Vue linting with Vue 3 specific rules
- **Prettier**: Code formatting for consistent style
- **TypeScript**: Strict type checking enabled
- **Vue ESLint Plugin**: Vue 3 specific linting rules

Configuration files:
- `eslint.config.js` - ESLint configuration using modern flat config
- `.prettierrc` - Prettier formatting rules
- `tsconfig.json` - TypeScript compiler options

### Backend (Rust)

- **Clippy**: Rust linting with comprehensive rule set
- **rustfmt**: Automatic code formatting
- **Cargo.toml**: Lint configuration with strict settings

### IDE Integration

The project includes VS Code settings for automatic linting and formatting:

- Format on save enabled
- ESLint auto-fix on save
- Rust analyzer with Clippy integration

Install recommended extensions:

- ESLint
- Prettier
- Vue Language Features (Volar)
- rust-analyzer
- Tauri

### Pre-commit Hooks

A pre-commit hook is configured to run all linting and formatting checks before commits. This ensures code quality is maintained across all contributions.

### Current Linting Status

The project has a few remaining linting issues that require manual attention:

- Unused variables in CelebrationScreen.vue
- Console statements in development code (warnings)
- Some TypeScript `any` types that should be properly typed

These can be addressed by running `yarn lint` and fixing the reported issues.

## 🔒 Security

Built with Tauri's security-first approach:

- CSP (Content Security Policy) configuration
- Secure IPC communication between frontend and backend
- Rust-based backend for memory safety

## 📄 License

This project is licensed under the MIT License.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
