const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Issue a book
const issueBook = async (req, res) => {

    try {

        const { userId, bookId } = req.body;

        const book = await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({

            message: "Book not found"

             });

        }

        if (book.availableCopies <= 0) {

            return res.status(400).json({

            message: "Book is currently unavailable"

            });

        }

        const dueDate = new Date();

        dueDate.setDate(dueDate.getDate() + 14);

        const borrow = await Borrow.create({

        user: userId,

        book: bookId,

        dueDate

        });

        book.availableCopies -= 1;

        await book.save();

        res.status(201).json({

        message: "Book issued successfully",

        borrow

    });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Return a book
const returnBook = async (req, res) => {

    try {
        const { borrowId } = req.body;

        const borrow = await Borrow.findById(borrowId);

        if (!borrow) {

            return res.status(404).json({

            message: "Borrow record not found"

        });

}

        if (borrow.status === "Returned") {

            return res.status(400).json({

            message: "Book already returned"

         });

}

        const book = await Book.findById(borrow.book);

        book.availableCopies += 1;

        await book.save();

        borrow.status = "Returned";

borrow.returnDate = new Date();


// Calculate fine
const finePerDay = 5;


if (borrow.returnDate > borrow.dueDate) {


    const difference =
        borrow.returnDate - borrow.dueDate;


    const lateDays = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );


    borrow.fine = lateDays * finePerDay;


}


await borrow.save();

        res.status(200).json({

            message: "Book returned successfully",

             borrow

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get borrow history of a user
const getBorrowHistory = async (req, res) => {

    try {
            const userId = req.params.id;

            const history = await Borrow.find({

            user: userId

        })
        .populate("book");

        res.status(200).json(history);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    issueBook,
    returnBook,
    getBorrowHistory
};