#!/usr/bin/env bash

# Exit on errors
set -e

echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
npm install --prefix Frontend

# Add vite binary path to shell
export PATH=$PATH:./Frontend/node_modules/.bin

echo "Building frontend with Vite..."
npm run build --prefix Frontend

echo "Build complete!"
