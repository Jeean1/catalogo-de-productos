require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

/* ===============================
   Middlewares base
================================ */
app.use(express.json());
app.use(morgan("tiny"));

/* ===============================
   CORS config
================================ */
const corsOptions = {
  origin: [
    "http://localhost:5173", // Vite
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

/* ===============================
   Routes
================================ */
app.use("/api/productos", require("./routes/product.routes.js"));
app.use("/api/categorias", require("./routes/category.routes.js"));

/* ===============================
   Server
================================ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
