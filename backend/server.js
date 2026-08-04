const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
    "/api/users",
    protect,
    authorizeRoles("Admin"),
    userRoutes
);

app.get("/", (req, res) => {
    res.send("Library Management System Backend Running");
});

app.get("/api/test", protect, (req, res) => {

    res.json({
    message: "Protected route accessed",
    user: req.user
    });

});

app.get("/api/admin-test", protect, authorizeRoles("Admin"), (req, res) => {

    res.json({
        message: "Welcome Admin",
        user: req.user
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});