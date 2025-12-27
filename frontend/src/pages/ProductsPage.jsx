import { Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/products.api";
import ProductFilters from "./ProductFilters";
import { formatPrice } from "../utils/formatPrice";
import { getCategories } from "../api/categories.api";
import ProductFormModal from "./ProductFormModal";

/* ===============================
   Defaults
================================ */
const DEFAULT_FILTERS = {
  activo: true,
};

export default function ProductsPage() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  /* ===============================
     Fetch
  ================================ */
  const fetchProducts = async ({
    page = pagination.current,
    pageSize = pagination.pageSize,
    sortBy,
    sortDir,
    filters: incomingFilters = {},
  } = {}) => {
    setLoading(true);

    const finalFilters = {
      ...DEFAULT_FILTERS,
      ...filters,
      ...incomingFilters,
    };

    try {
      const res = await getProducts({
        page,
        pageSize,
        ...finalFilters,
        sortBy,
        sortDir,
      });

      setData(res.data.items);
      setPagination((prev) => ({
        ...prev,
        current: res.data.page,
        total: res.data.total,
      }));
    } catch (error) {
      console.error(error);
      message.error("Error cargando productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await getCategories();

      const mappedCategories = res.data.map((c) => ({
        value: c.IdCategoria,
        label: c.Nombre,
      }));

      setCategories(mappedCategories);
    } catch (error) {
      console.error(error);
      message.error("Error obteniendo categorías");
    } finally {
      setCategoriesLoading(false);
    }
  };

  /* ===============================
     Initial load
  ================================ */
  useEffect(() => {
    fetchProducts({ page: 1 });
    fetchCategories();
  }, []);

  /* ===============================
     Table change
  ================================ */
  const handleTableChange = (pager, _, sorter) => {
    fetchProducts({
      page: pager.current,
      pageSize: pager.pageSize,
      sortBy: sorter.field,
      sortDir: sorter.order === "ascend" ? "ASC" : "DESC",
    });
  };

  /* ===============================
     Delete
  ================================ */
  const handleDelete = async (id) => {
    await deleteProduct(id);
    message.success("Producto eliminado");
    fetchProducts();
  };

  /* ===============================
     Columns
  ================================ */
  const columns = [
    { title: "Nombre", dataIndex: "Nombre", sorter: true },
    { title: "Categoría", dataIndex: "Categoria" },
    {
      title: "Precio",
      dataIndex: "Precio",
      sorter: true,
      render: formatPrice,
    },
    { title: "Stock", dataIndex: "Stock" },
    {
      title: "Acciones",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button danger onClick={() => handleDelete(record.IdProducto)}>
            Eliminar
          </Button>

          <Button
            onClick={() => {
              setSelectedProduct(record);
              setModalOpen(true);
            }}
          >
            Editar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ProductFilters
        categories={categories}
        categoriesLoading={categoriesLoading}
        onFilter={(newFilters) => {
          setFilters(newFilters);
          fetchProducts({ page: 1, filters: newFilters });
        }}
      />

      <Button
        type="primary"
        onClick={() => {
          setSelectedProduct(null);
          setModalOpen(true);
        }}
        style={{ margin: "1rem 0", background: "green" }}
      >
        Nuevo producto
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="IdProducto"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ProductFormModal
        open={modalOpen}
        product={selectedProduct}
        categories={categories}
        onClose={() => setModalOpen(false)}
        onSuccess={() => fetchProducts()}
      />
    </>
  );
}
