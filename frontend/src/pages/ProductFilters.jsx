import { Input, Select, Button } from "antd";
import { useState } from "react";

/* ===============================
   Defaults
================================ */
const DEFAULT_FILTERS = {
  activo: true,
};

export default function ProductFilters({
  onFilter,
  categories,
  categoriesLoading,
}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, marginTop: 35 }}>
      <Input
        placeholder="Buscar producto"
        allowClear
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value || undefined,
          }))
        }
      />

      <Select
        placeholder="Categoría"
        options={categories}
        loading={categoriesLoading}
        allowClear
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            idCategoria: value,
          }))
        }
      />

      <Select
        value={filters.activo}
        style={{ width: 140 }}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            activo: value,
          }))
        }
        options={[
          { value: true, label: "Activo" },
          { value: false, label: "Inactivo" },
        ]}
      />

      <Button type="primary" onClick={() => onFilter(filters)}>
        Filtrar
      </Button>
    </div>
  );
}
