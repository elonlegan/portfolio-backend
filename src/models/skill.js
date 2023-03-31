const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		certificationUrl: {
			type: String,
			required: false,
		},
		customStyles: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true, versionKey: false }
);

schema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
	},
});

module.exports = mongoose.model('Skill', schema);
