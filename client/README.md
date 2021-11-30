# Final Project: Plant Care Website

## Objective

The goal of this branch is

- to follow [React: Creating and Hosting a Full-Stack Site (LinkedIn Learning)](https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site/setting-up-a-react-project) tutorial for creating a full-stack blog app using MERN.
- deploy the blog app on Heroku by following the [Deploying MERN App to Heroku (using your Git Master Branch & MongoDB Atlas)](https://coursework.vschool.io/deploying-mern-app-to-heroku/)
- add authentication by following the [React: Authentication (LinkedIn Learning)](https://www.linkedin.com/learning/react-authentication/what-you-should-know)
- redeploy to Heroku

## Create and deploy a MERN site (react front-end and node back-end)

### Creating a React Front End

#### Setting up a React project

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/0c74db054c3f0e6521ab53398f44a29029969eae)

1. run `npx create-react-app my-blog`
2. `cd my-blog`
3. run `npm start` to verify that the default react app is displaying properly
4. commit the changes

#### Creating the app component

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/8c516779359a2ecd77a05e25d343221fc1d25ead)

1. set up the app to use react router
2. set up home page

- Lorem ipsum text from [here](https://www.freeformatter.com/lorem-ipsum-generator.html#ad-output)
- React Router: easiest way to implement navigation in react
  - easy to display a certain page or component in a slot depending on the current url
  - install React Router:
    - [solution](https://github.com/facebook/create-react-app/issues/11174): if you tried to install react router and got 29 vulnerabilities, then to get 0 vulnerabilities:
      - move `react-scripts` to `devDependencies` in package.json (removes errors from production audit)
      - delete node_modules, package-lock.json (forces npm to reinstall)
      - reinstall packages `npm i`
      - run `npm audit --production`, ignore `npm audit` results
    ```
    sudo rm -r node_modules
    rm package-lock.json
    npm i
    npm audit --production // ignore npm audit vulnerabilities and use this instead
    npm i react-router-dom
    npm audit --production // should find 0 vulnerabilities
    ```
- edit App.js to incorporate react-router
  - the code in the video is out of date
  - must use the code in the current commit for App.js
  - [source](https://github.com/crowingram/my-blog/blob/main/src/App.js)
  - refer to [react router doc](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

#### Creating blog pages

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/5c69ec03ebc3833006e5cc7aa1e9d65b889db3f7)

1. Create blog pages

- create each page as its own component inside the pages folder
  - AboutPage.js, ArticlesList.js, ArticlePage.js inside pages folder
- App.js: set url paths and display files in pages folder
- `npm start` to test everything works as expected

#### Using react-router links

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/48d2e4232e09a6b40940c8d6b460569230cdc88f)

1. Create a navigation bar

- create src/NavBar.js
- edit src/App.js to incorporate NavBar.js

#### URL parameters with react-router

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/f727464b8c4e3e92b1e819bc90eb40dfaab3008c)

1. Need to display any article depending on the URL using the same ArticlePage component
   - done using URL parameters

- React Router 6 doesn't use "match.params" anymore
- import useParams: `import { useParams } from "react-router-dom";`
- use it to access the name parameter:
  ```
  const ArticlePage = () => {
    let { name } = useParams();
  ```
- create src/pages/article-content.js: add article-content data
- edit src/pages/ArticlePage.js:
  - find article in article-content that match the parameter from url: article.name=url-parameter.name
  - display article title and content on page
  - return error message on site if article name provided in url doesn't match any articles in the data

#### Creating and linking the articles list

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/6b99a3a195edc551c9dcba9a490461a81b405350)

1. provide a list of links to each article on the articles page
2. provide a preview of 1st 150 characters of each article on the articles page

- edit src/pages/ArticlesList.js

#### Making the articles list modular

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/f00adfa9c35acee529757e10a0eef4781d6665ae)

1. make the articles list modular
   - use cases:
     - display a list of related articles at the bottom of each article page
     - display a list of the most popular articles on our blog's home page

- edit ArticlesList.js (move and rename to ArticlesListPage.js): display modular content
- add src/components/ArticlesList.js: create modular articles list (or list of anything)
- edit ArticlePage.js: display list of related articles at the bottom of the page (exclude current article)

#### Creating a 404 page in React

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/2bb2fb71f8b03e774acd992f60726fca78f84e75)

1. Create a 404 page for a url with no pages

- add src/pages/NotFoundPage.js
- edit src/App.js
  - Switch is now Routes, so no need for `exact` for HomePage and `path="*"` for 404 routing
- edit src/pages/ArticlePage.js
  - consistent 404 page

### Creating a Node Back End

#### Setting up an Express server

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/6eb4484e9d82a025c972345dc3c57cef41629d9f)

1. Create server `mkdir my-blog-backend` and `cd my-blog-backend`
   - same level as my-blog
2. Create npm package: `npm init -y`
3. Installations:
   ```
   npm i express
   npm i --save-dev @babel/core @babel/node @babel/preset-env
   ```

#### Testing an Express server with Postman

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/dc9f151b4b403d844295e1b2d68b2d6a4bbd4549)

1. Use Postman to test backend
2. Create get and post route
3. Don't install body-parser

#### Route parameters in Express

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/b159b18bbc46ebad9b97c7032d36fd203ff2fca3)

1. Use route parameters
   - http://localhost:8000/hello/:name
   - name is the route parameter

#### Upvoting articles

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/c2e3c50a66b736b76eb8f871a0ecd6c9adcbcbe7)

1. users can upvote articles
   - create fake database to keep track of upvotes
2. set up npm start
   - edit package.json: `"start": "npx nodemon --exec npx babel-node src/server.js",`

#### Adding comments functionality

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/36111de003a88b903d9ca74819d359f0dc8f19e7)

1. users can add comments
   - add comments to the fake database
   - add api route to post comments

### Setting Up MongoDB

#### Installing MongoDB

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/eb18bfe26a757aac7ff8ee35a2bfebcd87d8e1dd)

1. Start mongod: `sudo systemctl start mongod`
2. run mongo shell to create a database and add data:
   ```
   mongo
   use my-blog
   db.articles.insert([{
   ... name: 'learn-react',
   ... upvotes: 0,
   ... comments: [],
   ... }, {
   ... name: 'learn-node',
   ... upvotes: 0,
   ... comments: [],
   ... }, {
   ... name: 'my-thoughts-on-resumes',
   ... upvotes: 0,
   ... comments: [],
   ... }])
   db.articles.find({}).pretty()
   db.articles.find({ name: 'learn-react'}).pretty()
   db.articles.findOne({ name: 'learn-react'})
   exit
   ```

#### Adding MongoDB to Express

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/42359cf1f478497314f0b465daa03f140cbd8ba0)

1. install mongodb: `npm install mongodb`
2. replace fake data with a local mongodb database connection: edit server.js

#### Rewriting the upvote endpoint

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/6ac8cf40046aaf9d2d27100922c5102fd97a1582)

1. rewrite the upvote endpoint
   - findOne query to find one matching article
   - update query to increase the number of upvotes for the article in the database
   - send the updated article information as a response to the client

#### Rewriting the comments endpoint

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/690851da79f7a6a14325c0992eca6b130646139f)

1. refactor to remove duplicate code
   - create a function for db connection (withDB) and use it in get name and post upvote endpoints
2. rewrite comments endpoint using withDB function

### Connecting the Front and Back Ends

#### Adding React Hooks

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/01eaa5d9f9a38126bcb93491f37edb0439f29c50)

1. When we navigate to an article page, we want our frontend to automatically query the server and display the comments and the number of upvotes that the article has
   - add state to our components: basically allow our components to temporarily store information (i.e., info loaded from server)
2. my-blog/src/pages/ArticlePage.js: display number of upvotes (hardcoded) on each article page

#### Calling useEffect at the right time

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/fb4a9bbdc26dee8c0ceb651f937db10176877e0d)

1. avoid creating an infinite loop inside useEffect

#### Adding Fetch to pages

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/44a1abf7a6d418aa3cb0ceb41ad4a6e039d48793)

1. In Chrome, you might get an error page, but click the x to close the error (not the browser) to see the article page
2. The errors shown will be fixed after following instructions on the video
   - edit package.json to avoid CORS error

#### Displaying comments

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/7da62f39623fd7aca034ba43ac8b3a04e7d27957)

1. display the comments
2. Chrome Inspector Console shows: `[HMR] Waiting for update signal from WDS...`
   - [solution](https://stackoverflow.com/a/63232905): message is intended for development process and it is just there to notify you that your server is running in dev mode and it is awaiting changes you make so it can refresh the browser. HMR is acronym for Hot Module Replacement.

#### Adding an Upvote button

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/85a27152cd26b1e9a864d19703bcb2efc25cee72)

1. Add an upvote button

#### Adding an Add Comment form, part 1

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/2f9bb4cc12b8c4a00f3c0bbba129e0a250da346a)

1. create AddCommentForm.js
   - create username and comment states to temporarily store information about username and comment

#### Adding an Add Comment form, part 2

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/f7a19ca35fb1a103ed9c07c0bfc821781542ab3d)

1. edit AddCommentForm.js
   - link the username and comment states to the text fields that they represent

#### Adding an Add Comment form, part 3

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/259ec6821cd4cd326cb1db7e86c7af9d036e8cf0)

1. edit AddCommentForm.js
   - add comment form to ArticlePage.js (can test it)

### Hosting the Site

#### Preparing the app for release

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/ab390738ebe12e4e082abaaf3ca4ffe8ca055f37)

1. change titles from React App to My Blog: edit `my-blog/public/index.html` and `my-blog/public/manifest.json`
2. Tell Heroku to build the React app after we push up the code ([solution](https://coursework.vschool.io/deploying-mern-app-to-heroku/))

- reorganize folders
  ```
  mv my-blog client // rename my-blog (frontend) to client
  mv my-blog-backend my-blog // rename my-blog-backend to my-blog
  mv client my-blog/client // move client folder into my-blog (backend)
  mv my-blog/src/server.js my-blog/server.js // move server.js out of src folder
  rm -r my-blog/src // delete the empty src folder in backend
  ```
- edit my-blog/server.js

  ```
  app.use(express.static(path.join(__dirname, "client/build"))); // Serve static files from the React app

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

  app.listen(process.env.PORT || 8000, () =>
    console.log("Listening on port 8000")
  );
  ```

- edit my-blog/package.json

  ```
   "scripts": {
     "start": "npx nodemon --exec npx babel-node src/server.js",
     "heroku-postbuild": "cd client && npm install && npm run build"
   },
   "engines": {
     "node": "16.13.0"
   },
  ```

- (tutorial) Instead of creating a build folder (contains compiled source code of the react app): `npm run build`

#### Deploy to Heroku

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/c64414e1f585af9bfb218fa2fa1366edd14960e2)

1. push changes to GitHub
   - move files out of my-blog and delete my-blog folder
2. add heroku remotes `heroku git:remote -a cs5610-audreyjo-3 -r prj`
   - view list of remotes: `git remote -v`
3. push changes to Heroku: `git push prj react-blog:master`

#### Deploy to Heroku part 2

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/a89c103b265d955ea42a33503e8da51bf93d8f48)

1. edit package.json: `"heroku-postbuild": "cd client && npm install --only=dev && npm run build"`
   - [solution](https://stackoverflow.com/a/42797559)

#### Deploy to Heroku part 3

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/671825804cb5a53ccc8baf48701eaa300adc4e05)

1. edit package.json: `"heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"`

#### Deploy to Heroku part 4

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/00f2ec35db71efe2ffed2384de9bceab09e73dab)

1. move react-scripts from devDependencies to dependencies

#### Deploy to Heroku part 5

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/4b80ac638ac4dc9d4bfc31cc68408954a9ed98e0)

1. check heroku logs `heroku logs -r prj`
2. fix path to server.js

#### Deploy to Heroku part 6

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/3af5e697d0032bb807b39d62f8511f3795fb905b)

1. edit package.json
   - remove nodemon
   - add `"type": "module"`
2. edit server.js
   - add `__filename` and `__dirname`

#### Deploy to Heroku part 7

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/975615707da72ccd88526fffa1fc5a524bcc2cee)

1. actually remove nodemon from package.json

#### Deploy to Heroku part 8

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/e2f3f57423e22dad58ab22cf472c637fc7ccf8bb)

1. `npx babel-node ../server.js`

#### Deploy to Heroku part 9

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/3e19d85aefe715828b404be2cbbff0c60d1ac536)

1. `node server.js`

#### Deploy to Heroku part 10

[Commit](https://github.ccs.neu.edu/audreyjo/cs5610_audreyjo/tree/4476fe0a243c66447bdabef34305e64a5e5d9706)

1. Connect to MongoDB Atlas ([instructions](https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/))
   - create db, collection, and enter data in MongoDB Atlas
   - get connection string and update username, password, database
     - log into MongoDB, on databases tab, click Connect
     - click Connect your application
     - copy connection string and edit it
       - `<username>` should be replaced with just username, remove brackets
       - same for `<password>`
       - `myFirstDatabase` should be `jeopardy` regardless of the database being used
   - add connection string to Config Vars in Heroku (go to Settings for the app)
