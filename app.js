document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate');
    generateBtn.addEventListener('click', generatePalette);

    function generatePalette() {
        const palette = document.getElementById('palette');
        const colors = generateRandomColors(5);

        palette.innerHTML = '';
        colors.forEach(color => {
            const col = document.createElement('div');
            col.className = 'col';
            col.style.backgroundColor = color;
            col.textContent = color;
            palette.appendChild(col);
        });
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
});
