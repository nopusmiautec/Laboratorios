class AjaxApp {
    constructor() {
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchInput');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.contactForm = document.getElementById('contactForm');
        this.formResponse = document.getElementById('formResponse');
        
        this.initEvents();
    }
    
    initEvents() {
        this.searchBtn.addEventListener('click', () => this.searchUsers());
        this.contactForm.addEventListener('submit', (e) => this.submitForm(e));
    }
    
    searchUsers() {
        const searchTerm = this.searchInput.value.trim();
        
        if (!searchTerm) {
            this.showAlert('Por favor ingresa un término de búsqueda', 'warning');
            return;
        }

        this.loadingSpinner.classList.remove('d-none');
        this.resultsContainer.innerHTML = '';

        // Petición AJAX al backend
        fetch(`/api/users?q=${encodeURIComponent(searchTerm)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.loadingSpinner.classList.add('d-none');
                this.displayResults(data, searchTerm);
            })
            .catch(error => {
                this.loadingSpinner.classList.add('d-none');
                this.showAlert(`Error al buscar usuarios: ${error.message}`, 'danger');
            });
    }
    
    displayResults(users, searchTerm) {
        if (!users || users.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="alert alert-warning">
                    No se encontraron resultados para "${searchTerm}"
                </div>
            `;
            return;
        }
        
        let html = '<h4 class="mb-3">Resultados:</h4><div class="list-group">';
        
        users.forEach(user => {
            html += `
                <div class="list-group-item">
                    <h5 class="mb-1">${user.name}</h5>
                    <p class="mb-1">${user.email}</p>
                    <small class="text-muted">${user.phone}</small>
                </div>
            `;
        });
        
        html += '</div>';
        this.resultsContainer.innerHTML = html;
    }
    
    submitForm(e) {
        e.preventDefault();
        
        const formData = {
            name: this.contactForm.name.value,
            email: this.contactForm.email.value,
            message: this.contactForm.message.value
        };

        this.showFormResponse('Enviando mensaje...', 'info');

        // Petición AJAX al backend
        fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                this.showFormResponse(data.message, 'success');
                this.contactForm.reset();
            } else {
                this.showFormResponse(data.error, 'danger');
            }
        })
        .catch(error => {
            const message = error.error || 'Error de conexión con el servidor';
            this.showFormResponse(message, 'danger');
        });
    }
    
    showFormResponse(message, type) {
        this.formResponse.classList.remove('d-none', 'alert-info', 'alert-success', 'alert-danger');
        this.formResponse.classList.add(`alert-${type}`);
        
        const icon = type === 'info' ? 'fa-spinner fa-spin' : 
                    type === 'success' ? 'fa-check-circle' : 'fa-times-circle';
        
        this.formResponse.innerHTML = `
            <i class="fas ${icon} me-2"></i>${message}
        `;
    }
    
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.appendChild(alertDiv);
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AjaxApp();
});