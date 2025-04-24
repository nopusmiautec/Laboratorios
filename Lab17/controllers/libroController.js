const Libro = require('../models/Libro');
const Autor = require('../models/Autor');
const db = require('../util/database')

exports.getLibros = async (req, res) => {
    try {
        const libros = await Libro.fetchAll();
        
        console.log('Libros después de fetchAll:', libros);
        console.log('Tipo:', typeof libros);
        console.log('Es array?', Array.isArray(libros));
        console.log('Cantidad:', libros.length);
        
        res.render('libros', {
            libros: libros,
            pageTitle: 'Todos los Libros'
        });
    } catch (err) {
        console.error('Error completo:', err);
        res.status(500).render('error', {
            message: 'Error al cargar libros',
            error: err
        });
    }
};

exports.getAddLibro = async (req, res) => {
    try {
        const autores = await Autor.fetchAll();
        
        // Debug avanzado
        console.log('Tipo de autores:', typeof autores);
        console.log('Es array?', Array.isArray(autores));
        console.log('Contenido:', autores);

        if (!Array.isArray(autores)) {
            throw new Error(`Autores no es array. Tipo: ${typeof autores}. Valor: ${JSON.stringify(autores)}`);
        }

        res.render('add-libro', {
            autores: autores,
            pageTitle: 'Agregar Libro'
        });
    } catch (err) {
        console.error('Error completo:', err);
        res.status(500).render('error', {
            message: 'Error al cargar autores',
            error: {
                stack: err.stack,
                message: err.message,
                raw: err  // Mostramos el error completo
            }
        });
    }
};

exports.postAddLibro = async (req, res) => {
    const { titulo, autor_existente, nuevo_autor, genero, anio } = req.body;
    
    try {
        let autorId = autor_existente;
        
        // Si se proporciona un nuevo autor
        if (nuevo_autor && !autor_existente) {
            const conn = await db.getConnection();
            try {
                const result = await conn.query(
                    'INSERT INTO autores (nombre) VALUES (?)', 
                    [nuevo_autor]
                );
                autorId = result.insertId; // Accedemos directamente al insertId
            } finally {
                conn.release();
            }
        }

        // Insertar el libro
        await Libro.add(titulo, autorId, genero, anio);
        res.redirect('/libros');
        
    } catch (err) {
        console.error("Error detallado:", err);
        res.status(500).render('error', {
            message: 'Error al guardar el libro',
            error: {
                message: err.message,
                stack: err.stack,
                raw: err
            }
        });
    }
};