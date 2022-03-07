import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
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
		image: {
			type: String,
			default:
				'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png',
			trim: true,
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true, versionKey: false }
);

export default model('Product', ProductSchema);
