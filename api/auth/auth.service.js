const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  login,
  signup,
}

async function login(username, password) {
  logger.info(`auth.service - login with username: ${username}`)
  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid email or password')
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid email or password')

  delete user.password
  return user
}

async function signup(username, password) {
  const saltRounds = 10

  logger.info(`auth.service - signup with username: ${username}`)
  if (!username || !password) return Promise.reject('username and password are required!')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ username, password: hash })
}
