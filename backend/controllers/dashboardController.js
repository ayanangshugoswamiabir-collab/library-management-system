const User = require("../models/User");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const mongoose = require("mongoose");


// Admin Dashboard
const getAdminDashboard = async (req, res) => {

    try {


        const totalUsers = await User.countDocuments();


        const totalBooks = await Book.countDocuments();


        const issuedBooks = await Borrow.countDocuments({
            status: "Borrowed"
        });


        const returnedBooks = await Borrow.countDocuments({
            status: "Returned"
        });



        // Most borrowed books
        const popularBooks = await Borrow.aggregate([

            {
                $group: {

                    _id: "$book",

                    borrowCount: {
                        $sum: 1
                    }

                }

            },


            {
                $sort: {
                    borrowCount: -1
                }
            },


            {
                $limit: 5
            },


            {
                $lookup: {

                    from: "books",

                    localField: "_id",

                    foreignField: "_id",

                    as: "bookDetails"

                }

            },


            {
                $unwind: "$bookDetails"
            },


            {
                $project: {

                    _id: 0,

                    title: "$bookDetails.title",

                    author: "$bookDetails.author",

                    borrowCount: 1

                }

            }

        ]);




        // Most borrowed category
        const popularCategory = await Borrow.aggregate([

            {
                $lookup: {

                    from: "books",

                    localField: "book",

                    foreignField: "_id",

                    as: "bookDetails"

                }

            },


            {
                $unwind: "$bookDetails"
            },


            {
                $group: {

                    _id: "$bookDetails.category",

                    borrowCount: {
                        $sum: 1
                    }

                }

            },


            {
                $sort: {
                    borrowCount: -1
                }
            },


            {
                $limit: 1
            },


            {
                $project: {

                    _id: 0,

                    category: "$_id",

                    borrowCount: 1

                }

            }

        ]);




        // Recent Borrow Activity
        const recentBorrowings = await Borrow.aggregate([

            {
                $sort: {
                    createdAt: -1
                }
            },


            {
                $limit: 5
            },


            {
                $lookup: {

                    from: "users",

                    localField: "user",

                    foreignField: "_id",

                    as: "userDetails"

                }

            },


            {
                $lookup: {

                    from: "books",

                    localField: "book",

                    foreignField: "_id",

                    as: "bookDetails"

                }

            },


            {
                $unwind: "$userDetails"
            },


            {
                $unwind: "$bookDetails"
            },


            {
                $project: {

                    _id: 0,

                    student: "$userDetails.name",

                    book: "$bookDetails.title",

                    status: 1,

                    borrowDate: 1,

                    dueDate: 1

                }

            }

        ]);




        res.status(200).json({

            totalUsers,

            totalBooks,

            issuedBooks,

            returnedBooks,

            popularBooks,

            popularCategory: popularCategory[0] || null,

            recentBorrowings

        });



    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Librarian Dashboard
const getLibrarianDashboard = async (req, res) => {

    try {


        const startOfDay = new Date();

        startOfDay.setHours(0,0,0,0);



        const endOfDay = new Date();

        endOfDay.setHours(23,59,59,999);



        const todayIssues = await Borrow.countDocuments({

            borrowDate: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            status: "Borrowed"

        });



        const todayReturns = await Borrow.countDocuments({

            returnDate: {
                $gte: startOfDay,
                $lte: endOfDay
            },

            status: "Returned"

        });



        const overdueBooks = await Borrow.countDocuments({

            dueDate: {
                $lt: new Date()
            },

            status: "Borrowed"

        });



        res.status(200).json({

            todayIssues,

            todayReturns,

            overdueBooks

        });



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};

// Student Dashboard
const getStudentDashboard = async (req, res) => {

    try {


        const studentId = req.user.id;



        // Currently borrowed books
        const currentlyBorrowedBooks = await Borrow.aggregate([

            {
                $match: {

                    user: new mongoose.Types.ObjectId(studentId),

                    status: "Borrowed"

                }

            },


            {
                $lookup: {

                    from: "books",

                    localField: "book",

                    foreignField: "_id",

                    as: "bookDetails"

                }

            },


            {
                $unwind: "$bookDetails"

            },


            {
                $project: {

                    _id: 0,

                    title: "$bookDetails.title",

                    author: "$bookDetails.author",

                    dueDate: 1,

                    borrowDate: 1,

                    status: 1

                }

            }

        ]);




        // Borrow history
        const borrowHistory = await Borrow.aggregate([

            {
                $match: {

                    user: new mongoose.Types.ObjectId(studentId)

                }

            },


            {
                $lookup: {

                    from: "books",

                    localField: "book",

                    foreignField: "_id",

                    as: "bookDetails"

                }

            },


            {
                $unwind: "$bookDetails"

            },


            {
                $project: {

                    _id: 0,

                    book: "$bookDetails.title",

                    borrowDate: 1,

                    returnDate: 1,

                    status: 1,

                    fine: 1

                }

            }

        ]);




        // Total fine
        const fineResult = await Borrow.aggregate([

            {
                $match: {

                    user: new mongoose.Types.ObjectId(studentId)

                }

            },


            {
                $group: {

                    _id: null,

                    totalFine: {

                        $sum: "$fine"

                    }

                }

            }

        ]);




        res.status(200).json({

            currentlyBorrowedBooks,

            borrowHistory,

            totalFine: fineResult[0]?.totalFine || 0

        });



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};



module.exports = {

    getAdminDashboard,
    getLibrarianDashboard,
    getStudentDashboard
};