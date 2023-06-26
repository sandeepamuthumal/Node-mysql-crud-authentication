const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const salt = 10;
const db = require("../models");
const { Op } = require("sequelize");

const User = db.users;

const registerUser = async(req, res) => {
    // Hash the password
    const password = req.body.password.toString();
    const hash = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hash);

    const sql = await User.create({
        name: req.body.name,
        email: req.body.email,
        hash: hashPassword,
    });

    return res.json({ Status: "success", Id: sql.id });

};

const loginUser = async(req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } });

    // Check the email
    // If there's not exists
    // Throw the error
    if (!user) return res.status(422).json("Invalid credentials");

    // Check the password
    let password = req.body.password;
    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) return res.status(400).json("Password is incorrect");

    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };

    const token = jwt.sign(payload, "jwt-secret-key", {
        expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.json({ Status: "Success", token: token });
};

const logoutUser = (req, res) => {
    res.clearCookie("token");

    const authorizationHeader = req.header("Authorization");
    // Split the authorization header value
    const splitAuthorizationHeader = authorizationHeader.split(" ");

    // Get the type of token and actual token
    const token = splitAuthorizationHeader[1];

    if (!token) {
        return res.status(400).json({ error: "Token not provided" });
    }

    // Add the token to the invalidated tokens list
    // invalidatedTokens.push(token);

    return res.json({ status: "success", message: "Logout successful" });
};

const userProfile = (req, res) => {
    return res.json({
        Status: "Success",
        name: req.user.name,
        email: req.user.email,
    });
};

module.exports = { registerUser, loginUser, logoutUser, userProfile };