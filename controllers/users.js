require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const devConfig = require('../devConfig.json');
const db = require('../utils/dbConnection');
const BadRequestError = require('../errors/bad_request_err');
const ConflictError = require('../errors/conflict_err');
const ForbiddenError = require('../errors/forbidden_err');
// const NotFoundError = require('../errors/notfound_err');
const {
  INCORRECT_DATA_CREATE_USER_ERROR_TEXT,
  // INCORRECT_DATA_UPDATE_USER_ERROR_TEXT,
  EMAIL_EXIST_ERROR_TEXT,
  AUTHORIZATION_ERROR_TEXT,
  // INVALID_ID_ERROR_TEXT,
  // ID_NOT_FOUND_ERROR_TEXT,
  // SUCCSSES_UPDATE_USER_TEXT,
} = require('../utils/constants');

const registerUser = async (req, res, next) => {
  try {
    const {
      email, name, password,
    } = req.body;
    if (typeof name !== 'string' || name.length === 0) {
      throw new BadRequestError(INCORRECT_DATA_CREATE_USER_ERROR_TEXT);
    }
    const hash = await bcrypt.hash(String(password), 10);
    const userId = await new Promise((resolve, reject) => {
      db.query('INSERT INTO users (email, name, password) VALUES(?,?,?)', [email, name, hash], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.insertId);
      });
    });
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign({ id: userId }, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    if (err?.code === 'ER_DUP_ENTRY') {
      next(new ConflictError(EMAIL_EXIST_ERROR_TEXT));
      return;
    }
    if (err?.code === 'ER_BAD_NULL_ERROR') {
      next(new BadRequestError(INCORRECT_DATA_CREATE_USER_ERROR_TEXT));
      return;
    }
    if (err) {
      console.log(err);
      next(err);
    }
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const { email, password } = req.body;
    const [user] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    const isPasswordMatched = await bcrypt.compare(String(password), user.password);
    if (isPasswordMatched) {
      const token = jwt.sign({ id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret, { expiresIn: '7d' });
      res.send({ token });
    } else {
      throw new ForbiddenError(AUTHORIZATION_ERROR_TEXT);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { registerUser, loginUser };
