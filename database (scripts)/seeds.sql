USE CatalogoDB;
GO

-- =========================
-- SEED CATEGORIAS
-- =========================
INSERT INTO Categorias (Nombre, Descripcion)
VALUES
('Tecnología', 'Productos tecnológicos'),
('Hogar', 'Artículos para el hogar'),
('Oficina', 'Productos de oficina');

-- =========================
-- SEED PRODUCTOS
-- =========================
INSERT INTO Productos (IdCategoria, Nombre, Descripcion, Sku, Precio, Stock)
VALUES
(1, 'Teclado Mecánico', 'Teclado mecánico RGB', 'TEC-001', 350000, 25),
(1, 'Mouse Inalámbrico', 'Mouse ergonómico', 'TEC-002', 120000, 40),
(1, 'Monitor 27"', 'Monitor 4K UHD', 'TEC-003', 1800000, 10),

(2, 'Licuadora', 'Licuadora 600W', 'HOG-001', 250000, 15),
(2, 'Aspiradora', 'Aspiradora sin bolsa', 'HOG-002', 420000, 8),

(3, 'Silla Ergonómica', 'Silla para oficina', 'OFI-001', 980000, 12),
(3, 'Escritorio', 'Escritorio ajustable', 'OFI-002', 1500000, 5);



-- =========================
-- SEED PRODUCTOS EXTRA (20)
-- =========================
INSERT INTO Productos (IdCategoria, Nombre, Descripcion, Sku, Precio, Stock)
VALUES
-- Tecnología
(1, 'Audífonos Bluetooth', 'Audífonos inalámbricos con micrófono', 'TEC-004', 220000, 30),
(1, 'Webcam HD', 'Cámara web 1080p', 'TEC-005', 180000, 18),
(1, 'Disco SSD 1TB', 'Unidad de estado sólido 1TB', 'TEC-006', 520000, 20),
(1, 'Router WiFi 6', 'Router inalámbrico alta velocidad', 'TEC-007', 480000, 14),
(1, 'Teclado Inalámbrico', 'Teclado slim Bluetooth', 'TEC-008', 160000, 35),
(1, 'Mouse Gamer', 'Mouse RGB 7200 DPI', 'TEC-009', 210000, 22),
(1, 'Monitor 24"', 'Monitor Full HD', 'TEC-010', 980000, 9),

-- Hogar
(2, 'Cafetera Eléctrica', 'Cafetera programable', 'HOG-003', 310000, 12),
(2, 'Horno Eléctrico', 'Horno 30 litros', 'HOG-004', 650000, 7),
(2, 'Plancha a Vapor', 'Plancha con vapor continuo', 'HOG-005', 190000, 20),
(2, 'Ventilador', 'Ventilador de pedestal', 'HOG-006', 230000, 16),
(2, 'Freidora de Aire', 'Air fryer 4L', 'HOG-007', 520000, 11),
(2, 'Calentador Eléctrico', 'Calentador portátil', 'HOG-008', 280000, 10),

-- Oficina
(3, 'Lámpara de Escritorio', 'Lámpara LED regulable', 'OFI-003', 145000, 28),
(3, 'Archivador Metálico', 'Archivador de 3 gavetas', 'OFI-004', 620000, 6),
(3, 'Soporte para Monitor', 'Soporte ergonómico ajustable', 'OFI-005', 175000, 19),
(3, 'Reposapiés', 'Reposapiés ergonómico', 'OFI-006', 130000, 25),
(3, 'Pizarra Blanca', 'Pizarra magnética', 'OFI-007', 210000, 13),
(3, 'Silla Visitante', 'Silla para sala de espera', 'OFI-008', 340000, 8);
