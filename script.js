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

function changeCell(event)
{
    // Add coloured class to cell, if the left mouse button is currently clicked.
    if ((event.type === "click") || (event.buttons === 1)) this.classList.add("coloured");
}

// Create a 16x16 grid of div elements ("cells").
createGrid(16, 16);

// Add mouseover and click event listener to all cells. Run function to change class of cell if triggered.
const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
    cell.addEventListener("mouseover", changeCell);
    cell.addEventListener("click", changeCell);
}
)

