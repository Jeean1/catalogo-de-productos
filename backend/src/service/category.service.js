const repo = require("../repository/category.repository.js");

async function listCategories() {
  return await repo.getCategories();
}

async function getCategory(id) {
  const category = await repo.getCategoryById(id);
  if (!category) throw new Error("Categoría no encontrada");
  return category;
}

async function createCategory(data) {
  if (!data.nombre) {
    throw new Error("Nombre es obligatorio");
  }
  await repo.createCategory(data);
}

async function updateCategory(id, data) {
  if (!data.nombre) {
    throw new Error("Nombre es obligatorio");
  }
  await repo.updateCategory(id, data);
}

async function deleteCategory(id) {
  await repo.deleteCategory(id);
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
