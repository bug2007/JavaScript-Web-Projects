const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

let countdownTitle = '';
let countdownDate = '';

// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// take values from form input
function updateCountdown(e) {
    e.preventDefault(); // prevents from refreshing the page on submitting the form
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);