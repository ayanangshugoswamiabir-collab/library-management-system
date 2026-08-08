const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadProfileImage
} = require("../controllers/userController");

const uploadProfile = require("../middleware/profileUploadMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");


// =====================================
// Swagger Tags
// =====================================

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile APIs
 */


// =====================================
// Profile Image Route
// =====================================

/**
 * @swagger
 * /api/users/profile-image:
 *   put:
 *     summary: Upload profile image
 *     description: Upload or update the profile image of the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profileImage
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *       400:
 *         description: Please upload an image
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Server error
 */
router.put(
    "/profile-image",
    uploadProfile.single("profileImage"),
    uploadProfileImage
);


// =====================================
// Admin User Management Routes
// =====================================


// Get all users

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all registered users. Admin access required.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    authorizeRoles("Admin"),
    getAllUsers
);


// Get single user

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a single user using their MongoDB ID. Admin access required.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 6a720a63e15a3af084298ed5
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get(
    "/:id",
    authorizeRoles("Admin"),
    getUserById
);


// Update user

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Updates a user's name, email, or role. Admin access required.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 6a73a4c4b9cc5fd69f4c2a12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rahul@example.com
 *               role:
 *                 type: string
 *                 enum:
 *                   - Admin
 *                   - Librarian
 *                   - Student
 *                 example: Student
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    authorizeRoles("Admin"),
    updateUser
);


// Delete user

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes a user by their MongoDB ID. Admin access required.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *         example: 6a73a4c4b9cc5fd69f4c2a12
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete(
    "/:id",
    authorizeRoles("Admin"),
    deleteUser
);


module.exports = router;