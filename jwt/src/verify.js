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
