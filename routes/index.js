const router = require('express').Router();
const userRouter = require('./users');
// const reviewRouter = require('./reviews');

router.use('/signUp', userRouter);
// router.use('/reviews', reviewRouter);

module.exports = router;
