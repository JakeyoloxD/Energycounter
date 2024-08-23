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
});

document.getElementById('decrease').addEventListener('click', () => {
    decrementCounter();
});

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
        }, 5000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 100;
        }, 10000);

        stepIncreaseTimeout = setTimeout(() => {
            step = 1000;
        }, 15000);

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

    }, holdDuration);
}

function stopIncrement() {
    clearTimeout(incrementTimeout);
    clearInterval(incrementInterval);
    clearTimeout(stepIncreaseTimeout);
    speed = 150;
    step = 1;
    isAggressive = false;
}

function stopDecrement() {
    clearTimeout(decrementTimeout);
    clearInterval(decrementInterval);
    clearTimeout(stepIncreaseTimeout);
    speed = 150;
    step = 1;
    isAggressive = false;
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
        // Do nothing if the input is empty or negative
        return;
    }
    if (count >= spendAmount) {
        count -= spendAmount;
        updateDisplay();
        // Play a sound (requires user interaction to work in many browsers)
        const audio = new Audio('../bzzz.mp3');
        audio.play();
        // Vibrate the device (only works on mobile devices)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    } else {
        // Show warning if not enough energy
        alert('NOT ENOUGH ENERGY');
    }
}

// Filter input to disallow negative values
document.getElementById('spendAmount').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value < 0) {
        e.target.value = 0; // Set to 0 if negative value is entered
    }
});

// Handle spend button click
function handleSpend() {
    const spendAmount = parseInt(document.getElementById('spendAmount').value, 10);
    if (isNaN(spendAmount) || spendAmount <= 0) {
        return; // Do nothing if the input is empty or not a positive number
    }
    if (count >= spendAmount) {
        count -= spendAmount;
        updateDisplay();
        const audio = new Audio('bzzz.mp3');
        audio.play();
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    } else {
        alert('NOT ENOUGH ENERGY');
    }
}

document.getElementById('spendButton').addEventListener('click', handleSpend);

updateDisplay(); // Initialize display