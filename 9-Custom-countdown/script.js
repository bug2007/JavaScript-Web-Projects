const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');  // returns an arr of all span elements

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; // a date obj

// all r in milliseconds
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown
function updateDOM() {
    const now = new Date().getTime();
    const distance = countdownValue - now; // in milliseconds

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // populate countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    inputContainer.hidden = true;
    countdownEl.hidden = false;
}


// take values from form input
function updateCountdown(e) {
    e.preventDefault(); // prevents from refreshing the page on submitting the form
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // get number verson of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();  // milliseconds since Jan 1, 1970
    updateDOM();
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);