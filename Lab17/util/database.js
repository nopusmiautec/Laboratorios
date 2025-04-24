const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "local",
    connectionLimit:5,
    database: "lab17"
});
module.exports = pool;