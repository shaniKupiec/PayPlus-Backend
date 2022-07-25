const userService = require("./user.service");
const logger = require("../../services/logger.service");

module.exports = {
  getById,
  updateUser,
};

async function getById(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.json(user);
  } catch (err) {
    logger.error("Failed to get by id " + err);
    res.status(500).send({ err: "Failed to get by id" });
  }
}

async function updateUser(req, res) {
  try {
    const userInfo = req.body;
    logger.info("updateUser - userInfo", userInfo);
    const updatedUser = await userService.update(userInfo);
    res.json(updatedUser);
    // res.json('ok');
  } catch (err) {
    logger.error("Failed to update user", err);
  }
}
