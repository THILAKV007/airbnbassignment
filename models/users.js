const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    password: { type: String, default: '' }
}, {
    timestamps: true
});

const usersModel = mongoose.model('Users', usersSchema, 'Users');
module.exports = usersModel;