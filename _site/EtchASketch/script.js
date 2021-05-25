const resetButton = document.querySelector("#resetButton");
const mainContainer = document.querySelector("#mainContainer");
const gridBlocks = document.querySelector(".gridBlocks");
let gridVal = 16 ** 2;

resetButton.addEventListener("click", reset);
resetButton.addEventListener("click", resize);

setGrid(gridVal);

function setGrid(gridSize) {
  for (let i = 0; i < gridVal; i++) {
    let divElem = document.createElement("div");
    divElem.classList.add("gridBlocks");
    divElem.addEventListener("mouseover", colorGrid);
    mainContainer.appendChild(divElem);
  }
}

function reset() {
  let divNum = document.getElementsByClassName("gridBlocks").length;
  let container = document.getElementById("mainContainer");
  if (container.hasChildNodes()) {
    for (let i = 0; i < divNum; i++) {
      container.removeChild(container.childNodes[i]);
      for (let j = 0; j < divNum; j++) {
        container.removeChild(container.childNodes[i]);
      }
    }
  }
}

function resize() {
  gridVal = parseInt(prompt("enter a grid size between 1 and 100"));
  if (isNaN(gridVal)) {
    nanHandler();
  } else if (gridVal > 100) {
    alert("Number Greater than 100 setting to 100");
    gridVal = 100;
  } else if (gridVal < 1) {
    alert("Number less than 1 setting to 1");
    gridVal = 1;
  }
  mainContainer.style.gridTemplateColumns = `repeat(${gridVal}, 1fr)`;
  gridVal = gridVal ** 2;

  setGrid(gridVal);
}

function nanHandler() {
  console.log("nan here");
  alert("Must type a NUMBER! try again.");
}

// TODO: function that changes background color of div when you hover over it
function colorGrid(e) {
  e.target.style.backgroundColor = "black";
}
