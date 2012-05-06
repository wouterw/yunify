exports.createChatMessage = function (author, text) {
	return {
		"author": author,
		"text": text,
		"timestamp": new Date()
	};
};

exports.createUser = function (username) {
	return {
		"username": username
	};
};

exports.mapArray = function(data, mapFn){
	var arr = Object.keys(data).reduce(function(arr, id) {
		arr.push(mapFn(data[id]));
		return arr;
	}, []);
	return arr;
};
