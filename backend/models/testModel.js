const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testuserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    }
}, {
    collection: 'testusers'
})

module.exports = mongoose.model('TestUser', testuserSchema)