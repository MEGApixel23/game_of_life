const assert = require('chai').assert;
const expect = require('chai').expect;
const Cells = require('./../src/Cells');

describe('Cells API:', () => {
    const matrix = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    const cells = new Cells(matrix);

    describe('Initialization', () => {
        it('should have the passed cells', () => {
            assert.deepEqual(matrix, cells.cells);
        });

        it('should have width = ' + matrix[0].length, () => {
            assert.equal(matrix[0].length, cells.width);
        });

        it('should have height = ' + matrix.length, () => {
            assert.equal(matrix[0].length, cells.width);
        });
    });

    describe('Finding the neighbours addresses', () => {
        it('should return proper neighbour addresses', () => {
            const addresses = [
                {direction: 'top', expected: {x: 1, y: 0}},
                {direction: 'topRight', expected: {x: 2, y: 0}},
                {direction: 'right', expected: {x: 2, y: 1}},
                {direction: 'bottomRight', expected: {x: 2, y: 2}},
                {direction: 'bottom', expected: {x: 1, y: 2}},
                {direction: 'bottomLeft', expected: {x: 0, y: 2}},
                {direction: 'left', expected: {x: 0, y: 1}},
                {direction: 'topLeft', expected: {x: 0, y: 0}},
            ];

            addresses.map(({expected, direction}) => {
                assert.deepEqual(
                    expected,
                    cells.getNeighbourAddress(1, 1, direction)
                );
            });
        });

        it('should throw an exception if wrong neighbour direction is passed', () => {
            expect(() => cells.getNeighbourAddress(1, 1, 'invalidDirection')).throw(Error);
        });
    });

    describe('Getting state of neighbours', () => {
        it('should return proper state of neighbour', () => {
            assert.equal(cells.getNeighbourState(1, 1, 'top'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'topRight'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'right'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'bottomRight'), 1);
            assert.equal(cells.getNeighbourState(1, 1, 'bottom'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'bottomLeft'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'left'), 0);
            assert.equal(cells.getNeighbourState(1, 1, 'topLeft'), 0);
        });
    });

    describe('Getting state of cell by address', () => {
        it('should return proper state of neighbour', () => {
            assert.equal(cells.getCellState(0, 0), 0);
            assert.equal(cells.getCellState(1, 0), 0);
            assert.equal(cells.getCellState(2, 0), 0);
            assert.equal(cells.getCellState(0, 1), 0);
            assert.equal(cells.getCellState(1, 1), 1);
            assert.equal(cells.getCellState(2, 1), 0);
            assert.equal(cells.getCellState(0, 2), 0);
            assert.equal(cells.getCellState(1, 2), 0);
            assert.equal(cells.getCellState(2, 2), 1);
        });
    });

    describe('Generating of random cells', () => {
        it('should give different results', () => {
            assert.notDeepEqual(
                new Cells({width: 2, height: 2}),
                new Cells({width: 3, height: 3})
            );
        });
    });

    describe('List of directions', () => {
        it('should return a list of directions', () => {
            assert.typeOf(cells.directions, 'array');
        });
    });
});