const { Schema } = require('mongoose');

let mongoose = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    username: String,
    email: String,
    password: String
});

const user = mongoose.model('User', userSchema);
