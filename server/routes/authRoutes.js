const { Router } = require('express');
const authController = require('../controllers/authControllers');

const router = Router();

router.get('/login', authController.login_get);
router.get('/signup', authController.signup_get);

module.exports = router;