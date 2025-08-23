# Copilot Instructions for plodo Repository

## Repository Overview

**plodo** is a real-time audience feedback application for presentations. It consists of three main components:

- **Backend API** (.NET 8.0 Web API with Cassandra database)
- **Client Web App** (Vue.js 2.x PWA for audience members) 
- **Presenter Desktop App** (Electron + Vue.js cross-platform desktop application)

The application allows presenters to create feedback sessions and receive real-time audience responses through emoji reactions and polls.

## High-Level Repository Information

- **Repository Size**: ~50MB with dependencies  
- **Languages**: C# (.NET 8.0), JavaScript/TypeScript (Vue.js 2.x), HTML/CSS
- **Frameworks**: ASP.NET Core 8.0, Vue.js 2.x, Electron 8.x
- **Database**: Cassandra 
- **Build Tools**: .NET CLI, npm/yarn, Vue CLI, Electron Builder
- **Target Platforms**: Linux (API), Web browsers (client), Windows/macOS (presenter app)
- **License**: GNU Affero General Public License v3

## Build Instructions

### Prerequisites
- **.NET 8.0 SDK** (required for API)
- **Node.js 20.x** with npm/yarn (required for frontend apps)
- **Docker** (optional, for containerized deployment)

### Backend API (api/ directory)

**✅ Working Build Process:**
```bash
cd api/
dotnet restore
dotnet build plodo.Backend.API/plodo.Backend.API.csproj
dotnet run --project plodo.Backend.API/plodo.Backend.API.csproj
```

**⚠️ Important Notes:**
- **Always** exclude the `plodo.Backend.API.old` project - it's incompatible (targets .NET Core 3.1)
- Build **only** the main API project, not the entire solution
- The API will start on `http://localhost:5177` (HTTP) and `https://localhost:7130` (HTTPS)  
- Swagger UI is available at `/swagger` endpoint for API testing
- No unit tests exist in this repository

**Configuration Requirements:**
- Cassandra connection settings in `appsettings.json` (required for production)
- JWT signing secret in `appsettings.Development.json` (pre-configured for development)

### Client Web App (client-app/ directory)

**✅ Working Build Process:**
```bash
cd client-app/
npm install  # Use npm, not yarn (yarn has dependency issues)
NODE_OPTIONS="--openssl-legacy-provider" npm run build
npm run lint  # Linting works correctly
```

**⚠️ Known Issues & Workarounds:**
- **CRITICAL**: Must use `NODE_OPTIONS="--openssl-legacy-provider"` due to Node.js 20.x compatibility
- **CRITICAL**: Use `npm` instead of `yarn` - yarn fails on node-sass and puppeteer dependencies
- Set `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` if puppeteer download fails
- Build creates production bundle in `dist/` directory with prerendered routes
- Development server: `npm run serve` (works without OpenSSL flag)

### Presenter Desktop App (presenter-app/ directory)

**⚠️ Platform Restrictions:**
```bash
cd presenter-app/
# This will FAIL on Linux - app is Windows/macOS only
yarn install  # Will fail with platform incompatibility error
```

**Important Notes:**
- **Cannot be built on Linux** - package.json restricts to `"win32"` and `"darwin"` only
- Uses Electron Builder for cross-platform desktop builds
- Requires code signing certificates for distribution (Windows/macOS)
- Uses electron-notarize for macOS app notarization

## Project Layout and Architecture

### Directory Structure
```
/
├── .github/                 # GitHub configuration (funding, this file)
├── api/                     # .NET 8.0 Backend API
│   ├── plodo.Backend.API/   # Main API project (✅ USE THIS)
│   ├── plodo.Backend.API.old/ # Legacy project (❌ IGNORE - .NET Core 3.1)
│   ├── plodo.Backend.Services/ # Business logic layer
│   ├── plodo.Backend.Repositories/ # Data access layer
│   ├── plodo.Backend.sln    # Solution file
│   ├── docker-compose.yml   # Docker composition
│   ├── Dockerfile           # Legacy Docker config (.NET Core 3.1)
│   └── global.json          # .NET SDK version specification
├── client-app/              # Vue.js 2.x Web Application
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # npm dependencies
│   ├── vue.config.js        # Vue CLI configuration
│   └── .eslintrc.js         # ESLint configuration
├── presenter-app/           # Electron Desktop Application  
│   ├── src/                 # Source code
│   ├── build/               # Build scripts and certificates
│   ├── package.json         # npm dependencies + electron-builder config
│   └── vue.config.js        # Vue CLI + Electron Builder config
├── artwork/                 # Logos, screenshots, assets
├── frontend.code-workspace  # VS Code workspace configuration
└── README.md               # Project documentation
```

### Key Configuration Files

**API Configuration:**
- `api/plodo.Backend.API/appsettings.json` - Production configuration (Cassandra, JWT)
- `api/plodo.Backend.API/appsettings.Development.json` - Development overrides
- `api/plodo.Backend.API/Properties/launchSettings.json` - Development server settings
- `api/global.json` - .NET SDK version lock (.NET 8.0)

**Client App Configuration:**
- `client-app/vue.config.js` - Vue CLI build configuration with prerendering
- `client-app/.eslintrc.js` - ESLint rules (Vue.js + basic rules)
- `client-app/babel.config.js` - Babel transpilation settings
- `client-app/package.json` - Dependencies (Vue 2.x, Buefy, Bulma CSS)

**Presenter App Configuration:**
- `presenter-app/vue.config.js` - Electron Builder configuration with signing
- `presenter-app/build/` - Code signing certificates and notarization scripts
- `presenter-app/package.json` - Electron dependencies and build targets

### Architecture Overview

**Backend (API):**
- **ASP.NET Core 8.0** with Swagger documentation
- **Repository Pattern** for data access (`plodo.Backend.Repositories`)
- **Service Layer** for business logic (`plodo.Backend.Services`) 
- **Cassandra Database** for session and vote storage
- **JWT Authentication** for API access
- **CORS enabled** for web client access
- **Server-Sent Events** for real-time updates (`/session-stream` endpoint)

**Frontend Applications:**
- **Vue.js 2.x** with Vue Router and Vuex state management
- **Buefy/Bulma** for UI components and styling
- **Axios** for HTTP API communication
- **EventSource** for real-time server-sent events
- **PWA support** in client app with service worker

### Continuous Integration

**Azure DevOps Pipeline:**
- Badge visible in README: [![Backend build](https://dev.azure.com/plodo/plodo.Backend/_apis/build/status/plodo.Backend-Build)](https://dev.azure.com/plodo/plodo.Backend/_build/latest?definitionId=2)
- Builds backend API automatically
- **No GitHub Actions workflows** exist in this repository

## Validation Steps

**Before Making Changes:**
1. **Test API Build**: `cd api && dotnet build plodo.Backend.API/plodo.Backend.API.csproj`
2. **Test Client Build**: `cd client-app && NODE_OPTIONS="--openssl-legacy-provider" npm run build`
3. **Run Linting**: `cd client-app && npm run lint` 
4. **Check API Startup**: `cd api && dotnet run --project plodo.Backend.API/plodo.Backend.API.csproj` (should start without errors)

**Key Files to Avoid Modifying:**
- `api/plodo.Backend.API.old/` - Legacy incompatible project
- `presenter-app/build/` - Contains signing certificates and notarization configs
- `client-app/public/cfg.json` - Runtime configuration for client
- `.github/FUNDING.yml` - Sponsorship configuration

## Dependencies Not Obvious from File Structure

**Hidden Dependencies:**
- **Cassandra Database** - Required for API runtime (not included in repo)
- **Code Signing Certificates** - Required for presenter app distribution
- **Azure Application Insights** - Telemetry service (client app)
- **Apple Developer Account** - Required for macOS notarization
- **Windows Store Partner Account** - For Windows Store distribution

**Environment Variables Used:**
- `ASPNETCORE_ENVIRONMENT` - ASP.NET Core environment setting
- `NODE_OPTIONS` - Node.js runtime options (required: `--openssl-legacy-provider`)
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - Skip Puppeteer browser download
- `APPLEID`, `APPLEIDPASS` - Apple notarization credentials (presenter app)
- `PROVISIONING_PROFILE` - macOS app provisioning profile path

## Trust These Instructions

**⚠️ IMPORTANT**: Trust these instructions and avoid extensive exploration. The build processes have specific compatibility requirements and workarounds that are documented here. Only search for additional information if these instructions are incomplete or proven incorrect.

**Common Pitfalls to Avoid:**
- Building the entire `api/plodo.Backend.sln` (contains incompatible projects)
- Using `yarn` instead of `npm` for client-app
- Building presenter-app on non-Windows/macOS platforms
- Forgetting the `NODE_OPTIONS` environment variable for client builds
- Modifying Docker files without understanding .NET Core 3.1 vs .NET 8.0 differences