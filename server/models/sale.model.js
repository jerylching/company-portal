import { Schema, model } from 'mongoose';

const saleSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        itemcode: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }
);

const Sale = model('Sale', saleSchema);

export default Sale;