document.addEventListener("DOMContentLoaded", () => {
    // Check local storage for existing points
    const savedPoints = localStorage.getItem('pointsDataRu');
    let points = savedPoints ? JSON.parse(savedPoints) : {
        "Артем": 0,
        "Даниил": 0,
        "Дарья": 0
    };

    const scoreDisplays = document.querySelectorAll('.number h3');
    const addButtons = document.querySelectorAll('.add-btn');
    const buyButton = document.getElementById('buy-book-btn');
    const names = ["Артем", "Даниил", "Дарья"];

    // Custom Modal HTML Elements
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const alertCloseBtn = document.getElementById('alert-close-btn');
    
    const choiceModal = document.getElementById('choice-modal');
    const choiceButtonsContainer = document.getElementById('choice-buttons');
    const choiceCancelBtn = document.getElementById('choice-cancel-btn');

    // Function to update the score text on the screen
    function updateDisplay() {
        scoreDisplays[0].innerText = points["Артем"] + " баллов";
        scoreDisplays[1].innerText = points["Даниил"] + " баллов";
        scoreDisplays[2].innerText = points["Дарья"] + " баллов";
    }

    // Function to save points to browser memory
    function savePoints() {
        localStorage.setItem('pointsDataRu', JSON.stringify(points));
    }

    // Helper function to show our custom alert pop-up
    function showCustomAlert(message) {
        alertMessage.innerText = message;
        alertModal.classList.remove('hidden');
    }

    // Event listeners to close the pop-ups
    alertCloseBtn.addEventListener('click', () => {
        alertModal.classList.add('hidden');
    });

    choiceCancelBtn.addEventListener('click', () => {
        choiceModal.classList.add('hidden');
    });

    // Initialize screen on load
    updateDisplay();

    // Attach click events to the "Add point" buttons
    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const person = names[index];
            points[person] += 1;
            updateDisplay();
            savePoints();
        });
    });

    // Attach click event to the "Buy book" button
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            let eligibleBuyers = [];
            
            // Find everyone who has 200 or more points
            for (let person in points) {
                if (points[person] >= 200) {
                    eligibleBuyers.push(person);
                }
            }

            // Scenario 1: Nobody has enough points
            if (eligibleBuyers.length === 0) {
                showCustomAlert("Недостаточно баллов! Кому-то нужно как минимум 200 баллов, чтобы купить книгу.");
                return;
            }

            // Scenario 2: Exactly one person has enough points
            if (eligibleBuyers.length === 1) {
                processPurchase(eligibleBuyers[0]);
            } 
            // Scenario 3: Multiple kids have enough points
            else {
                // Clear out any old buttons inside the modal
                choiceButtonsContainer.innerHTML = ''; 
                
                // Create a mobile-friendly button for each eligible kid
                eligibleBuyers.forEach(buyer => {
                    const btn = document.createElement('button');
                    btn.innerText = buyer;
                    btn.addEventListener('click', () => {
                        choiceModal.classList.add('hidden'); // Hide the modal
                        processPurchase(buyer); // Deduct points
                    });
                    choiceButtonsContainer.appendChild(btn);
                });
                
                // Show the choice selection modal
                choiceModal.classList.remove('hidden');
            }
        });
    }

    // Handles the actual point deduction and success message
    function processPurchase(buyerName) {
        points[buyerName] -= 200;
        showCustomAlert(`Успех! ${buyerName} покупает книгу за 200 баллов!`);
        updateDisplay();
        savePoints();
    }
});