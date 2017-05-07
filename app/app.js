require('./static/style.css');

const Display = require('./src/Display');

document.addEventListener('DOMContentLoaded', () => {
    const refreshTime = 1000;
    const canvas = document.getElementById('canvas');
    const display = new Display({
        canvas,
        width: 200,
        height: 200,
        cellSize: 10,
        borderWidth: 1
    }).setGenerationRefreshTime(refreshTime)
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

    canvas.addEventListener('click', (e) => {
        const address = display.getCellAddressByOffsets({
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        const oppositeState = display.getCellState(address) === 1 ? 0 : 1;

        display.setCellState({
            x: address.x,
            y: address.y,
            state: oppositeState
        });
    });

    const speedControlElements = document.getElementsByClassName('speed-control');
    for (let i = 0; i < speedControlElements.length; i++) {
        speedControlElements[i].addEventListener('click', (e) => {
            const speedFactor = parseInt(e.target.getAttribute('data-speed-factor'));
            const newRefreshTime = Math.floor(refreshTime / speedFactor);
            const pauseButton = document.getElementById('pause');

            display.pause()
                .setGenerationRefreshTime(newRefreshTime)
                .resume();

            pauseButton.innerHTML = pauseButton.getAttribute('data-ongoing-text');
        })
    }
});