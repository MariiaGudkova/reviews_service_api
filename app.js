const express = require('express');
const devConfig = require('./devConfig.json');
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = devConfig.port } = process.env;
const app = express();
app.use(express.json());
app.use(routes);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});


// // Insert user
// app.get('/addUser', (req, res) => {
//   const user = {
//     email: 'dog@gmail.com', name: 'Шарик', password: '123456', avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
//   };

//   const sql = 'INSERT INTO users SET ?';
//   const query = db.query(sql, user, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('User added...');
//   });
// });

// // Select users
// app.get('/getUsers', (req, res) => {
//   const sql = 'SELECT * FROM users';
//   const query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send('Users fetched...');
//   });
// });

// // Select single user
// app.get('/getUser/:id', (req, res) => {
//   const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
//   const query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('User fetched...');
//   });
// });

// // Update user
// app.get('/updateUser/:id', (req, res) => {
//   const newName = 'Бобик';
//   const sql = `UPDATE users SET name = '${newName}' WHERE id = ${req.params.id}`;
//   const query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('User updated...');
//   });
// });

// // Delete user
// app.get('/deleteUser/:id', (req, res) => {
//   const sql = `DELETE FROM users WHERE id = ${req.params.id}`;
//   const query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('User deleted...');
//   });
// });
