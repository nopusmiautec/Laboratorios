const db = require('../util/database');

class Libro {
    static async fetchAll() {
        const conn = await db.getConnection();
        try {
            const rows = await conn.query(`
                SELECT l.*, a.nombre AS autor 
                FROM libros l
                LEFT JOIN autores a ON l.autor_id = a.id
            `);
            
            // Aseguramos que siempre devolvamos un array
            if (Array.isArray(rows)) {
                return rows;
            } else if (rows) { // Si es un solo objeto
                return [rows]; // Lo convertimos a array
            } else {
                return [];
            }
        } finally {
            conn.release();
        }
    }

    static async add(titulo, autor_id, genero, anio) {
        const conn = await db.getConnection();
        try {
            await conn.query(
                'INSERT INTO libros (titulo, autor_id, genero, anio_publicacion) VALUES (?, ?, ?, ?)',
                [titulo, autor_id, genero, anio]
            );
        } finally {
            conn.release();
        }
    }

    static getById(id) {
        return db.query('SELECT * FROM libros WHERE id = ?', [id]);
    }

    static update(id, titulo, autor_id, genero, anio) {
        return db.query(
            'UPDATE libros SET titulo = ?, autor_id = ?, genero = ?, anio_publicacion = ? WHERE id = ?',
            [titulo, autor_id, genero, anio, id]
        );
    }

    static delete(id) {
        return db.query('DELETE FROM libros WHERE id = ?', [id]);
    }
}

module.exports = Libro;