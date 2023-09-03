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

function changeCell(event)
{
    // Add coloured class to cell, if the left mouse button is currently clicked.
    if ((event.type === "click") || (event.buttons === 1)) this.classList.add("coloured");
    
    if (event.type === "touchmove")
    {
        const cell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
        cell.classList.add("coloured");
    }
}

function addCellListeners() {
    // Add mouseover and click event listener to all cells. Run function to change class of cell if triggered.
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("mouseover", changeCell);
        cell.addEventListener("click", changeCell);
        cell.addEventListener("touchmove", changeCell);
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

// Create a 16x16 grid of div elements ("cells") and add event listeners.
createEtchaSketch();

// Create event listeners for change grid button.
const changeGridButton = document.querySelector("#change-grid");
changeGridButton.addEventListener("click", createResizedEtchaSketch);


