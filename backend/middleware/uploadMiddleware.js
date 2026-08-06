const multer = require("multer");
const path = require("path");


// Storage configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        console.log("Multer destination reached");

        cb(null, "uploads/books");

    },


    filename: function (req, file, cb) {

        console.log("Uploading file:", file.originalname);


        const uniqueName =
            Date.now() + path.extname(file.originalname);


        cb(null, uniqueName);

    }

});



// File filter
const fileFilter = (req, file, cb) => {


    console.log("Checking file:", file.mimetype);


    const allowedTypes =
        /jpeg|jpg|png|webp/;



    const isValidExt =
        allowedTypes.test(
            path.extname(file.originalname)
            .toLowerCase()
        );



    const isValidMime =
        allowedTypes.test(file.mimetype);



    if (isValidExt && isValidMime) {


        cb(null, true);


    } else {


        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            )
        );


    }


};



// Upload middleware
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});



module.exports = upload;