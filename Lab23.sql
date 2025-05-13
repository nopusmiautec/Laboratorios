CREATE PROCEDURE TC2005B_DB.p1()
BEGIN
	SELECT 
  SUM(E.Cantidad) AS TotalCantidad,
  SUM(E.Cantidad * M.precio * (1 + M.Impuesto)) AS ImporteTotal
FROM Entregan E
JOIN Materiales M ON E.Clave = M.Clave
WHERE YEAR(E.Fecha) = 1997;

END


CREATE PROCEDURE TC2005B_DB.p2(IN fecha INT)
BEGIN
    -- Consulta que calcula el total de cantidades e importe de entregas para el año especificado
    SELECT 
        SUM(e.Cantidad) AS 'Total Cantidad Entregada',
        SUM(e.Cantidad * m.Precio * (1 + m.PorcentajeImpuesto/100)) AS 'Importe Total'
    FROM Entregan e
    JOIN Materiales m ON e.Clave = m.Clave
    WHERE YEAR(e.Fecha) = fecha;
END

CREATE PROCEDURE TC2005B_DB.p3(IN p_rfc VARCHAR(13))
BEGIN
	-- Consulta los materiales entregados por un proveedor específico
    SELECT 
        m.Clave,
        m.Descripcion,
        SUM(e.Cantidad) AS 'CantidadTotalEntregada',
        COUNT(*) AS 'VecesEntregado'
    FROM Materiales m
    JOIN Entregan e ON m.Clave = e.Clave
    WHERE e.RFC = p_rfc
    GROUP BY m.Clave, m.Descripcion
    ORDER BY CantidadTotalEntregada DESC;
END