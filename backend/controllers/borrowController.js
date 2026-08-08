const Borrow = require("../models/Borrow");
const Book = require("../models/Book");
const User = require("../models/User");



// Issue a book

const issueBook = async (req, res, next) => {

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




    } catch(error) {

        next(error);

    }

};







// Return a book

const returnBook = async (req, res, next) => {

    try {


        const { borrowId } = req.body;




        if (!borrowId) {

            return res.status(400).json({

                message: "Borrow ID is required"

            });

        }




        const borrow =
            await Borrow.findById(borrowId);




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




        const book =
            await Book.findById(borrow.book);




        if (book) {

            book.availableCopies += 1;

            await book.save();

        }





        borrow.status = "Returned";

        borrow.returnDate = new Date();





        const finePerDay = 5;



        if (borrow.returnDate > borrow.dueDate) {


            const difference =
                borrow.returnDate - borrow.dueDate;



            const lateDays = Math.ceil(

                difference /
                (1000 * 60 * 60 * 24)

            );



            borrow.fine =
                lateDays * finePerDay;


        } else {


            borrow.fine = 0;


        }





        await borrow.save();





        res.status(200).json({

            message: "Book returned successfully",

            borrow

        });




    } catch(error) {

        next(error);

    }

};



// Get borrow history of a user
const getBorrowHistory = async (req, res, next) => {
    try {

        const requestedUserId = req.params.id;

        // Student can only access their own history
        if (
            req.user.role === "Student" &&
            req.user.id.toString() !== requestedUserId.toString()
        ) {
            return res.status(403).json({
                message: "You can only view your own borrow history"
            });
        }

        const history = await Borrow.find({
            user: requestedUserId
        })
            .populate("book")
            .populate("user", "-password")
            .sort({ createdAt: -1 });

        res.status(200).json(history);

    } catch (error) {
        next(error);
    }
}

// Get all borrow records

const getAllBorrows = async (req, res, next) => {

    try {

        const borrows = await Borrow.find()
            .populate("book")
            .populate("user", "-password")
            .sort({ createdAt: -1 });


        res.status(200).json({

            message: "Borrow records fetched successfully",

            borrows

        });


    } catch (error) {

        next(error);

    }

};

// Student borrows a book

const studentBorrowBook = async (req, res, next) => {
    try {

        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required"
            });
        }

        // Student ID comes from the logged-in JWT
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role !== "Student") {
            return res.status(403).json({
                message: "Only students can use this endpoint"
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

        const existingBorrow = await Borrow.findOne({
            user: userId,
            book: bookId,
            status: "Borrowed"
        });

        if (existingBorrow) {
            return res.status(400).json({
                message: "You already have this book"
            });
        }

        const dueDate = new Date();

        dueDate.setDate(
            dueDate.getDate() + 14
        );

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
            message: "Book borrowed successfully",
            borrow
        });

    } catch (error) {
        next(error);
    }
};


// Student returns their own book

const studentReturnBook = async (req, res, next) => {
    try {

        const { borrowId } = req.body;

        if (!borrowId) {
            return res.status(400).json({
                message: "Borrow ID is required"
            });
        }

        // Get logged-in student from JWT
        const userId = req.user.id;

        const borrow = await Borrow.findById(borrowId);

        if (!borrow) {
            return res.status(404).json({
                message: "Borrow record not found"
            });
        }

        // Make sure this borrow belongs to the logged-in student
        if (borrow.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can only return your own borrowed books"
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

        const finePerDay = 5;

        if (borrow.returnDate > borrow.dueDate) {

            const difference =
                borrow.returnDate - borrow.dueDate;

            const lateDays = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            );

            borrow.fine = lateDays * finePerDay;

        } else {

            borrow.fine = 0;

        }

        await borrow.save();

        res.status(200).json({
            message: "Book returned successfully",
            borrow
        });

    } catch (error) {
        next(error);
    }
};




module.exports = {

    issueBook,

    returnBook,

    studentReturnBook,

    getBorrowHistory,

    getAllBorrows,

    studentBorrowBook

};