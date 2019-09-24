#!/bin/bash

export NODE_ENV="local"
export TZ="UTC"

# Database configuration
export DB_TYPE="sqlite"
export DB_HOST="localhost"
export DB_PORT="3306"
export DB_USER="root"
export DB_PASS="Develop123"
export DB_NAME=":memory:"
export DB_SOCKET_PATH="/tmp/sam-db.sock"