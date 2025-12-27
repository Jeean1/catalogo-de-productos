import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

/* ======================
   GET productos (lista)
====================== */
export const getProducts = (params) => api.get("/productos", { params });

/*
params esperados:
{
  page,
  pageSize,
  search,
  idCategoria,
  precioMin,
  precioMax,
  activo,
  sortBy,
  sortDir
}
*/

/* ======================
   GET producto por id
====================== */
export const getProductById = (id) => api.get(`/productos/${id}`);

/* ======================
   POST crear producto
====================== */
export const createProduct = (data) => api.post("/productos", data);

/* ======================
   POST carga masiva
====================== */
export const createProductsBulk = (data) => api.post("/productosMasivo", data);

/* ======================
   PUT actualizar producto
====================== */
export const updateProduct = (id, data) => api.put(`/productos/${id}`, data);

/* ======================
   DELETE producto
====================== */
export const deleteProduct = (id) => api.delete(`/productos/${id}`);
