// Create a 16x16 grid of div elements.

const containerElement = document.querySelector(".row-wrapper")

// For every row.
for(let i = 0; i < 16; i++) 
{
    // Create a row container.
    const rowElement = document.createElement("div");
    rowElement.classList.toggle("row");
    containerElement.appendChild(rowElement);

    // Create 16 div elements per row.
    for(let i = 0; i < 16; i++)
    {
        const divElement = document.createElement("div");
        divElement.classList.toggle("cell");
        rowElement.appendChild(divElement);
    }
}