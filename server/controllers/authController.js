const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/app')


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    // const secret = require('crypto').randomBytes(64).toString('hex')
    // find the user - when sequelize returns this user here it is a sequelize instance of that model - which can't access the getters in the model
    const user = await User.findOne({
      where: {
        email,
      },
    });
    // check if a user was found
    if (!user) return res.status(404).json({ message: "User not found" });
    // does password match - using bcrypt to check if the password was correct
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Incorrect password" });

    // generate auth token and then use our helper function that created the token and combined it with out user object
    const userWithToken = generateToken(user.get({ raw: true }));
    userWithToken.user.avatar = user.avatar;
    
    return res.send(userWithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.register = async (req, res) => {

  try {
    const user = await User.create(req.body);

    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const generateToken = (user) => {
  delete user.password;
  // 86400 milliseconds is equal to one week
  // the payload is the user
  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });

  // combining the user with the token with the spread operator
  // These are separated so that we can set the token in local storage
  return { ...{ user }, ...{ token } };
};
