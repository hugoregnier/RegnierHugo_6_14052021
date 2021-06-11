const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    // l'email doit être unique 
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true}
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);