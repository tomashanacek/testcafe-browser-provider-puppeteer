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

    // Required - must be implemented
    // Browser control
    openBrowser: function openBrowser(id, pageUrl) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var puppeteerArgs, browser, page;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log('[OPEN BROWSER] Puppeteer');

                            puppeteerArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];


                            console.log('[OPEN BROWSER] Puppeteer args:', puppeteerArgs);

                            _context.next = 5;
                            return _puppeteerCore2.default.launch({
                                args: puppeteerArgs,
                                executablePath: '/usr/bin/chromium',
                                timeout: TIMEOUT
                            });

                        case 5:
                            browser = _context.sent;


                            _this.browsers[id] = browser;

                            _context.next = 9;
                            return browser.newPage();

                        case 9:
                            page = _context.sent;
                            _context.next = 12;
                            return page.goto(pageUrl);

                        case 12:
                            _this.openedPages[id] = page;

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log('[CLOSE BROWSER] Puppeteer');
                            delete _this2.openedPages[id];
                            _context2.next = 4;
                            return _this2.browsers[id].close();

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    isValidBrowserName: function isValidBrowserName() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },


    // Extra methods
    resizeWindow: function resizeWindow(id, width, height) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _this4.openedPages[id].setViewport({ width: width, height: height });

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _this5.openedPages[id].screenshot({ path: screenshotPath });

                        case 2:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    }
};
module.exports = exports['default'];