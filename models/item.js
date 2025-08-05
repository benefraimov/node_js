import mongoose from "mongoose";

// creating the schema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'חייב להקנות שם לפריט'] },
    price: { type: Number, required: [true, 'חייב לציין מחיר לפריט'] },
    category: { type: String, required: [true, "חייב לציין קטגוריה לפריט"] },
}, { timestamps: true });

// creating the model
const Item = mongoose.model('Item', itemSchema);

export default Item;