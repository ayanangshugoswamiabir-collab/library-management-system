const jwt = require("jsonwebtoken");


const protect = async (req, res, next) => {

    try {

        const token = req.headers.authorization;


        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }


        const decoded = jwt.verify(
            token.split(" ")[1],
            process.env.JWT_SECRET
        );


        req.user = decoded;


        next();


    } catch (error) {

        res.status(401).json({
            message: "Not authorized, token failed"
        });

    }

};


module.exports = protect;