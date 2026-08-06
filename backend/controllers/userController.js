const User = require("../models/User");



// Get all users (Admin)

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");


        res.status(200).json({

            message: "Users fetched successfully",

            users

        });


    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};





// Get single user by ID (Admin)

const getUserById = async (req, res) => {


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


        res.status(500).json({

            message: error.message

        });


    }


};







// Update user (Admin)

const updateUser = async (req, res) => {


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


        res.status(500).json({

            message: error.message

        });


    }


};








// Delete user (Admin)

const deleteUser = async (req, res) => {


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


        res.status(500).json({

            message: error.message

        });


    }


};









// Upload Profile Image

const uploadProfileImage = async (req, res) => {


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


        res.status(500).json({

            message: error.message

        });


    }


};








module.exports = {

    getAllUsers,

    getUserById,

    updateUser,

    deleteUser,

    uploadProfileImage

};