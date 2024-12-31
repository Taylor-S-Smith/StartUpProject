const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DB = require('./database.js');
const validPassword = require('./lib/passwordUtils.js').validPassword;
const { ObjectId } = require('mongodb');

const verifyCallback = async (username, password, result) => {

    const user = DB.getUser(username)
        .then((user) => {
        if (!user) { return result(null, false) }

        const isValid = validPassword(password, user.passwordHash, user.salt)

        if(isValid) {
            return result(null, user);
        } else {
            return result(null, false);
        }
        })
        .catch((error) => result(error));
    
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);


passport.serializeUser((user, result) => {
    //console.log('Serializing user:', user._id);
    result(null, user._id);
});

passport.deserializeUser((userId, result) => {
    const objectId = new ObjectId(userId);
    //console.log('Deserializing user:', objectId);
    DB.getUserById(objectId)
        .then((user) => {
            //console.log('Deserialized user:', user);
            result(null, user);
        })
        .catch(error => result(error));
});