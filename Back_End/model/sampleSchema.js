import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const sampleSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
    
});

autoIncrement.initialize(mongoose.connection);
//productSchema.plugin(autoIncrement.plugin, 'product');

const sample = mongoose.model('sample', sampleSchema);

export default sample;