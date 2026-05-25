import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchProducts = (params = {}) =>
  api.get("/products", { params }).then((r) => r.data);

export const fetchFeatured = () =>
  api.get("/products/featured").then((r) => r.data);

export const fetchCategories = () =>
  api.get("/categories").then((r) => r.data);

export const fetchProductBySlug = (slug) =>
  api.get(`/products/${slug}`).then((r) => r.data);

export const createOrder = (payload) =>
  api.post("/orders", payload).then((r) => r.data);

export const submitContact = (payload) =>
  api.post("/contact", payload).then((r) => r.data);
