#!/bin/bash

# exit if a command returns a non-zero exit code and also print the commands and their args as they are executed.
set -e -x

# Download and install required tools.
npm install

npm install -g cdktf-cli

case $BUILD_TYPE in
  PullRequest)
      cdktf synth
    ;;
  *)
      cdktf deploy --auto-approve
    ;;
esac