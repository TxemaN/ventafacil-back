-- Tabla Usuarios
CREATE TABLE Usuarios (
    Uid_Firebase VARCHAR(255) UNIQUE,
    iD SERIAL PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellidos VARCHAR(100),
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    Rol VARCHAR(10) DEFAULT 'user',
    Contacto VARCHAR(50),
    Provincia VARCHAR(255),
    Ciudad VARCHAR(255),
    Fecha TIMESTAMP DEFAULT NOW()
);
-- Tabla Anuncios
CREATE TABLE Anuncios (
    ID_Anuncio SERIAL PRIMARY KEY,
    Producto VARCHAR(100),
    Descripcion TEXT,
    Precio DECIMAL(10,2),
    Categoria VARCHAR(50),
    Zona_Geografica VARCHAR(255),
    ID_Vendedor VARCHAR(255),
    Fecha_Anuncio TIMESTAMP DEFAULT NOW(),
    Ruta_foto VARCHAR(255),
    Precio_Stripe VARCHAR(255),
    Producto_Stripe VARCHAR(255),
    Producto_Latitude VARCHAR(255),
   Producto_Longitude VARCHAR(255),
   Nombre_Vendedor VARCHAR(255),
   Enlace_Pago VARCHAR(255)

);
-- Tabla Transacciones
CREATE TABLE Transacciones (
    ID_Transaccion SERIAL PRIMARY KEY,
    ID_Comprador INT REFERENCES Usuarios(ID),
    ID_Anuncio INT REFERENCES Anuncios(ID_Anuncio),
    Fecha_Transaccion TIMESTAMP DEFAULT NOW()
);
-- Tabla Historial_Compras
CREATE TABLE Historial_Compras (
    ID_Historial SERIAL PRIMARY KEY,
    ID_Comprador INT REFERENCES Usuarios(ID),
    ID_Anuncio INT REFERENCES Anuncios(ID_Anuncio),
    Fecha_Compra TIMESTAMP DEFAULT NOW()
);
-- Tabla Historial_Ventas
CREATE TABLE Historial_Ventas (
    ID_Historial SERIAL PRIMARY KEY,
    ID_Vendedor INT REFERENCES Usuarios(ID),
    ID_Anuncio INT REFERENCES Anuncios(ID_Anuncio),
    Fecha_Venta TIMESTAMP DEFAULT NOW()
);
CREATE TABLE Categorias (
    ID_Categoria SERIAL PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion VARCHAR(255),
    Ruta_Foto VARCHAR(255),
);

-- Tabla Categorias

CREATE TABLE Categorias (
    ID_Categoria SERIAL PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion VARCHAR(255),
    Ruta_Foto VARCHAR(255)
)



----------------------

INSERT INTO Usuarios (Nombre, Apellidos, Username, Email, Rol, Contacto, Provincia, Ciudad)
VALUES
('Juan','Perez','juanperez','juan.perez@example.com','Usuario','123456789','Madrid','Madrid'),
('Maria','Gomez','mariagomez','maria.gomez@example.com','Usuario','987654321','Barcelona','Barcelona'),
('Carlos','Rodriguez','carlosrodriguez','carlos.rodriguez@example.com','Administrador','654987321','Sevilla','Sevilla'),
('Ana','Martinez','anamartinez','ana.martinez@example.com','Usuario','321654987','Valencia','Valencia'),
('Jose','Lopez','joselopez','jose.lopez@example.com','Usuario','159357456','Málaga','Málaga'),
('Marta','Sanchez','martasanchez','marta.sanchez@example.com','Usuario','753951456','Cádiz','Cádiz');


INSERT INTO Anuncios (Producto, Descripcion, Precio, Categoria, Zona_Geografica, Gasto_Envio_Incluido, ID_Vendedor, Fecha_Anuncio)
VALUES
('Producto 1', 'Descripción del Producto 1', 100.00, 'Categoria 1', 'Region 1', true, 1, '2023-09-22 10:30:00'),
('Producto 2', 'Descripción del Producto 2', 200.00, 'Categoria 2', 'Region 2', false, 2, '2023-09-22 10:45:00'),
('Producto 3', 'Descripción del Producto 3', 300.00, 'Categoria 3', 'Region 3', true, 3, '2023-09-22 11:00:00'),
('Producto 4', 'Descripción del Producto 4', 400.00, 'Categoria 4', 'Region 4', false, 4, '2023-09-22 11:15:00'),
('Producto 5', 'Descripción del Producto 5', 500.00, 'Categoria 5', 'Region 5', true, 5, '2023-09-22 11:30:00'),
('Producto 6', 'Descripción del Producto 6', 600.00, 'Categoria 6', 'Region 6', false, 6, '2023-09-22 11:45:00'),
('Producto 7', 'Descripción del Producto 7', 700.00, 'Categoria 7', 'Region 7', true, 1, '2023-09-22 12:00:00'),
('Producto 8', 'Descripción del Producto 8', 800.00, 'Categoria 8', 'Region 8', false, 2, '2023-09-22 12:15:00'),
('Producto 9', 'Descripción del Producto 9', 900.00, 'Categoria 9', 'Region 9', true, 3, '2023-09-22 12:30:00'),
('Producto 10', 'Descripción del Producto 10', 1000.00, 'Categoria 10', 'Region 10', false, 4, '2023-09-22 12:45:00'),
('Producto 11', 'Descripción del Producto 11', 1100.00, 'Categoria 11', 'Region 11', true, 5, '2023-09-22 13:00:00'),
('Producto 12', 'Descripción del Producto 12', 1200.00, 'Categoria 12', 'Region 12', false, 6, '2023-09-22 13:15:00'),
('Producto 13', 'Descripción del Producto 13', 1300.00, 'Categoria 13', 'Region 13', true, 1, '2023-09-22 13:30:00'),
('Producto 14', 'Descripción del Producto 14', 1400.00, 'Categoria 14', 'Region 14', false, 2, '2023-09-22 13:45:00'),
('Producto 15', 'Descripción del Producto 15', 1500.00, 'Categoria 15', 'Region 15', true, 3, '2023-09-22 14:00:00'),
('Producto 16', 'Descripción del Producto 16', 1600.00, 'Categoria 16', 'Region 16', false, 4, '2023-09-22 14:15:00'),
('Producto 17', 'Descripción del Producto 17', 1700.00, 'Categoria 17', 'Region 17', true, 5, '2023-09-22 14:30:00'),
('Producto 18', 'Descripción del Producto 18', 1800.00, 'Categoria 18', 'Region 18', false, 6, '2023-09-22 14:45:00'),
('Producto 19', 'Descripción del Producto 19', 1900.00, 'Categoria 19', 'Region 19', true, 1, '2023-09-22 15:00:00'),
('Producto 20', 'Descripción del Producto 20', 2000.00, 'Categoria 20', 'Region 20', false, 2, '2023-09-22 15:15:00');










