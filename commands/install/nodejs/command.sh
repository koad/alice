#!/usr/bin/env bash

# NVM (Node Version Manager) Installation Script
# This script installs NVM, latest LTS Node.js, yarn, and nodemon globally

# Step 1: Download and install NVM
# Note: curl -o- ensures a silent and secure download.
echo "Downloading and installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Step 2: Source NVM to make it available in current session
echo "Loading NVM in current session..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Step 3: Install latest LTS Node.js version
echo "Installing latest LTS Node.js version..."
nvm install --lts

# Step 4: Set LTS as default version
echo "Setting LTS as default Node.js version..."
nvm alias default lts/*

# Step 5: Use the LTS version
echo "Switching to LTS version..."
nvm use default

# Step 6: Install yarn globally
echo "Installing yarn globally..."
npm install -g yarn

# Step 7: Install nodemon globally
echo "Installing nodemon globally..."
npm install -g nodemon

npm install -g dotenv-cli

# Step 8: Verify installations
echo "Verifying installations..."
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "yarn version: $(yarn --version)"
echo "nodemon version: $(nodemon --version)"

# Step 9: Add NVM initialization to shell profiles
echo "Adding NVM initialization to shell profiles..."

# Add to .bashrc if it exists
if [ -f ~/.bashrc ]; then
    echo "Adding NVM initialization to .bashrc..."
    echo '' >> ~/.bashrc
    echo '# NVM initialization' >> ~/.bashrc
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion' >> ~/.bashrc
fi

# Add to .zshrc if it exists
if [ -f ~/.zshrc ]; then
    echo "Adding NVM initialization to .zshrc..."
    echo '' >> ~/.zshrc
    echo '# NVM initialization' >> ~/.zshrc
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.zshrc
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion' >> ~/.zshrc
fi

echo
echo "NVM installation complete!"
echo "Latest LTS Node.js version installed and set as default."
echo "yarn and nodemon installed globally."
echo
echo "To start using NVM in your current session, run:"
echo "> source ~/.bashrc"
echo
echo "Or open a new terminal session."