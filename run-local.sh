source config.sh
nodemon -e ts --exec "node node_modules/typescript/bin/tsc -p ./tsconfig.json && node --inspect src/index.js"
