const Joi = require("joi");


const bookSchema = Joi.object({


    // =====================================
    // Title
    // =====================================

    title: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({

            "string.empty":
                "Title is required",

            "string.min":
                "Title must be at least 2 characters",

            "string.max":
                "Title cannot exceed 200 characters",

            "any.required":
                "Title is required"

        }),



    // =====================================
    // Author
    // =====================================

    author: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required()
        .messages({

            "string.empty":
                "Author is required",

            "string.min":
                "Author must be at least 2 characters",

            "string.max":
                "Author cannot exceed 150 characters",

            "any.required":
                "Author is required"

        }),



    // =====================================
    // ISBN
    // =====================================

    isbn: Joi.string()
        .trim()
        .required()
        .messages({

            "string.empty":
                "ISBN is required",

            "any.required":
                "ISBN is required"

        }),



    // =====================================
    // Category
    // =====================================

    category: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({

            "string.empty":
                "Category is required",

            "string.min":
                "Category must be at least 2 characters",

            "string.max":
                "Category cannot exceed 100 characters",

            "any.required":
                "Category is required"

        }),



    // =====================================
    // Publisher
    // =====================================

    publisher: Joi.string()
        .trim()
        .max(150)
        .allow(""),



    // =====================================
    // Description
    // =====================================

    description: Joi.string()
        .trim()
        .max(1000)
        .allow(""),



    // =====================================
    // Total Copies
    // =====================================

    totalCopies: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({

            "number.base":
                "Total copies must be a number",

            "number.integer":
                "Total copies must be a whole number",

            "number.min":
                "Total copies must be at least 1",

            "any.required":
                "Total copies is required"

        }),



    // =====================================
    // Available Copies
    // =====================================
    // Optional because this value is controlled
    // by the borrowing system.

    availableCopies: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({

            "number.base":
                "Available copies must be a number",

            "number.integer":
                "Available copies must be a whole number",

            "number.min":
                "Available copies cannot be negative"

        })

});


module.exports = bookSchema;