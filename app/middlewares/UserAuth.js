const jwt = require("jsonwebtoken");


const verifyUser = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    // Split the authorization header value
    const splitAuthorizationHeader = authorizationHeader.split(" ");

    // Get the type of token and actual token
    const token = req.cookies.token;

    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token", message: err });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    }
};

module.exports = { verifyUser };