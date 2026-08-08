const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        role: {
            type: String,
            enum: ["Admin", "Librarian", "Student"],
            default: "Student"
        },


        // Email verification status
        isVerified: {
            type: Boolean,
            default: false
        },


        // Token sent through email
        verificationToken: {
            type: String
        },


        // Token expiry time
        verificationTokenExpire: {
            type: Date
        },

        resetPasswordToken: {

            type: String

        },


        resetPasswordExpire: {

            type: Date

        },


        profileImage: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User;