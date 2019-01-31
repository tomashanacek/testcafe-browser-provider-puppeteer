import puppeteer from 'puppeteer-core';

const TIMEOUT = 5 * 60 * 1000

export default {
    // Multiple browsers support
    isMultiBrowser: false,

    openedPages: {},
    browsers: {},
    browser: null,

    async init() {
        let puppeteerArgs = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ];

        console.log('[INIT] Puppeteer args:', puppeteerArgs)

        this.browser = await puppeteer.launch({
            args: puppeteerArgs,
            executablePath: '/usr/bin/chromium',
            timeout: TIMEOUT
        });
    },

    async dispose() {
        console.log('[DISPOSE] Puppeteer')
        await this.browser.close();
    },

    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl) {
        console.log('[CONNECT] Puppeteer')
        const browser = await puppeteer.connect({ browserWSEndpoint: this.browser.wsEndpoint(), timeout: TIMEOUT })
        this.browsers[id] = browser

        const page = await browser.newPage();

        await page.goto(pageUrl);
        this.openedPages[id] = page;
    },

    async closeBrowser (id) {
        console.log('[DISCONNECT] Puppeteer')
        delete this.openedPages[id];
        await this.browsers[id].disconnect();
    },


    async isValidBrowserName () {
        return true;
    },

    // Extra methods
    async resizeWindow (id, width, height) {
        await this.openedPages[id].setViewport({ width, height });
    },

    async takeScreenshot (id, screenshotPath) {
        await this.openedPages[id].screenshot({ path: screenshotPath });
    }
};
