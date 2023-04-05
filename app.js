document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate');
    generateBtn.addEventListener('click', () => {
        const numColors = document.getElementById('palette').querySelectorAll('.col').length;
        generateColors(numColors);
    });
    generateColors(5);


    function generatePalette(colors, preserveLocked = false) {
        const palette = document.getElementById('palette');
            
        const newPalette = document.createElement('div');
        newPalette.className = 'row mt-4';
    
        colors.forEach((color, index) => {
            const existingCol = palette.querySelector(`.col[data-index="${index}"]`);
    
            if (existingCol && existingCol.getAttribute('data-locked') === "true") {
                const lockedCol = existingCol.cloneNode(true);
                lockedCol.addEventListener('click', toggleLockedState);
                lockedCol.querySelector('.lock-btn').addEventListener('click', toggleLockButton);
                lockedCol.querySelector('.trash-btn').addEventListener('click', removeColor);
                newPalette.appendChild(lockedCol);
                return;
            }
    
            const col = document.createElement('div');
            col.className = 'col';
            col.style.backgroundColor = color;
            col.textContent = color;
            col.dataset.index = index;
            col.addEventListener('click', toggleLockedState);
    
            const lockBtn = document.createElement('img');
            lockBtn.src = 'fa-lock.svg';
            lockBtn.className = 'lock-btn';
            lockBtn.addEventListener('click', toggleLockButton);
    
            const trashBtn = document.createElement('img');
            trashBtn.src = 'fa-trash-can.svg';
            trashBtn.className = 'trash-btn';
            trashBtn.addEventListener('click', removeColor);
    
            col.appendChild(lockBtn);
            col.appendChild(trashBtn);
            newPalette.appendChild(col);
        });
    
        palette.replaceWith(newPalette);
        newPalette.id = 'palette';
    
        function toggleLockedState(event) {
            const col = event.currentTarget;
            if (col.getAttribute('data-locked') === "true") {
                col.removeAttribute('data-locked');
                col.querySelector('.lock-btn').style.opacity = '0';
            } else {
                col.setAttribute('data-locked', 'true');
                col.querySelector('.lock-btn').style.opacity = '1';
            }
        }
    
        function toggleLockButton(event) {
            event.stopPropagation();
            const lockBtn = event.currentTarget;
            const col = lockBtn.parentElement;
            if (col.getAttribute('data-locked') === "true") {
                col.removeAttribute('data-locked');
                lockBtn.style.opacity = '0';
            } else {
                col.setAttribute('data-locked', 'true');
                lockBtn.style.opacity = '1';
            }
        }
    }
    
    function generateColors(numColors) {
        const palette = document.getElementById('palette');
        const lockedColors = Array.from(palette.querySelectorAll('.col[data-locked="true"]')).map(col => col.textContent);

        const newColors = generateRandomColors(numColors || palette.querySelectorAll('.col').length - lockedColors.length);
        const colors = [];

        let lockedIndex = 0;
        let newIndex = 0;

        for (let i = 0; i < numColors; i++) {
            const existingCol = palette.querySelector(`.col[data-index="${i}"]`);
            if (existingCol && lockedColors.includes(existingCol.textContent)) {
                colors.push(lockedColors[lockedIndex++]);
            } else {
                colors.push(newColors[newIndex++]);
            }
        }

        generatePalette(colors); // Moved this line here
        return colors;
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

    function removeColor(event) {
        event.stopPropagation();
        const col = event.currentTarget.parentElement;
        col.remove();
    }

    document.getElementById('add-color').addEventListener('click', function () {
        const numColors = document.getElementById('palette').querySelectorAll('.col').length;
        generateColors(numColors + 1);
    });
    
});
