const assert = require('chai').assert;
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

    describe('Next generation state calculation', () => {
        it('should return proper state of cell for next generation', () => {
            const processor = new GameProcessor([
                [0, 0, 1],
                [0, 1, 0],
                [0, 0, 0]
            ]);
            const input = [
                {aliveNeighboursCount: 0, shouldBeAlive: false},
                {aliveNeighboursCount: 1, shouldBeAlive: false},
                {aliveNeighboursCount: 2, shouldBeAlive: true},
                {aliveNeighboursCount: 3, shouldBeAlive: true},
                {aliveNeighboursCount: 4, shouldBeAlive: false},
                {aliveNeighboursCount: 5, shouldBeAlive: false},
                {aliveNeighboursCount: 6, shouldBeAlive: false},
                {aliveNeighboursCount: 7, shouldBeAlive: false},
                {aliveNeighboursCount: 8, shouldBeAlive: false},
            ];

            input.map(({aliveNeighboursCount, shouldBeAlive}) => {
                assert.equal(
                    processor.shouldBeAlive(aliveNeighboursCount),
                    shouldBeAlive
                );
            });
        });
    });

    describe('Next generation state of a cell', () => {
        it('should return "dead" state if cell has 0 or 1 neighbours', () => {
            const processor = new GameProcessor([
                [0, 0, 1, 1],
                [0, 1, 0, 1],
                [0, 0, 0, 1]
            ]);

            assert.equal(
                processor.nextGenerationCellState(1, 1),
                0
            );
        });

        it('should return "alive" state if cell has 2 or 3 neighbours', () => {
            const processor = new GameProcessor([
                [0, 0, 1, 1],
                [0, 1, 1, 1],
                [0, 0, 0, 1]
            ]);

            assert.equal(processor.nextGenerationCellState(1, 1), 1);
        });

        it('should return "dead" state if cell has more than 4 neighbours', () => {
            const processor = new GameProcessor([
                [0, 0, 1, 1],
                [0, 1, 1, 1],
                [0, 1, 1, 1]
            ]);

            assert.equal(processor.nextGenerationCellState(1, 1), 0);
        });
    });

    describe('Changing of cells states on next generation', () => {
        it('should change cells states according to rules', () => {
            const matrix = [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0]
            ];
            const nextGenerationMatrix = [
                [0, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ];
            const processor = new GameProcessor(matrix);

            assert.deepEqual(
                processor.nextStep().matrix,
                nextGenerationMatrix
            );
        });
    });
});