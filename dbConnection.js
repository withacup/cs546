const MongoClient = require("mongodb").MongoClient;
const getConfig = require("./getConfig");

module.exports = getConfig()
	.then(config => {
		// console.log(config);
		const settings = {
			mongoConfig: {
				serverUrl: config.dbURL,
				database: config.dbName
			}
		}

		let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
		let _connection = undefined;

		let connectDb = () => {
			if (!_connection) {
				_connection = MongoClient.connect(fullMongoUrl)
					.then(db => {
						return db;
					});
			}
			return _connection;
		}

		let removeAllFiles = false;
		let dropAllCollections = false;

		if (config.AutoRemove === "ON") {
			removeAllFiles = true;
		}
		if (config.AutoDrop === "ON") {
			dropAllCollections = true;
		}

		return {
			connectDb: connectDb,
			collections: config.collections,
			removeAllFiles: removeAllFiles,
			dropAllCollections: dropAllCollections
		};
	})
	.catch(err => {
		console.log(err);
	})