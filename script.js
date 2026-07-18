// Initialize starting points for everyone
let points = {
    Artem: 0,
    Daniil: 0,
    Daria: 0
};

// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Select the necessary HTML elements based on your layout
    const scoreDisplays = document.querySelectorAll('.number h3');
    const addButtons = document.querySelectorAll('.number button');
    const buyButton = document.querySelector('.buy button');

    // Names array mapped to the order they appear in the HTML
    const names = ["Artem", "Daniil", "Daria"];

    // Function to update the <h3> tags on the screen
    function updateDisplay() {
        scoreDisplays[0].innerText = points.Artem + " pts";
        scoreDisplays[1].innerText = points.Daniil + " pts";
        scoreDisplays[2].innerText = points.Daria + " pts";
    }

    // Initialize the screen with 0 points
    updateDisplay();

    // Attach click events to the "Add point" buttons
    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const person = names[index];
            points[person] += 1; // Add 1 point
            updateDisplay();
        });
    });

    // Attach click event to the "Buy book" button
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            // Find if anyone has enough points (200) to buy the book
            let eligibleBuyer = null;
            
            for (let person in points) {
                if (points[person] >= 200) {
                    eligibleBuyer = person;
                    break;
                }
            }

            // Logic for buying the book
            if (eligibleBuyer) {
                points[eligibleBuyer] -= 200;
                alert(`Success! ${eligibleBuyer} bought the book for 200 points!`);
                updateDisplay();
            } else {
                alert("Not enough points! Someone needs at least 200 points to buy the book.");
            }
        });
    }
});
