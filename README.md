# cs546-mongo
my mail: <yangtianxiao123@gmail.com>  
Just a simple interface for mongodb 
###Here is the API
####config.json
Location: node_modules/cs546-mongo/config.json.

Modify this file to customize your database or choose to use autoremove or autodrop.

```
// This is the mongodb url

"dbURL": "mongodb://localhost:27017/",

// Your database name

"dbName": "duplicateDB",

// The collections you want to use

"collections": ["duplicateCol"],

// If you change AutoRemove to "ON", this module will automaticlly remove all 
files in all collections each times you require this module. No need to bother 
deleting redundant when you are devenloping.

"AutoRemove": "OFF",

// If you change AutoDrop to "ON",this module will automaticlly drop all collections that is not in attrbute "collections" in your database each times
 you require this module. Give you more ease on managing your collections.
 
"AutoDrop": "OFF"
```
Since we don't really need so many functionality that mongodb provide us, I encapsulate some commonly used function to make it more readable on error handling.

```
const easyDb = require('cs546-mongo');

easyDb().then(res => {

	res.getCollectionWithName("duplicateCol")
	.then(col => {
		// do any thing you want to the collection
	})

	res.getDatabase() 
	.then(db => {
		// database is configured in config.js
		// do any thing you want to the database
	})

	res.getAllCollectionName()
	.then(arr => {
		console.log(arr);
	})
	.catch(err => {
		console.log(err);
	})

	res.updateOne("aaa", {_id:"55555"}, {b: 124})
	.then(r => {
		console.log(r);
	})
	.catch(err => {
		console.log(err);
	})

	res.deleteOne("aaa", {_id: "55555"})
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})

	res.findOne("55555", {})
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})

	res.insertOne("aaa", {})
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})

	res.findAll("duplicteCol")
	.then(arr => {
		console.log(arr);
	})
	.catch(err => {
		console.log(err);	
	})
})
.catch(err => {
	console.log(err);
})

```