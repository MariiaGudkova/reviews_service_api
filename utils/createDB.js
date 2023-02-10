const db = require('./dbConnection');

// Create DB
db.query('CREATE DATABASE reviewsApi', (err) => {
  if (err) throw err;
  console.log('Database created');
});

// Create Tables
db.query('CREATE TABLE users( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(60) NOT NULL UNIQUE, name VARCHAR(30) NOT NULL, password VARCHAR(100) NOT NULL, avatar BLOB, allReviews TINYINT, allLikes TINYINT, allComments TINYINT)', (err) => {
  if (err) throw err;
  console.log('Users table created');
});

db.query('CREATE TABLE reviews( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(100) NOT NULL default "Заголовок", workTitle VARCHAR(100) NOT NULL default "Название произведения", description TEXT NOT NULL, cover BLOB, coverTwo BLOB, createDate DATETIME NOT NULL, rating TINYINT NOT NULL, category VARCHAR(100) NOT NULL default "Категория", tags VARCHAR(255) default "Теги", averageReviewRating FLOAT NOT NULL, likes TINYINT, dislikes TINYINT, views TINYINT, comments TEXT,owner VARCHAR(255) NOT NULL)', (err) => {
  if (err) throw err;
  console.log('Reviews table created');
});
