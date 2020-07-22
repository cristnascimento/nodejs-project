const jwt = require('jsonwebtoken');

const privateKey = 'my secret';
const payload = { foo: 'bar' }; 

jwt.sign(payload, privateKey, function(err, token) {
  console.log(token);
});

