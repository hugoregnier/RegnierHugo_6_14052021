const mongoose = require('mongoose');

// On utilise mongoose unique validator pour avoir une email de connexion UNIQUE avec la méthode .plugin
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    // l'email doit être unique 
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true}
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);