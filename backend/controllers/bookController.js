const Book = require("../models/Book");
const crypto = require("crypto");


// Add new book
const addBook = async (req, res) => {

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


        const qrCode = "BOOK-" + crypto.randomBytes(4).toString("hex");


        const bookCover = req.file
            ? `/uploads/books/${req.file.filename}`
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

        res.status(500).json({

            message: error.message

        });

    }

};




// Get all books with search, filter, sort and pagination
const getBooks = async (req, res) => {

    try {

        const {
            search,
            category,
            sort,
            page,
            limit
        } = req.query;


        let query = {};



        // Search by title, author, ISBN
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



        // Filter by category
        if (category) {

            query.category = category;

        }



        let booksQuery = Book.find(query);



        // Sorting

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



        // Pagination

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

        res.status(500).json({

            message: error.message

        });

    }

};




// Get single book by ID
const getBookById = async (req, res) => {

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

        res.status(500).json({

            message: error.message

        });

    }

};




// Update book
const updateBook = async (req, res) => {

    try {


        const updateData = {


            ...req.body

        };



        // If new image uploaded
        if (req.file) {

            updateData.bookCover =
                `/uploads/books/${req.file.filename}`;

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

        res.status(500).json({

            message: error.message

        });

    }

};




// Delete book
const deleteBook = async (req, res) => {

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

        res.status(500).json({

            message: error.message

        });

    }

};



module.exports = {

    addBook,

    getBooks,

    getBookById,

    updateBook,

    deleteBook

};