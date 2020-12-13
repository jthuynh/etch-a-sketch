const container = document.querySelector(".grid-container");

function calcNewBackground(rgb) {
    let newRGB = [];

    for (let i = 0; i < rgb.length; i++) {
        if (Number(rgb[i]) != 0) {
            newRGB.push(Number(rgb[i]) - 25.5);
        } else {
            newRGB.push(0);
        }
    }

    return newRGB;
}

function mouseEnters(e) {
    let color = window.getComputedStyle(e.target).getPropertyValue("background-color");

    // Add hovering transition
    e.target.classList.add('hover');

    // TODO: Rainbow
    this.style.setProperty('background-color', "#"+((1<<24)*Math.random()|0).toString(16));

    // // Grayscale
    // let parsedRGB = color.match(/\d+/g); 
    // let newRGB = calcNewBackground(parsedRGB);
    // this.style.setProperty('background-color',`rgb(${newRGB[0]},${newRGB[1]},${newRGB[2]})`);

    // // Black
    // this.style.setProperty('background-color', 'rgb(0,0,0)');
}


function mouseLeaves(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('hover');
}

function setupEvents() {
    const divs = document.getElementById("grid-container").childNodes;
    console.log(divs);

    divs.forEach(div => div.addEventListener('mouseenter', mouseEnters));
    divs.forEach(div => div.addEventListener('mouseleave', mouseLeaves));
}

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

startGame(16);
