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

1. Restart project by deleting all files [Commit]()
