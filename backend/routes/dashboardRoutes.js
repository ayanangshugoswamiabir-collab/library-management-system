const express = require("express");

const router = express.Router();

const {
    getAdminDashboard,
    getLibrarianDashboard,
    getStudentDashboard
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


// =====================================
// Swagger Tags
// =====================================

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Role-based library dashboard APIs
 */


// =====================================
// Admin Dashboard
// =====================================

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Get Admin Dashboard
 *     description: Retrieves overall library statistics including users, books, borrowing statistics, popular books, popular categories, and recent borrowing activity.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */
router.get(
    "/admin",
    protect,
    authorizeRoles("Admin"),
    getAdminDashboard
);


// =====================================
// Librarian Dashboard
// =====================================

/**
 * @swagger
 * /api/dashboard/librarian:
 *   get:
 *     summary: Get Librarian Dashboard
 *     description: Retrieves today's book issues, today's returns, and currently overdue books.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Librarian dashboard data retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin or Librarian access required
 *       500:
 *         description: Server error
 */
router.get(
    "/librarian",
    protect,
    authorizeRoles("Admin", "Librarian"),
    getLibrarianDashboard
);


// =====================================
// Student Dashboard
// =====================================

/**
 * @swagger
 * /api/dashboard/student:
 *   get:
 *     summary: Get Student Dashboard
 *     description: Retrieves the student's currently borrowed books, borrowing history, and total fine.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Student access required
 *       500:
 *         description: Server error
 */
router.get(
    "/student",
    protect,
    authorizeRoles("Student"),
    getStudentDashboard
);


module.exports = router;