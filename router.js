const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/user/all", controller.getUsers);
router.get("/user/:id", controller.getUserById);
router.post("/user/add", controller.addUser);
router.delete("/user/delete/:id", controller.deleteUser);
router.put("/user/edit/:id", controller.editUser);

module.exports = router;