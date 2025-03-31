function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorList = document.getElementById('errorList');
    const strenghtMeter = document.getElementById('passwordStrength');

    errorList.innerHTML = '';
    let errors = [];

    if (password.length < 8) {
        errors.push("La constraseña debe tener al menos 8 caracteres.");
    }

    if (!/\d/.test(password)) {
        errors.push("Debe incluir al menos un número.");
    }
    if (password != confirmPassword) {
        errors.push("Las constraseñas no coinciden.");
    }

    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });

    const strength = calculateStrenght(password);
    strenghtMeter.style.width = `${strength}%`;
    strenghtMeter.style.backgroundColor = strength < 40 ? 'red' : strength < 70 ? 'orange' : 'green';
}

function calculateStrenght(password) {
    let score = 0;
    if (password.length >= 8) score += 30;
    if (/\d/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 30;
    return Math.min(score, 100);
}

function showHelp(elementId, message) {
    const helpElement = document.getElementById(elementId);
    helpElement.textContent = message;
    helpElement.style.visibility = 'visible';
    setTimeout(() => {
        helpElement.style.visibility = 'hidden';
    }, 3000);
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dropArea = document.getElementById('dropArea');
            dropArea.innerHTML =`
                <img src="${e.target.result}" alt="Imagen de perfil" style="max-width: 100%; max-height: 200px; border-radius: 5px;">
                <p>¡Imagen cargada! Arrastra otra para cambiar.</p>
            `;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, arrastra solo imágenes.');
    }
}