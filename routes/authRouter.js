const authController = require('../app/controllers/AuthController');
const authUser = require('../app/middlewares/UserAuth');

// router
const router = require('express').Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/profile', authUser.verifyUser, authController.userProfile);
router.post('/logout', authUser.verifyUser, authController.logoutUser);

module.exports = router;