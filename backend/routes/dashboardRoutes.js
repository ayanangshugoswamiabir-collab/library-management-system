const express = require("express");

const router = express.Router();

const { 
    getAdminDashboard,
    getLibrarianDashboard,
    getStudentDashboard
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");


// Admin Dashboard Route
router.get(
    "/admin",
    protect,
    authorizeRoles("Admin"),
    getAdminDashboard
);

router.get(
    "/librarian",
    protect,
    authorizeRoles("Admin", "Librarian"),
    getLibrarianDashboard
);

router.get(
    "/student",
    protect,
    authorizeRoles("Student"),
    getStudentDashboard
);


module.exports = router;