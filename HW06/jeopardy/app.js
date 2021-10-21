/*
running node app.js cause
Error: The 2nd parameter to `mongoose.model()` should be a schema or a POJO
- something's wrong with the schema in controller.js
- error from mixing prof's and LinkedIn Learning
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
- follow tutorial for TodoListAPI https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
- follow the tutorial for adding Swagger UI 
   - https://blog.logrocket.com/documenting-your-express-api-with-swagger/
   - https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do
   - https://github.com/satansdeer/swagger-api-library/blob/master/routes/books.js
*/
var     express         =   require('express'),
        app             =   express(),
        path            =   require('path'),
        port            =   process.env.PORT || 3000,
        mongoose        =   require('mongoose'),
        Clue            =   require('./api/models/jeopardyModel'),
        routes          =   require('./api/routes/jeopardyRoutes'), // importing route
        bodyParser      =   require('body-parser'),
        swaggerUi       =   require('swagger-ui-express'),
        swaggerJsdoc    =   require('swagger-jsdoc');

// Swagger UI
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Jeopardy API",
        version: "1.0.0",
        description:
          "A Jeopardy API",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Audrey Jo",
          email: "jo.au@northeastern.edu",
        },
      },
    },
    apis: ["./api/routes/jeopardyRoutes.js"],
  };
  
const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://audrey123:123@jeopardy.jdcoe.mongodb.net/jeopardy?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); // register the route

app.listen(port);

console.log('jeopardy RESTful API server started on: ' + port);