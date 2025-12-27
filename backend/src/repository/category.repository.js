const { pool, sql } = require('../config/db');

async function getCategories() {
  const request = (await pool).request();

  const query = `
    SELECT
      IdCategoria,
      Nombre,
      Descripcion,
      Activo,
      FechaCreacion,
      FechaModificacion
    FROM Categorias
    WHERE Activo = 1
    ORDER BY Nombre;
  `;

  const result = await request.query(query);
  return result.recordset;
}

async function getCategoryById(id) {
  const request = (await pool).request();
  request.input('IdCategoria', sql.Int, id);

  const query = `
    SELECT *
    FROM Categorias
    WHERE IdCategoria = @IdCategoria;
  `;

  const result = await request.query(query);
  return result.recordset[0];
}

async function createCategory(data) {
  const request = (await pool).request();

  request
    .input('Nombre', sql.NVarChar, data.nombre)
    .input('Descripcion', sql.NVarChar, data.descripcion);

  const query = `
    INSERT INTO Categorias (Nombre, Descripcion)
    VALUES (@Nombre, @Descripcion);
  `;

  await request.query(query);
}

async function updateCategory(id, data) {
  const request = (await pool).request();

  request
    .input('IdCategoria', sql.Int, id)
    .input('Nombre', sql.NVarChar, data.nombre)
    .input('Descripcion', sql.NVarChar, data.descripcion);

  const query = `
    UPDATE Categorias
    SET
      Nombre = @Nombre,
      Descripcion = @Descripcion,
      FechaModificacion = SYSDATETIME()
    WHERE IdCategoria = @IdCategoria;
  `;

  await request.query(query);
}

async function deleteCategory(id) {
  const request = (await pool).request();
  request.input('IdCategoria', sql.Int, id);

  const query = `
    UPDATE Categorias
    SET Activo = 0,
        FechaModificacion = SYSDATETIME()
    WHERE IdCategoria = @IdCategoria;
  `;

  await request.query(query);
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
