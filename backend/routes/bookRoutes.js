const express = require("express");

const router = express.Router();

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const upload = require("../middleware/uploadMiddleware");

router.post(
    "/",
    upload.single("bookCover"),
    (req, res, next) => {

        console.log("Route body:", req.body);
        console.log("Route file:", req.file);

        next();

    },
    addBook
);

// Get all books
router.get("/", getBooks);

// Get single book by ID
router.get("/:id", getBookById);

// Update book
router.put("/:id", upload.single("bookCover"), updateBook);

// Delete book
router.delete("/:id", deleteBook);

module.exports = router;