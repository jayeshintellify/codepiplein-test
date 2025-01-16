#!/bin/bash
# Unzip the build artifact to the destination folder
echo "Unzipping new build..."
sudo unzip /react-app-build.zip -d /var/www/healthc2u-admin/

# Set correct permissions for the files if needed
echo "Setting permissions..."
sudo chmod -R 755 /var/www/healthc2u-admin/
