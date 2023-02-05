const express = require('express');
const mysql = require('mysql');
const devConfig = require('./devConfig.json');

const configuration = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

const { PORT = devConfig.port } = process.env;
const app = express();
configuration.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  }

  console.log('Databse ----- OK');
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
