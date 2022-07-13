const router = require("express").Router();

const auth = require("./auth");
const routerTodo = require("./task");

router.use("/tasks/", routerTodo); 
router.use("/", auth);

module.exports = router;