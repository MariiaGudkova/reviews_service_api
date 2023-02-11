const db = require('./dbConnection');

// Create DB
db.query('CREATE DATABASE reviewsApi', (err) => {
  if (err) throw err;
  console.log('Database created');
});

// Create Tables
db.query('CREATE TABLE users( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(60) NOT NULL UNIQUE, name VARCHAR(30) NOT NULL, password VARCHAR(100) NOT NULL, avatar BLOB);', (err) => {
  if (err) throw err;
  console.log('Users table created');
});

db.query('CREATE TABLE categories( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL UNIQUE );', (err) => {
  if (err) throw err;
  console.log('Categories table created');
});

db.query('CREATE TABLE reviews( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(100) NOT NULL default "Заголовок", workTitle VARCHAR(100) NOT NULL default "Название произведения", description TEXT NOT NULL, cover BLOB, coverTwo BLOB, createDate DATETIME NOT NULL, rating TINYINT NOT NULL, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, category_id INT NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(id) );', (err) => {
  if (err) throw err;
  console.log('Reviews table created');
});

db.query('CREATE TABLE likes(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id), review_id INT NOT NULL, FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE, createDate DATETIME NOT NULL);', (err) => {
  if (err) throw err;
  console.log('Likes table created');
});

db.query('CREATE TABLE dislikes(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id), review_id INT NOT NULL, FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE, createDate DATETIME NOT NULL);', (err) => {
  if (err) throw err;
  console.log('Likes table created');
});

db.query('CREATE TABLE ratings(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, review_id INT NOT NULL, FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE, rate TINYINT NOT NULL,createDate DATETIME NOT NULL);', (err) => {
  if (err) throw err;
  console.log('Likes table created');
});
