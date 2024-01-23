const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, unique: true },
    password: { type: String, required: true ,unique:true },
    phoneNumber: { type: String, unique: true },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
