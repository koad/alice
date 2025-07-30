#!/usr/bin/env bash

# Keybase Installation Script
# This script installs Keybase for secure messaging, file sharing, and identity verification

# Step 1: Detect the operating system
echo "Detecting operating system..."
OS="$(uname -s)"
ARCH="$(uname -m)"

case "${OS}" in
    Linux*)
        echo "Linux detected. Installing Keybase for Linux..."

        # Step 2: Download and install Keybase for Linux
        echo "Downloading Keybase installer..."
        if ! curl --remote-name https://prerelease.keybase.io/keybase_amd64.deb; then
            echo "Error: Failed to download Keybase installer"
            exit 1
        fi

        # Fix any interrupted dpkg operations first
        echo "Checking for interrupted dpkg operations..."
        sudo dpkg --configure -a

        echo "Installing Keybase..."
        if ! sudo dpkg -i keybase_amd64.deb; then
            echo "Error installing Keybase. Attempting to fix broken packages..."
            sudo apt-get --fix-broken install -y
            sudo dpkg --configure -a
            if ! sudo dpkg -i keybase_amd64.deb; then
                echo "Error: Failed to install Keybase after attempting fixes"
                rm -f keybase_amd64.deb
                exit 1
            fi
        fi

        # Fix any dependency issues
        echo "Fixing any dependency issues..."
        sudo apt-get install -f -y

        # Clean up installer file
        echo "Cleaning up installer file..."
        rm -f keybase_amd64.deb
        ;;

    Darwin*)
        echo "macOS detected. Installing Keybase for macOS..."

        # Step 2: Download and install Keybase for macOS
        echo "Downloading Keybase installer..."
        curl --remote-name https://prerelease.keybase.io/Keybase.dmg

        echo "Mounting DMG and installing Keybase..."
        hdiutil attach Keybase.dmg
        cp -R "/Volumes/Keybase/Keybase.app" /Applications/
        hdiutil detach "/Volumes/Keybase"

        # Clean up installer file
        echo "Cleaning up installer file..."
        rm -f Keybase.dmg
        ;;

    *)
        echo "Unsupported operating system: ${OS}"
        echo "Please visit https://keybase.io/download to download Keybase manually."
        exit 1
        ;;
esac

# Step 3: Start Keybase service
echo "Starting Keybase service..."
run_keybase

# Step 4: Verify installation
echo "Verifying Keybase installation..."
if command -v keybase &> /dev/null; then
    echo "Keybase version: $(keybase version)"
    echo "Keybase service status: $(keybase status)"
else
    echo "Warning: Keybase command not found in PATH"
    echo "You may need to restart your terminal or add Keybase to your PATH"
fi

# Step 5: Display next steps
echo
echo "Keybase installation complete!"
echo
echo "Next steps:"
echo "1. Create a Keybase account or log in:"
echo "   > keybase signup"
echo "   > keybase login"
echo
echo "2. Prove your identity by connecting social accounts:"
echo "   > keybase prove twitter <username>"
echo "   > keybase prove github <username>"
echo "   > keybase prove reddit <username>"
echo
echo "3. Start using Keybase:"
echo "   - Send encrypted messages: keybase chat send <username> 'Hello!'"
echo "   - Share files securely: keybase fs write /keybase/private/<you>,<them>/file.txt"
echo "   - Use the GUI application for easier interaction"
echo
echo "For more information, visit: https://keybase.io/docs"