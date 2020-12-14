const container = document.querySelector(".grid-container");
const range = document.querySelector(".range");
const bubble = document.querySelector(".bubble");
let curColor = "black";

function calcNewBackground(rgb) {
    let newRGB = [];

    for (let i = 0; i < rgb.length; i++) {
        if (Number(rgb[i]) != 0) {
            newRGB.push(Number(rgb[i]) - 25.5);
        } else {
            newRGB.push(0);
        }
    }
    
    if (newRGB.every( (val, i, arr) => val === arr[0] )) {
        return newRGB;
    } else {
        return calcNewBackground([255,255,255]);
    }
}

function mouseEnters(e) {
    let color = window.getComputedStyle(e.target).getPropertyValue("background-color");

    e.target.classList.add('hover');

    switch (curColor) {
        case 'rainbow':
            this.style.setProperty('background-color', "#"+((1<<24)*Math.random()|0).toString(16));
            break;

        case 'grayscale':
            // Clear grid-tile that was already black
            if (color == 'rgb(0, 0, 0)') {
                color = 'rgb(255,255,255)';
            }

            let parsedRGB = color.match(/\d+/g); 
            let newRGB = calcNewBackground(parsedRGB);
            this.style.setProperty('background-color',`rgb(${newRGB[0]},${newRGB[1]},${newRGB[2]})`);
            break;

        case 'eraser':
            this.style.setProperty('background-color', 'rgb(255,255,255');
            break;

        default:
            this.style.setProperty('background-color', 'rgb(0,0,0)');
    }
}


function mouseLeaves(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('hover');
}

function clickFunc(e) {
    console.log(e.target.id);
    curColor = e.target.id;
}

function setupEvents() {
    const buttons = document.querySelector(".controls").children;

    for (const button of buttons) {
        button.addEventListener('click', clickFunc);
    }

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });

}

function addDivs(numDivs) {
    for(x = 0; x < numDivs; x++) {
        var div = document.createElement('div');
        div.addEventListener('mouseenter', mouseEnters);
        div.addEventListener('mouseleave', mouseLeaves);
        container.appendChild(div);
    }
}

function removeDivs(numDivs) {
    console.log(numDivs);
    for(x = 0; x < numDivs; x++) {
        container.removeChild(container.firstChild);
    }
}

function createGrid(gridNumber) {
    container.style.setProperty('grid-template-columns', `repeat(${gridNumber}, 1fr)`);
    container.style.setProperty('grid-template-rows', `repeat(${gridNumber}, 1fr)`);

    addDivs(gridNumber * gridNumber);
    // for(x = 0; x < gridNumber * gridNumber; x++) {
    //     var div = document.createElement('div');
        
    //     document.getElementById('grid-container').appendChild(div);
    // }
}

function startGame(gridNumber) {
    createGrid(gridNumber);
    setupEvents();
    setBubble(range, bubble);
}

startGame(25);

// From Css tricks : https://css-tricks.com/value-bubbles-for-range-inputs/
function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    let numDivs = (val * val) - container.childElementCount;

    if (numDivs > 0) {
        addDivs(numDivs);
    } else {
        removeDivs(-numDivs);   
    }
    container.style.setProperty('grid-template-columns', `repeat(${val}, 1fr)`);
    container.style.setProperty('grid-template-rows', `repeat(${val}, 1fr)`);
    container.childNodes.forEach(div => div.style.setProperty('background-color', 'rgb(255,255,255)'));

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}