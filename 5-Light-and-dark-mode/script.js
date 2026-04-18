const toggleSwitch = document.querySelector('input[type="checkbox"]');

// switch theme dynamically 
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');  // setting dark mode to the highest level element
    } else {
        document.documentElement.setAttribute('data-theme', 'light');  // setting light mode to the highest level element
    }
}

// event listener
toggleSwitch.addEventListener('change', switchTheme);