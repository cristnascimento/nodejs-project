const bcrypt = require('bcrypt')

// hash generated previously using password '123'
let hash = '$2b$10$Svq45fK0z8BLZQfJBMLb9OgRhmlwX6ROuOGZV1wIDhYiAgyJEPwmm'

// this is the password that will be checked against the hashed password 
let pwd = '123'

bcrypt.compare(pwd, hash, (err, res) => { 
    if (res) {
        console.log('Password matched!')
    }
    else {
        console.log('Wrong password!')
    }
})
