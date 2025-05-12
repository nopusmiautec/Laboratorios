-- Suma de cantidades e importe total de entregas en 1997
SELECT SUM(e.Cantidad) AS 'Total Cantidad Entregada',
       SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto/100)) AS 'Importe Total'
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
WHERE YEAR(e.Fecha) = 1997;

-- Entregas por proveedor
SELECT p.RazonSocial AS 'Razón Social',
       COUNT(*) AS 'Número de Entregas',
       SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto/100)) AS 'Importe Total'
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial;

-- Materiales con promedio > 400
SELECT m.Clave, m.Descripcion,
       SUM(e.Cantidad) AS 'Cantidad Total',
       MIN(e.Cantidad) AS 'Mínima Cantidad',
       MAX(e.Cantidad) AS 'Máxima Cantidad',
       SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto/100)) AS 'Importe Total'
FROM Materiales m
JOIN Entregan e ON m.Clave = e.Clave
GROUP BY m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) > 400;

-- Proveedores con promedio >= 500 por material
SELECT p.RazonSocial AS 'Razón Social',
       m.Clave, m.Descripcion,
       AVG(e.Cantidad) AS 'Cantidad Promedio'
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) >= 500;

-- Proveedores con promedio < 370 o > 450
SELECT p.RazonSocial AS 'Razón Social',
       m.Clave, m.Descripcion,
       AVG(e.Cantidad) AS 'Cantidad Promedio',
       CASE 
           WHEN AVG(e.Cantidad) < 370 THEN 'Grupo < 370'
           WHEN AVG(e.Cantidad) > 450 THEN 'Grupo > 450'
       END AS 'Grupo'
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450;

-- Insercion de materiales
INSERT INTO Materiales VALUES (2010, 'Tornillos acero inoxidable', 0.50, 16);
INSERT INTO Materiales VALUES (2020, 'Lámina galvanizada 1/8"', 250.00, 16);
INSERT INTO Materiales VALUES (2030, 'Pintura vinílica blanca', 180.00, 16);
INSERT INTO Materiales VALUES (2040, 'Cemento gris 50 kg', 120.00, 16);
INSERT INTO Materiales VALUES (2050, 'Varilla corrugada #4', 85.00, 16);

-- Materiales nunca entregados
SELECT m.Clave, m.Descripcion
FROM Materiales m
WHERE m.Clave NOT IN (SELECT DISTINCT Clave FROM Entregan);

-- Proveedores que entregaron a 'Vamos México' y 'Querétaro Limpio'
SELECT p.RazonSocial
FROM Proveedores p
WHERE p.RFC IN (
    SELECT e.RFC 
    FROM Entregan e 
    JOIN Proyectos pr ON e.Numero = pr.Numero 
    WHERE pr.Denominacion = 'Vamos México'
)
AND p.RFC IN (
    SELECT e.RFC 
    FROM Entregan e 
    JOIN Proyectos pr ON e.Numero = pr.Numero 
    WHERE pr.Denominacion = 'Querétaro Limpio'
);

-- Materiales no entregados a 'CIT Yucatán'
SELECT m.Descripcion
FROM Materiales m
WHERE m.Clave NOT IN (
    SELECT e.Clave
    FROM Entregan e
    JOIN Proyectos p ON e.Numero = p.Numero
    WHERE p.Denominacion = 'CIT Yucatán'
);

-- Proveedores con promedio > promedio de 'VAGO780901'
SELECT p.RazonSocial, AVG(e.Cantidad) AS 'Promedio Cantidad'
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
GROUP BY p.RFC, p.RazonSocial
HAVING AVG(e.Cantidad) > (
    SELECT AVG(e2.Cantidad)
    FROM Entregan e2
    WHERE e2.RFC = 'VAGO780901'
);

-- Proveedores en 'Infonavit Durango' con más entregas en 2000 que 2001
SELECT p.RFC, p.RazonSocial
FROM Proveedores p
WHERE p.RFC IN (
    SELECT e.RFC
    FROM Entregan e
    JOIN Proyectos pr ON e.Numero = pr.Numero
    WHERE pr.Denominacion = 'Infonavit Durango'
    AND YEAR(e.Fecha) = 2000
    GROUP BY e.RFC
    HAVING SUM(e.Cantidad) > (
        SELECT SUM(e2.Cantidad)
        FROM Entregan e2
        JOIN Proyectos pr2 ON e2.Numero = pr2.Numero
        WHERE pr2.Denominacion = 'Infonavit Durango'
        AND YEAR(e2.Fecha) = 2001
        AND e2.RFC = e.RFC
    )
);