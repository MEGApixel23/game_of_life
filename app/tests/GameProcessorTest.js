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
            const processor = new GameProcessor({
                width: 1,
                height: 1
            });
            const input = [
                {
                    currentState: 1,
                    aliveNeighboursCount: [2, 3],
                    shouldBeAlive: 1
                }, {
                    currentState: 1,
                    aliveNeighboursCount: [0, 1],
                    shouldBeAlive: 0
                }, {
                    currentState: 1,
                    aliveNeighboursCount: [4, 5, 6, 7, 8],
                    shouldBeAlive: 0
                }, {
                    currentState: 0,
                    aliveNeighboursCount: [3],
                    shouldBeAlive: 1
                }, {
                    currentState: 0,
                    aliveNeighboursCount: [1, 2, 4, 5, 6, 7, 8],
                    shouldBeAlive: 0
                }
            ];

            input.map(({currentState, aliveNeighboursCount, shouldBeAlive}) => {
                aliveNeighboursCount.map((item) => {
                    assert.equal(
                        processor.shouldBeAlive(currentState, item),
                        shouldBeAlive
                    );
                });
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

        it('should return "alive" state if a dead cell has exactly 3 neighbours', () => {
            const processor = new GameProcessor([
                [0, 0, 1, 1],
                [0, 0, 1, 1],
                [0, 1, 0, 1]
            ]);

            assert.equal(processor.nextGenerationCellState(1, 1), 1);
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
                [0, 1, 1, 0],
                [0, 0, 0, 1],
                [0, 1, 1, 0]
            ];
            const processor = new GameProcessor(matrix);

            assert.deepEqual(
                processor.nextStep().matrix,
                nextGenerationMatrix
            );
        });
    });
});