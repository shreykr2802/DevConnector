const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        console.log('Before Connection');
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log('Mongo DB connected');
    } catch (err) {
        console.log(err.message, 'Mongo DB connection failed');
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;