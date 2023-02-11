require('dotenv').config();
const db = require('../utils/dbConnection');
const BadRequestError = require('../errors/bad_request_err');
// const ForbiddenError = require('../errors/forbidden_err');
// const NotFoundError = require('../errors/notfound_err');
const {
  INCORRECT_DATA_CREATE_REVIEW_ERROR_TEXT,
  // NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT,
  // ID_NOT_FOUND_REVIEW_ERROR_TEXT,
  // SUCCSSES_DELETE_REVIEW_TEXT,
  SUCCESS_CREATE_REVIEW_TEXT,
} = require('../utils/constants');

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM reviews', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    res.send(reviews);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getAllUserReviews = async (req, res, next) => {
  try {
    const owner = req.body.id;
    const userReviews = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM reviews WHERE owner = ?', [owner], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    res.send(userReviews);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createReview = async (req, res, next) => {
  try {
    const {
      title, workTitle, description, cover = 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', coverTwo = 'https://images.unsplash.com/photo-1614850716626-873413eb7c1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', rating, userId, categoryId,
    } = req.body;
    const newReview = await new Promise((resolve, reject) => {
      db.query('INSERT INTO reviews (createDate, title, workTitle, description, cover, coverTwo, rating, user_id, category_id) VALUES(now(),?,?,?,?,?,?,?, ?)', [title, workTitle, description, cover, coverTwo, rating, userId, categoryId], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    if (newReview) {
      res.send({ message: SUCCESS_CREATE_REVIEW_TEXT });
    } else {
      throw new BadRequestError(INCORRECT_DATA_CREATE_REVIEW_ERROR_TEXT);
    }
  } catch (err) {
    if (err?.code === 'ER_BAD_NULL_ERROR') {
      next(new BadRequestError(INCORRECT_DATA_CREATE_REVIEW_ERROR_TEXT));
      return;
    }
    console.error(err);
    next(err);
  }
};

module.exports = { getAllReviews, getAllUserReviews, createReview };
