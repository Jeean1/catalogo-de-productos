import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import { useEffect } from "react";
import { createProduct, updateProduct } from "../api/products.api";

export default function ProductFormModal({
  open,
  onClose,
  onSuccess,
  product = null,
  categories = [],
}) {
  const [form] = Form.useForm();

  const isEdit = Boolean(product);

  /* ===============================
     Load data when editing
  ================================ */
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        nombre: product.Nombre,
        descripcion: product.Descripcion,
        precio: product.Precio,
        stock: product.Stock,
        sku: product.Sku,
        idCategoria: product.IdCategoria,
        activo: product.Activo,
      });
    } else {
      form.resetFields();
    }
  }, [product, form]);

  /* ===============================
     Submit
  ================================ */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        await updateProduct(product.IdProducto, values);
        message.success("Producto actualizado");
      } else {
        await createProduct(values);
        message.success("Producto creado");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      title={isEdit ? "Editar producto" : "Crear producto"}
      okText={isEdit ? "Guardar cambios" : "Crear"}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ Activo: true }}>
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Descripción" name="descripcion">
          <Input.TextArea rows={3} value={product?.Descripcion} />
        </Form.Item>

        <Form.Item
          label="Categoría"
          name="idCategoria"
          rules={[{ required: true, message: "Seleccione una categoría" }]}
        >
          <Select
            placeholder={`${product?.Categoria}`}
            options={categories.map((c) => ({
              value: c.value,
              label: c.label,
            }))}
          />
        </Form.Item>

        <Form.Item label="Precio" name="precio" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item label="Sku" name="sku">
          <Input.TextArea rows={1} />
        </Form.Item>

        <Form.Item label="Activo" name="activo">
          <Select
            options={[
              { value: true, label: "Activo" },
              { value: false, label: "Inactivo" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
