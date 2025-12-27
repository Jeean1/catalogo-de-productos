const service = require("../service/category.service");

async function getCategories(req, res) {
  try {
    const categories = await service.listCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getCategory(req, res) {
  try {
    const category = await service.getCategory(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function postCategory(req, res) {
  try {
    await service.createCategory(req.body);
    res.status(201).json({ message: "Categoría creada" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function putCategory(req, res) {
  try {
    await service.updateCategory(req.params.id, req.body);
    res.json({ message: "Categoría actualizada" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function removeCategory(req, res) {
  try {
    await service.deleteCategory(req.params.id);
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  removeCategory,
};
