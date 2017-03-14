#!/bin/bash

cd $PROJECT

npm install
npm run build:node
PROJECT_FILE=$(npm pack)

cd $VALIDATE

npm install $PROJECT/$PROJECT_FILE

if [ -e $APP/config.json ]; then
    node validate.js $APP/config.json
    cp results.json $APP
else
    echo "No config.json found."
fi
