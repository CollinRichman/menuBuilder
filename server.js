//npm packages
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var app = express();

//set up express middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Tell server to listen on port 3000
app.listen(3000);
console.log('Server running on port 30000');

//get DB connection from database: 'menuList', collection: 'menuList'
//If this database or collection does not exist, mongojs will create it
var db = mongojs('menuList', ['menuList']);

db.on('error', function(err) {
    console.log('database error', err)
})

db.on('connect', function() {
    console.log('database connected')
})

//Listen for GET requests on /getMenuList
app.get('/getMenuList', function(req, res) {
    console.log('Received GET request for /getMenuList')
    db.menuList.find(function(err, docs) {
        //send back JSON response
        res.json(docs);
    });
});

app.post('/addNewMenu', function(req, res) {
    console.log('Received POST request for /addNewMenu')
    db.menuList.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.post('/deleteMenu', function(req, res) {
    console.log('Received POST request for /deleteMenu')
    var menu = req.body;
    db.menuList.remove({
            _id: mongojs.ObjectId(menu._id)
        },
        function(err, doc) {
            res.json(doc);
        }
    );
});

app.put('/updateMenu', function(req, res) {
    console.log('Received PUT request for /updateMenu')
    var menu = req.body;
    var id = menu._id;
    db.menuList.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    name: menu.name
                }
            },
            new: true
        },
        function(err, doc) {
            res.json(doc);
        });
});

app.post('/addNewItem', function(req, res) {
    console.log('Received POST request for /addNewItem')
        //generate a unique id for the new item
    var objectId = new ObjectID();
    var item = req.body;
    item._id = objectId;
    db.menuList.findAndModify({
            query: {
                _id: mongojs.ObjectId(item.parent)
            },
            update: {
                $push: {
                    items: item
                }
            },
            new: true
        },
        function(err, doc) {
            res.json(doc.items[doc.items.length - 1]);
        });
});

app.put('/updateItem', function(req, res) {
    console.log('Received PUT request for /updateItem')
    var item = req.body;
    db.menuList.findAndModify({
            query: {
                "_id": mongojs.ObjectId(item.parent),
                "items._id": mongojs.ObjectId(item._id)
            },
            update: {
                $set: {
                    "items.$.name": item.name,
                    "items.$.price": item.price
                }
            },
            new: true
        },
        function(err, doc) {
            res.json(doc);
        });
});

app.post('/deleteItem', function(req, res) {
    console.log('Received POST request for /deleteItem')
    var item = req.body;
    db.menuList.findAndModify({
            query: {
                "_id": mongojs.ObjectId(item.parent)
            },
            update: {
                $pull: {
                    items: {
                        _id: mongojs.ObjectId(item._id)
                    }
                }
            },
            new: true
        },
        function(err, doc) {
            res.json(doc);
        });
});
