import Category from "../model/categoryModel.js";
import HttpError from "../middleware/HttpError.js";
// Add Category
const addCategory = async (req, res,next) => {
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

                next(new HttpError(error.message, 500));


    }
};

// Category List
const getCategories = async (req, res,next) => {
    try {

        const categories = await Category.find().select(
            "categoryName status optionalField"
        );

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

                next(new HttpError(error.message, 500));


    }
};

// Edit Category
const updateCategory = async (req, res,next) => {
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

                next(new HttpError(error.message, 500));


    }
};

// Delete Category
const deleteCategory = async (req, res,next) => {
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

                next(new HttpError(error.message, 500));


    }
};

export default {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
};