const fs = require('fs');

let myread = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) {
				reject(err); 
				return;
			}
			var obj = JSON.parse(data);
			resolve(obj);
		});
	})
}

let mywrite = (path, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve("file saved\n" + data);
		});
	})
}

const datatobewrite = '{\n\t"dbURL": "mongodb://localhost:27017/",\n\t"dbName": "duplicateDB",\n\t"collections": ["duplicateCol"],\n\t"AutoRemove": "OFF",\n\t"AutoDrop": "OFF"\n}'

let p = __dirname + "/config.json" // the path to store the config file

let config = () => {

	return new Promise((resolve, rejct) => {
		myread(p)
			.then(data => {
				resolve(data);
			})
			.catch(err => {
				console.log(`Initiating the config.js file on path: ${p}`);
				mywrite(p, datatobewrite)
					.then(res => {
						return myread(p);
					})
					.then(data => {
						resolve(data);
					})
					.catch(err => {
						reject(err);
					})
			})
	})
}

module.exports = config;