var express = require('express');
var mongojs =  require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist',['contactlist']);

/*app.get('/',function(req,res){
	res.send("Hello world from server.js");
});*/

//tell teh server where to look for static contents
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

//sets the route for /contactlist
app.get('/contactlist',function(req,res){
	console.log('Server got a  get request for /contactlist');
	/*person1 = {name:'Piyali',email:'piyali.kamra@usfoods.com',number:'(111)111-1111'};
	person2 = {name:'Emily',email:'emily.emily@usfoods.com',number:'(222)222-2222'};
	person3 = {name:'John',email:'john.john@usfoods.com',number:'(333)333-333'};
	var contactlist = {person1,person2,person3};
	res.json(contactlist);*/

	//replacing by the actual call to get data from the mongodb  database
	db.contactlist.find(function(err,docs){
		console.log("searching data in mongodb");
		res.json(docs);
	});

});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);//return the added data back to the caller
	});
});


app.delete('contactlist/:id',function(req,res){
	var id =  req.params.id;
	console.log(id);

});


app.post('/contactlist/delete',function(req,res){
	var contact =  req.body;
	console.log(contact);
	db.contactlist.remove({_id: mongojs.ObjectId(contact._id)},function(err,doc){res.json(doc);});
});

app.put('/contactlist/:id',function(req,res){
	var id =  req.params.id;
	console.log("Update id"+id);
	db.contactlist.findAndModify({
								   query:{_id:mongojs.ObjectId(id)},
								   update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}
										  },
								   new:true
								},function(err,doc){res.json(doc);});
});


app.listen(3000);
console.log('Server running on port 30000');
