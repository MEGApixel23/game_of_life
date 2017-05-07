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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameProcessor = __webpack_require__(4);

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

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cells = __webpack_require__(3);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "canvas {\n    cursor: pointer;\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);