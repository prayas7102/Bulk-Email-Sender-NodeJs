const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config({
    path: 'Backend/.env'
});

const { databaseConnect } = require('./config/database');
databaseConnect();

app.use(express.json());

const EmailRouter = require('./routes/EmailRouter');
app.use('/api/user/', EmailRouter);

// app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
});