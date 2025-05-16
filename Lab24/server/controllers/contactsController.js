const processContact = (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Simular procesamiento
    setTimeout(() => {
        // Simular éxito/error aleatorio
        const success = Math.random() > 0.2;
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Mensaje recibido correctamente', 
                data: { name, email } 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: 'Error al procesar el mensaje' 
            });
        }
    }, 1000);
};

module.exports = {
    processContact
};