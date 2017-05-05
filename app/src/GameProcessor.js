const Cells = require('./Cells');

class GameProcessor {
    constructor(params) {
        this.cells = new Cells(params.cells || params);
    }

    get width() {
        return this.cells.width;
    }

    get height() {
        return this.cells.height;
    }

    nextGenerationCellState(x, y) {
        
    }

    nextStep() {
        var neighbours;

        for (var y = 0; y < config.width; y++) {
            for (var x = 0; x < config.height; x++) {
                neighbours = [];
            }
        }

        console.log(neighbours);
    };
}

module.exports = GameProcessor;