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



// Get all users (Admin)

router.get(
    "/",
    getAllUsers
);



// Get single user

router.get(
    "/:id",
    getUserById
);


router.put(
    "/profile-image",
    uploadProfile.single("profileImage"),
    uploadProfileImage
);
// Update user (Admin)

router.put(
    "/:id",
    updateUser
);



// Delete user (Admin)

router.delete(
    "/:id",
    deleteUser
);



// Upload profile image





module.exports = router;