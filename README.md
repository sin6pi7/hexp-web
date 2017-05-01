# hexp-web
Repository for hexp web code i.e. api and user and admin frontends.

## How do I get set up?
1. Install node 6.10.0 (e.g. with n),
2. `npm i` - install dependencies,
3. `chmod +x pre-commit.sh && ./pre-commit.sh` - add pre-commit hook,
4. `cp .env.tpl .env` - create environment file and add/modify following parameters:

Parameter | Expecting | Example
--- | --- | ---
NODE_ENV | 'production' or 'development' | 'development'
SERVER_PORT | integer of port to listen on | 3000
DATABASE_URI | postgres db uri | postgres://hexp:hexp@localhost:5432/hexp

5. `npm run webpack` - Compile all of the .js files needed for the client side,
6. `npm run less` - Compile all of the .less files into the necessary .css files for the client side. Note that this keeps running watching for changes in the folder, after compiling once, exit the script (ctrl+c),
7. `npm start` - Start the server,
8. `npm run nodemon` - Alternatively, start the server in developer mode, restarting after every change made
9. `npm run db:populate` - Populate database with random data (check out scripts/db-populate.js)

## NPM commands
1. `npm run nodemon` - Watch for changes in the server files (bin/www) and restart the server as the files are changed
2. `npm run webpack` - Compile all of the javascript files from the js folder and place them in /public/scripts
3. `npm run webpack-watch` - Same as 'npm run webpack' but watch for changes to the files and auto compile if there are any changes
4. `npm start` - Start the server normally
5. `npm test` - Run the tests on the project
6. `npm run lint` - Run the lint beautifier on the project files
7. `npm run less` - Watch for changes in the /less folder, and compile all of the .less files inside, outputing to /public/stylesheets

## Server paths
1. `http://<server_url>/` - Main page of the website, the one used by the users
2. `http://<server_url>/admin` - Administration page
3. `http://<server_url>/api` - Path for the public API released by the app