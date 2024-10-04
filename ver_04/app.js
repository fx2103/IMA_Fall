let dogAge = 0;
let humanAge = 0;
let dogFinalAge = 0;
let humanFinalAge = 0;
let animationProgress = 0;
let petName = '';
let dogData;
let specialEliteFont;
let bgm;
let audioContext;

function preload() {
    dogData = loadJSON('dogs.json');
    specialEliteFont = loadFont('SpecialElite.ttf');
    bgm = loadSound('BGM.mp3');  // Ensure the path to the file is correct
}

function setup() {
    let canvas = createCanvas(600, 250);
    canvas.parent('visualization');
    noLoop();  // Prevent continuous drawing until interaction happens

    // Get the p5.js AudioContext and suspend it initially
    audioContext = getAudioContext();
    audioContext.suspend();

    // Inform user about interaction and add event listener for click to resume the audio
    document.body.addEventListener('click', resumeAudioContext, { once: true });
}

function resumeAudioContext() {
    // Resume the AudioContext after user interaction
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            if (bgm && !bgm.isPlaying()) {
                bgm.play();
                bgm.setLoop(true);
                bgm.setVolume(0.5);  // Adjust the volume if necessary
            }
        }).catch(err => {
            console.log('Error resuming AudioContext:', err);
        });
    }
}

// The rest of your dog age calculation logic (as before)

// Example for bubble click events and dog age calculation
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', function () {
        document.querySelectorAll('.bubble').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
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

    if (!isNaN(dogYearsInput) && dogYearsInput >= 1 && dogYearsInput <= 15) {
        document.getElementById('family-title').innerText = `Family Member: ${petName}`;

        document.querySelector('.bubble-container').style.display = 'none';
        document.querySelector('.input-container').style.display = 'none';
        document.getElementById('visualization').style.display = 'block';
        document.getElementById('go-back').style.display = 'block';

        dogFinalAge = dogYearsInput;
        humanFinalAge = dogData[breedSize].age_mapping[dogYearsInput];
        animationProgress = 0;

        loop();  // Start the p5.js sketch loop
    } else {
        alert('Please enter a valid dog age between 1 and 15.');
    }
});

document.getElementById('go-back').addEventListener('click', () => {
    document.getElementById('family-title').innerText = "🐾 Welcome to the Dog Age Calculator! 🐾";
    document.getElementById('visualization').style.display = 'none';
    document.getElementById('go-back').style.display = 'none';
    document.querySelector('.bubble-container').style.display = 'flex';
    document.querySelector('.input-container').style.display = 'block';
});

function draw() {
    clear();
    drawTitle();
    drawGraphs();
}

function drawTitle() {
    textFont(specialEliteFont);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Your babe is the human equivalent of being ${Math.floor(humanAge)} years old.`, width / 2, 30);
}

function drawGraphs() {
    drawDogGraph(dogAge);
    drawHumanGraph(humanAge);

    if (animationProgress < 1) {
        dogAge = lerp(0, dogFinalAge, animationProgress);
        humanAge = lerp(0, humanFinalAge, animationProgress);
        animationProgress += 0.02;
        redraw();
    }
}

function drawDogGraph(age) {
    fill(150, 220, 255);
    noStroke();
    rect(50, 60, age * 30, 50);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("🐶 Dog Age: " + Math.floor(age), 50 + (age * 30) / 2, 85);
}

function drawHumanGraph(age) {
    fill(255, 150, 150);
    noStroke();
    rect(50, 130, age * 15, 50);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("👤 Human Age: " + Math.floor(age), 50 + (age * 15) / 2, 155);
}
