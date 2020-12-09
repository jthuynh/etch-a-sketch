// create 16x16 grid of square divs
// use another container div
const container = document.querySelector(".grid-container");

// set up hover effect when mouse enters a div 
// and ends when mouse leaves it
// set up event listeners for either of those
// for each div
// get id of the box and add mouseenter event; mouseleave event;

function mouseEnters(e) {
    // console.log(this);
    // this.style.setProperty('background-color', 'hsl(0,0%,0%)');
    let color = e.target.style.backgroundColor;
    console.log(typeof(color));
}

function mouseLeaves(e) {

}

function setupEvents() {
    const divs = document.getElementById("grid-container").childNodes;
    console.log(divs);

    divs.forEach(div => div.addEventListener('mouseenter', mouseEnters));
    divs.forEach(div => div.addEventListener('mouseleave', mouseLeaves));
}

// add new class to div to change color
function createGrid(gridNumber) {
    document.getElementById("grid-container").style.setProperty('grid-template-columns', `repeat(${gridNumber}, 1fr)`);
    document.getElementById("grid-container").style.setProperty('grid-template-rows', `repeat(${gridNumber}, 1fr)`);

    for(x = 0; x < gridNumber * gridNumber; x++) {
        var div = document.createElement('div');
        
        document.getElementById('grid-container').appendChild(div);
    }
}

function startGame(gridNumber) {
    createGrid(gridNumber);
    setupEvents();
}


startGame(25);