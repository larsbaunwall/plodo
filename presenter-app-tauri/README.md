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

## 🔒 Security

Built with Tauri's security-first approach:

- CSP (Content Security Policy) configuration
- Secure IPC communication between frontend and backend
- Rust-based backend for memory safety

## 📄 License

This project is licensed under the MIT License.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
