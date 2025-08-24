# Plodo Presenter - Tauri + Vue 3 + TypeScript Project

This is a desktop presentation application built with:

- **Backend**: Tauri v2 (Rust)
- **Frontend**: Vue 3 + TypeScript
- **State Management**: Pinia
- **CSS Framework**: Bulma v1 (Buefy): Vue 3 compatible
- **Build Tool**: Vite

## Project Structure

- `src/` - Vue 3 frontend source code
- `src-tauri/` - Rust backend source code
- `src-tauri/src/lib.rs` - Main Tauri application logic with tray icon support
- `src-tauri/tauri.conf.json` - Tauri configuration including tray icon settings

## Features

- System tray icon with context menu
- Click tray icon to show/hide main window
- Quit option from tray menu
- Window starts hidden and can be opened via tray icon

## Development Commands

- `yarn dev` - Start frontend development server
- `yarn tauri dev` - Start Tauri development mode with hot reload
- `yarn build` - Build for production
- `yarn tauri build` - Build Tauri application for distribution

## Tray Icon Functionality

The application includes a system tray icon that:

- Shows a tooltip "Plodo Presenter" on hover
- Left-click toggles window visibility
- Right-click shows context menu with "Show Window" and "Quit" options
- Window starts hidden by default and can only be accessed via tray icon

## Technical Implementation

- Tray icon is created programmatically in `src-tauri/src/lib.rs` using TrayIconBuilder
- Tray event handling is implemented in the setup() function in Rust
- Uses Tauri's built-in tray icon system (no external plugins required)
- No tray icon configuration needed in tauri.conf.json (handled entirely in Rust code)

## Development instructions

- Follow the instructions in the [Tauri documentation](https://tauri.app/docs/getting-started/intro) when adding features that requires tauri support
- Follow the best practices for organizing Tauri commands and events as outlined in the documentation.
- Follow [vue 3 documentation](https://vuejs.org/guide/introduction.html) for best practices in Vue 3 development.
- Always use [bulma v1](https://bulma.io/documentation/) for styling and layout. Bulma v1 is used together with the latest [Buefy](https://buefy.org/documentation/) which supports Vue 3.

### Development

- Never use any or unknown types in TypeScript.
- Always prefer explicit types over implicit ones.
- Use interfaces for object shapes and types for primitive values.
- Keep your TypeScript version up to date for the latest features and fixes.

### Workflow

- Always run `yarn lint` to check for linting errors before committing code.
- Always run `yarn format` to format code before committing.
- Always run `yarn type-check` to check for TypeScript errors before committing.
- Fix errors you encounter during linting or type checking before building. Do not endlessly build and fix errors one by one
