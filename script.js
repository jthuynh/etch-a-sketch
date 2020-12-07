// create 16x16 grid of square divs
// use another container div
const container = document.querySelector(".grid-container");
console.log(container);
// look into float/clear, inline-block, flexbox, CSS grid
// USING CSS GRID
// careful with borders and margins

// set up hover effect when mouse enters a div 
// and ends when mouse leaves it
// set up event listeners for either of those

// add new class to div to change color

function startGame(gridNumber) {
    document.getElementById("grid-container").style.setProperty('grid-template-columns', `repeat(${gridNumber}, 1fr)`);
    document.getElementById("grid-container").style.setProperty('grid-template-rows', `repeat(${gridNumber}, 1fr)`);



    for(x = 0; x < gridNumber * gridNumber; x++) {
        var div = document.createElement('div');
        
        document.getElementById('grid-container').appendChild(div);
    }
}

startGame(25);