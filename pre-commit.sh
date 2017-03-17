#!/bin/sh

# Install yourself on first execution
if [ ! -f .git/hooks/pre-commit ]; then
  ln -s ../../pre-commit.sh .git/hooks/pre-commit
fi

# Lint and tests check
npm run lint && npm test
