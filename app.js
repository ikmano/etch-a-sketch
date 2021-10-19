//color converter
function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }
  
  function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

//function to get and validate user input
function userInput(){
    const input = prompt("Enter number of squers per row: (max 100)");
    if(input < 101) return input;
    else return userInput();
}
function randomColor(){
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return ConvertRGBtoHex(red,green,blue);
}
//drawing mode functions
function drawBasic(e){
    e.target.style.opacity = 1;
}
function drawShade(e){
    let opacity = e.target.style.opacity;
        if(opacity === ""){
            opacity = "0.0";
        }
        opacity = parseFloat(opacity);
        if(opacity < 1.0){
            opacity += 0.1;
            e.target.style.opacity = opacity;
        }
}
function drawRandomCol(e, hex){
    e.target.style.opacity = 1;
    e.target.style.background = hex;
}
function drawRainbow(e){
    e.target.style.opacity = 1;
    e.target.style.background = randomColor();
}
//function allows drawing into canvas
function draw(){
    const hex = randomColor();
    const blocks = document.querySelectorAll('.grid');
    blocks.forEach((block) =>{
        block.addEventListener('mouseenter', (e) =>{
            const mode = document.querySelector('input[name="group"]:checked').value;
            if(mode === 'basic')drawBasic(e);
            if(mode === 'shade')drawShade(e);
            if(mode === 'randomColor')drawRandomCol(e, hex);
            if(mode === 'rainbow')drawRainbow(e);
        });
    }); 
}

//function generates grid
function grid(squers){
    for(let i = 0; i < squers; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        canvas.appendChild(div);
    }
    draw();
}

function createGrid(){
    let div = document.getElementById('canvas');         
        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
    const perRow = userInput(); //number of squers per row
    const x = 960 / perRow; //size of squere side, canvas has a fixed width of 960px
    const canvas = document.querySelector('.canvas');
    const canvasHeight = canvas.offsetHeight;
    const perColumn = Math.round(canvasHeight / x); //number of squers per column
    const squers = Math.round(perRow*perColumn); //amount of squers that fit into canvas
    document.getElementById('canvas').style.gridTemplateColumns = "repeat("+perRow+", 1fr)";
    document.getElementById('canvas').style.gridTemplateRows = "repeat("+perColumn+", 1fr)";

    grid(squers);
}

window.addEventListener('DOMContentLoaded',createGrid());
