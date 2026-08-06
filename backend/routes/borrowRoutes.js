const express = require("express");

const router = express.Router();

const { 
    issueBook, 
    returnBook,
    getBorrowHistory
} = require("../controllers/borrowController");

router.post("/issue", issueBook);

router.post("/return", returnBook);

router.get("/history/:id", getBorrowHistory);

module.exports = router;