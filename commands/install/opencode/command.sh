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

PATH=$PATH:/home/koad/.opencode/bin
echo ""
echo "=========================================="
echo "  OpenCode installation complete!"
echo "=========================================="
