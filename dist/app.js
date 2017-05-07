/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameProcessor = __webpack_require__(3);

var Display = function () {
    function Display(_ref) {
        var width = _ref.width,
            height = _ref.height,
            canvas = _ref.canvas,
            cellSize = _ref.cellSize,
            borderWidth = _ref.borderWidth,
            strokeColor = _ref.strokeColor,
            deadCellColor = _ref.deadCellColor,
            aliveCellColor = _ref.aliveCellColor;

        _classCallCheck(this, Display);

        this.processor = new GameProcessor({ width: width, height: height });
        this.canvas = canvas;
        this.config = {
            cellSize: cellSize || 10,
            borderWidth: borderWidth || 1,
            strokeColor: strokeColor || '#c5fdf3',
            deadCellColor: deadCellColor || 'white',
            aliveCellColor: aliveCellColor || '#0bfd94'
        };

        this.canvas.width = this.config.cellSize * this.processor.width;
        this.canvas.height = this.config.cellSize * this.processor.height;
    }

    _createClass(Display, [{
        key: 'initialRender',
        value: function initialRender() {
            var context = this.canvas.getContext('2d');

            for (var row = 0; row < this.height; row++) {
                for (var column = 0; column < this.width; column++) {
                    this.drawCell({ context: context, column: column, row: row });
                }
            }

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _this = this;
            var drawGrid = function drawGrid() {
                var context = _this2.canvas.getContext('2d');

                if (_this2.isPaused) {
                    return false;
                }

                _this2.processor.nextStep();

                // Initial rendering
                if (_this2.processor.diff === null) {
                    _this2.initialRender();
                } else {
                    _this2.processor.diff.map(function (_ref2) {
                        var x = _ref2.x,
                            y = _ref2.y;

                        _this2.drawCell({ context: context, column: x, row: y });
                    });
                }

                context.closePath();

                return true;
            };

            this.refreshInterval = setInterval(function () {
                return drawGrid.call(_this);
            }, this.generationRefreshTime);

            return this;
        }
    }, {
        key: 'pause',
        value: function pause() {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;

            return this;
        }
    }, {
        key: 'resume',
        value: function resume() {
            return this.render();
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.pause();
            this.processor = new GameProcessor({
                width: this.width,
                height: this.height
            });
            this.initialRender().resume();
        }
    }, {
        key: 'getCellAddressByOffsets',
        value: function getCellAddressByOffsets(_ref3) {
            var offsetX = _ref3.offsetX,
                offsetY = _ref3.offsetY;

            return {
                x: Math.floor(offsetX / this.config.cellSize),
                y: Math.floor(offsetY / this.config.cellSize)
            };
        }
    }, {
        key: 'getCellState',
        value: function getCellState(_ref4) {
            var x = _ref4.x,
                y = _ref4.y;

            return this.processor.matrix[y][x];
        }
    }, {
        key: 'setCellState',
        value: function setCellState(_ref5) {
            var x = _ref5.x,
                y = _ref5.y,
                state = _ref5.state;

            this.processor.matrix[y][x] = parseInt(state);

            return this.drawCell({
                context: this.canvas.getContext('2d'),
                column: x,
                row: y
            });
        }
    }, {
        key: 'drawCell',
        value: function drawCell(_ref6) {
            var context = _ref6.context,
                column = _ref6.column,
                row = _ref6.row;

            var x = column * this.config.cellSize;
            var y = row * this.config.cellSize;

            context.beginPath();
            context.lineWidth = this.config.borderWidth;
            context.strokeStyle = this.config.strokeColor;

            context.rect(x, y, this.config.cellSize, this.config.cellSize);
            context.fillStyle = this.processor.matrix[row][column] === 1 ? this.config.aliveCellColor : this.config.deadCellColor;
            context.fill();
            context.stroke();

            return this;
        }
    }, {
        key: 'setGenerationRefreshTime',
        value: function setGenerationRefreshTime(ms) {
            this.generationRefreshTime = ms;

            return this;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.processor.width;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.processor.height;
        }
    }, {
        key: 'isPaused',
        get: function get() {
            return !this.refreshInterval;
        }
    }]);

    return Display;
}();

module.exports = Display;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Display = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', function () {
    var refreshTime = 1000;
    var canvas = document.getElementById('canvas');
    var display = new Display({
        canvas: canvas,
        width: 200,
        height: 200,
        cellSize: 10,
        borderWidth: 1
    }).setGenerationRefreshTime(refreshTime).render();

    document.getElementById('pause').addEventListener('click', function (e) {
        var element = e.target;
        var pausedText = element.getAttribute('data-paused-text');
        var ongoingText = element.getAttribute('data-ongoing-text');

        if (display.isPaused) {
            display.resume();
            element.innerHTML = ongoingText;
        } else {
            display.pause();
            element.innerHTML = pausedText;
        }
    });

    document.getElementById('restart').addEventListener('click', function () {
        var pauseButton = document.getElementById('pause');

        display.restart();
        pauseButton.innerHTML = pauseButton.getAttribute('data-ongoing-text');
    });

    canvas.addEventListener('click', function (e) {
        var address = display.getCellAddressByOffsets({
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        var oppositeState = display.getCellState(address) === 1 ? 0 : 1;

        display.setCellState({
            x: address.x,
            y: address.y,
            state: oppositeState
        });
    });

    var speedControlElements = document.getElementsByClassName('speed-control');
    for (var i = 0; i < speedControlElements.length; i++) {
        speedControlElements[i].addEventListener('click', function (e) {
            var speedFactor = parseInt(e.target.getAttribute('data-speed-factor'));
            var newRefreshTime = Math.floor(refreshTime / speedFactor);
            var pauseButton = document.getElementById('pause');

            display.pause().setGenerationRefreshTime(newRefreshTime).resume();

            pauseButton.innerHTML = pauseButton.getAttribute('data-ongoing-text');
        });
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cells = function () {
    function Cells(input) {
        _classCallCheck(this, Cells);

        this.cells = [];
        this.width = null;
        this.height = null;
        this.DEAD_STATE = 0;

        if (input) {
            this.spawnCells(input);
        }
    }

    _createClass(Cells, [{
        key: 'spawnCells',
        value: function spawnCells(input) {
            if (Array.isArray(input)) {
                this.cells = input;
            } else {
                this.cells = this.constructor.spawnRandomCells(input);
            }

            this.width = this.cells[0].length;
            this.height = this.cells.length;

            return this;
        }
    }, {
        key: 'getNeighbourAddress',
        value: function getNeighbourAddress(x, y, direction) {
            var address = { x: x, y: y };

            switch (direction) {
                case 'top':
                    address.y = y - 1;
                    break;
                case 'topRight':
                    address = { x: x + 1, y: y - 1 };
                    break;
                case 'right':
                    address.x = x + 1;
                    break;
                case 'bottomRight':
                    address = { x: x + 1, y: y + 1 };
                    break;
                case 'bottom':
                    address.y = y + 1;
                    break;
                case 'bottomLeft':
                    address = { x: x - 1, y: y + 1 };
                    break;
                case 'left':
                    address.x = x - 1;
                    break;
                case 'topLeft':
                    address = { x: x - 1, y: y - 1 };
                    break;
                default:
                    throw new Error('Wrong direction');
            }

            return address;
        }
    }, {
        key: 'getNeighbourState',
        value: function getNeighbourState(x, y, direction) {
            var address = this.getNeighbourAddress(x, y, direction);

            return this.getCellState(address.x, address.y);
        }
    }, {
        key: 'getCellState',
        value: function getCellState(x, y) {
            if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
                return this.DEAD_STATE;
            } else {
                return this.cells[y][x];
            }
        }
    }, {
        key: 'directions',
        get: function get() {
            return ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft'];
        }
    }], [{
        key: 'spawnRandomCells',
        value: function spawnRandomCells(_ref) {
            var width = _ref.width,
                height = _ref.height;

            var cells = [];

            for (var y = 0; y < width; y++) {
                if (Array.isArray(cells[y]) === false) {
                    cells[y] = [];
                }

                for (var x = 0; x < height; x++) {
                    cells[y][x] = Math.round(Math.random());
                }
            }

            return cells;
        }
    }]);

    return Cells;
}();

module.exports = Cells;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cells = __webpack_require__(2);

var GameProcessor = function () {
    function GameProcessor(params) {
        _classCallCheck(this, GameProcessor);

        this.cells = new Cells(params);
        this.diff = null;
    }

    _createClass(GameProcessor, [{
        key: 'shouldBeAlive',
        value: function shouldBeAlive(currentState, aliveNeighboursCount) {
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
    }, {
        key: 'nextGenerationCellState',
        value: function nextGenerationCellState(x, y) {
            var _this = this;

            var states = this.cells.directions.map(function (direction) {
                return _this.cells.getNeighbourState(x, y, direction);
            });
            var aliveCount = states.filter(function (state) {
                return state === 1;
            }).length;
            var currentCellState = this.matrix[y][x];

            return this.shouldBeAlive(currentCellState, aliveCount);
        }
    }, {
        key: 'nextStep',
        value: function nextStep() {
            var nextGenerationCells = [];
            var diff = [];

            for (var y = 0; y < this.cells.height; y++) {
                if (nextGenerationCells[y] === undefined) {
                    nextGenerationCells[y] = [];
                }

                for (var x = 0; x < this.cells.width; x++) {
                    var currentState = this.cells.cells[y][x];
                    var nextState = this.nextGenerationCellState(x, y);

                    if (currentState !== nextState) {
                        diff.push({ x: x, y: y });
                    }

                    nextGenerationCells[y][x] = nextState;
                }
            }

            this.diff = diff;
            this.cells = new Cells(nextGenerationCells);

            return this;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.cells.width;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.cells.height;
        }
    }, {
        key: 'matrix',
        get: function get() {
            return this.cells.cells;
        }
    }]);

    return GameProcessor;
}();

module.exports = GameProcessor;

/***/ })
/******/ ]);