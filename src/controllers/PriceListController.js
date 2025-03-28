const PriceList = require('../model/PriceList');

// Get all price lists







const getAllPrices = async (req, res) => {
    try {

        const priceLists = await PriceList.find();
        res.status(200).json(priceLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};














// Create a new item inside a category
const createPrice = async (req, res) => {
    try {
        const { category, name, price } = req.body;

        // Check if the category exists
        let categoryData = await PriceList.findOne({ category });
        if (!categoryData) {
            return res.status(400).json({ message: "Invalid category" });
        }

        // Add new item
        const newItem = { name, price };
        categoryData.items.push(newItem);
        await categoryData.save();

        res.status(201).json({ message: "Item added successfully", categoryData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing item in a category
const updatePrice = async (req, res) => {
    try {
        const { category, name, price } = req.body;
        const { id } = req.params;

        let categoryData = await PriceList.findOne({ category });
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }

        const item = categoryData.items.id(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.name = name;
        item.price = price;

        await categoryData.save();
        res.status(200).json({ message: "Item updated successfully", categoryData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an item from a category
const deletePrice = async (req, res) => {
    try {
        // const { category } = req.body;
        const  id = req.params.id;
        const category = req.params.category;

        let categoryData = await PriceList.findOne({ category });
        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }

        categoryData.items = categoryData.items.filter(item => item._id.toString() !== id);
        await categoryData.save();

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPrices,
    createPrice,
    updatePrice,
    deletePrice
};
