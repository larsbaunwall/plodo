#!/bin/bash
# Plodo Development Setup Script
# This script helps set up the development environment for plodo

set -e

echo "🚀 Plodo Development Setup"
echo "=========================="

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
echo "📋 Node.js version: $(node --version)"

if [ "$NODE_VERSION" -ge 18 ]; then
    echo "⚠️  Warning: Node.js 18+ detected. This project has legacy dependencies."
    echo "   Consider using Node.js 14-16 for best compatibility."
    echo "   Setting legacy OpenSSL provider for builds..."
    export NODE_OPTIONS="--openssl-legacy-provider"
fi

echo ""
echo "📦 Installing dependencies..."

# Setup client app
echo "🌐 Setting up client app (web application)..."
cd client-app

if command -v yarn &> /dev/null; then
    echo "   Using yarn..."
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install
else
    echo "   Using npm..."
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install
fi

echo "✅ Client app dependencies installed"

# Check if we're on a supported platform for Electron
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo ""
    echo "⚠️  Linux detected: Presenter app (Electron) is not supported on Linux"
    echo "   You can work on the client app, but presenter app builds require Windows/macOS"
else
    echo ""
    echo "🖥️  Setting up presenter app (Electron)..."
    cd ../presenter-app
    
    if command -v yarn &> /dev/null; then
        echo "   Using yarn..."
        yarn install
    else
        echo "   Using npm..."
        npm install
    fi
    
    echo "✅ Presenter app dependencies installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Read AGENT_INSTRUCTIONS.md for detailed documentation"
echo "   2. Start development:"
echo "      • Client app: cd client-app && npm run serve"
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
echo "      • Presenter app: cd presenter-app && yarn electron:serve"
fi
echo "   3. Visit http://localhost:8080 for the client app"
echo ""
echo "🔗 Useful commands:"
echo "   • npm run lint     - Run linting"
echo "   • npm run build    - Build for production"
echo ""
echo "📚 For more information, see:"
echo "   • AGENT_INSTRUCTIONS.md - Comprehensive development guide"
echo "   • README.md - Project overview"