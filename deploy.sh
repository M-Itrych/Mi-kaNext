#!/bin/bash
set -e

SOURCE_DIR="."
REMOTE_DIR="/home/michal/v2.mi-ka.pl"
HOST="michal@57.128.180.118"
PORT="22"

echo "Creating remote directory if needed..."
ssh -p "$PORT" "$HOST" "mkdir -p '$REMOTE_DIR'"

echo "Archiving and transferring files to server..."
(cd "$SOURCE_DIR" && tar \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    -czf - .) | \
    ssh -p "$PORT" "$HOST" "tar -xzf - -C '$REMOTE_DIR' --strip-components=1 --no-same-owner"

echo "Deployment completed successfully!"
echo "Files transferred to $HOST:$REMOTE_DIR"

echo "Setting up symbolic link (if needed)..."
echo "You may be prompted for your sudo password"
ssh -t -p "$PORT" "$HOST" "sudo ln -sfn '$REMOTE_DIR' /var/www/v2.mi-ka.pl"

sleep 10
