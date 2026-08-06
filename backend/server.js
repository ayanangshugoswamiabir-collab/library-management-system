const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const startReminderJob = require("./utils/reminderEmail");


dotenv.config();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// Routes

app.use(
    "/api/books",
    protect,
    authorizeRoles("Admin", "Librarian"),
    bookRoutes
);


app.use(
    "/api/borrow",
    protect,
    authorizeRoles("Admin", "Librarian"),
    borrowRoutes
);


app.use("/api/auth", authRoutes);


app.use(
    "/api/users",
    protect,
    authorizeRoles("Admin"),
    userRoutes
);


app.use("/api/dashboard", dashboardRoutes);



// Test Routes

app.get("/", (req, res) => {

    res.send("Library Management System Backend Running");

});


app.get("/api/test", protect, (req, res) => {

    res.json({

        message: "Protected route accessed",

        user: req.user

    });

});


app.get("/api/admin-test", protect, authorizeRoles("Admin"), (req, res) => {

    res.json({

        message: "Welcome Admin",

        user: req.user

    });

});



// Start Server after DB connection

const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {


    console.log("MongoDB Connected");


    // Start due date reminder cron job
    startReminderJob();


    app.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);

    });


})
.catch((error)=>{


    console.log("Database connection failed:", error.message);


});