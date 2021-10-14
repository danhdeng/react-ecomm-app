const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/mongodb');
//load env configuration

// dotenv.config({ path: process.cwd() + '/config/config.env' });
dotenv.config({ path: __dirname + '/config/config.env' });

connectDatabase();

app.listen(process.env.PORT, () =>
    console.log('server listening on port ' + process.env.PORT)
)