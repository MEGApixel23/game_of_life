const Cells = require('./Cells');

class GameProcessor {
    constructor(params) {
        this.cells = new Cells(params);
        this.diff = null;
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

    shouldBeAlive(currentState, aliveNeighboursCount) {
        if (currentState === 0) {
            return aliveNeighboursCount === 3 ? 1 : 0;
        }

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
        const currentCellState = this.matrix[y][x];

        return this.shouldBeAlive(currentCellState, aliveCount);
    }

    nextStep() {
        const nextGenerationCells = [];
        const diff = [];

        for (let y = 0; y < this.cells.height; y++) {
            if (nextGenerationCells[y] === undefined) {
                nextGenerationCells[y] = [];
            }

            for (let x = 0; x < this.cells.width; x++) {
                let currentState = this.cells.cells[y][x];
                let nextState = this.nextGenerationCellState(x, y);

                if (currentState !== nextState) {
                    diff.push({x, y});
                }

                nextGenerationCells[y][x] = nextState;
            }
        }

        this.diff = diff;
        this.cells = new Cells(nextGenerationCells);

        return this;
    };
}

module.exports = GameProcessor;