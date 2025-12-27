const { pool, sql } = require("../config/db");

async function getProducts(filters) {
  const {
    page,
    pageSize,
    search,
    idCategoria,
    precioMin,
    precioMax,
    activo,
    sortBy,
    sortDir,
  } = filters;

  const request = (await pool).request();

  request
    .input("Page", sql.Int, page)
    .input("PageSize", sql.Int, pageSize)
    .input("Search", sql.NVarChar, search || null)
    .input("IdCategoria", sql.Int, idCategoria || null)
    .input("PrecioMin", sql.Decimal(18, 2), precioMin || null)
    .input("PrecioMax", sql.Decimal(18, 2), precioMax || null)
    .input("Activo", sql.Bit, activo !== undefined ? activo : null)
    .input("SortBy", sql.NVarChar, sortBy)
    .input("SortDir", sql.NVarChar, sortDir);

  const query = `
    WITH ProductosFiltrados AS (
      SELECT
        p.IdProducto,
        p.Nombre,
        p.Descripcion,
        p.Precio,
        p.Stock,
        p.Sku,
        p.Activo,
        p.FechaCreacion,
        p.FechaModificacion,
        c.Nombre AS Categoria,
        COUNT(*) OVER() AS TotalRows
      FROM Productos p
      INNER JOIN Categorias c ON c.IdCategoria = p.IdCategoria
      WHERE
        (@Search IS NULL OR p.Nombre LIKE '%' + @Search + '%')
        AND (@IdCategoria IS NULL OR p.IdCategoria = @IdCategoria)
        AND (@PrecioMin IS NULL OR p.Precio >= @PrecioMin)
        AND (@PrecioMax IS NULL OR p.Precio <= @PrecioMax)
        AND (@Activo IS NULL OR p.Activo = @Activo)
    )
    SELECT *
    FROM ProductosFiltrados
    ORDER BY
      CASE WHEN @SortBy = 'Nombre' AND @SortDir = 'ASC' THEN Nombre END ASC,
      CASE WHEN @SortBy = 'Nombre' AND @SortDir = 'DESC' THEN Nombre END DESC,
      CASE WHEN @SortBy = 'Precio' AND @SortDir = 'ASC' THEN Precio END ASC,
      CASE WHEN @SortBy = 'Precio' AND @SortDir = 'DESC' THEN Precio END DESC,
      CASE WHEN @SortBy = 'FechaCreacion' AND @SortDir = 'ASC' THEN FechaCreacion END ASC,
      CASE WHEN @SortBy = 'FechaCreacion' AND @SortDir = 'DESC' THEN FechaCreacion END DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
  `;

  const result = await request.query(query);

  return result.recordset;
}

async function getProductById(id) {
  const request = (await pool).request();
  request.input("IdProducto", sql.Int, id);

  const query = `
    SELECT
      p.IdProducto,
      p.Nombre,
      p.Descripcion,
      p.Sku,
      p.Precio,
      p.Stock,
      p.Activo,
      p.IdCategoria,
      c.Nombre AS Categoria
    FROM Productos p
    INNER JOIN Categorias c ON c.IdCategoria = p.IdCategoria
    WHERE p.IdProducto = @IdProducto;
  `;

  const result = await request.query(query);
  return result.recordset[0];
}

async function createProduct(data) {
  const request = (await pool).request();

  request
    .input("IdCategoria", sql.Int, data.idCategoria)
    .input("Nombre", sql.NVarChar, data.nombre)
    .input("Descripcion", sql.NVarChar, data.descripcion)
    .input("Sku", sql.NVarChar, data.sku)
    .input("Precio", sql.Decimal(18, 2), data.precio)
    .input("Stock", sql.Int, data.stock);

  const query = `
    INSERT INTO Productos (IdCategoria, Nombre, Descripcion, Sku, Precio, Stock)
    VALUES (@IdCategoria, @Nombre, @Descripcion, @Sku, @Precio, @Stock);
  `;

  await request.query(query);
}

async function updateProduct(id, data) {
  const request = (await pool).request();

  request
    .input("IdProducto", sql.Int, id)
    .input("IdCategoria", sql.Int, data.idCategoria)
    .input("Nombre", sql.NVarChar, data.nombre)
    .input("Descripcion", sql.NVarChar, data.descripcion)
    .input("Sku", sql.NVarChar, data.sku)
    .input("Precio", sql.Decimal(18, 2), data.precio)
    .input("Stock", sql.Int, data.stock)
    .input("Activo", sql.Bit, data.activo);

  const query = `
    UPDATE Productos
    SET
      IdCategoria = @IdCategoria,
      Nombre = @Nombre,
      Descripcion = @Descripcion,
      Sku = @Sku,
      Precio = @Precio,
      Stock = @Stock,
      Activo = @Activo,
      FechaModificacion = SYSDATETIME()
    WHERE IdProducto = @IdProducto;
  `;

  await request.query(query);
}

async function deleteProduct(id) {
  const request = (await pool).request();
  request.input("IdProducto", sql.Int, id);

  const query = `
    UPDATE Productos
    SET Activo = 0,
        FechaModificacion = SYSDATETIME()
    WHERE IdProducto = @IdProducto;
  `;

  await request.query(query);
}

async function skuExists(sku, excludeId = null) {
  const request = (await pool).request();
  request.input("Sku", sql.NVarChar, sku);
  request.input("ExcludeId", sql.Int, excludeId);

  const query = `
    SELECT 1
    FROM Productos
    WHERE Sku = @Sku
      AND (@ExcludeId IS NULL OR IdProducto <> @ExcludeId);
  `;

  const result = await request.query(query);
  return result.recordset.length > 0;
}

module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  skuExists,
  deleteProduct,
};
