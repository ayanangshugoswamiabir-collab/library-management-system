const express = require("express");

const router = express.Router();

const { 
    addBook, 
    getBooks, 
    getBookById, 
    updateBook,
    deleteBook
} = require("../controllers/bookController");


// Add new book route
router.post("/", addBook);

// Get all books
router.get("/", getBooks);


// Get single book by ID
router.get("/:id", getBookById);

// Update book
router.put("/:id", updateBook);

// Delete book
router.delete("/:id", deleteBook);


module.exports = router;