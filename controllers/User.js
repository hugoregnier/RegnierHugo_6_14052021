const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

var passwordValidator = require('password-validator');
// const MaskData = require('maskdata');
var sanitize = require('mongo-sanitize');


// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces

// const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
// const emailMask2Options = {
//     maskWith: '*',
//     unmaskedStartCharactersBeforeAt: 3,
//     unmaskedEndCharactersAfterAt: 2,
//     maskAtTheRate: false
// }



// fonction pour créé un utilisateur
exports.signup = (req, res, next) => {
    const email = sanitize(req.body.email);
    // const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);
    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    // email: maskedEmail,
                    email: email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(401).json({ message: 'Mot de passe incorrect' })
    }
};

// fonction pour connecter un utilisateur existant
exports.login = (req, res, next) => {
    const password = sanitize(req.body.password);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};