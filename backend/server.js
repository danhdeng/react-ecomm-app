const app=require('./app');
const dotenv=require('dotenv');
const path = require('path');
//load env configuration

dotenv.config({ path: process.cwd() + '/config/config.env' });

app.listen(process.env.PORT, ()=>
    console.log('server listening on port '+process.env.PORT)
)