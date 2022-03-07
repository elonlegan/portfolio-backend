import Product from '../models/Product';

export const getAllProducts = async (req, res) => {
	const products = await Product.find().lean();

	console.log(products);

	res.status(200).send(products);
};

export const getProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id).lean();

	console.log(product);

	res.status(200).send(product);
};

export const createProduct = async (req, res) => {
	try {
		const product = Product(req.body);

		const productSaved = await product.save();

		console.log(productSaved);
		res.status(200).send(productSaved);
	} catch (error) {
		console.log(error);
	}
};

export const EditProduct = async (req, res) => {
	const { id } = req.params;
	const productUpdated = await Product.findByIdAndUpdate(
		id,
		req.body
	);
	res.status(200).send(productUpdated);
};

export const deleteProductApi = async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndDelete(id);
	res.status(200).send();
};
