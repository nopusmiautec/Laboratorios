class User {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// Datos de ejemplo (simulando una base de datos)
const users = [
    new User(1, 'Juan Pérez', 'juan.perez@example.com', '+1 234 567 890'),
    new User(2, 'María García', 'maria.garcia@example.com', '+1 987 654 321'),
    new User(3, 'Carlos López', 'carlos.lopez@example.com', '+1 555 123 4567'),
    new User(4, 'Ana Martínez', 'ana.martinez@example.com', '+1 888 999 0000'),
    new User(5, 'Pedro Sánchez', 'pedro.sanchez@example.com', '+1 777 666 5555')
];

module.exports = users;