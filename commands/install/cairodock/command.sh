#!/usr/bin/env bash

# Cairo-Dock Installation Script
# This script installs Cairo-Dock, a customizable desktop dock for Linux

# Step 1: Check if running on Linux
echo "Checking operating system..."
OS="$(uname -s)"

if [[ "$OS" != "Linux" ]]; then
    echo "Error: Cairo-Dock is only available for Linux systems."
    echo "Current OS: $OS"
    exit 1
fi

echo "Linux detected. Proceeding with Cairo-Dock installation..."

# Step 2: Check for X11 display server
echo "Checking display server compatibility..."

# Check if X11 is running
if [ -n "$DISPLAY" ] && command -v xset &> /dev/null && xset q &> /dev/null; then
    echo "X11 display server detected and running."
    DISPLAY_SERVER="X11"
elif [ "$XDG_SESSION_TYPE" = "x11" ]; then
    echo "X11 session detected."
    DISPLAY_SERVER="X11"
elif [ -n "$WAYLAND_DISPLAY" ] || [ "$XDG_SESSION_TYPE" = "wayland" ]; then
    echo "ERROR: Wayland display server detected."
    echo "Cairo-Dock requires X11 and is not compatible with Wayland."
    echo
    echo "Solutions:"
    echo "1. Switch to an X11 session:"
    echo "   - Log out and select 'Ubuntu on Xorg' or similar X11 option at login"
    echo "   - Or switch your desktop environment to use X11"
    echo "2. Use X11 forwarding if running remotely:"
    echo "   - ssh -X username@hostname"
    echo "3. Consider alternatives for Wayland:"
    echo "   - Plank dock"
    echo "   - Dash to Dock (GNOME extension)"
    echo "   - Latte Dock (KDE)"
    exit 1
else
    echo "WARNING: Cannot determine display server type."
    echo "Cairo-Dock requires X11 to function properly."
    echo "If you're not running X11, the installation may fail or Cairo-Dock may not work."
    echo
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 1
    fi
    DISPLAY_SERVER="Unknown"
fi

# Step 3: Detect Linux distribution and install
echo "Detecting Linux distribution..."
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
else
    echo "Cannot detect Linux distribution"
    exit 1
fi

case "${DISTRO}" in
    ubuntu|debian)
        echo "Debian/Ubuntu detected. Installing Cairo-Dock via apt..."
        sudo apt update
        sudo apt install -y cairo-dock cairo-dock-plug-ins
        ;;
    fedora)
        echo "Fedora detected. Installing Cairo-Dock via dnf..."
        sudo dnf install -y cairo-dock cairo-dock-plug-ins
        ;;
    centos|rhel)
        echo "CentOS/RHEL detected. Installing Cairo-Dock via yum..."
        sudo yum install -y epel-release
        sudo yum install -y cairo-dock cairo-dock-plug-ins
        ;;
    arch|manjaro)
        echo "Arch Linux detected. Installing Cairo-Dock via pacman..."
        sudo pacman -S --noconfirm cairo-dock cairo-dock-plug-ins
        ;;
    opensuse*)
        echo "openSUSE detected. Installing Cairo-Dock via zypper..."
        sudo zypper install -y cairo-dock cairo-dock-plug-ins
        ;;
    *)
        echo "Unsupported Linux distribution: ${DISTRO}"
        echo "Please install Cairo-Dock manually for your distribution"
        echo "Or compile from source: http://glx-dock.org/"
        exit 1
        ;;
esac

# Step 4: Verify installation
echo "Verifying Cairo-Dock installation..."
if command -v cairo-dock &> /dev/null; then
    echo "Cairo-Dock installed successfully!"
    echo "Cairo-Dock version: $(cairo-dock --version 2>/dev/null || echo 'Version info not available')"
else
    echo "Warning: cairo-dock command not found"
    echo "Installation may have failed"
    exit 1
fi

# Step 5: Create desktop entry if it doesn't exist
echo "Checking for desktop entry..."
if [ ! -f ~/.local/share/applications/cairo-dock.desktop ] && [ ! -f /usr/share/applications/cairo-dock.desktop ]; then
    echo "Creating desktop entry..."
    mkdir -p ~/.local/share/applications
    cat > ~/.local/share/applications/cairo-dock.desktop << EOF
[Desktop Entry]
Name=Cairo-Dock
Comment=A customizable desktop dock
Exec=cairo-dock
Icon=cairo-dock
Terminal=false
Type=Application
Categories=Utility;
StartupNotify=true
EOF
fi

# Step 6: Display usage information
echo
echo "Cairo-Dock installation complete!"
echo "Display Server: $DISPLAY_SERVER"
echo
echo "Getting started with Cairo-Dock:"
echo "1. Launch Cairo-Dock:"
echo "   > cairo-dock"
echo "   Or find it in your applications menu"
echo
echo "2. Configure Cairo-Dock:"
echo "   - Right-click on the dock to access settings"
echo "   - Or run: cairo-dock --config"
echo
echo "3. Auto-start Cairo-Dock:"
echo "   - Add 'cairo-dock' to your startup applications"
echo "   - Or use: cairo-dock --startup"
echo
echo "Common Cairo-Dock options:"
echo "- Run in background: cairo-dock &"
echo "- Configuration mode: cairo-dock --config"
echo "- Safe mode: cairo-dock --safe-mode"
echo "- Help: cairo-dock --help"
echo
echo "Customization tips:"
echo "- Themes and applets available at: http://glx-dock.org/"
echo "- Right-click dock → Configure → Themes to change appearance"
echo "- Add applets via Configure → Add-ons"
echo
echo "Note: Cairo-Dock requires X11. If you switch to Wayland, you'll need to use alternatives."