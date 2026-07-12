const Category = require("../models/categoryModel");

// Add Category
const addCategory = async (req, res) => {
    try {

        const { categoryName, optionalField, status } = req.body;

        if (!categoryName || !status) {
            return res.status(400).json({
                success: false,
                message: "Category Name and Status are required"
            });
        }

        if (!["Active", "Inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const category = await Category.findOne({ categoryName });

        if (category) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const newCategory = await Category.create({
            categoryName,
            optionalField,
            status
        });

        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category: newCategory
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Category List
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find().select(
            "categoryName status optionalField"
        );

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Edit Category
const updateCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const { categoryName, optionalField, status } = req.body;

        if (!categoryName || !status) {
            return res.status(400).json({
                success: false,
                message: "Category Name and Status are required"
            });
        }

        if (!["Active", "Inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        category.categoryName = categoryName;
        category.optionalField = optionalField;
        category.status = status;

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
};