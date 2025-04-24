const db = require('../util/database');

class Autor {
    static async fetchAll() {
        try {
            const conn = await db.getConnection();
            const [rows] = await conn.query('SELECT id, nombre FROM autores');
            conn.release();
            
            if (!rows) return [];
            return Array.isArray(rows) ? rows : [rows];
        } catch (err) {
            console.error('Error en fetchAll:', err);
            return [];
        }
    }
}

module.exports = Autor;