const fs = require('fs');

let myread = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) reject(err); // we'll not consider error handling for now
			if (!data) {
				reject("data undefined")
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

const datatobewrite = '{\n\t"dbURL": "mongodb://localhost:27017/",\n\t"dbName": "duplicateDB",\n\t"collections": ["duplicateCol"]\n}'

let p = __dirname + "/test.json"
console.log(p);

let config = () => {
	return myread(p)
		.then(data => {
			// console.log(data);
			return data;
		})
		.catch(err => {
			console.log(err);
			mywrite(p, datatobewrite)
				.then(res => {
					// console.log('I am here')
					// console.log(res);
					return myread(p);
				})
				.then(data => {
					// console.log(data);
					return data
				})
				.catch(err => {
					console.log(err);
				})
		})
}

module.exports = config;