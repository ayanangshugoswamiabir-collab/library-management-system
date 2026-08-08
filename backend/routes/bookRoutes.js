const express = require("express");

const router = express.Router();

// =====================================
// Controllers
// =====================================

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// =====================================
// Middleware
// =====================================

const upload = require("../middleware/uploadMiddleware");

const validate = require("../middleware/validationMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// =====================================
// Validation Schema
// =====================================

const bookSchema = require("../validations/bookValidation");

// =====================================
// Swagger Tags
// =====================================

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

// =====================================
// Add New Book
// ADMIN + LIBRARIAN ONLY
// =====================================

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the library. Admin and Librarian access required.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */

router.post(
    "/",

    authorizeRoles(
        "Admin",
        "Librarian"
    ),

    upload.single("bookCover"),

    validate(bookSchema),

    addBook
);

// =====================================
// Get All Books
// ALL AUTHENTICATED USERS
// =====================================

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves books with search, filtering, sorting, and pagination support.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */

router.get(
    "/",
    getBooks
);

// =====================================
// Get Single Book
// ALL AUTHENTICATED USERS
// =====================================

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     description: Retrieves a single book using its MongoDB ID.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */

router.get(
    "/:id",
    getBookById
);

// =====================================
// Update Book
// ADMIN + LIBRARIAN ONLY
// =====================================

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book
 *     description: Updates an existing book. Admin and Librarian access required.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */

router.put(
    "/:id",

    authorizeRoles(
        "Admin",
        "Librarian"
    ),

    upload.single("bookCover"),

    validate(bookSchema),

    updateBook
);

// =====================================
// Delete Book
// ADMIN + LIBRARIAN ONLY
// =====================================

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book
 *     description: Deletes a book using its MongoDB ID. Admin and Librarian access required.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 */

router.delete(
    "/:id",

    authorizeRoles(
        "Admin",
        "Librarian"
    ),

    deleteBook
);

// =====================================
// Export Router
// =====================================

module.exports = router;