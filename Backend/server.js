const express = require('express');
const app = express();
require('dotenv').config({
    path: 'Backend/.env'
});
const { databaseConnect } = require('./config/database');
databaseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
});

module.exports = app;