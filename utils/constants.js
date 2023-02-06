const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZATION_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOTFOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

const INCORRECT_DATA_CREATE_USER_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя';
const INCORRECT_DATA_UPDATE_USER_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля';
const EMAIL_EXIST_ERROR_TEXT = 'Пользователь с таким email уже существует';
const INVALID_ID_USER_ERROR_TEXT = 'Передан неверный _id пользователя';
const ID_NOT_FOUND_USER_ERROR_TEXT = 'Пользователь по указанному _id не найден';
const SUCCSSES_UPDATE_USER_TEXT = 'Профайл успешно обновлен';
const INCORRECT_DATA_CREATE_REVIEW_ERROR_TEXT = 'Переданы некорректные данные при создании рецензии';
const NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT = 'Недостаточно прав для удаления рецензии';
const INVALID_ID_REVIEW_ERROR_TEXT = 'Передан неверный _id рецензии';
const ID_NOT_FOUND_REVIEW_ERROR_TEXT = 'Рецензия по указанному _id не найдена';
const SUCCSSES_DELETE_REVIEW_TEXT = 'Рецензия успешно удалена';
const AUTHORIZATION_ERROR_TEXT = 'Неверные email или пароль';
const WRONG_PATH_ERROR_TEXT = 'Передан неправильный путь';
const SERVER_ERROR_TEXT = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const urlRegex = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/i;

const allowedCors = [];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZATION_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  INCORRECT_DATA_CREATE_USER_ERROR_TEXT,
  INCORRECT_DATA_UPDATE_USER_ERROR_TEXT,
  EMAIL_EXIST_ERROR_TEXT,
  INVALID_ID_USER_ERROR_TEXT,
  ID_NOT_FOUND_USER_ERROR_TEXT,
  SUCCSSES_UPDATE_USER_TEXT,
  INCORRECT_DATA_CREATE_REVIEW_ERROR_TEXT,
  NOT_ENOUGH_RIGHTS_TO_DELETE_TEXT,
  INVALID_ID_REVIEW_ERROR_TEXT,
  ID_NOT_FOUND_REVIEW_ERROR_TEXT,
  SUCCSSES_DELETE_REVIEW_TEXT,
  AUTHORIZATION_ERROR_TEXT,
  WRONG_PATH_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  urlRegex,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
