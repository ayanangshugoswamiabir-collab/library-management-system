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
            unique: true
        },

        category: {
            type: String,
            required: true
        },

        publisher: {
            type: String
        },

        description: {
            type: String
        },

        totalCopies: {
            type: Number,
            required: true,
            default: 1
        },

        availableCopies: {
            type: Number,
            required: true,
            default: 1
        },

        bookCover: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        qrCode: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
);


const Book = mongoose.model("Book", bookSchema);


module.exports = Book;