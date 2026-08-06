const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



// Register User
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }



        const hashedPassword = await bcrypt.hash(password, 10);



        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");



        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            verificationToken,

            verificationTokenExpire: Date.now() + 60 * 60 * 1000

        });



        const verificationURL =
        `http://localhost:5000/api/auth/verify/${verificationToken}`;



        await sendEmail({

            email: user.email,

            subject: "Verify your Library Management Account",

            message: `

                <h2>Welcome ${user.name}</h2>

                <p>Thank you for registering with Library Management System.</p>

                <p>Please verify your email by clicking the link below:</p>

                <a href="${verificationURL}">
                    Verify Email
                </a>

                <p>This verification link will expire in 1 hour.</p>

            `

        });



        res.status(201).json({

            message: "User registered successfully. Please verify your email.",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};




// Verify Email
const verifyEmail = async (req, res) => {

    try {

        const { token } = req.params;



        const user = await User.findOne({

            verificationToken: token,

            verificationTokenExpire: {
                $gt: Date.now()
            }

        });



        if (!user) {

            return res.status(400).json({

                message: "Invalid or expired verification token"

            });

        }



        user.isVerified = true;

        user.verificationToken = undefined;

        user.verificationTokenExpire = undefined;



        await user.save();



        res.status(200).json({

            message: "Email verified successfully"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};




// Forgot Password
const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;



        const user = await User.findOne({ email });



        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }



        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");



        user.resetPasswordToken = resetToken;


        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;



        await user.save();



        const resetURL =
        `http://localhost:5000/api/auth/reset-password/${resetToken}`;



        await sendEmail({

            email: user.email,

            subject: "Password Reset Request",

            message: `

                <h2>Password Reset</h2>

                <p>Hello ${user.name}</p>

                <p>You requested a password reset.</p>

                <p>Click the link below:</p>


                <a href="${resetURL}">
                    Reset Password
                </a>


                <p>This link expires in 15 minutes.</p>

            `

        });



        res.status(200).json({

            message: "Password reset email sent"

        });



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};

// Reset Password
const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;



        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpire: {
                $gt: Date.now()
            }

        });



        if (!user) {

            return res.status(400).json({

                message: "Invalid or expired reset token"

            });

        }



        const hashedPassword = await bcrypt.hash(password, 10);



        user.password = hashedPassword;


        user.resetPasswordToken = undefined;


        user.resetPasswordExpire = undefined;



        await user.save();



        res.status(200).json({

            message: "Password reset successful"

        });



    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};


// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;



        const user = await User.findOne({ email });



        if (!user) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }



        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }



        if (!user.isVerified) {

            return res.status(401).json({

                message: "Please verify your email first"

            });

        }



        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: process.env.JWT_EXPIRE

            }

        );



        res.status(200).json({

            message: "Login successful",

            token,


            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





module.exports = {

    registerUser,

    verifyEmail,

    forgotPassword,

    resetPassword,

    loginUser

};