const crypto = require('crypto');

function hashPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    }
}

// Generally, the password will be given by user, while the hash and salt should come from database
function validPassword(password, hash, salt) {
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === genHash;
}


module.exports = { 
    hashPassword,
    validPassword
}