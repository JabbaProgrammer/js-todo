const listTasks = require("../../controllers/task/listTasks");
const createTask = require("../../controllers/task/createTask");
const completeTask = require("../../controllers/task/completeTask");
const AuthMiddleware = require("../../middleware/auth.middleware");

const router = require("express").Router();

router.get("/", AuthMiddleware, listTasks);
router.post("/create", AuthMiddleware, createTask);
router.patch("/:id", AuthMiddleware, completeTask);


module.exports = router;