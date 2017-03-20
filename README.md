# hexp-web
Repository for hexp web code i.e. api and user and admin frontends.

## How do I get set up?
1. Install node 6.10.0 (e.g. with n),
2. `npm i` - install dependencies,
3. `chmod +x pre-commit.sh && ./pre-commit.sh` - add pre-commit hook,
4. Create or modify .env file in the root directory with the following parameters:

Parameter | Expecting | Example
--- | --- | ---
NODE_ENV | 'production' or 'development' | 'development'
NODE_PORT | integer of port to listen on | 3000
NODE_BASEURL | the base url of the webpage | 'http://localhost:3000'

5. `npm start` - Start the server,
6. `npm run nodemon` - Alternatively, start the server in developer mode, restarting after every change made

## NPM commands
1. `npm run nodemon` - Watch for changes in the server files (bin/www) and restart the server as the files are changed
2. `npm run webpack` - Watch for changes in the javascript files (specified in the webpack.config.js) and compile them as they change
3. `npm start` - Start the server normally
4. `npm test` - Run the tests on the project
5. `npm run lint` - Run the lint beautifier on the project files

## Server paths
1. `http://<server_url>/` - Main page of the website, the one used by the users
2. `http://<server_url>/admin` - Administration page
3. `http://<server_url>/prototype/<page_name>` - Prototyping page for the specified page (<page_name>)
4. `http://<server_url>/api` - Path for the public API released by the app