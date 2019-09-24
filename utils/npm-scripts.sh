cleanJS() {
  # Paths are relative to SAM root directory, not "tools/"
  find ./src \( -name '.DS_Store' -or -name '._*' -or -name '*.js' -or -name '*.js.map' \) -delete
  find ./test \( -name '.DS_Store' -or -name '._*' -or -name '*.js' -or -name '*.js.map' \) -delete
  find ./utils \( -name '.DS_Store' -or -name '._*' -or -name '*.js' -or -name '*.js.map' \) -delete
}

mocha() {
  /bin/sh -c "rm -f edugoai-sqlite-test.db; source config-sqlite-test.sh; npx mocha --bail --exit --timeout 8000 test/unit/**/*.js test/unit/*.js"
}

# Check if the function exists (bash-specific)
if declare -f "$1" > /dev/null
then
  # call arguments verbatim
  "$@"
else
  # Show a helpful error
  echo "'$1' is not a known function name" >&2
  exit 1
fi
