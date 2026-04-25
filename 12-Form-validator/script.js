const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');


let isValid = false;
let passwordsMatch = false;

function validateForm() {
    isValid = form.checkValidity();  // will check AFTER the form is submitted, if the form could be submitted
    // style main message for error
    if (!isValid) {
        message.textContent = 'Please fill out all fields.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;  // dont wanna run the rest of the code then 
    }
    if (password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red'; 
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return; // dont wanna run the rest of the code then
    }
    // If form is valid and passwords match (because form could be valid in terms of thr rules such as character length but passwords still may not match)
    // if (isValid && passwordsMatch) 
    message.textContent = 'Successfully Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
}

// for this to work, we added the 'name' attribute to each input field
function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    };
}

function processFormData(e) {
    e.preventDefault();
    validateForm();
    // store data if valid
    if (isValid && passwordsMatch) {
        storeFormData();
    };
}





// Event listeners
form.addEventListener('submit', processFormData);