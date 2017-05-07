const GameProcessor = require('./../src/GameProcessor');

class Display {
    constructor({width, height, canvas}) {
        this.processor = new GameProcessor({width, height});
        this.canvas = canvas;
        this.cellSize = 4;
        this.canvas.width = this.cellSize * this.processor.width;
        this.canvas.height = this.cellSize * this.processor.height;
    }

    get width() {
        return this.processor.width;
    }

    get height() {
        return this.processor.height;
    }

    get isPaused() {
        return !this.refreshInterval;
    }

    render() {
        const closure = () => {
            const context = this.canvas.getContext('2d');

            if (this.isPaused) {
                return false;
            }

            for (let row = 0; row < this.height; row++) {
                for (let column = 0; column < this.width; column++) {
                    this.drawCell({context, column, row});
                }
            }

            context.closePath();

            return true;
        };

        this.refreshInterval = setInterval(() => {
            closure() && this.processor.nextStep();
        }, this.generationRefreshTime);

        return this;
    }

    pause() {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;

        return this;
    }

    resume() {
        return this.render();
    }

    drawCell({context, column, row}) {
        const x = column * this.cellSize;
        const y = row * this.cellSize;

        context.beginPath();
        context.lineWidth = 0.5;
        context.strokeStyle = '#9ffd8e';

        context.rect(x, y, this.cellSize, this.cellSize);
        context.fillStyle = this.processor.matrix[row][column] === 1 ? 'black' : 'white';
        context.fill();
        context.stroke();

        return this;
    }

    setGenerationRefreshTime(ms) {
        this.generationRefreshTime = ms;

        return this;
    }
}

module.exports = Display;