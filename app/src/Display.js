const GameProcessor = require('./../src/GameProcessor');

class Display {
    constructor({width, height, canvas, cellSize, borderWidth, strokeColor, deadCellColor, aliveCellColor}) {
        this.processor = new GameProcessor({width, height});
        this.canvas = canvas;
        this.config = {
            cellSize: cellSize || 10,
            borderWidth: borderWidth || 1,
            strokeColor: strokeColor || '#c5fdf3',
            deadCellColor: deadCellColor || 'white',
            aliveCellColor: aliveCellColor || '#0bfd94',
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

    initialRender() {
        const context = this.canvas.getContext('2d');

        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.drawCell({context, column, row});
            }
        }

        return this;
    }

    render() {
        const _this = this;
        const drawGrid = () => {
            const context = this.canvas.getContext('2d');

            if (this.isPaused) {
                return false;
            }

            this.processor.nextStep();

            // Initial rendering
            if (this.processor.diff === null) {
                this.initialRender();
            } else {
                this.processor.diff.map(({x, y}) => {
                    this.drawCell({context, column: x, row: y});
                });
            }

            context.closePath();

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
        this.initialRender().resume();
    }

    getCellAddressByOffsets({offsetX, offsetY}) {
        return {
            x: Math.floor(offsetX / this.config.cellSize),
            y: Math.floor(offsetY / this.config.cellSize)
        };
    }

    getCellState({x, y}) {
        return this.processor.matrix[y][x];
    }

    setCellState({x, y, state}) {
        this.processor.matrix[y][x] = parseInt(state);

        return this.drawCell({
            context: this.canvas.getContext('2d'),
            column: x,
            row: y
        })
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