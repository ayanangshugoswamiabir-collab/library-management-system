const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        publisher: {
            type: String,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        totalCopies: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },

        availableCopies: {
            type: Number,
            required: true,
            default: 1,
            min: 0
        },

        // Book cover image path
        bookCover: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Will be used in Phase 6
        qrCode: {
            type: String,
            unique: true,
            sparse: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;