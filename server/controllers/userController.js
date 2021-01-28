const User = require("../models").User;
const sequelize = require("sequelize");

exports.update = async (req, res) => {

  try {
// the rows and results is comes from setting the returning to true
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id
      },
      returning: true, // return an array of updated users
      individualHooks: true // So that sequelize will execute hooks on this modal
    })
    // Get the plane object and not the sequelize instance by setting plane raw to true
    const user = result[0].get({ raw: true })
    user.avatar = result[0].avatar
    delete user.password // so that it;'s not visible on the front

    return res.send(user)
  } catch (e) {
    return res.status(500).json({error: e.message})
  }
  return res.send("User controller");
};
  