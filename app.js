document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate');
    generateBtn.addEventListener('click', generatePalette);
    generatePalette();

    function generatePalette() {
        const palette = document.getElementById('palette');
        const colors = generateRandomColors(5);
    
        if (palette.childElementCount === 0) {
            colors.forEach((color, index) => {
                const col = document.createElement('div');
                col.className = 'col';
                col.style.backgroundColor = color;
                col.textContent = color;
                col.dataset.index = index;
                col.addEventListener('click', function () {
                    if (col.getAttribute('data-locked') === "true") {
                        col.removeAttribute('data-locked');
                    } else {
                        col.setAttribute('data-locked', 'true');
                    }
                });
                palette.appendChild(col);
            });
        } else {
            const cols = palette.querySelectorAll('.col');
            cols.forEach((col, index) => {
                if (col.getAttribute('data-locked') !== "true") {
                    const newColor = colors[index];
                    col.style.backgroundColor = newColor;
                    col.textContent = newColor;
                }
            });
        }
    }
    

    function generateRandomColors(num) {
        const colors = [];
        for (let i = 0; i < num; i++) {
            colors.push(getRandomColor());
        }
        return colors;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Color copied to clipboard: ' + text);
    }
});
