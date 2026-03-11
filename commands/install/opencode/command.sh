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
if [[ "$OSTYPE" == "linux-gnu"* ]] && command -v apt &> /dev/null; then
    echo "[2/4] Ensuring clipboard helpers (wl-clipboard/xclip/xsel/xdotool)"
    sudo apt update >/dev/null && sudo apt install -y wl-clipboard xclip xsel xdotool
else
    echo "[2/4] Skipping clipboard helpers (apt not available)"
fi

echo ""
echo "[3/4] Downloading OpenCode installer..."
if curl -fsSL https://opencode.ai/install | bash; then
    echo "  Download complete."
else
    echo "  ERROR: Download failed!"
    exit 1
fi

echo ""
echo "[4/4] Finalizing installation..."
PATH=$PATH:/home/koad/.opencode/bin
echo "=========================================="
echo "  OpenCode installation complete!"
echo "=========================================="
