const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		url: {
			type: String,
			required: false,
		},
		imageUrl: {
			type: String,
			default:
				'https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png',
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
