const service = require("../service/product.service");

async function getProducts(req, res) {
  try {
    const result = await service.listProducts(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await service.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function postProduct(req, res) {
  try {
    await service.createProduct(req.body);
    res.status(201).json({ message: "Producto creado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function putProduct(req, res) {
  try {
    await service.updateProduct(req.params.id, req.body);
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function removeProduct(req, res) {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getProducts,
  getProduct,
  putProduct,
  removeProduct,
  postProduct,
};
