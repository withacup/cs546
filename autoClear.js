const dropFilesWithColName = (db, colName) => {
	console.log("Droping collection: " + colName);
	db.collection(colName).drop();
}

const removeFilesInCollection = (db, colName) => {
	console.log("Removing collection: " + colName)
	db.collection(colName).remove({});
}


const dropCollections = (db, cols) => {
	console.log('Droping all collections(not in test.json file) automaticlly in database: ' + db.s.databaseName);
	db.listCollections().toArray()
		.then(arr => {
			arr.forEach(function(e, index) {
				if (cols.indexOf(e.name) < 0) {
					dropFilesWithColName(db, e.name);
				}
			});
		})
}

const clearCollections = (db) => {
	console.log('Removing all files automaticlly in database: ' + db.s.databaseName);
	db.listCollections().toArray()
		.then(arr => {
			arr.forEach(function(e, index) {
				removeFilesInCollection(db, e.name);
			});
		})
}

module.exports = {
	// Automaticlly drop collections that is not in the config.json file
	dropCollections: dropCollections, 
	// Automaticlly remove all files in all collections
	clearCollections: clearCollections
}