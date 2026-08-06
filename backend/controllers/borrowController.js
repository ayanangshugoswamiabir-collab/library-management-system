const Borrow = require("../models/Borrow");
const Book = require("../models/Book");
const User = require("../models/User");


// Issue a book
const issueBook = async (req, res) => {

    try {

        const { userId, bookId } = req.body;


        if (!userId || !bookId) {

            return res.status(400).json({

                message: "User ID and Book ID are required"

            });

        }



        const user = await User.findById(userId);


        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }



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



        // Check if user already borrowed this book
        const existingBorrow = await Borrow.findOne({

            user: userId,

            book: bookId,

            status: "Borrowed"

        });



        if (existingBorrow) {

            return res.status(400).json({

                message: "User already has this book"

            });

        }



        const dueDate = new Date();

        dueDate.setDate(dueDate.getDate() + 14);



        const borrow = await Borrow.create({

            user: userId,

            book: bookId,

            dueDate,

            status: "Borrowed",

            fine: 0

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



        if (!borrowId) {

            return res.status(400).json({

                message: "Borrow ID is required"

            });

        }



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



        if (book) {

            book.availableCopies += 1;

            await book.save();

        }




        borrow.status = "Returned";

        borrow.returnDate = new Date();



        // Fine calculation
        const finePerDay = 5;


        if (borrow.returnDate > borrow.dueDate) {


            const difference =
                borrow.returnDate - borrow.dueDate;


            const lateDays = Math.ceil(

                difference / (1000 * 60 * 60 * 24)

            );


            borrow.fine = lateDays * finePerDay;


        } 
        
        else {

            borrow.fine = 0;

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

        .populate("book")

        .populate("user");



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