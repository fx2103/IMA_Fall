let dogAge = 0;
let humanAge = 0;
let dogFinalAge = 0;
let humanFinalAge = 0;
let animationProgress = 0;
let petName = '';
let dogData;  // Holds the loaded JSON data
let specialEliteFont;  // Declare a variable to hold the font

// Load the JSON file and the Special Elite font in the preload function
function preload() {
    dogData = loadJSON('dogs.json');  // Ensure the JSON file path is correct
    specialEliteFont = loadFont('SpecialElite.ttf');  // Load the Special Elite font from the local file
    console.log("JSON data loaded", dogData);
}

// Add event listeners to the bubbles to mark them as selected
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', function () {
        document.querySelectorAll('.bubble').forEach(b => b.classList.remove('selected'));  // Remove "selected" from all
        this.classList.add('selected');  // Mark the clicked bubble as "selected"
        console.log("Bubble selected:", this.getAttribute('data-size'));  // Log the selected bubble
    });
});

document.getElementById('calculate').addEventListener('click', () => {
    let dogYearsInput = parseInt(document.getElementById('dogAge').value);
    petName = document.getElementById('petName').value || 'Your Pet';
    let selectedBubble = document.querySelector('.bubble.selected');

    if (!selectedBubble) {
        alert('Please select a dog size.');
        return;
    }

    let breedSize = selectedBubble.getAttribute('data-size');

    console.log("Selected breed size:", breedSize);  // Log the selected breed size

    if (!isNaN(dogYearsInput) && dogYearsInput >= 1 && dogYearsInput <= 15) {
        console.log("Valid dog age input:", dogYearsInput);  // Log the valid input
        document.getElementById('family-title').innerText = `Family Member: ${petName}`;

        // Hide input fields and show the p5 sketch
        document.querySelector('.bubble-container').style.display = 'none';
        document.querySelector('.input-container').style.display = 'none';
        document.getElementById('visualization').style.display = 'block';
        document.getElementById('go-back').style.display = 'block';

        // Access age mapping from the loaded dogData
        dogFinalAge = dogYearsInput;
        humanFinalAge = dogData[breedSize].age_mapping[dogYearsInput];
        animationProgress = 0;

        console.log("Dog final age:", dogFinalAge);
        console.log("Human final age:", humanFinalAge);

        loop();  // Start the p5.js sketch loop
    } else {
        alert('Please enter a valid dog age between 1 and 15.');
    }
});

document.getElementById('go-back').addEventListener('click', () => {
    // Reset the title to the original
    document.getElementById('family-title').innerText = "🐾 Welcome to the Dog Age Calculator! 🐾";

    // Reset to input form
    document.getElementById('visualization').style.display = 'none';
    document.getElementById('go-back').style.display = 'none';
    document.querySelector('.bubble-container').style.display = 'flex';
    document.querySelector('.input-container').style.display = 'block';
});

function setup() {
    let canvas = createCanvas(600, 250);  // Increased height for title display
    canvas.parent('visualization');
    noLoop();  // Prevent continuous drawing until interaction happens
}

function draw() {
    clear();  // Clear the canvas background for transparency
    drawTitle();
    drawGraphs();
}

function drawTitle() {
    // Use the Special Elite font for the title
    textFont(specialEliteFont);  // Apply the loaded font
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Your babe is the human equivalent of being ${Math.floor(humanAge)} years old.`, width / 2, 30);
}

function drawGraphs() {
    drawDogGraph(dogAge);
    drawHumanGraph(humanAge);

    // Animate the dog and human age bars horizontally
    if (animationProgress < 1) {
        dogAge = lerp(0, dogFinalAge, animationProgress);
        humanAge = lerp(0, humanFinalAge, animationProgress);
        animationProgress += 0.02;  // Adjust speed of animation
        redraw();  // Continue animation
    }
}

function drawDogGraph(age) {
    fill(150, 220, 255);
    noStroke();
    rect(50, 60, age * 30, 50);  // Increased width scaling for dog age bar

    // Draw text and emoji inside the dog bar
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);  // Center the text vertically and horizontally
    text("🐶 Dog Age: " + Math.floor(age), 50 + (age * 30) / 2, 85);  // Center text inside the bar
}

function drawHumanGraph(age) {
    fill(255, 150, 150);
    noStroke();
    rect(50, 130, age * 15, 50);  // Increased width scaling for human age bar

    // Draw text and emoji inside the human bar
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);  // Center the text vertically and horizontally
    text("👤 Human Age: " + Math.floor(age), 50 + (age * 15) / 2, 155);  // Center text inside the bar
}
