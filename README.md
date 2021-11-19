# Final Project: Plant Care Website

## Step 1. Create Express project

- create project branch
- use express-generator to create a ejs project called plant-care

## Step 2. Set up environment for smoother development

- install Remote SSH, ESLint, Prettier, nodemon
- [Remote SSH with Visual Studio Code](https://code.visualstudio.com/blogs/2019/07/25/remote-ssh)
- [Setting up ESLint, Prettier, nodemon](https://www.linkedin.com/learning/building-a-website-with-node-js-and-express-js-3/setting-up-eslint-and-prettier)

  - ESLint: code style and code mistakes

    - uses a ruleset to enforce some coding style rules and points out common coding mistakes
    - install eslint: `npm install -D eslint`
      - `-D`: indicates the package is a development dependency (check package.json to confirm)
      - development dependency: eslint won't be included when the project is deployed into production
      - `npx`: comes with your NodeJS installation
        - will first look into your node_modules folder to find the script you want to execute, but if it isn't there, it will pull it down from the npm repository
      - initialize eslint: `npx eslint --init`
        - returns a wizard
        - How would you like to use ESLint? `To check syntax, find problems, and enforce code style`
        - What type of modules does your project use? `Common JS (require/exports)` - this is what NodeJS uses
        - Which framework does your project use? `React`
        - Does your project use TypeScript? `N`
        - Where does your code run? `Node` - deselect `browser` by pressing <kbd>i</kbd> - select `Node` by pressing <kbd>space</kbd>, then <kbd>enter</kbd>
        - How would you like to define a style for your project? `Use a popular style guide`
        - Which style guide do you want to follow? `Airbnb`
        - What format do you want your config file to be in? `JSON`
        - The config that you've selected requires the following dependencies: ... Would you like to install them now with npm? `Y`

  - Prettier: consistent code formatting
    - a tool that can format your code and keep the code formatting consistent
    - install Prettier: `npm install -D prettier eslint-config-prettier eslint-plugin-prettier`
  - Tell VSCode about the modules ESLint and Prettier
    - install two extensions:
      - ESLint by Dirk Baeumer
      - Prettier by Esben Petersen
    - update the VSCode configuration for the two extensions
      - Go to Code, Preferences, Settings
      - search for `eslint`
      - select `Eslint: Auto Fix On Save`, may not exist
      - search for `save`
      - enable `Editor: Format On Save`
      - set the default code format for VSCode
        - search for `format`
        - find `Editor: Default Formatter`
        - set it to `esbenp.prettier-vscode` by typing prettier
      - change the eslintrc.json file to add the modules we installed before
        - add `prettier` under extends and plugins
        ```
        },
        "extends": [
           "airbnb-base", "prettier"
        ],
        "plugins": ["prettier"],
        ```
      - set some defaults for prettier
        - create a config file called .prettierc (inside dir containing package.json) - trailingComma: how the trailing comma should look like for arrays - printWidth: the line length - singleQuote: use single quotes for strings
        ```
        {
           "trailingComma": "es5",
           "printWidth": 100,
           "singleQuote": true
        }
        ```
  - [Setting up nodemon](https://www.linkedin.com/learning/building-a-website-with-node-js-and-express-js-3/setting-up-nodemon)
  - Nodemon: watch a project and reload it automatically when a file changes (i.e., reruns `node server.js` meaning the [http://localhost:3000](http://localhost:3000) would be updated)
    - otherwise, you'd have to reload express every time you change the code
    - install nodemon: `npm install -D nodemon`
    - open package.json to change the start script
      - `--ignore feedback.json`: tell express to ignore the feedback.json, meaning don't reload every time feedback.json gets changed
      - `server.js`: the script we want to start when running the dev command
    - source: [start, dev, debug scripts](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
    - [What is the debug script doing?](https://stackoverflow.com/a/47481085)
    ```
    "scripts": {
       "start": "node ./bin/www",
       "dev": "nodemon ./bin/www",
       "debug": "DEBUG=plant-care:* npm run dev"
    },
    ```
    - run `npm run dev` or `npm run debug` to run the dev script defined in package.json file and start nodemon

## Step 3: Setup Login/Registration

### Restart project by deleting all files

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/5a75d52b64056217a81c48f6e22ec32c99a9d24b)

### Create new project based off of tutorials

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/66ab9fd4899e239f8408bfae00b8cfb8c5a8d6c1)

- [React: Creating and Hosting a Full-Stack Site](https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site)
- [React: Authentication](https://www.linkedin.com/learning/react-authentication)

```
// Create front-end and back-end
npm init -y
npm i bcrypt express jsonwebtoken mongoose swagger-jsdoc swagger-ui-express # 0 vulnerabilities
npm i -D @babel/core @babel/node @babel/preset-env nodemon # 0 vulnerabilities
npx create-react-app client # 27 vulnerabilities (16 moderate, 9 high, 2 critical)
cd client
npm i react-router-dom axios # 27 vulnerabilities (16 moderate, 9 high, 2 critical)
```

3. Troubleshoot vulnerabilities in client directory

   - edit client/package.json: move `react-scripts` to `devDependencies`
     - Must move react-scripts back to dependencies before deploying to Heroku

   ```
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "web-vitals": "^1.1.2"
      },
      "devDependencies": {
        "react-scripts": "4.0.3"
      },
   ```

   - delete node_modules and package-lock.json `sudo rm -r node_modules package-lock.json `
   - reinstall packages `npm i`
   - `npm audit --production` returned 0 vulnerabilities

4. Test the app
   - client: `npm start` and http://localhost:3000
   - server: `npm run dev` and http://localhost:8000
     - (node:10134) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
       - solution: add "type": "module" below "main" in package.json

### Copy front-end files from react-login

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/78fdd93a10c65a6876a8e4ba405f8012858b1a07)

1. Clone cs5610_audreyjo in another directory outside of cs5610_audreyjo dir for this project
   - `git clone neu:audreyjo/cs5610_audreyjo.git`
2. Switch to react-login branch in the duplicate copy
   - `git checkout -t origin/react-login`

**Copy Front-End files from react-login branch**

- package.json was identical, so no changes made
- copy front-end/public and front-end/src folders

```
cp -r duplicate/cs5610_audreyjo/front-end/public cs5610_audreyjo
cp -r duplicate/cs5610_audreyjo/front-end/src cs5610_audreyjo
```

- `npm start` in client directory returns `./src/auth/PrivateRoute.js Attempted import error: 'Redirect' is not exported from 'react-router-dom'.`
  - [solution](https://stackoverflow.com/a/69408107): replace Redirect with Navigate in src/auth/PrivateRoute.js
- `./src/Routes.js Attempted import error: 'Switch' is not exported from 'react-router-dom'.`
  - [solution](https://stackoverflow.com/a/69849271): fix src/Routes.js
- `./src/Routes.js SyntaxError: /home/cs5610/cs5610_audreyjo/client/src/Routes.js: Identifier 'Routes' has already been declared. (7:13)`
  - rename `const Routes` to `const RoutesList`
- `./src/App.js Attempted import error: 'Routes' is not exported from './Routes'.`
  - rename `Routes` to `RoutesList`
- `./src/pages/SignUpPage.js Attempted import error: 'useHistory' is not exported from 'react-router-dom'.`
  - [solution](https://stackoverflow.com/a/66971821): useHistory() is replaced by useNavigate()
  - same for src/pages/LoginPage.js and src/pages/UserInfoPage.js
- `Error: [PrivateRoute] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
  - [solution](https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5): fix PrivateRoute and Route tags in Routes.js

### Fix copied front-end files

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/8f759cc673b6af5baf9a7964a2089c7e9f7f685f)

1. add proxy in client/package.json
   - add `"proxy": "http://localhost:8080/",` below `"private/"`
2. edit client/src/auth/PrivateRoute.js
   - [solution](https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5): change to a function

### Copy back-end files from react-login

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/29f56d7637e913d4ddaa4e5c74bd9f9760745035)

1. package.json was identical, so no changes made
2. copy back-end/src, back-end/.babelrc
   ```
   cp -r duplicate/cs5610_audreyjo/back-end/.babelrc cs5610_audreyjo
   cp -r duplicate/cs5610_audreyjo/back-end/src cs5610_audreyjo
   ```
3. add `process.env.JWT_SECRET = "sdfgfghfgret";` to src/routes/loginRoute.js, signUpRoute.js, updateUserInfoRoute.js

   - localhost:8000/api/signup and localhost:8000/api/login works as expected

4. move server.js to root folder
   - `mv src/server.js ./server.js`
5. add src in front of routes in index and db import statements: `"./src/routes/index.js"`

6. test full-stack app

   - in client: `npm start`
   - at root: `npm run dev`
   - navigate to: http://localhost:3000

### Changes to login/sign up/profile pages

1. Change updateUserInfoRoute to updateProfileRoute
   - edit src/routes/index.js
     - right-click `updateUserInfoRoute`, excluding .js in import statement
     - choose Rename Symbol, then rename it to updateProfileRoute
   - edit src/routes/updateProfileRoute.js
     - right-click `updateUserInfoRoute` const, click Rename Symbol, then rename to updateProfileRoute (need to have index.js open)
2. Change UserInfoPage to ProfilePage [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/40f14d8971b3cd0e1b3540579573885ed76fcfae)
   - edit client/src/Routes.js
     - right-click `UserInfoPage` at the end of import statement
     - choose Rename Symbol, then rename it to ProfilePage
   - edit client/src/pages/ProfilePage.js
     - right-click `UserInfoPage` const, click Rename Symbol, then rename to ProfilePage (need to have Routes.js open)
3. Change email to username for login, sign up and profile
   - replace 'Email' with 'Username': client/src/pages/LoginPage and SignUpPage
   - replace 'email' with 'username':
     - client/src/pages/LoginPage, ProfilePage, SignUpPage
     - src/routes/loginRoute, signUpRoute, updateProfileRoute
