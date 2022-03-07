import Product from '../models/Product';

export const renderProducts = async (req, res) => {
	const products = await Product.find().lean();

	console.log(products);

	res.render('index', { products: products });
};
export const createProducts = async (req, res) => {
	try {
		const product = Product(req.body);

		const productSaved = await product.save();

		console.log(productSaved);

		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
};

export const renderProductsEdit = async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.id
		).lean();
		res.render('edit', { product });
	} catch (error) {
		console.error(error);
	}
};

export const productsEdit = async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndUpdate(id, req.body);
	res.redirect('/');
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndDelete(id);
	res.redirect('/');
};

export const productToggleDone = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	product.done = !product.done;
	await product.save();
	console.log(product);
	res.redirect('/');
};
