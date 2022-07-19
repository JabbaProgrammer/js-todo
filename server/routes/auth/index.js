const registration = require("../../controllers/user/registration");
const login = require('../../controllers/user/login');

const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", login);

module.exports = router;