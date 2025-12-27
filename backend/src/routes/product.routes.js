const router = require("express").Router();
const controller = require("../controller/product.controller.js");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.post("/", controller.postProduct);
router.put("/:id", controller.putProduct);
router.delete("/:id", controller.removeProduct);

module.exports = router;
