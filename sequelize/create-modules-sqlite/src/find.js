const { User } = require("./user");

const id = 1;

(async () => {
    const user = await User.findByPk(id);
    if (user == null) {
        console.log("Not found!");
    }
    else {
        console.log(user.toJSON());
    }
})();


