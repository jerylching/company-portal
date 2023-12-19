import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const productSchema = new Schema(
    {
        itemcode: {
            type: String,
            unique: true,
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
        cost: {
            type: Number,
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

productSchema.plugin(uniqueValidator);
const Product = model('Product', productSchema);

export default Product;