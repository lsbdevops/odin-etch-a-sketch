function createGrid(height, width) {
    // Create a height x width grid of div elements.
    const containerElement = document.querySelector(".row-wrapper")

    // For every row.
    for(let i = 0; i < height; i++) 
    {
        // Create a row container.
        const rowElement = document.createElement("div");
        rowElement.classList.toggle("row");
        containerElement.appendChild(rowElement);

        // Create 16 div elements per row.
        for(let i = 0; i < width; i++)
        {
            const divElement = document.createElement("div");
            divElement.classList.toggle("cell");
            rowElement.appendChild(divElement);
        }
    }
}

function deleteGrid() {
    // Delete row-wrapper.
    document.querySelector(".row-wrapper").remove();

    // Create a new (empty) row-wrapper div and append to page-wrapper.
    const containerElement = document.createElement("div");
    containerElement.classList.add("row-wrapper");

    document.querySelector(".page-wrapper").appendChild(containerElement);
}

function changeCell(event, colourMode)
{   
    // Get the current cell on the grid which is being targetted.
    let cell = null;

    // Check if the left mouse button is currently clicked.
    if ((event.type === "click") || (event.buttons === 1)) 
    {
        cell = event.target;
    }
    // Check if the finger is being held on the screen (mobile only).   
    if (event.type === "touchmove")
    {
        cell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
    }
    // Ensure cell contains an element which includes the class 'cell'.
    if ((cell === null) || (!cell.classList.contains("cell"))) return;

    // Add colour to the cell based on the current colour mode and if eraser mode is active.
    if (eraserMode === "off") {
        cell.style.backgroundColor = (colourMode === "black") ? "black" :
        `rgb(${randomColourNumber()}, ${randomColourNumber()}, ${randomColourNumber()}`;
    }
    else cell.style.backgroundColor = "white";
}

function addCellListeners() {
    // Add mouseover and click event listener to all cells. Run function to change class of cell if triggered.
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => changeCell(event, colourMode));
        cell.addEventListener("click", (event) => changeCell(event, colourMode));
        cell.addEventListener("touchmove", (event) => changeCell(event, colourMode));
    })
}

function createResizedEtchaSketch(event) {
    // Prompt user for new grid size- accept only a number between 1-100.
    let gridSize = +(prompt("Enter new grid size (1 - 100):"));
    if((!gridSize) || (gridSize < 1) || (gridSize > 100)) return;

    createEtchaSketch(gridSize, gridSize);
}

function createEtchaSketch (height=16, width=16) {
    // Check if a grid already exists and if so delete it.
    if (document.querySelector(".cell")) deleteGrid();

    // Create a new grid and add event listeners.
    createGrid(height, width);
    addCellListeners();
}

function clearGrid() {
    // Determine the current grid size (assume square grid).
    const numberCells = document.querySelectorAll(".cell")
    const currentGridSize = Math.sqrt(numberCells.length);

    createEtchaSketch(currentGridSize, currentGridSize);
}

function randomColourNumber() {
    // Get a random number between 0-255.
    return Math.floor((Math.random() * 255))
}

let colourMode = "black"; // Set initial colourMode to black (default).
let eraserMode = "off"; // Set initial eraserMode to off (default).
// Create a 16x16 grid of div elements ("cells") and add event listeners.
createEtchaSketch();

// Create event listeners for change grid button.
const changeGridButton = document.querySelector("#change-grid");
changeGridButton.addEventListener("click", createResizedEtchaSketch);

const clearGridButton = document.querySelector("#clear-grid");
clearGridButton.addEventListener("click", clearGrid);

const changeColourButton = document.querySelector("#change-colour-mode");
changeColourButton.addEventListener("click", () => {
    // Change the colour mode between black and rainbow.
    colourMode = (colourMode === "black") ? "rainbow" : "black";

    // Update webpage with colour mode.
    document.querySelector("#colour-mode").textContent = colourMode;
});

const changeEraserButton = document.querySelector("#change-eraser-mode");
changeEraserButton.addEventListener("click", () => {
    // Change the colour mode between black and rainbow.
    eraserMode = (eraserMode === "on") ? "off" : "on";

    // Update webpage with colour mode.
    document.querySelector("#eraser-mode").textContent = eraserMode;
});



