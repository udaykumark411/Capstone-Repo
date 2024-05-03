import Orders from "../model/orderSchema.js";

export const getOrdersByUser = async (request, response) => {
    try {
        const orders = await Orders.find({ 'username': request.params.username });
        response.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status(500).json({ error: 'An error occurred while fetching orders' });
    }
}

export const getOrderCount = async (request, response) => {
    try {
        const orders = await Orders.countDocuments();
        response.json({orders});
    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status(500).json({ error: 'An error occurred while fetching orders' });
    }
}

export const getOrders = async (request, response) => {
    try {
        const orders = await Orders.find({});

        response.json(orders);
    }catch (error) {

    }
}