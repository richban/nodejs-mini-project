#!/bin/bash

export NODE_ENV="local"
export TZ="UTC"

# Database configuration
export DB_TYPE="sqlite"
export DB_HOST="localhost"
export DB_PORT="3306"
export DB_USER="root"
export DB_PASS="Develop123"
export DB_NAME="edugoai-dev"
export DB_SOCKET_PATH="/tmp/edugoai-db.sock"

# Application-specific
export JWT_SECRET="n9w7otblnJ9JHQfX1mUpWc3mHA71gVhm"
export API_URL="http://localhost:8080"