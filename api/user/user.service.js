const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const { ObjectId } = require("mongodb");

module.exports = {
  getById,
  getByUsername,
  update,
  add,
};

async function getById(currUserId){
  const collection = await dbService.getCollection("user");
  const user = await collection.findOne({ _id: ObjectId(currUserId) });
  delete user.password
  return user
}

async function update(userInfo) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ _id: ObjectId(userInfo._id) });
    var id = ObjectId(user._id);
    delete user._id;
    user.timeLog = userInfo.timeLog
    user.username = userInfo.username
    await collection.updateOne({ _id: id }, { $set: { ...user } });
    user._id = id;
    delete user.password;
    return user;
  } catch (err) {
    logger.error(`cannot update user ${userInfo._id}`, err);
    throw err;
  }
}

async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ username });
    return user;
  } catch (err) {
    logger.error(`while finding user ${username}`, err);
    throw err;
  }
}

async function add(user) {
  try {
    user.timeLog = [];
    const collection = await dbService.getCollection("user");
    await collection.insertOne(user);
    delete user.password;
    return user;
  } catch (err) {
    logger.error("cannot insert user", err);
    throw err;
  }
}