const express = require('express');
// const { databaseConnect } = require('./config/database');
const app = express();
// databaseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3000, () => { 
    console.log(`Server is running on ${3000}`) 
});

module.exports = app;