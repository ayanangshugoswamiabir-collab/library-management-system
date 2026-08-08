const errorMiddleware = (err, req, res, next) => {

    console.error("ERROR:", err);


    // MongoDB duplicate key error
    if (err.code === 11000) {

        const duplicateField =
            Object.keys(err.keyValue || {})[0];

        return res.status(409).json({

            message: `${duplicateField} already exists`,
            field: duplicateField

        });

    }


    // Mongoose validation error
    if (err.name === "ValidationError") {

        const errors = Object.values(err.errors).map(
            (error) => ({
                field: error.path,
                message: error.message
            })
        );

        return res.status(400).json({

            message: "Validation failed",
            errors

        });

    }


    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {

        return res.status(400).json({

            message: "Invalid ID format"

        });

    }


    // Multer file upload errors
    if (err.name === "MulterError") {

        return res.status(400).json({

            message: err.message

        });

    }


    // General error
    res.status(err.statusCode || 500).json({

        message:
            err.message ||
            "Internal Server Error"

    });

};


module.exports = errorMiddleware;