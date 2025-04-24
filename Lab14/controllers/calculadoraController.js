exports.inicio = (req, res) => {
    // Configurar una cookie de visita
    if (!req.cookies.visita) {
        res.cookie('visita', '1', { maxAge: 86400000, httpOnly: true }); // Cookie válida por 1 día
    } else {
        const visitas = parseInt(req.cookies.visita) + 1;
        res.cookie('visita', visitas.toString(), { maxAge: 86400000, httpOnly: true });
    }
    
    // Respuestas a las preguntas
    const preguntas = {
        pregunta1: "¿Qué beneficios encuentras en el estilo MVC?",
        respuesta1: "MVC ofrece separación de preocupaciones, facilitando el mantenimiento y escalabilidad. Permite la reutilización de código, trabajo en equipo más eficiente (diferentes desarrolladores pueden trabajar en modelo, vista y controlador simultáneamente), y una estructura clara que sigue la mayoría de frameworks modernos.",
        pregunta2: "¿Encuentras alguna desventaja en el estilo arquitectónico MVC?",
        respuesta2: "Puede resultar en un exceso de código para proyectos pequeños (overhead), la comunicación entre componentes puede volverse compleja en aplicaciones grandes, y existe un riesgo de que los controladores se conviertan en 'clases Dios' que hacen demasiado, rompiendo el principio de responsabilidad única."
    };
    
    res.render('inicio', { 
        title: 'Calculadora con Sesiones', 
        preguntas: preguntas,
        visitas: req.cookies.visita || '1',
        resultado: req.session.resultado,
        historial: req.session.historial || []
    });
};

exports.calcular = (req, res) => {
    const { num1, num2, operacion } = req.body;
    let resultado;
    
    // Validar que los números sean válidos
    if (isNaN(num1) || isNaN(num2)) {
        resultado = "Error: Ingrese números válidos";
    } else {
        // Realizar operación
        switch(operacion) {
            case 'suma':
                resultado = parseFloat(num1) + parseFloat(num2);
                break;
            case 'resta':
                resultado = parseFloat(num1) - parseFloat(num2);
                break;
            case 'multiplicacion':
                resultado = parseFloat(num1) * parseFloat(num2);
                break;
            case 'division':
                resultado = num2 != 0 ? parseFloat(num1) / parseFloat(num2) : "Error: División por cero";
                break;
            case 'potencia':
                resultado = Math.pow(parseFloat(num1), parseFloat(num2));
                break;
            case 'raiz':
                resultado = num1 >= 0 ? Math.sqrt(parseFloat(num1)) : "Error: Raíz de número negativo";
                break;
            default:
                resultado = "Operación no válida";
        }
    }
    
    // Guardar resultado en sesión
    req.session.resultado = resultado;
    
    // Guardar en historial (máximo 5 operaciones)
    if (typeof resultado === 'number') {
        const operacionTexto = `${num1} ${getOperador(operacion)} ${operacion !== 'raiz' ? num2 : ''} = ${resultado}`;
        req.session.historial = req.session.historial || [];
        req.session.historial.unshift(operacionTexto);
        if (req.session.historial.length > 5) {
            req.session.historial.pop();
        }
    }
    
    res.redirect('/');
};

exports.limpiar = (req, res) => {
    req.session.resultado = null;
    req.session.historial = [];
    res.redirect('/');
};

function getOperador(operacion) {
    switch(operacion) {
        case 'suma': return '+';
        case 'resta': return '-';
        case 'multiplicacion': return '*';
        case 'division': return '/';
        case 'potencia': return '^';
        case 'raiz': return '√';
        default: return '';
    }
}