import Product from '../model/productSchema.js';


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});

        response.json(products);
    }catch (error) {

    }
}

export const getProductById = async (request, response) => {
    try {
        const products = await Product.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {

    }
}

export const getProductsBySeller = async (request, response) => {
    try {
        const products = await Product.find({ 'seller': request.params.seller });
        response.json(products);
    }catch (error) {

    }
}
export const getProductsCount = async (request, response) => {
    try {
        const products = await Product.countDocuments();
        response.json({products});
    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status(500).json({ error: 'An error occurred while fetching orders' });
    }
}