var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.listen(3000);
console.log('Server running on port 30000');

var db = mongojs('menuList', ['menuList']);
db.on('error', function(err) {
    console.log('database error', err)
})
db.on('connect', function() {
    console.log('database connected')
})

/*
Fetch Menu List
*/
app.get('/getMenuList', function(req, res) {
    db.menuList.find(function(err, docs) {
        res.json(docs);
    });
});

/*
Add a New Menu
*/
app.post('/addNewMenu', function(req, res) {
    db.menuList.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

/*
Delete a Menu
*/
app.post('/deleteMenu', function(req, res) {
    var menu = req.body;
    db.menuList.remove({
            _id: mongojs.ObjectId(menu._id)
        },
        function(err, doc) {
            res.json(doc);
        }
    );
});

/*
Update a Menu (name change)
*/
app.put('/updateMenu', function(req, res) {
    console.log("server.updateMenu");
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

/*
Add an item to a menu
*/
app.post('/addNewItem', function(req, res) {
    //generate a unique id for the item
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
            res.json(doc);
        });
});

/*
Update an item
*/
app.put('/updateItem', function(req, res) {
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

/*
Delete an item from a menu
*/
app.post('/deleteItem', function(req, res) {
    var item = req.body;
		console.log("deleting:");
		console.log(item);
    db.menuList.findAndModify({
            query: {
                "_id": mongojs.ObjectId(item.parent)
            },
            update: {
                $pull: {
                    items: { _id: mongojs.ObjectId(item._id)}
                }
            },
            new: true
        },
        function(err, doc) {
						console.log("deleted:");
						console.log(doc);``
            res.json(doc);
        });
});
