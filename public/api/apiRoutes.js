//Store mongodb module 
var mongo = require('mongodb');
var bson = require('bson');

//Create new server connection object and database instance
var Server = mongo.Server,
Db = mongo.Db,
BSON = bson.BSONPure;

/*
Server stores new server object (host, port, reconnect if theres an error)
db stores a new database instance (name of db, serverConfig=Server)
*/

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('pagedb', server);

/*
Initialise/open db connection method
Callback function called after exec of this method
If no error occurs, the "things" collection is retreived
If collection is not found, throw an error and call populateDB()
*/
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'pagedb' database");
        db.collection('pages', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'pages' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


/*
findById queries the things collection using the id field 
which is passed in the request object, if found callback function passes cursor object
containing the item. The BSON item is passed in the response
*/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving page: ' + id);
    db.collection('pages', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

/*
findAll function queries things collection with an empty query, i.e no fields
The cursor object is then converted to an array of the matched records
GET request
*/

exports.findAll = function(req, res) {
    db.collection('pages', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/*
addThing extracts POST info from the request body & stores in var 'thing'
'thing' is then inserted into the 'things' collection
callback function returns error if this cannot be completed
POST request
*/

exports.addPage = function(req, res) {
    var page = req.body;
    console.log('Adding page: ' + JSON.stringify(page)
        );
    db.collection('pages', function(err, collection) {
        collection.insert(page, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result.ops[0]));
                res.send(result.ops[0]);
            }
        });
    });
}


/*
This function is called if the "things" collection is not found on first launching the app
The things array is inserted into the a collection called things in safe mode
*/
var populateDB = function() {

    var pages = [
    {
        number: "1",
        title: "Home Page",
        creator: "Admin",
        editedOn: "Thurs 16/06",
        tasks: "no new tasks",
        priorityUser: "Engineer",
        type: "multi"

    }];
    

    db.collection('pages', function(err, collection) {
        collection.insert(pages, {safe:true}, function(err, result) {});
    });

};