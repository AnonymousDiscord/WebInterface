#!/bin/bash

# Update git
git reset --hard HEAD
git clean -f -d
git pull

# Update files
rm -rfd node_modules
sed -i 's+//\*+/\*+g' src/App.tsx
rm src/Debug.tsx

# Build
npx browserslist@latest --update-db
npm ci
npm run build

# Update productive system
rm -rfd /var/www/html/
mv build /var/www/html/

# Reload productive system
service apache2 reload
