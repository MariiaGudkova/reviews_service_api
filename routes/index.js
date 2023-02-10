const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/users');
const userRouter = require('./users');
const reviewRouter = require('./reviews');

router.post('/signUp', registerUser);
router.post('/signIn', loginUser);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
