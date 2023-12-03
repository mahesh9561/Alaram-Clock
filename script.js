document.addEventListener('DOMContentLoaded', function () {
    const timers = [];

    // Timer Input Section
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const startTimerButton = document.getElementById('start-timer');

    // Active Timers Display Section
    const activeTimersSection = document.querySelector('.active-timers-section');

    // Timer End Display Design
    const timerAlert = new Audio('alert.mp3');

    startTimerButton.addEventListener('click', function () {
        // Validate input
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid time.');
            return;
        }

        // Start new timer
        const timer = {
            hours,
            minutes,
            seconds,
            intervalId: setInterval(() => updateTimer(timer), 1000),
            displayElement: createTimerElement(),
        };

        timers.push(timer);
        updateActiveTimersDisplay();
    });

    function createTimerElement() {
        const timerElement = document.createElement('div');
        activeTimersSection.appendChild(timerElement);
        return timerElement;
    }

    function updateTimer(timer) {
        if (timer.seconds > 0 || timer.minutes > 0 || timer.hours > 0) {
            if (timer.seconds === 0) {
                if (timer.minutes === 0) {
                    timer.hours -= 1;
                    timer.minutes = 59;
                } else {
                    timer.minutes -= 1;
                }
                timer.seconds = 59;
            } else {
                timer.seconds -= 1;
            }
        } else {
            clearInterval(timer.intervalId);
            playTimerAlert();
            timer.displayElement.classList.add('timer-ended');
            updateActiveTimersDisplay();
        }

        updateActiveTimersDisplay();
    }

    function updateActiveTimersDisplay() {
        timers.forEach(timer => {
            timer.displayElement.innerHTML = `
                <span>${formatTime(timer)}</span>
                <button class="stop-timer" data-index="${timers.indexOf(timer)}">Stop Timer</button>
                <button class="delete-timer" data-index="${timers.indexOf(timer)}">Delete</button>
            `;
            timer.displayElement.querySelector('.stop-timer').addEventListener('click', function () {
                clearInterval(timer.intervalId);
                timers.splice(timers.indexOf(timer), 1);
                updateActiveTimersDisplay();
            });
            timer.displayElement.querySelector('.delete-timer').addEventListener('click', function () {
                timers.splice(timers.indexOf(timer), 1);
                updateActiveTimersDisplay();
            });
        });
    }

    function formatTime(timer) {
        const format = val => (val < 10 ? `0${val}` : val);
        return `${format(timer.hours)}:${format(timer.minutes)}:${format(timer.seconds)}`;
    }

    function playTimerAlert() {
        timerAlert.play();
    }
});
