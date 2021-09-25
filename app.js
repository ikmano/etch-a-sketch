const perRow = prompt("Enter number of squers per side: (max 100)");
const x = 960 / perRow;
console.log("size per row = size per column "+x);
const canvas = document.querySelector('.canvas');
const canvasHeight = canvas.offsetHeight;
const perColumn = canvasHeight / x;
console.log("squers per column "+perColumn);
const squers = perRow*perColumn;
const repeatColumn = "repeat("+perRow+", 1fr)";
const repeatRow = "repeat("+perColumn+", 1fr)";
document.getElementById('canvas').style.gridTemplateColumns = repeatColumn;
document.getElementById('canvas').style.gridTemplateRows = repeatRow;

function draw(){
    const blocks = document.querySelectorAll('.grid');
    blocks.forEach((block) =>{
        block.addEventListener('mouseenter', e =>{    
            e.toElement.style.backgroundColor = 'white';
        });
    }); 
}
function newGrid(){
    for(let i = 0; i < squers; i++){
        const div = document.createElement('div');
        div.classList.add('grid');
        canvas.appendChild(div);
    }
    draw();
}

newGrid();




