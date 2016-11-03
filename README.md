# cs546
A simple interface for mongodb 
###Here is the API

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