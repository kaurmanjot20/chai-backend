## Learning backend from Hitesh Sir's Channel

# .gitkeep is used to track the temporary empty folders in the codebase, which can be used to temporarily store data like images and videos in case connection third party server is lost

# .env can't be pushed to github, in order to share that data, .env.samle file can be created and pushed

# echo. > index.js this cmd can be used to create files from the terminal

# importing can be done using 1. commonJS 2. moduleJS. We'll be using module js here (using import instead of require)...write "type":"module" in package.json

# use nodemon as a dev dependency; not to be pushed to deployment
"scripts": {
    "dev": "nodemon src/index.js"
  }
# this will start nodemon to restart index.js inside of the src when npm run dev cmd is used

