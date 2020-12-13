const container = document.querySelector(".grid-container");
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
    const divs = document.getElementById("grid-container").childNodes;
    const buttons = document.querySelector(".controls").children;

    divs.forEach(div => div.addEventListener('mouseenter', mouseEnters));
    divs.forEach(div => div.addEventListener('mouseleave', mouseLeaves));

    for (const button of buttons) {
        button.addEventListener('click', clickFunc);
    }

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

//   TODO: Clear the grid when scrolling with the slider
//  Fix the code so it only includes 1 range 

// From Css tricks : https://css-tricks.com/value-bubbles-for-range-inputs/
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
  
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}