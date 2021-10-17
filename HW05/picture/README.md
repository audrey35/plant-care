# Picture of the Day from NASA

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
