#!/usr/bin/env bash

# Moltbot (formerly Clawdbot) Installation Script
# This script installs Moltbot - an open-source personal AI assistant

set -e

echo "=========================================="
echo "  Moltbot Installation"
echo "=========================================="
echo ""

echo "[1/7] Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "  ERROR: Node.js is required but not installed!"
    echo "  Please install Node.js 18+ first."
    exit 1
fi
echo "  Node.js found: $(node --version)"

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "  ERROR: Node.js 18+ is required!"
    echo "  Current version: $(node --version)"
    exit 1
fi
echo "  Node.js version OK (18+)"

if ! command -v npm &> /dev/null; then
    echo "  ERROR: npm is required but not found!"
    exit 1
fi
echo "  npm found: $(npm --version)"

echo ""
echo "[2/7] Checking for existing installation..."
if command -v clawd &> /dev/null; then
    echo "  WARNING: Clawd is already installed: $(clawd --version 2>/dev/null || echo 'unknown version')"
    read -p "  Reinstall? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "  Installation cancelled."
        exit 0
    fi
fi

echo ""
echo "[3/7] Running Moltbot installer..."
if curl -fsSL https://molt.bot/install.sh | bash; then
    echo "  Installer script completed."
else
    echo "  WARNING: Official installer may have failed, trying npm..."
fi

echo ""
echo "[4/7] Setting up PATH..."
if [[ ":$PATH:" != *"$HOME/.local/bin:"* ]]; then
    export PATH="$HOME/.local/bin:$PATH"
    if [ -f ~/.bashrc ] && ! grep -q 'export PATH="\$HOME/.local/bin:\$PATH"' ~/.bashrc 2>/dev/null; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
        echo "  Added to .bashrc"
    fi
    if [ -f ~/.zshrc ] && ! grep -q 'export PATH="\$HOME/.local/bin:\$PATH"' ~/.zshrc 2>/dev/null; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
        echo "  Added to .zshrc"
    fi
else
    echo "  PATH already configured."
fi

echo ""
echo "[5/7] Verifying clawd command..."
if command -v clawd &> /dev/null; then
    echo "  SUCCESS: Clawd is installed"
    echo "  Version: $(clawd --version 2>/dev/null || echo 'could not determine')"
else
    echo "  Clawd not found, trying npm install..."
    
    echo ""
    echo "[6/7] Installing via npm..."
    if npm i -g clawdbot; then
        echo "  npm install complete."
    else
        echo "  ERROR: npm install failed!"
        exit 1
    fi
fi

echo ""
echo "[7/7] Final verification..."
if command -v clawd &> /dev/null; then
    echo "  SUCCESS: Moltbot is ready!"
    echo "  Command: clawd"
else
    echo "  ERROR: Installation failed - clawd command not found!"
    echo "  Please check the logs above."
    exit 1
fi

echo ""
echo "=========================================="
echo "  Moltbot installation complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Run: clawd onboard"
echo "  2. Configure your AI API key"
echo "  3. Start: clawd"
