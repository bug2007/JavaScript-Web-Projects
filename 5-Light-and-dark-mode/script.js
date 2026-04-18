const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// dark or light images
function imageMode(color) {
    image1.src = `images/undraw_proud_coder_${color}.svg`;
    image2.src = `images/undraw_feeling_proud_${color}.svg`;
    image3.src = `images/undraw_conceptual_idea_${color}.svg`;
}

// dark mode styles
function darkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
}

function lightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    image1.src = 'images/undraw_proud_coder_light.svg';
    image2.src = 'images/undraw_feeling_proud_light.svg';
    image3.src = 'images/undraw_conceptual_idea_light.svg';
    imageMode('light');
}

// switch theme dynamically 
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');  // setting dark mode to the highest level element. same as doing <html data-theme="dark">
        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');  // setting light mode to the highest level element. falls back to :root
        lightMode();
    }
}

// event listener
toggleSwitch.addEventListener('change', switchTheme);