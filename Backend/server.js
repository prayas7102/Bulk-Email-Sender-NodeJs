const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({
    path: 'Backend/.env'
});

const { databaseConnect } = require('./config/database');
databaseConnect();

const EmailRouter = require('./routes/EmailRouter');
app.use('/api/user/', EmailRouter);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
});

module.exports = app;