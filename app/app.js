require('./static/style.css');

const Display = require('./src/Display');

document.addEventListener('DOMContentLoaded', () => {
    const display = new Display({
        width: 200,
        height: 200,
        canvas: document.getElementById('canvas')
    }).setGenerationRefreshTime(500)
        .render();

    document.getElementById('pause')
        .addEventListener('click', (e) => {
            const element = e.target;
            const pausedText = element.getAttribute('data-paused-text');
            const ongoingText = element.getAttribute('data-ongoing-text');

            if (display.isPaused) {
                display.resume();
                element.innerHTML = ongoingText;
            } else {
                display.pause();
                element.innerHTML = pausedText;
            }
        });

    document.getElementById('restart')
        .addEventListener('click', () => {
            const pauseButton = document.getElementById('pause');

            display.restart();
            pauseButton.innerHTML = pauseButton.getAttribute('data-ongoing-text');
        });
});