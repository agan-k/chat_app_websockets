const User = require("../models").User;
const sequelize = require("sequelize");

exports.update = async (req, res) => {

  // This is created by multer
  // It adds a file to our request object
  if (req.file) {
    req.body.avatar = req.file.filename
  }

  // error handling for when an empty string is sent
  if (typeof req.body.avatar !== 'undefined' && req.body.avatar.length === 0) delete req.body.avatar

  try {
    // the rows and results is comes from setting the returning to true
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true, // return an array of updated users
      individualHooks: true, // So that sequelize will execute hooks on this modal
    });
    // Get the plane object and not the sequelize instance by setting plane raw to true
    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password; // so that it;'s not visible on the front

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
  return res.send("User controller");
};

exports.search = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        [sequelize.Op.or]: {
          namesConcated: sequelize.where(
            sequelize.fn('concat', sequelize.col('lastName'))
            ,
            {
              [sequelize.Op.iLike]: `%${req.query.term}%`
            }
          ),
          email: {
            [sequelize.Op.iLike]: `%${req.query.term}%`
          }
        },
        [sequelize.Op.not]: {
          id: req.user.id
        }
      },
      limit: 10
    })
    return res.json(users)
  } catch (e) {
    console.log(e)
  }
}