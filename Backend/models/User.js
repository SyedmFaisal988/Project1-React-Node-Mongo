const mongoose = require('mongoose');
let schema = mongoose.Schema;
let UserSchema = new schema({
    userName: String,
    password: String,
    status: String,
});

module.exports = mongoose.model('User', UserSchema);