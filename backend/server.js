const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Security Packages
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Load environment variables first
dotenv.config();

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ===============================
// Security Middleware
// ===============================

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Secure HTTP headers
app.use(
    helmet()
);

// Parse JSON
app.use(
    express.json()
);

// Rate Limiting
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: {
        message:
            "Too many requests, please try again later"
    }

});

app.use(
    limiter
);

// Prevent XSS Attacks
app.use((req, res, next) => {

    if (req.body) {

        Object.keys(req.body).forEach((key) => {

            if (typeof req.body[key] === "string") {

                req.body[key] =
                    xss(req.body[key]);

            }

        });

    }

    next();

});

// ===============================
// Routes
// ===============================

// Swagger API Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Authentication
app.use(
    "/api/auth",
    authRoutes
);

// ===============================
// Book Management
// ===============================
//
// All authenticated users can:
// GET /api/books
// GET /api/books/:id
//
// Role restrictions for POST, PUT and DELETE
// are handled inside bookRoutes.js.
//

app.use(
    "/api/books",
    protect,
    bookRoutes
);

// ===============================
// Borrowing System
// ===============================

app.use(
    "/api/borrow",
    protect,
    borrowRoutes
);
// ===============================
// User Management
// ADMIN ONLY
// ===============================

app.use(
    "/api/users",
    protect,
    authorizeRoles("Admin"),
    userRoutes
);

// ===============================
// Dashboard
// ===============================

app.use(
    "/api/dashboard",
    dashboardRoutes
);

// ===============================
// Test Routes
// ===============================

// Root Route
app.get(
    "/",
    (req, res) => {

        res.send(
            "Library Management System Backend Running"
        );

    }
);

// Protected Route Test
app.get(
    "/api/test",
    protect,
    (req, res) => {

        res.json({

            message:
                "Protected route accessed",

            user:
                req.user

        });

    }
);

// Admin Route Test
app.get(
    "/api/admin-test",
    protect,
    authorizeRoles("Admin"),
    (req, res) => {

        res.json({

            message:
                "Welcome Admin",

            user:
                req.user

        });

    }
);

// ===============================
// Error Middleware
// MUST ALWAYS BE LAST
// ===============================

app.use(errorMiddleware);

// ===============================
// Database Connection + Server Start
// ===============================

const PORT =
    process.env.PORT || 5000;

connectDB()

    .then(() => {

        console.log(
            "MongoDB Connected"
        );

        // Reminder Email Job
        const startReminderJob =
            require("./utils/reminderEmail");

        startReminderJob();

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );

    })

    .catch((error) => {

        console.log(
            "Database connection failed:",
            error.message
        );

    });