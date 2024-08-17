function validateForm() {
    const inputs = document.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const feedback = document.getElementById(`${input.id}Feedback`);
        if (!input.value) {
            input.classList.add('field-error');
            feedback.textContent = 'This field is required.';
            isValid = false;
        } else {
            input.classList.remove('field-error');
            input.classList.add('field-success');
            feedback.textContent = '';
        }
    });

    return isValid;
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}


function showLoading() {
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = '<div class="spinner"></div> Processing...';
}


function showError(message) {
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = `<div class="error">${message}</div>`;
}


function showSuccess(name, course, email, phone) {
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = `
        <div class="success">
            Thank you, ${name}, for registering for the ${course} course. 
            We will contact you at ${email} or ${phone} soon.
        </div>`;
}


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        showError('Please fill in all fields correctly.');
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;

    if (!validateEmail(email)) {
        document.getElementById('emailFeedback').textContent = 'Please enter a valid email address.';
        return;
    }

    if (!validatePhone(phone)) {
        document.getElementById('phoneFeedback').textContent = 'Please enter a valid 10-digit phone number.';
        return;
    }

    showLoading();

    setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            showSuccess(name, course, email, phone);
            document.getElementById('registrationForm').reset();
        } else {
            showError('An error occurred. Please try again later.');
        }
    }, 2000);
});


document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => {
        validateForm();
    });
});
