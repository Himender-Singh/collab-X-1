#!/usr/bin/env bash

# Install all backend deps (including dev ones)
npm install

# Go into the Frontend folder and install everything (including devDependencies)
cd Frontend
npm install

# Run the frontend build
npm run build

# Move back to root if needed
cd ..
