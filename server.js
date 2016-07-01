//Loads the express module and stores a reference in express variable
//thing stores a reference to the API calls to the database
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
page = require('./public/api/apiRoutes');

//App is an instance of express, which is exported by the express module.
//The app object contains the methods for routing http requests
var app = express();

//log status codes over 400, i.e 404 500 etc.
morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//Route method definitions
//Each one defines the function to be called when the route is matched
//When a GET is sent, the application will call the findAll function from apiRoutes
//And the returned items will be linked to the response object
//app.get will route HTTP GET requests to the path with the callback function described
app.get('/pages', page.findAll);
// app.get('/pages/:id', page.findById);
app.post('/pages', page.addPage);
// app.put('/pages/:id', page.updatePage);
// app.delete('/pages/:id', thing.deletePage);

app.listen(3000);
console.log('Listening on port 3000...');