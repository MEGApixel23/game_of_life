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

var Cells = __webpack_require__(2);

var GameProcessor = function () {
    function GameProcessor(params) {
        _classCallCheck(this, GameProcessor);

        this.cells = new Cells(params);
    }

    _createClass(GameProcessor, [{
        key: 'shouldBeAlive',
        value: function shouldBeAlive(aliveNeighboursCount) {
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

            return this.shouldBeAlive(aliveCount);
        }
    }, {
        key: 'nextStep',
        value: function nextStep() {
            var nextGenerationCells = [];

            for (var y = 0; y < this.cells.height; y++) {
                if (nextGenerationCells[y] === undefined) {
                    nextGenerationCells[y] = [];
                }

                for (var x = 0; x < this.cells.width; x++) {
                    nextGenerationCells[y][x] = this.nextGenerationCellState(x, y);
                }
            }

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameProcessor = __webpack_require__(0);

var processor = new GameProcessor({
    width: 20,
    height: 20
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

/***/ })
/******/ ]);