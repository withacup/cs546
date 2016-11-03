const collections = require('./dbCollection');

module.exports = () => {
	return new Promise((resolve, reject) => {
		collections()
			.then(res => {

				// res.getAllCollectionName()

				// res.getCollectionWithName("345fff")

				// res.getDatabase()

				let collections;
				res.getAllCollectionName()
					.then(arr => {
						collections = arr;
					})

				const insertOne = (colName, content) => {
					if (!colName) return Promise.reject("You must provide a collection name");
					if (!content) return Promise.reject("You must provide a content");
					return new Promise((resolve, reject) => {
						res.getCollectionWithName(colName)
							.then(col => {
								return col.insertOne(content)
							})
							.then(res => {
								resolve(res.ops[0]);
							})
							.catch(err => {
								if (err.message) {
									reject(err.message);
									return;
								}
								reject(err);
							})
					})
				}

				const updateOne = (colName, filter, update) => {
					if (!colName) return Promise.reject("You must provide a collection name");
					if (!filter) return Promise.reject("You must provide a filter");
					if (!update) return Promise.reject("You must provide update");
					return new Promise((resolve, reject) => {
						res.getCollectionWithName(colName)
							.then(col => {
								return col.updateOne(filter, update)
							})
							.then(res => {
								if (res.result.n == 0) {
									reject("ERROR: Updating Failed");
									return;
								}
								resolve("Successfully updated");
							})
							.catch(err => {
								reject(err);
							})
					})
				}

				const deleteOne = (colName, filter) => {
					if (!colName) return Promise.reject("You must provide a collection name");
					if (!filter) return Promise.reject("You must provide a filter");
					return new Promise((resolve, reject) => {
						res.getCollectionWithName(colName)
							.then(col => {
								return col.deleteOne(filter)
							})
							.then(res => {
								if (res.result.n == 0) {
									reject("ERROR: Deleting Failed");
								}
								resolve("Successfully deleted");
							})
							.catch(err => {
								reject(err);
							})
					})
				}

				const findOne = (colName, filter) => {
					if (!colName) return Promise.reject("You must provide a collection name");
					if (!filter) return Promise.reject("You must provide a filter");
					return new Promise((resolve, reject) => {
						res.getCollectionWithName(colName)
							.then(col => {
								return col.findOne(filter)
							})
							.then(res => {
								if (res === null) {
									reject("ERROR: No File Found");
									return;
								}
								resolve(res);
							})
							.catch(err => {
								reject(err);
							})
					})
				}

				const findAll = (colName) => {
					if (!colName) return Promise.reject("ERROR: You Need To Provide a Collection Name")
					return new Promise((resolve, reject) => {
						res.getCollectionWithName(colName)
						.then(col => {
							return col.find({}).toArray();
						})
						.then(arr => {
							resolve(arr);
						})
						.catch(err => {
							reject(err);
						})
					})
				}

				resolve({
					insertOne: insertOne,
					updateOne: updateOne,
					deleteOne: deleteOne,
					findOne: findOne,
					getCollectionWithName: res.getCollectionWithName,
					getDatabase: res.getDatabase,
					findAll: findAll,
					getAllCollectionName: res.getAllCollectionName
				})
			});
	})
}