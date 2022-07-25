const express = require("express");
const { getById, updateUser } = require("./user.controller");
const router = express.Router();

router.get('/:id', getById)
router.put("/", updateUser);

module.exports = router;
