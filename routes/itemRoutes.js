import express from 'express'
import { createNewItem, deleteItemById, getAllItems, getItemById, updateItemById, updatePropertyInItemById } from '../controllers/itemController.js';

const router = express.Router();
// CRUD Operations

// GET - get all items
router.get('/', getAllItems)
// GET - get specific item by id
router.get('/:id', getItemById)
// POST - create a new item
router.post('/', createNewItem)
// PUT - update specific item by id
router.put('/:id', updateItemById)
// PATCH - update specific item by id
router.patch('/:id', updatePropertyInItemById)
// DELETE - delete item by id
router.delete('/:id', deleteItemById)

export default router;