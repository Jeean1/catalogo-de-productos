import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

export const getCategories = () =>
  api.get("/categorias");

export const getCategoryById = (id) =>
  api.get(`/categorias/${id}`);

export const createCategory = (data) =>
  api.post("/categorias", data);

export const updateCategory = (id, data) =>
  api.put(`/categorias/${id}`, data);

export const deleteCategory = (id) =>
  api.delete(`/categorias/${id}`);
