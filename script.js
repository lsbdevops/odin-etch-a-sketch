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

    // Add cell styling for grid mode.
    if (gridMode) changeGridMode();
}


function deleteGrid() {
    // Delete row-wrapper.
    document.querySelector(".row-wrapper").remove();

    // Create a new (empty) row-wrapper div and append to page-wrapper.
    const containerElement = document.createElement("div");
    containerElement.classList.add("row-wrapper");

    document.querySelector(".content-wrapper").appendChild(containerElement);
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

    // Add colour to the cell based on the current colour mode, if eraser mode or opacity mode is active.
    if (eraserMode) {
        cell.style.backgroundColor = ""; // Remove any inline colouring (default back to white cell).
    }
    else if (opacityMode) {
        // Store colour of current cell.
        let cellColour = cell.style.backgroundColor;

        // If the cell is currently not coloured, colour with an opacity of 10%.
        if (cellColour === "") {
            cell.style.backgroundColor = (colourMode === "black") ? "rgba(0, 0, 0, 0.1)" :
            `rgba(${randomColourNumber()}, ${randomColourNumber()}, ${randomColourNumber()}, 0.1`;
        }
        // Check if the cell colour is in rgba format, otherwise the cell is already 100% coloured and can be ignored.
        if (!(cellColour[3] === "a")) return;
        // Else colour the cell with the required opacity.
        else {
            // Get the current cell opacity by splitting the rgba value with a comma delimiter. Removing trailing bracket and convert to a number.
            const cellColourComponents = cellColour.split(",");
            let opacity = +cellColourComponents[3].replace(")", "");

            // Add 10% opacity, and convert back to string format with trailing bracket.
            opacity += 0.1;
            opacity = opacity + ")"

            // Update the rgba opacity component and join the components.
            cellColourComponents[3] = opacity;
            cellColourComponents.join(",");

            // Update the cell's colour.
            cell.style.backgroundColor = cellColourComponents;
        }
    }
    // If no options are active, colour the cell with full opacity.
    else {
        cell.style.backgroundColor = (colourMode === "black") ? "rgb(0, 0, 0)" :
        `rgb(${randomColourNumber()}, ${randomColourNumber()}, ${randomColourNumber()}`;
    }
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

function changeGridMode() {
    // Get the node list of all cells in the grid.
    const cells = document.querySelectorAll(".cell");

    // Convert node list to an array.
    cellsArray = Array.from(cells);

    if (gridMode) {
        // Give each cell a border.
        cellsArray.forEach((cell) => cell.style.border = "1px solid lightgrey");
    }
    else {
        // Remove border.
        cellsArray.forEach((cell) => cell.style.border = ""); 
    }
}

let colourMode = "black"; // Set initial colourMode value to black (default).
let eraserMode = false; // Set initial eraserMode value to false/off (default).
let opacityMode = false; // Set initial opacityMode value to false/off (default).
let gridMode = false; // Set initial opacityMode value to false/off (default).
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
changeEraserButton.addEventListener("click", (event) => {
    // Toggle the eraser mode variable.
    eraserMode = (eraserMode === true) ? false : true;

    // Update the eraser mode button color.
    event.target.classList.toggle("on");
});

const changeOpacityButton = document.querySelector("#change-opacity-mode");
changeOpacityButton.addEventListener("click", (event) => {
    // Toggle the opacity mode variable.
    opacityMode = (opacityMode === true) ? false : true;

    // Update the opacity mode button color.
    event.target.classList.toggle("on");
});

const changeGridModeButton = document.querySelector("#change-grid-mode");
changeGridModeButton.addEventListener("click", (event) => {
    // Toggle the opacity mode variable.
    gridMode = (gridMode === true) ? false : true;

    // Update grid styling.
    changeGridMode();

    // Update the grid mode button color.
    event.target.classList.toggle("on");
});



