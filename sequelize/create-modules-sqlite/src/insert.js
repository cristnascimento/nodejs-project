const { User } = require('./user');

(async () => {
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@gmail.com',
    password: 'janedoe',
  });
  console.log(jane.toJSON());
})();
