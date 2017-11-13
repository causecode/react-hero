#!/bin/sh

set -e

echo "Installing nvm...."
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

echo "Installing node v6.11.0"
nvm install v6.11.0 && nvm use v6.11.0

echo "Installing npm@5.4.1"
npm install npm@5.4.1 -g
