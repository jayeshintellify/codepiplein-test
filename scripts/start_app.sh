#!/bin/bash
# Restart the web server to serve the new static files (Apache or Nginx)
echo "Restarting web server..."
sudo systemctl restart nginx
