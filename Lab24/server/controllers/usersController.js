const users = require('../models/User');

const searchUsers = (req, res) => {
    const searchTerm = req.query.q || '';
    
    if (!searchTerm) {
        return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda' });
    }

    // Simular un retraso de red
    setTimeout(() => {
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        res.json(filteredUsers);
    }, 800); // Retraso intencional para demostrar AJAX
};

module.exports = {
    searchUsers
};