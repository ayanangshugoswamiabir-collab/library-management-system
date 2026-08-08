
const express = require("express");

const router = express.Router();

const {
    issueBook,
    returnBook,
    studentReturnBook,
    getBorrowHistory,
    getAllBorrows,
    studentBorrowBook
} = require("../controllers/borrowController");

// Middleware
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


// =====================================
// Issue Book
// Admin / Librarian
// =====================================

router.post(
    "/issue",
    protect,
    authorizeRoles("Admin", "Librarian"),
    issueBook
);

router.post(
    "/student",
    protect,
    authorizeRoles("Student"),
    studentBorrowBook
);

router.post(
    "/student/return",
    protect,
    authorizeRoles("Student"),
    studentReturnBook
);

// =====================================
// Return Book
// Admin / Librarian
// =====================================

router.post(
    "/return",
    protect,
    authorizeRoles("Admin", "Librarian"),
    returnBook
);


// =====================================
// Get All Borrow Records
// Admin / Librarian
// =====================================

router.get(
    "/",
    protect,
    authorizeRoles("Admin", "Librarian"),
    getAllBorrows
);


// =====================================
// Get Borrow History of User
// =====================================

router.get(
    "/history/:id",
    protect,
    getBorrowHistory
);


module.exports = router;

