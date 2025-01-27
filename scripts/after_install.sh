#!/bin/bash
# Unzip the build artifact to the destination folder
echo "Unzipping new build..."
sudo unzip /var/www/healthc2u-admin/build.zip -d /var/www/healthc2u-admin/ && mv /var/www/healthc2u-admin/build/* /var/www/healthc2u-admin/ && rm -r /var/www/healthc2u-admin/build && rm -r /var/www/healthc2u-admin/build.zip
