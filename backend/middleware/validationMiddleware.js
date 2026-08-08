const validate = (schema) => {

    return (req, res, next) => {

        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true
        });

        if (error) {

            return res.status(400).json({

                message: "Validation failed",

                errors: error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message
                }))

            });

        }

        next();

    };

};


module.exports = validate;