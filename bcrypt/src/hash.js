const bcrypt = require('bcrypt');

// number of rounds
const salt = 10;

const pass = '123'

bcrypt.hash(pass, salt, (err, hash) => {
    console.log('hashed pwd: ' + hash)
})
