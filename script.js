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
}

function addCellListeners() {
    // Add mouseover and click event listener to all cells. Run function to change class of cell if triggered.
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("mouseover", changeCell);
        cell.addEventListener("click", changeCell);
    })
}

// Create a 16x16 grid of div elements ("cells") and add event listeners.
createGrid(16, 16);
addCellListeners()

const changeGridButton = document.querySelector("#change-grid");

changeGridButton.addEventListener("click", (event) => {
    // Prompt user for new grid size- accept only a number between 1-100.
    let gridSize = +(prompt("Enter new grid size (1 - 100):"));
    if((!gridSize) || (gridSize < 1) || (gridSize > 100)) return;

    // Delete the current grid, create a new grid and add event listeners.
    deleteGrid();
    createGrid(gridSize, gridSize);
    addCellListeners();
} )


