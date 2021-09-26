//function to get and validate user input
function userInput(){
    const input = prompt("Enter number of squers per side: (max 100)");
    if(input < 101) return input;
    else return userInput();
}

//function allows drawing into canvas
function draw(){
    const blocks = document.querySelectorAll('.grid');
    blocks.forEach((block) =>{
        block.addEventListener('mouseenter', e =>{    
            //draw black
            //e.target.style.opacity = '1';
            //draw fade
            let opacity = e.target.style.opacity;
            if(opacity === ""){
                opacity = "0.0";
            }
            opacity = parseFloat(opacity);
            if(opacity < 1.0){
                opacity += 0.1;
                e.target.style.opacity = opacity;
            }
        });
    }); 
}

//function generates new grid
function newGrid(squers){
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

    newGrid(squers);
}

window.addEventListener('DOMContentLoaded',createGrid());






