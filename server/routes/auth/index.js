const {registration, login } = require("../../controllers/user.controller");

const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", login);

module.exports = router;