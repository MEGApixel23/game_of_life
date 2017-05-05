const GameProcessor = require('./../src/GameProcessor');

class Display {
    constructor({width, height, canvas}) {
        this.processor = new GameProcessor({width, height});
    }

    get width() {
        return this.processor.width;
    }

    get height() {
        return this.processor.height;
    }
}

module.exports = Display;