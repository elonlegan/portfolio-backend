const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		description: {
			type: String,
			required: true,
		},
		date: { type: Date, required: true },
		url: {
			type: String,
			required: true,
		},
		repositoryUrl: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			default:
				'https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png',
		},
		skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
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

module.exports = mongoose.model('Project', schema);
