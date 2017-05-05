const assert = require('chai').assert;
const expect = require('chai').expect;
const GameProcessor = require('./../src/GameProcessor');

describe('GameProcessor API:', () => {
    describe('Initialisation', () => {
        it('should generate random cells with given width & height', () => {
            const width = 10;
            const height = 10;
            const processor = new GameProcessor({width, height});

            assert.deepEqual(
                {height, width},
                {height: processor.height, width: processor.width}
            );
        });
    });

    describe('Next generation state of a cell calculation', () => {
        it('should return 0 (dead) if the cell has 0 or 1 neighbours', () => {
            const processor = new GameProcessor({cells: [
                [0, 0, 1],
                [0, 1, 0],
                [0, 0, 0]
            ]});

            assert.equal(processor.nextGenerationCellState(1, 1), 0);
        });
    });
});