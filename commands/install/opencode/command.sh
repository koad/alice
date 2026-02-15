#!/usr/bin/env bash

# OpenCode Installation Script
# This script installs OpenCode CLI tool

set -e

echo "=========================================="
echo "  OpenCode Installation"
echo "=========================================="
echo ""

echo "[1/4] Detecting OS..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "  Detected: Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "  Detected: macOS"
else
    echo "  ERROR: Unsupported OS: $OSTYPE"
    exit 1
fi

echo ""
echo "[2/4] Downloading OpenCode installer..."
if curl -fsSL https://opencode.ai/install | bash; then
    echo "  Download complete."
else
    echo "  ERROR: Download failed!"
    exit 1
fi

echo ""
echo "[3/4] Moving OpenCode to PATH..."
if [ -f "$HOME/.local/bin/opencode" ]; then
    echo "  Found at: $HOME/.local/bin/opencode"
    if sudo mv "$HOME/.local/bin/opencode" /usr/local/bin/; then
        echo "  Moved to: /usr/local/bin/"
    else
        echo "  ERROR: Failed to move to /usr/local/bin/"
        exit 1
    fi
elif [ -f "$HOME/opencode" ]; then
    echo "  Found at: $HOME/opencode"
    if sudo mv "$HOME/opencode" /usr/local/bin/; then
        echo "  Moved to: /usr/local/bin/"
    else
        echo "  ERROR: Failed to move to /usr/local/bin/"
        exit 1
    fi
else
    echo "  WARNING: OpenCode binary not found in expected locations."
fi

echo ""
echo "[4/4] Verifying installation..."
if command -v opencode &> /dev/null; then
    echo "  SUCCESS: OpenCode is installed"
    echo "  Version: $(opencode --version)"
else
    echo "  ERROR: OpenCode command not found in PATH!"
    echo "  Please check the installation logs above."
    exit 1
fi

echo ""
echo "=========================================="
echo "  OpenCode installation complete!"
echo "=========================================="
