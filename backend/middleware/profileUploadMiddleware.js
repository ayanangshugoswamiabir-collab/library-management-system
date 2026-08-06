const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");



const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "library/users",

        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ]

    }

});



const fileFilter = (req, file, cb) => {


    const allowedTypes =
        /jpeg|jpg|png|webp/;



    const isValidExt =
        allowedTypes.test(
            path.extname(file.originalname)
            .toLowerCase()
        );


    const isValidMime =
        allowedTypes.test(
            file.mimetype
        );



    if(isValidExt && isValidMime){

        cb(null,true);

    }
    else{

        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            )
        );

    }


};



const uploadProfile = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});


module.exports = uploadProfile;