const authService = require("./auth.service");
const logger = require("../../services/logger.service");

module.exports = {
  login,
  signup,
};

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    logger.info("login- user", user);
    res.json(user);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const account = await authService.signup(username, password);
    logger.info(`auth.route - new account created: ` + JSON.stringify(account));
    const user = await authService.login(username, password);
    res.json(user);
  } catch (err) {
    logger.error("Failed to signup " + err);
    res.status(500).send({ err: "Failed to signup" });
  }
}