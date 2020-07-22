# Using bcrypt to encrypt passwords in Node

## Description

This tutorial will show how you can hash your password safely before inserting it into a database.

## Dependencies

* Ubuntu 18.04
* Node and Npm
* BCrypt

## Install bcrypt

```
$ npm install bcrypt
```

## Encode your password

`hash.py`
```javascript
const bcrypt = require('bcrypt');

// number of rounds
const salt = 10;

const pass = '123';

bcrypt.hash(pass, salt, (err, hash) => {
    console.log('hashed pwd: ' + hash);
});

```
run
```
$ node hash
```

## Decode your password

`compare.py`
```javascript
const bcrypt = require('bcrypt');

// hash generated previously using password '123'
let hash = '$2b$10$Svq45fK0z8BLZQfJBMLb9OgRhmlwX6ROuOGZV1wIDhYiAgyJEPwmm';

// this is the password that will be checked against the hashed password 
let pwd = '123';

bcrypt.compare(pwd, hash, (err, res) => { 
    if (res) {
        console.log('Password matched!');
    }
    else {
        console.log('Wrong password!');
    }
});
```
run
```
$ node compare
```

## Conclusion

Now you know how to encrypt your password and can safely save it into your database.

Further, you can use this code to authenticate users in your website and then provide them with a token or reply with a message if their username and password does not match with those stored.

Please, read the bcrypt docummentation so that you can configure advanced features.

* [bcrypt page](https://github.com/kelektiv/node.bcrypt.js#readme)
