const { listTasks, createTask, completeTask} = require("../../controllers/task.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");

const router = require("express").Router();

router.get("/", AuthMiddleware, listTasks);
router.post("/create", AuthMiddleware, createTask);
router.patch("/:id", AuthMiddleware, completeTask);


module.exports = router;