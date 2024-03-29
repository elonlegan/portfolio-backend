const mongoose = require('mongoose');
const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};
mongoose.connect(
	process.env.MONGODB_URI,
	connectionOptions
);
mongoose.Promise = global.Promise;

module.exports = {
	Account: require('../models/account'),
	Project: require('../models/project'),
	Skill: require('../models/skill'),
	RefreshToken: require('../models/refresh-token'),
	isValidId,
};

function isValidId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}
