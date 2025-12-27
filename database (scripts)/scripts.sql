-- =========================
-- DATABASE
-- =========================
CREATE DATABASE CatalogoDB;
GO

USE CatalogoDB;
GO

-- =========================
-- TABLA: Categorias
-- =========================
CREATE TABLE Categorias (
    IdCategoria INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(300) NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FechaModificacion DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE UNIQUE INDEX UX_Categorias_Nombre
ON Categorias(Nombre);

-- =========================
-- TABLA: Productos
-- =========================
CREATE TABLE Productos (
    IdProducto INT IDENTITY(1,1) PRIMARY KEY,
    IdCategoria INT NOT NULL,
    Nombre NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(500) NULL,
    Sku NVARCHAR(50) NULL,
    Precio DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FechaModificacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_Productos_Categorias
        FOREIGN KEY (IdCategoria)
        REFERENCES Categorias(IdCategoria)
);

CREATE UNIQUE INDEX UX_Productos_Sku
ON Productos(Sku)
WHERE Sku IS NOT NULL;

-- Índices para filtros y paginación
CREATE INDEX IX_Productos_Nombre
ON Productos(Nombre);

CREATE INDEX IX_Productos_Categoria
ON Productos(IdCategoria);

CREATE INDEX IX_Productos_Precio
ON Productos(Precio);

CREATE INDEX IX_Productos_Activo_Fecha
ON Productos(Activo, FechaCreacion DESC);
