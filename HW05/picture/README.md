# Picture of the Day from NASA

Heroku: https://word-search-games.herokuapp.com

## Environment Setup

```
mkdir picture // create a project
cd picture
sudo npm install express-generator -g // tool that sets up a directory structure
cd ..
express picture // creates a directory structure in picture directory
cd picture
npm install
npm install hbs --save // handlebars
npm install
```

## Push to Heroku

- copy and paste picture/package.json to cs5610_audreyjo/package.json
- commit the change to git
- push the changes to heroku

```
heroku git:remote -a word-search-games -r a5 // add remote for heroku app
git push a5 master:main // push the changes to heroku
```

## Create Home Page

- create a form for submitting a date
- get express to render the home page
  - kept rendering the default jade file
  - tried to setup hbs in app.js, but got
    _Error: No default engine was specified and no extension was provided._
    - https://stackoverflow.com/a/23596000
    - went back to L5-files to correctly setup hbs in app.js

## Website Screenshots

- home page
  ![picture of the home page](./public/images/index-screenshot.png)
- use the date picker to choose a date (by default, today's date is highlighted)
  ![picture of the home page with date picker](./public/images/date-picker.png)
