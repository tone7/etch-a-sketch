const container = document.getElementById('container');
let gridItems = document.getElementsByClassName('grid-item');
const clearButton = document.getElementById('clearButton');
const gridLayoutButton = document.getElementById('gridLayoutButton');
const blackButton = document.getElementById('blackButton');
const randomRGBButton = document.getElementById('randomRGBButton');
const shadowButton = document.getElementById('shadowButton');
const eraseButton = document.getElementById('eraseButton');
let newSize = document.getElementById('gridLayout');
newSize.value = 16;
let displaySize = document.getElementById('sizeLabel');
displaySize.textContent = newSize.value;
newSize.addEventListener('mousemove', function() {
  displaySize.textContent = newSize.value;
})
let choice = document.getElementById('select');
let active = false;
let eraser = false;

container.addEventListener('click', togglePen);
container.addEventListener('mouseover', changeCursor);

function changeCursor(){
    if(!eraser){
        container.style.cursor = 'url("cursor/paint-brush.cur"), auto';
    }else{
        container.style.cursor = 'url("cursor/eraser.cur"), auto';
    }
}

function togglePen(){
    if(active){
        active = false;
    }else{
        active = true;
    }
}

function createGrid(rows, cols){
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      container.appendChild(cell).className = "grid-item";
    };

    for(let item of gridItems){
        item.style.background = '#f0ffff';
        item.addEventListener('mouseover', standardColor);
    }
}

function standardColor(e){
    if(active){
        e.target.style.background = 'black';
    }
};

function selectedColor(e){
    if(active){
        e.target.style.background = choice.value;
    }
}

function randomColor(e){
    if(active){
        let letters='0123456789abcdef';
        let color='#';
        for (let i=0;i<6;i++)
        {
            color += letters[Math.floor(Math.random()*16)];
        }
        e.target.style.background = color;
    }
}

function shadowColor(e){
    if(active){
        let currentColor = e.target.style.background.split(',');

        let hexColor = '';
        let rgb = [];

        for(let i = 0; i < currentColor.length; i++){
            let number = currentColor[i].match(/\d/g);
            number = number.join("");
            if(i == 2){
                number = number.slice(0, -2);
            }
            rgb[i] = +number;
            hexColor += number.toString(16);
        }
        console.log(hexColor);

        let num = parseInt(hexColor, 16);
        
        console.log(num);

        let r = rgb[0] - 25;
        
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
        
        let g = rgb[1] - 25;
        
        if (g > 255) g = 255;
        else if  (g < 0) g = 0;
        
        let b = rgb[2] - 25;
        
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        
        let newColor = `rgb(${r}, ${g}, ${b})`;

        e.target.style.background = newColor;
    }
}

function eraseColor(e){
    if(active){
        console.log(e.target.style.background);
        e.target.style.background = '#f0ffff';

    }
}

clearButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.style.background = '#f0ffff';
    }

    active = false;
    eraser = false;
});

displaySize.addEventListener('click', function(event){
    let gridNum = newSize.value;
    container.replaceChildren();
    createGrid(gridNum, gridNum);

    active = false;
    eraser = false;
})

blackButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', randomColor);
        item.removeEventListener('mouseover', selectedColor);
        item.removeEventListener('mouseover', eraseColor);
        item.removeEventListener('mouseover', shadowColor);
        item.addEventListener('mouseover', standardColor);
    }

    active = false;
    eraser = false;
});

randomRGBButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.removeEventListener('mouseover', selectedColor);
        item.removeEventListener('mouseover', eraseColor);
        item.removeEventListener('mouseover', shadowColor);
        item.addEventListener('mouseover', randomColor);
    }

    active = false;
    eraser = false;
})

shadowButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.removeEventListener('mouseover', selectedColor);
        item.removeEventListener('mouseover', eraseColor);
        item.removeEventListener('mouseover', randomColor);
        item.addEventListener('mouseover', shadowColor);
    }

    active = false;
    eraser = false;
});

eraseButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.removeEventListener('mouseover', selectedColor);
        item.removeEventListener('mouseover', randomColor);
        item.removeEventListener('mouseover', shadowColor);
        item.addEventListener('mouseover', eraseColor);
    }

    active = false;
    eraser = true;
});

choice.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.removeEventListener('mouseover', randomColor);
        item.removeEventListener('mouseover', eraseColor);
        item.removeEventListener('mouseover', shadowColor);
        item.addEventListener('mouseover', selectedColor);
    }

    active = false;
    eraser = false;
})

createGrid(16, 16);


