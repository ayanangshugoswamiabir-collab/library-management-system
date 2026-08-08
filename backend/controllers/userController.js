const User = require("../models/User");



// Get all users (Admin)

const getAllUsers = async (req, res, next) => {

    try {

        const users = await User.find()
            .select("-password");


        res.status(200).json({

            message: "Users fetched successfully",

            users

        });


    } catch (error) {

        next(error);

    }

};





// Get single user by ID (Admin)

const getUserById = async (req, res, next) => {


    try {


        const user = await User.findById(req.params.id)
            .select("-password");



        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }



        res.status(200).json({

            message: "User fetched successfully",

            user

        });



    } catch (error) {

        next(error);

    }


};







// Update user (Admin)

const updateUser = async (req, res, next) => {


    try {


        const { name, email, role } = req.body;



        const user = await User.findByIdAndUpdate(

            req.params.id,

            {

                name,

                email,

                role

            },

            {

                new: true,

                runValidators: true

            }

        ).select("-password");





        if (!user) {


            return res.status(404).json({

                message: "User not found"

            });


        }




        res.status(200).json({

            message: "User updated successfully",

            user

        });




    } catch (error) {

        next(error);

    }


};









// Delete user (Admin)

const deleteUser = async (req, res, next) => {


    try {


        const user = await User.findByIdAndDelete(req.params.id);



        if (!user) {


            return res.status(404).json({

                message: "User not found"

            });


        }




        res.status(200).json({

            message: "User deleted successfully"

        });




    } catch (error) {

        next(error);

    }


};









// Upload Profile Image

const uploadProfileImage = async (req, res, next) => {


    try {


        if (!req.file) {


            return res.status(400).json({

                message: "Please upload an image"

            });


        }



        const user = await User.findByIdAndUpdate(

            req.user.id,

            {

                profileImage: req.file.path

            },

            {

                new: true

            }

        ).select("-password");





        res.status(200).json({

            message: "Profile image uploaded successfully",

            user

        });




    } catch (error) {

        next(error);

    }


};









module.exports = {

    getAllUsers,

    getUserById,

    updateUser,

    deleteUser,

    uploadProfileImage

};