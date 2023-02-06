require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const devConfig = require('../devConfig.json');
const db = require('../utils/dbConnection');
const BadRequestError = require('../errors/bad_request_err');
const ConflictError = require('../errors/conflict_err');
// const NotFoundError = require('../errors/notfound_err');
const {
  INCORRECT_DATA_CREATE_USER_ERROR_TEXT,
  // INCORRECT_DATA_UPDATE_USER_ERROR_TEXT,
  EMAIL_EXIST_ERROR_TEXT,
  // INVALID_ID_ERROR_TEXT,
  // ID_NOT_FOUND_ERROR_TEXT,
  // SUCCSSES_UPDATE_USER_TEXT,
} = require('../utils/constants');

const registerUser = async (req, res, next) => {
  try {
    const {
      email, name, password,
    } = req.body;
    const hash = await bcrypt.hash(String(password), 10);
    db.query('INSERT INTO users (email, name, password) VALUES(?,?,?)', [email, name, hash], (err, result) => {
      if (err?.code === 'ER_DUP_ENTRY') {
        next(new ConflictError(EMAIL_EXIST_ERROR_TEXT));
        return;
      }
      if (err?.code === 'ER_BAD_NULL_ERROR') {
        next(new BadRequestError(INCORRECT_DATA_CREATE_USER_ERROR_TEXT));
        return;
      }
      if (err) {
        console.error(err);
        next(err);
        return;
      }
      const userId = result.insertId;
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ id: userId }, NODE_ENV === 'production' ? JWT_SECRET : devConfig.devSecret, { expiresIn: '7d' });
      res.send({ userId, token });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerUser };

// Сделать промисификацию и обработать случай, когда name = ''
