import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		url: {
			type: String,
			required: true,
			trim: true,
		},
		url_repository: {
			type: String,
			trim: true,
		},
		image: {
			type: String,
			default:
				'https://images.assetsdelivery.com/compings_v2/pavelstasevich/pavelstasevich1811/pavelstasevich181101032.jpg',
			trim: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

export default model('Project', ProjectSchema);
