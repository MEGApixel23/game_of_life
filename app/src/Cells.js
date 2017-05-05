class Cells {
    constructor(input) {
        this.cells = [];
        this.width = null;
        this.height = null;
        this.DEAD_STATE = 0;

        if (input) {
            this.spawnCells(input);
        }
    }

    get directions() {
        return [
            'top', 'topRight', 'right',
            'bottomRight', 'bottom', 'bottomLeft',
            'left', 'topLeft'
        ];
    }

    spawnCells(input) {
        if (Array.isArray(input)) {
            this.cells = input;
        } else {
            this.cells = this.constructor.spawnRandomCells(input);
        }

        this.width = this.cells[0].length;
        this.height = this.cells.length;

        return this;
    };

    getNeighbourAddress(x, y, direction) {
        let address = {x: x, y: y};

        switch (direction) {
            case 'top':
                address.y = y - 1;
                break;
            case 'topRight':
                address = {x: x + 1, y: y - 1};
                break;
            case 'right':
                address.x = x + 1;
                break;
            case 'bottomRight':
                address = {x: x + 1, y: y + 1};
                break;
            case 'bottom':
                address.y = y + 1;
                break;
            case 'bottomLeft':
                address = {x: x - 1, y: y + 1};
                break;
            case 'left':
                address.x = x - 1;
                break;
            case 'topLeft':
                address = {x: x - 1, y: y - 1};
                break;
            default:
                throw new Error('Wrong direction');
        }

        return address;
    };

    getNeighbourState(x, y, direction) {
        const address = this.getNeighbourAddress(x, y, direction);

        return this.getCellState(address.x, address.y);
    };

    getCellState(x, y) {
        if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
            return this.DEAD_STATE;
        } else {
            return this.cells[y][x];
        }
    };

    static spawnRandomCells({width, height}) {
        const cells = [];

        for (let y = 0; y < width; y++) {
            if (Array.isArray(cells[y]) === false) {
                cells[y] = [];
            }

            for (let x = 0; x < height; x++) {
                cells[y][x] = Math.round(Math.random());
            }
        }

        return cells;
    }
}

module.exports = Cells;