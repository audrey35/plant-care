# Final Project: Plant Care Website

## Step 1. Restart from L6-files (prof's repo)

1. Copy files from professor's repo (L6-files)
2. Edit to add forum, post, viewProfile (view only for annoymous users), editProfile for known users

## Step 2. Add MongoDB Atlas URI

1. Add MONGODB_URI to config vars in Heroku.

## Step 3. Add Navigation and Design

1. Add Material UI
2. Add navigation and design to forum, home, login, register
3. Add navigation and design to comment, post
4. Add navigation and design to public/private profile, user list
5. Add footer and privacy policy (displayed after registration)

## Step 4. Add plant search tool (openfarm.cc)

1. Add plant search functionality
2. Display search results as plant cards

## Step 5. Provide success/fail message when submitting

1. Add success/fail message when registering
2. Add success/fail message when logging in
3. Add success message when logging out
4. Add success/fail message when creating a post/comment
5. Add success/fail message when updating profile

# Changes to codebase before finalizing

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
3. Change email to username for login, sign up and profile [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/46129e5656107353856b94ffe418b9fec638bbcc)
   - replace 'Email' with 'Username': client/src/pages/LoginPage and SignUpPage
   - replace 'email' with 'username':
     - client/src/pages/LoginPage, ProfilePage, SignUpPage
     - src/routes/loginRoute, signUpRoute, updateProfileRoute
4. Change `Info for {username}` to `{username}'s Profile` (client/src/pages/ProfilePage.js)
5. Change Favorite Food, Hair Color, Bio to Bio, Email, Favorite Plant
   - edit client/src/pages/ProfilePage.js and src/routes/updateProfileRoute.js
6. Remove Forgot your Password? from LoginPage [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/45635f86becde0dc335470ebe84e1e25794c2a12)
7. Change profile URL from '/' to '/profile' on client/src/Routes.js (allows edits)
   - rename ProfilePage to ProfileEditPage
8. Create profile URL '/profile/:username' on client/src/Routes.js (read only) [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/1376edd829d1563aa999854cfbd188229409d8a0)
   - update client/src/Routes.js
   - create src/routes/viewProfileRoute.js and copy from editProfileRoute
     - refer to app.get("/api/articles/:name" in react-blog branch's server.js
   - create client/src/pages/ProfileViewPage.js and copy from ProfileEditPage
     - remove buttons and onChange
   - add viewProfileRoute to src/routes/index.js
9. Fix navigation issues [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/05fb4fd3976a26bfe4effa6f06bb51ebfcedecdb)
10. Split info field in db into publicInfo and privateInfo fields [Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/commit/a24feb37c772145fb22fe6d7a931222c6243e8b3)
    - replace info with publicInfo and privateInfo
      - src/routes/signUpRoute.js: for signing up
      - client/src/pages/ProfileEditPage.js: for editing profile page
      - src/routes/updateProfileRoute.js: for editing profile page
      - src/routes/loginRoute.js: for logging in
      - src/routes/viewProfileRoute.js: for viewing profile page (no edits)
      - client/src/pages/ProfileViewPage.js: for viewing profile page (no edits)
11. Fix view profile so that it can be viewed without logging in [Commit](https://github.ccs.neu.edu/audreyjo/f201fb2f6fcb7960ea51eec1b993874ab70c6db5)
    - fixed so that profile/non-existing-username takes you back to home page

## Step 4. Add Home Page

[Commit](https://github.ccs.neu.edu/audreyjo/a1366fb88d1d06b45e0cc20be91d6847f2764acb)

## Step 5. Add Forum

### Add ForumPage (list of posts)

[Commit](https://github.ccs.neu.edu/audreyjo/5aad388d7e3076bbd146f0a25e3aec12170aaa99)

1. add bootstrap to client/public/index.html
2. add css copied from react-blog branch (source: LinkedIn Learning) to client/src/index.css
3. add /forum route to client/src/Routes.js
4. add client/src/pagesForumPage.js copied from react-blog branch/client/src/pages/ArticlesListPage.js
5. add client/src/components/PostsList.js copied from react-blog branch/client/src/components/ArticlesList.js
6. add post-content.js copied from react-blog branch/client/src/pages/article-content.js

## Step 6. Restart and setup back-end for authentication & forum

[Commit](https://github.ccs.neu.edu/audreyjo/363664041c750f3832015130e20615933ecdbe0e)

1. Copy files from react-blog branch
2. Install packages for backend

- `npm i bcryptjs express jsonwebtoken mongoose swagger-jsdoc swagger-ui-express passport passport-jwt is-empty validator concurrently # 0 vulnerabilities`
- `npm i -D nodemon # 0 vulnerabilities`

3. Implement login/registration by following [tutorial](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669)
4. Convert Article to Post from react-blog branch (the code comes from [LinkedIn Learning](https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site/setting-up-a-react-project), check react-blog branch README for more info)
5. Authenticate when trying to add a post or comment by following [tutorial](https://github.com/rishipr/teams)

## Step 7. Add update user for back-end

[Commit](https://github.ccs.neu.edu/audreyjo/4579ba12dfbc5fd58879d38fb48162cf519123dc)

## Step 8. Implement front-end

Followed instructions from [here](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82)

1. Delete the existing client folder
2. run `npx create-react-app client` inside the root folder
3. Add "proxy": "http://localhost:5000" to client/package.json
4. in client folder run `npm i axios classnames jwt-decode react-redux react-router-dom redux redux-thunk`
5. Moving react-scripts to devDependencies, delete node_modules, package-lock.json and running npm i, npm audit --production results in 0 vulnerabilities
6. Clean up React app and add Materialize.css
