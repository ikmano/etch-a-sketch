const colors = (() => {
    function colorToHex(color) {
        let hexadecimal = color.toString(16);
        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    }

    function RGBtoHex(red, green, blue) {
        return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
    }

    function randomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);

        return RGBtoHex(red, green, blue);
    }

    return {
        randomColor,
    }
})();

const drawingModes = (() => {
    function drawBasic(event) {
        event.target.style.opacity = 1;
    }

    function drawShade(event) {
        let opacity = event.target.style.opacity;
        if (opacity === "") opacity = "0.0";

        opacity = parseFloat(opacity);

        if (opacity < 1.0) {
            opacity += 0.1;
            event.target.style.opacity = opacity;
        }
    }

    function drawRandomColor(event, hexColor) {
        event.target.style.opacity = 1;
        event.target.style.background = hexColor;
    }

    function drawRainbow(event) {
        event.target.style.opacity = 1;
        event.target.style.background = colors.randomColor();
    }

    return {
        drawBasic,
        drawShade,
        drawRandomColor,
        drawRainbow,
    }   
})();

const boardFraming = (() => {
    let canvas = document.querySelector('.canvas');    

    function getSquersPerRow() {
        const input = prompt("Enter number of squers per row: (max 100)");
        return input <= 100 ? input : getSquersPerRow();
    }

    function setUpCanvas() {
        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }

        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;
        const perRow = getSquersPerRow();
        const sizeOfSquer = canvasWidth / perRow; // size of squere side
        const perColumn = Math.round(canvasHeight / sizeOfSquer); // number of squers per column
        const numberOfSquers = Math.round(perRow * perColumn); // amount of squers that fit into the canvas

        canvas.style.gridTemplateColumns = "repeat(" + perRow + ", 1fr)";
        canvas.style.gridTemplateRows = "repeat(" + perColumn + ", 1fr)";

        return numberOfSquers;
    }

    function addGridToCanvas(numberOfSquers) {
        for (let i = 0; i < numberOfSquers; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            canvas.appendChild(div);
        }
    }

    function draw() {
        const hex = colors.randomColor();
        const blocks = document.querySelectorAll('.grid');
        blocks.forEach((block) => {
            block.addEventListener('mouseenter', (event) => {
                const mode = document.querySelector('input[name="group"]:checked').value;
                if (mode === 'basic') drawingModes.drawBasic(event);
                if (mode === 'shade') drawingModes.drawShade(event);
                if (mode === 'randomColor') drawingModes.drawRandomColor(event, hex);
                if (mode === 'rainbow') drawingModes.drawRainbow(event);
            });
        });
    }

    function createCanvas(){
        const numberOfSquers = setUpCanvas();
        addGridToCanvas(numberOfSquers);
        draw();
    }

    return {
        createCanvas,
    }
})();

boardFraming.createCanvas();
