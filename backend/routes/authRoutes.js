const express = require("express");

const {
    registerUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    loginUser
} = require("../controllers/authController");





const router = express.Router();



router.post("/register", registerUser);


router.get("/verify/:token", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.post("/login", loginUser);





module.exports = router;