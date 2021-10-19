const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/mongodb');
const { Server } = require('http');

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unchaught Exception`);
    process.exit(1);
});

//load env configuration

// dotenv.config({ path: process.cwd() + '/config/config.env' });
dotenv.config({ path: __dirname + '/config/config.env' });

connectDatabase();

app.listen(process.env.PORT, () =>
    console.log('server listening on port ' + process.env.PORT)
)

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhanlde Promise Rejection`);
    Server.close(() => {
        process.exit(1);
    });
});
