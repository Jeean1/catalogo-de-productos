const router = require("express").Router();
const controller = require("../controller/category.controller");

router.get("/", controller.getCategories);
router.get("/:id", controller.getCategory);
router.post("/", controller.postCategory);
router.put("/:id", controller.putCategory);
router.delete("/:id", controller.removeCategory);

module.exports = router;
