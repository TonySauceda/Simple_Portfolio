const form = document.querySelector('form');
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    console.log(input)
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else if (field.type === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email';
    } else if (field.type === 'tel' && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    showMessage(field, isValid, errorMessage);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
}

function showMessage(field, isValid, message) {
    let errorDiv = field.parentElement.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentElement.appendChild(errorDiv);
    }

    if (!isValid) {
        errorDiv.textContent = message;
        field.classList.add('invalid');
    } else {
        errorDiv.textContent = '';
        field.classList.remove('invalid');
    }
}