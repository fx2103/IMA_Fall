// Dog age to human age mapping based on breed size
const dogAgeData = {
  small_dogs: {
      age_mapping: {
          1: 15, 2: 24, 3: 28, 4: 32, 5: 36, 6: 40, 7: 44, 8: 48, 9: 52, 10: 56, 11: 60, 12: 64, 13: 68, 14: 72, 15: 76
      },
      breeds: ["Chihuahua", "Yorkshire Terrier", "Pomeranian", "Maltese", "Miniature Poodle"]
  },
  medium_dogs: {
      age_mapping: {
          1: 15, 2: 24, 3: 28, 4: 32, 5: 36, 6: 42, 7: 47, 8: 51, 9: 56, 10: 60, 11: 65, 12: 69, 13: 74, 14: 78, 15: 83
      },
      breeds: ["Beagle", "Bulldog", "Cocker Spaniel", "Border Collie", "Shetland Sheepdog"]
  },
  large_dogs: {
      age_mapping: {
          1: 12, 2: 22, 3: 31, 4: 38, 5: 45, 6: 49, 7: 56, 8: 64, 9: 71, 10: 79, 11: 86, 12: 93, 13: 100, 14: 107, 15: 114
      },
      breeds: ["Golden Retriever", "Labrador Retriever", "German Shepherd", "Rottweiler", "Boxer"]
  },
  giant_dogs: {
      age_mapping: {
          1: 12, 2: 22, 3: 31, 4: 38, 5: 45, 6: 49, 7: 56, 8: 64, 9: 71, 10: 79, 11: 86, 12: 93, 13: 100, 14: 107, 15: 114
      },
      breeds: ["Great Dane", "Mastiff", "Bernese Mountain Dog", "Newfoundland", "Saint Bernard"]
  }
};

document.getElementById('calculate').addEventListener('click', () => {
  let dogAge = parseInt(document.getElementById('dogAge').value);
  let breedSize = document.getElementById('breedSize').value;

  if (!isNaN(dogAge) && dogAge >= 1 && dogAge <= 15) {
      let humanAge = dogAgeData[breedSize].age_mapping[dogAge];
      visualizeAge(dogAge, humanAge);
  } else {
      alert('Please enter a valid dog age between 1 and 15.');
  }
});

// Pass the dog's age and the calculated human age to the p5.js sketch for visualization
function visualizeAge(dogAge, humanAge) {
  window.dogAge = dogAge;
  window.humanAge = humanAge;
  redraw(); // Re-draw the p5.js canvas
}

let dogAge = 0;
let humanAge = 0;
let dogFinalAge = 0;
let humanFinalAge = 0;
let animationProgress = 0;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('visualization');
    noLoop();  // Prevent the continuous loop unless input is made
}

function draw() {
    background(240);
    drawGraphs();
}

function drawGraphs() {
    // Cute dog graph
    drawDogGraph(dogAge);
    
    // Cute human graph
    drawHumanGraph(humanAge);

    // Increment the animation progress (smooth transition)
    if (animationProgress < 1) {
        dogAge = lerp(0, dogFinalAge, animationProgress);
        humanAge = lerp(0, humanFinalAge, animationProgress);
        animationProgress += 0.02;  // Speed of animation (adjust as needed)
        redraw();  // Continue animating
    }
}

// Function to draw the dog graph (with a cute dog icon and bone)
function drawDogGraph(age) {
    fill(150, 220, 255);
    noStroke();
    rect(50, 300 - age * 10, 50, age * 10);  // Dog graph (age bar)

    // Draw cute dog icon
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text("🐶", 75, 290 - age * 10);  // Position the dog icon at the top of the bar

    // Draw a dog bone as a progress marker
    text("🦴", 75, 330);
    textSize(12);
    text(`Dog Age: ${Math.floor(age)}`, 75, 360);  // Display the dog age
}

// Function to draw the human graph (with a human icon)
function drawHumanGraph(age) {
    fill(255, 150, 150);
    noStroke();
    rect(300, 300 - age * 1.5, 50, age * 1.5);  // Human graph (age bar)

    // Draw cute human icon
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text("👤", 325, 290 - age * 1.5);  // Position the human icon at the top of the bar

    // Draw a milestone as a marker
    text("🎉", 325, 330);
    textSize(12);
    text(`Human Age: ${Math.floor(age)}`, 325, 360);  // Display the human age
}

// Handling the input and updating the graph dynamically
document.getElementById('calculate').addEventListener('click', () => {
    let dogYearsInput = parseInt(document.getElementById('dogAge').value);
    let breedSize = document.getElementById('breedSize').value;

    if (!isNaN(dogYearsInput) && dogYearsInput >= 1 && dogYearsInput <= 15) {
        dogFinalAge = dogYearsInput;
        humanFinalAge = dogAgeData[breedSize].age_mapping[dogYearsInput];
        animationProgress = 0;  // Reset animation progress
        loop();  // Start the visualization loop
    } else {
        alert('Please enter a valid dog age between 1 and 15.');
    }
});
