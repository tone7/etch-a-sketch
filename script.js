const container = document.getElementById('container');
let gridItems = document.getElementsByClassName('grid-item');
const clearButton = document.getElementById('clearButton');
const gridLayoutButton = document.getElementById('gridLayoutButton');
const randomRGBButton = document.getElementById('randomRGBButton');
let choice = document.getElementById('select');

function createGrid(rows, cols){
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      container.appendChild(cell).className = "grid-item";
    };

    for(let item of gridItems){
        item.addEventListener('mouseover', standardColor);
    }
}

function standardColor(e){
    e.target.style.background = 'black';
};

function selectedColor(e){
    e.target.style.background = choice.value;
}

function randomColor(e){
    var letters='0123456789abcdef';
    var color='#';
    for (var i=0;i<6;i++)
    {
        color += letters[Math.floor(Math.random()*16)];
    }
    e.target.style.background = color;
}

clearButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.style.background = '#f0ffff';
    }
});

gridLayoutButton.addEventListener('click', function(event){
    let gridNum = 0;
    do{
        gridNum = prompt('Enter size of grid (min: 16; max: 100):', 16);
        if(gridNum >= 16 && gridNum <= 100){
            container.replaceChildren();
            createGrid(gridNum, gridNum);
        }
    }while(gridNum < 16 || gridNum == null || gridNum > 100);
})

randomRGBButton.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.removeEventListener('mouseover', selectedColor);
        item.addEventListener('mouseover', randomColor);
    }
})

choice.addEventListener('click', function(event){
    for(let item of gridItems){
        item.removeEventListener('mouseover', standardColor);
        item.addEventListener('mouseover', selectedColor);
        item.removeEventListener('mouseover', randomColor);
    }
})

createGrid(16, 16);


