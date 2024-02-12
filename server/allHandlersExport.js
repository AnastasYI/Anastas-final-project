const { getUser, createUser } = require('./handlers/users');
const { getBikes, uploadBike } = require('./handlers/bikes');
const { upload, uploadProfilePic } = require('./handlers/profilePic');
module.exports = {
	getUser,
	createUser,
	getBikes,
	uploadBike,
	upload,
	uploadProfilePic,
};
