const mongoose = require('mongoose');
exports.databaseConnect = async() => {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_URI), {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error.message}`);

    }
}