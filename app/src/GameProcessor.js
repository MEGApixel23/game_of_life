const Cells = require('./Cells');

class GameProcessor {
    constructor(params) {
        this.cells = new Cells(params);
    }

    get width() {
        return this.cells.width;
    }

    get height() {
        return this.cells.height;
    }

    get matrix() {
        return this.cells.cells;
    }

    shouldBeAlive(aliveNeighboursCount) {
        if (aliveNeighboursCount >= 4) {
            return 0;
        } else if (aliveNeighboursCount >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

    nextGenerationCellState(x, y) {
        const states = this.cells.directions.map((direction) => (
            this.cells.getNeighbourState(x, y, direction)
        ));
        const aliveCount = states.filter((state) => (state === 1)).length;

        return this.shouldBeAlive(aliveCount);
    }

    nextStep() {
        const nextGenerationCells = [];

        for (let y = 0; y < this.cells.height; y++) {
            if (nextGenerationCells[y] === undefined) {
                nextGenerationCells[y] = [];
            }

            for (let x = 0; x < this.cells.width; x++) {
                nextGenerationCells[y][x] = this.nextGenerationCellState(x, y);
            }
        }

        this.cells = new Cells(nextGenerationCells);

        return this;
    };
}

module.exports = GameProcessor;