const container = document.getElementById('container');
let gridItems = document.getElementsByClassName('grid-item');
const clearButton = document.getElementById('clearButton');

function createGrid(rows, cols){
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      container.appendChild(cell).className = "grid-item";
    };

    for(let item of gridItems){
        item.addEventListener("mouseover", function(event){
            event.target.classList.add('orange-color');
        });
    }
}

clearButton.addEventListener('click', function(event){
    for(let item of gridItems){
        if(item.classList.contains('orange-color')){
            item.classList.remove('orange-color');
        }
    }

    let gridNum = 0;
    do{
        gridNum = prompt('Enter size of grid (min: 16; max: 100):', 16);
        if(gridNum >= 16 && gridNum <= 100){
            container.replaceChildren();
            createGrid(gridNum, gridNum);
        }
    }while(gridNum < 16 || gridNum == null || gridNum > 100);
});

createGrid(16, 16);


