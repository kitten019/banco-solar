CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
id SERIAL PRIMARY KEY,
emisor INT,
receptor INT,
monto FLOAT,
fecha TIMESTAMP,
FOREIGN KEY (emisor) REFERENCES usuarios(id) ON DELETE CASCADE,
FOREIGN KEY (receptor) REFERENCES usuarios(id) ON DELETE CASCADE
);

--Insertar Datos en la Tabla Usuarios
INSERT INTO usuarios (nombre, balance) VALUES
('Armando Mendoza', 0),
('Anita Vásquez', 50000),
('Fernanda Sandoval ', 22000),
('Diego Sánchez', 60000),
('Yanara Ibañez', 300000);

-- Insertar Datos en la Tabla Transferencias
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES
(2, 1, 10000, '2024-06-20 14:30:00'),
(1, 3, 2000, '2024-06-21 09:15:00'),
(5, 2, 15000, '2024-06-21 10:00:00'),
(4, 1, 12000, '2024-06-21 12:45:00'),
(2, 3, 4500, '2024-06-21 14:00:00');


