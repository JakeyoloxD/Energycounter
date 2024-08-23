let count = 0;
let incrementInterval;
let decrementInterval;
let incrementTimeout;
let decrementTimeout;
let holdDuration = 200;
let speed = 150;
let aggressiveThreshold = 2000;
let isAggressive = false;
let step = 1;
let stepIncreaseTimeout;
let sound; // Audio object for looping sound

function updateDisplay() {
    document.getElementById('energy').textContent = count;
}

function incrementCounter() {
    count += step;
    updateDisplay();
}

function decrementCounter() {
    if (count > 0) {
        count -= step;
    }
    if (count < 0) {
        count = 0;
    }
    updateDisplay();
}

document.getElementById('increase').addEventListener('click', () => {
    incrementCounter();
    playButtonSound();
});

document.getElementById('decrease').addEventListener('click', () => {
    decrementCounter();
    playButtonSound();
});

// Function to play button sound
function playButtonSound() {
    let audio = new Audio('button.mp3');
    audio.play();
}
// Function to toggle fullscreen mode
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}
function startIncrement() {
    incrementTimeout = setTimeout(() => {
        incrementInterval = setInterval(() => {
            incrementCounter();

            if (!isAggressive) {
                speed = Math.max(speed / 1.2, 50);
            } else {
                speed = Math.max(speed / 1.1, 5);
            }

            if (count > 100) {
                speed = Math.max(speed / 1.05, 1);
            }

            clearInterval(incrementInterval);
            incrementInterval = setInterval(incrementCounter, speed);

        }, speed);

        setTimeout(() => {
            isAggressive = true;
        }, aggressiveThreshold);

        stepIncreaseTimeout = setTimeout(() => {
            step = 10;
        }, 20000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 100;
        }, 60000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 1000;
        }, 120000);
        
        // Play looping sound
        sound = new Audio('loop.mp3'); // Ensure 'loop.mp3' is a valid path
        sound.loop = true;
        sound.play();

    }, holdDuration);
}

function startDecrement() {
    decrementTimeout = setTimeout(() => {
        decrementInterval = setInterval(() => {
            decrementCounter();

            if (!isAggressive) {
                speed = Math.max(speed / 1.2, 50);
            } else {
                speed = Math.max(speed / 1.1, 5);
            }

            clearInterval(decrementInterval);
            decrementInterval = setInterval(decrementCounter, speed);

        }, speed);

        setTimeout(() => {
            isAggressive = true;
        }, aggressiveThreshold);

        stepIncreaseTimeout = setTimeout(() => {
            step = 10;
        }, 10000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 100;
        }, 20000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 1000;
        }, 30000);

        // Play looping sound
        sound = new Audio('loop.mp3'); // Ensure 'loop.mp3' is a valid path
        sound.loop = true;
        sound.play();

    }, holdDuration);
}

function stopIncrement() {
    clearTimeout(incrementTimeout);
    clearInterval(incrementInterval);
    clearTimeout(stepIncreaseTimeout);
    speed = 150;
    step = 1;
    isAggressive = false;
    // Stop the sound
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

function stopDecrement() {
    clearTimeout(decrementTimeout);
    clearInterval(decrementInterval);
    clearTimeout(stepIncreaseTimeout);
    speed = 150;
    step = 1;
    isAggressive = false;
    // Stop the sound
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

document.getElementById('increase').addEventListener('mousedown', startIncrement);
document.getElementById('increase').addEventListener('mouseup', stopIncrement);
document.getElementById('increase').addEventListener('mouseleave', stopIncrement);

document.getElementById('decrease').addEventListener('mousedown', startDecrement);
document.getElementById('decrease').addEventListener('mouseup', stopDecrement);
document.getElementById('decrease').addEventListener('mouseleave', stopDecrement);

function handleSpend() {
    const spendAmount = parseInt(document.getElementById('spendAmount').value, 10);
    if (isNaN(spendAmount) || spendAmount <= 0) {
        return; // Do nothing if the input is empty or not a positive number
    }
    if (count >= spendAmount) {
        count -= spendAmount;
        updateDisplay();

        // Play a sound (requires user interaction to work in many browsers)
        const audio = new Audio('bzzz.mp3');
        audio.play();

        const image = document.getElementById("broken-image");
        image.style.display = "block"; // Show the image

        // Hide the image after 7 seconds
        setTimeout(() => {
            image.style.display = "none";
        }, 5000);

        // Vibrate the device (only works on mobile devices)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    } else {
        // Show warning if not enough energy
        alert('NOT ENOUGH ENERGY');
    }
}  

document.getElementById('spendButton').addEventListener('click', handleSpend);

// Filter input to disallow negative values
document.getElementById('spendAmount').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value < 0) {
        e.target.value = 0; // Set to 0 if negative value is entered
    }
});

updateDisplay(); // Initialize display
