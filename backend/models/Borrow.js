const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        borrowDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date
        },

        fine: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["Borrowed", "Returned"],
            default: "Borrowed"
        }

    },
    {
        timestamps: true
    }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

module.exports = Borrow;