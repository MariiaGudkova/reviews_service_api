const router = require('express').Router();
const { getAllReviews, getAllUserReviews, createReview } = require('../controllers/reviews');

router.get('/', getAllReviews);
router.get('/myReviews', getAllUserReviews);
router.post('/', createReview);

module.exports = router;
