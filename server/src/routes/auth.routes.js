const router = require('express').Router();
const {authController} = require('../controllers');

router.post('register',authController.registerUser);
router.post('login',authController.loginUser);
// router.post('logout',logoutUser);

module.exports = router;