require('dotenv').config();
const mongoose = require('mongoose');

// Connecting to MongoDB
// Creating a client
mongoose.connect(`mongodb://${process.env.DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Exporting client
module.exports = mongoose;