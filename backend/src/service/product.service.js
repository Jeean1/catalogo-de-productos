const repo = require("../repository/product.repository.js");

async function listProducts(query) {
  const filters = {
    page: parseInt(query.page) || 1,
    pageSize: parseInt(query.pageSize) || 10,
    search: query.search,
    idCategoria: query.idCategoria,
    precioMin: query.precioMin,
    precioMax: query.precioMax,
    activo: query.activo === "true" ? true : false,
    sortBy: query.sortBy || "FechaCreacion",
    sortDir: query.sortDir || "DESC",
  };

  const rows = await repo.getProducts(filters);

  return {
    items: rows,
    total: rows.length ? rows[0].TotalRows : 0,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

async function createProduct(data) {
  if (!data.nombre || data.precio <= 0 || !data.idCategoria) {
    throw new Error("Datos inválidos");
  }

  if (data.sku) {
    const exists = await repo.skuExists(data.sku);
    if (exists) {
      throw new Error("El SKU ya existe");
    }
  }

  await repo.createProduct(data);
}

async function getProductById(id) {
  const product = await repo.getProductById(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
}

async function updateProduct(id, data) {
  if (!data.nombre || data.precio <= 0 || !data.idCategoria) {
    throw new Error("Datos inválidos");
  }

  if (data.sku) {
    const exists = await repo.skuExists(data.sku, id);
    if (exists) {
      throw new Error("El SKU ya existe");
    }
  }

  await repo.updateProduct(id, data);
}

async function deleteProduct(id) {
  await repo.deleteProduct(id);
}

module.exports = {
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
};
