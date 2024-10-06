function toggleDarkMode() {
    const body = document.body;
    const darkModeClass = 'dark-mode';

    body.classList.toggle(darkModeClass);

    const elements = document.querySelectorAll('*');

    elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const bgColor = computedStyle.backgroundColor;
        const color = computedStyle.color;

        if (body.classList.contains(darkModeClass)) {
            // If  light monochromatic color
            if (isLightMonochrome(bgColor)) {
                element.dataset.originalBgColor = bgColor;
                element.style.backgroundColor = '#1e1e1e';
            }
            // If  light monochromatic color
            if (isLightMonochrome(color)) {
                element.dataset.originalColor = color;
                element.style.color = '#ffffff'; 
            }
        } else {
            // Restore original colors
            if (element.dataset.originalBgColor) {
                element.style.backgroundColor = element.dataset.originalBgColor;
                delete element.dataset.originalBgColor;
            }
            if (element.dataset.originalColor) {
                element.style.color = element.dataset.originalColor;
                delete element.dataset.originalColor;
            }
        }
    });
}

function isLightMonochrome(color) {
    if (!color) return false;
    const rgb = color.match(/\d+/g);
    if (!rgb) return false;
    const [r, g, b] = rgb.map(Number);
    const average = (r + g + b) / 3;
    const threshold = 230;  // threshold
    return Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && average > threshold;
}

document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);