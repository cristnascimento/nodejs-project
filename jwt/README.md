# Generating tokens with JWT and Node

## Description
In this tutorial will show how to generate tokens with jwt. Thus, you can use it to authenticate your users when they request pages in your server.

## Dependencies

* Ubuntu 18.04
* Node and Npm
* JSON Web Tokens

## Install JSON Web Tokens

```
$ npm install jsonwebtoken
```

## Generate the token

`generate.py`
```javascript
const jwt = require('jsonwebtoken');

const privateKey = 'my secret';
const payload = { foo: 'bar' }; 

jwt.sign(payload, privateKey, function(err, token) {
  console.log(token);
});
```
run
```
$ node generate
```

Read the JWT docummentation so that you can change the algorithm and expire fields.

## Verify

`verify.py`
```javascript
const jwt = require('jsonwebtoken');

// token generated previously

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1OTU0MjM5NjV9.YoofwHiPmMbpwewC9Wzp2gcW0W8gP1PzYBfaRjhjwH4'

const privateKey = 'my secret'

jwt.verify(token, privateKey, function(err, decoded) {
    if (err) {
        console.log('invalid token!')
    }
    else {
        console.log('Decoded: '+decoded.foo)
    }
});

```
run
```
$ node verify
```

Note that you should generate and verify the token with the same `key`. Alternatively, you can store that key in separated file.

## Conclusion

In this tutorial you have learned how to generate a token with jwt.

Further, you can try to answer a user request for authentication with a token. Then, you can check the token in future requests.

* [Read more about JWT](https://www.npmjs.com/package/jsonwebtoken)