import Item from '../models/item.js';

// GET - get all items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({ message: "Failed to get items: " + (error || error.message) })
    }
}

// GET - get item by id
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        // const itemById = await Item.findById(id)
        const itemById = await Item.find({ _id: id })
        res.status(200).json(itemById)
    } catch (error) {
        res.status(400).json({ message: "Failed to get item by id: " + (error || error.message) })
    }
}

// POST - Create new item
const createNewItem = async (req, res) => {
    try {
        // item accepts
        // name: String
        // price: Number
        // category: String
        // option 1
        // const { name, price, category } = req.body
        // // validation - אימות
        // //......
        // // Helper function to validate data
        // // .....
        // const itemObject = {
        //     name,
        //     price,
        //     category
        // }
        // option 1
        // const savedItem = await new Item(itemObject).save();

        // option 2
        // const newItem = new Item(itemObject);
        // await newItem.save();
        //
        //

        // option 2 - אני רוצה לקחת את כל מה שנמצא בגוף הבקשה
        const savedItem = await new Item(req.body).save();
        console.log(savedItem);
        res.status(201).json(savedItem)
    } catch (error) {
        res.status(400).json({ message: "Failed Creating New Item: " + (error || error.message) })
    }
}

// PUT - Update item by id
const updateItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body
        if (price > 0) {
            const updatedItem = await Item.findByIdAndUpdate(id, req.body);
            res.status(201).json(updatedItem);
        } else {
            throw new Error("מחיר חייב להיות חיובי")
        }
    } catch (error) {
        res.status(400).json({ message: "Failed to update item: " + (error || error.message) })
    }
}

// PATCH - Update specific property in the item by id
const updatePropertyInItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedItem = await Item.findByIdAndUpdate(id, req.body);
        res.status(201).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Failed to update item: " + (error || error.message) })
    }
}

// DELETE - Delete item by id
const deleteItemById = async (req, res) => {
    try {
        const itemID = req.params.id

        const deletedItem = await Item.findByIdAndDelete(itemID);

        res.status(204).json(deletedItem)
    } catch (error) {
        res.status(500).json({ message: "Error deleting item: " + (error || error.message) })
    }
}

export {
    getAllItems,
    getItemById,
    createNewItem,
    updateItemById,
    updatePropertyInItemById,
    deleteItemById
}