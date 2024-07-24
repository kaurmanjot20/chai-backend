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

# install prettier as a dev dependency for better code readability 

# database is always in another continent. use try catch and take care of async await

# -r dotenv/config --exprimental-json-modules 
# write this above in the scripts so that the dotenv is loaded and import dotenv can be used in place of require

# sometimes module not found can be due to missing extensions in import

# if env variables are changed, manually restart the server

# app.use() used for middleware and config settings

# mongoose-aggregate-paginate-v2 npm package for aggregation

# bcrypt and bcryptjs: handling encryption decryption of passwords

# jsonwebtoken

# jwt.io

# direct encryption not possible so hooks are used like pre: it runs just before controller or the call like just before data saving

# jwt is a bearer token. its like a key..one who has jwt token gets the data

# express-fileupload and multer - used for file uploading/handling

# nodejs fs- (fs=file system) comes with nodejs as builtin.