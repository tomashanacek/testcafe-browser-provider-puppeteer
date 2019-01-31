'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _puppeteerCore = require('puppeteer-core');

var _puppeteerCore2 = _interopRequireDefault(_puppeteerCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEOUT = 5 * 60 * 1000;

exports.default = {
    // Multiple browsers support
    isMultiBrowser: false,

    openedPages: {},
    browsers: {},
    browser: null,

    init: function init() {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var puppeteerArgs;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            puppeteerArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];


                            console.log('[INIT] Puppeteer args:', puppeteerArgs);

                            _context.next = 4;
                            return _puppeteerCore2.default.launch({
                                args: puppeteerArgs,
                                executablePath: '/usr/bin/chromium',
                                timeout: TIMEOUT
                            });

                        case 4:
                            _this.browser = _context.sent;

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    dispose: function dispose() {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log('[DISPOSE] Puppeteer');
                            _context2.next = 3;
                            return _this2.browser.close();

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },


    // Required - must be implemented
    // Browser control
    openBrowser: function openBrowser(id, pageUrl) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var browser, page;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            console.log('[CONNECT] Puppeteer');
                            _context3.next = 3;
                            return _puppeteerCore2.default.connect({ browserWSEndpoint: _this3.browser.wsEndpoint(), timeout: TIMEOUT });

                        case 3:
                            browser = _context3.sent;

                            _this3.browsers[id] = browser;

                            _context3.next = 7;
                            return browser.newPage();

                        case 7:
                            page = _context3.sent;
                            _context3.next = 10;
                            return page.goto(pageUrl);

                        case 10:
                            _this3.openedPages[id] = page;

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            console.log('[DISCONNECT] Puppeteer');
                            delete _this4.openedPages[id];
                            _context4.next = 4;
                            return _this4.browsers[id].disconnect();

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    isValidBrowserName: function isValidBrowserName() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            return _context5.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },


    // Extra methods
    resizeWindow: function resizeWindow(id, width, height) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _this6.openedPages[id].setViewport({ width: width, height: height });

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath) {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return _this7.openedPages[id].screenshot({ path: screenshotPath });

                        case 2:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }))();
    }
};
module.exports = exports['default'];