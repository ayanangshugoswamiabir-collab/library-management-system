const Book = require("../models/Book");
const crypto = require("crypto");


// Add new book
const addBook = async (req, res, next) => {

    try {

        const {
            title,
            author,
            isbn,
            category,
            publisher,
            description,
            totalCopies,
            availableCopies
        } = req.body;


        const qrCode =
            "BOOK-" + crypto.randomBytes(4).toString("hex");


        const bookCover = req.file
            ? req.file.path
            : "";


        const book = await Book.create({

            title,
            author,
            isbn,
            category,
            publisher,
            description,
            totalCopies,
            availableCopies,
            bookCover,
            createdBy: req.user.id,
            qrCode

        });


        res.status(201).json({

            message: "Book added successfully",
            book

        });


    } catch (error) {

        next(error);

    }

};




// Get all books with search, filter, sort and pagination
const getBooks = async (req, res, next) => {

    try {

        const {
            search,
            category,
            sort,
            page,
            limit
        } = req.query;


        let query = {};



        if (search) {

            query.$or = [

                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    isbn: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }



        if (category) {

            query.category = category;

        }



        let booksQuery = Book.find(query);



        if (sort) {

            const sortOrder =
                sort.startsWith("-") ? -1 : 1;


            const sortField =
                sort.replace("-", "");


            booksQuery =
                booksQuery.sort({

                    [sortField]: sortOrder

                });

        }



        const pageNumber =
            Number(page) || 1;


        const limitNumber =
            Number(limit) || 10;


        const skip =
            (pageNumber - 1) * limitNumber;



        booksQuery =
            booksQuery
            .skip(skip)
            .limit(limitNumber);



        const books =
            await booksQuery;



        const totalBooks =
            await Book.countDocuments(query);



        res.status(200).json({

            page: pageNumber,

            totalBooks,

            totalPages:
                Math.ceil(
                    totalBooks / limitNumber
                ),

            books

        });



    } catch (error) {

        next(error);

    }

};




// Get single book by ID
const getBookById = async (req, res, next) => {

    try {


        const book =
            await Book.findById(req.params.id);



        if (!book) {

            return res.status(404).json({

                message: "Book not found"

            });

        }



        res.status(200).json(book);



    } catch (error) {

        next(error);

    }

};




// Update book
const updateBook = async (req, res, next) => {

    try {


        const updateData = {

            ...req.body

        };



        if (req.file) {

            updateData.bookCover =
                req.file.path;

        }



        const book =
            await Book.findByIdAndUpdate(

                req.params.id,

                updateData,

                {

                    new: true,

                    runValidators: true

                }

            );



        if (!book) {

            return res.status(404).json({

                message: "Book not found"

            });

        }



        res.status(200).json({

            message: "Book updated successfully",

            book

        });



    } catch (error) {

        next(error);

    }

};




// Delete book
const deleteBook = async (req, res, next) => {

    try {


        const book =
            await Book.findByIdAndDelete(req.params.id);



        if (!book) {

            return res.status(404).json({

                message: "Book not found"

            });

        }



        res.status(200).json({

            message: "Book deleted successfully"

        });



    } catch (error) {

        next(error);

    }

};



module.exports = {

    addBook,

    getBooks,

    getBookById,

    updateBook,

    deleteBook

};