-- Tabla Anuncios
CREATE TABLE Anuncios (
    ID_Anuncio SERIAL PRIMARY KEY,
    Producto VARCHAR(255),
    Descripcion TEXT,
    Precio DECIMAL(10,2),
    Categoria VARCHAR(255),
    Zona_Geografica VARCHAR(255),
    Gasto_Envio_Incluido BOOLEAN,
    ID_Vendedor INT REFERENCES Usuarios(ID),
    Fecha_Anuncio TIMESTAMP
);