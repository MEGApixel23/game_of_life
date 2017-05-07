const GameProcessor = require('./../src/GameProcessor');

class Display {
    constructor({width, height, canvas}) {
        this.processor = new GameProcessor({width, height});
        this.canvas = canvas;
        this.config = {
            cellSize: 4,
            borderWidth: 0.5,
            strokeColor: '#c5fdf3',
            deadCellColor: 'white',
            aliveCellColor: '#0bfd94',
        };

        this.canvas.width = this.config.cellSize * this.processor.width;
        this.canvas.height = this.config.cellSize * this.processor.height;
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
        const _this = this;
        const drawGrid = () => {
            const context = this.canvas.getContext('2d');
            const diff = this.processor.diff;

            if (this.isPaused) {
                return false;
            }

            for (let row = 0; row < this.height; row++) {
                for (let column = 0; column < this.width; column++) {
                    this.drawCell({context, column, row});
                }
            }

            context.closePath();
            this.processor.nextStep();

            return true;
        };

        this.refreshInterval = setInterval(
            () => (drawGrid.call(_this)),
            this.generationRefreshTime
        );

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

    restart() {
        this.pause();
        this.processor = new GameProcessor({
            width: this.width,
            height: this.height
        });
        this.resume();
    }

    drawCell({context, column, row}) {
        const x = column * this.config.cellSize;
        const y = row * this.config.cellSize;

        context.beginPath();
        context.lineWidth = this.config.borderWidth;
        context.strokeStyle = this.config.strokeColor;

        context.rect(x, y, this.config.cellSize, this.config.cellSize);
        context.fillStyle = this.processor.matrix[row][column] === 1 ?
            this.config.aliveCellColor : this.config.deadCellColor;
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