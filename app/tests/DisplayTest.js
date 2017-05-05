const assert = require('chai').assert;
const expect = require('chai').expect;
const Display = require('./../src/Display');


describe('Display API:', () => {
    describe('Initialisation', () => {
        it('should init display field options', () => {
            const width = 200;
            const height = 200;
            const display = new Display({
                width, height, canvas: 'canvas'
            });

            assert.deepEqual(
                {width: display.width, height: display.height},
                {width, height}
            );
        });
    });
});