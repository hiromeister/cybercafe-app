const dotEnv = require('dotenv').load();

module.exports = {
    // 'url' : 'mongodb://localhost:27017/cybercafe' 
    'url': process.env.MONGODB_URI
};

