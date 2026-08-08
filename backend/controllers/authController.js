const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



// Register User

const registerUser = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);



        const verificationToken =
            crypto.randomBytes(32).toString("hex");



        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            verificationToken,

            verificationTokenExpire:
                Date.now() + 60 * 60 * 1000

        });



        const verificationURL =
            `http://localhost:5000/api/auth/verify/${verificationToken}`;



        await sendEmail({

            email: user.email,

            subject:
                "Verify your Library Management Account",

            message: `

                <h2>Welcome ${user.name}</h2>

                <p>Thank you for registering with Library Management System.</p>

                <p>Please verify your email:</p>

                <a href="${verificationURL}">
                    Verify Email
                </a>

            `

        });



        res.status(201).json({

            message:
            "User registered successfully. Please verify your email.",

            user: {

                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role

            }

        });



    } catch(error) {

        next(error);

    }

};





// Verify Email

const verifyEmail = async (req,res,next)=>{

    try {


        const {token}=req.params;



        const user = await User.findOne({

            verificationToken:token,

            verificationTokenExpire:{
                $gt:Date.now()
            }

        });



        if(!user){

            return res.status(400).json({

                message:
                "Invalid or expired verification token"

            });

        }



        user.isVerified=true;

        user.verificationToken=undefined;

        user.verificationTokenExpire=undefined;



        await user.save();



        res.status(200).json({

            message:
            "Email verified successfully"

        });



    }catch(error){

        next(error);

    }

};





// Forgot Password

const forgotPassword = async(req,res,next)=>{


    try{


        const {email}=req.body;



        const user =
            await User.findOne({email});



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        const resetToken =
            crypto.randomBytes(32).toString("hex");



        user.resetPasswordToken=resetToken;


        user.resetPasswordExpire =
            Date.now()+15*60*1000;



        await user.save();



        const resetURL =
        `http://localhost:5000/api/auth/reset-password/${resetToken}`;



        await sendEmail({

            email:user.email,

            subject:"Password Reset Request",

            message:`

            <h2>Password Reset</h2>

            <p>Hello ${user.name}</p>

            <a href="${resetURL}">
            Reset Password
            </a>

            `

        });



        res.status(200).json({

            message:
            "Password reset email sent"

        });



    }catch(error){

        next(error);

    }

};





// Reset Password

const resetPassword = async(req,res,next)=>{


    try{


        const {token}=req.params;

        const {password}=req.body;



        const user = await User.findOne({

            resetPasswordToken:token,

            resetPasswordExpire:{
                $gt:Date.now()
            }

        });



        if(!user){

            return res.status(400).json({

                message:
                "Invalid or expired reset token"

            });

        }



        user.password =
            await bcrypt.hash(password,10);



        user.resetPasswordToken=undefined;

        user.resetPasswordExpire=undefined;



        await user.save();



        res.status(200).json({

            message:
            "Password reset successful"

        });



    }catch(error){

        next(error);

    }

};





// Login User

const loginUser = async (req, res, next) => {
    try {
        console.log("=================================");
        console.log("LOGIN REQUEST RECEIVED");
        console.log("Email:", req.body.email);
        console.log("Password received:", !!req.body.password);

        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });

        console.log("User found:", !!user);

        if (!user) {
            console.log("LOGIN FAILED: USER NOT FOUND");

            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        console.log("User ID:", user._id);
        console.log("User email:", user.email);
        console.log("User role:", user.role);
        console.log("User verified:", user.isVerified);

        // 2. Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Password matches:", isMatch);

        if (!isMatch) {
            console.log("LOGIN FAILED: PASSWORD DOES NOT MATCH");

            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // 3. Check email verification
        if (!user.isVerified) {
            console.log("LOGIN FAILED: EMAIL NOT VERIFIED");

            return res.status(401).json({
                message: "Please verify your email first",
            });
        }

        // 4. Check JWT configuration
        console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
        console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from .env");
        }

        // 5. Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE || "7d",
            }
        );

        console.log("JWT CREATED SUCCESSFULLY");

        // 6. Send response
        res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        console.log("LOGIN SUCCESSFUL");
        console.log("=================================");

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        next(error);
    }
};





module.exports = {

    registerUser,

    verifyEmail,

    forgotPassword,

    resetPassword,

    loginUser

};