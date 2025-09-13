// atlas password: eL7hjUFAbNJxADpI
// connection string: mongodb+srv://ilanmd8861_db_user:eL7hjUFAbNJxADpI@cluster0.kpkxoqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL );
        console.log('MongoDB connected!');
    } catch (err) {
        console.error(err.message);

    }
};

module.exports = connectDB;