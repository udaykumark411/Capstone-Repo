import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    username: String,
    id: String,
    url: String,
    price: Object,
    quantity: Number,
    description: String,
    
});


//productSchema.plugin(autoIncrement.plugin, 'product');

const orders = mongoose.model('order', orderSchema);

export default orders;