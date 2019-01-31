import puppeteer from 'puppeteer';

export default {
    // Multiple browsers support
    isMultiBrowser: true,

    openedPages: {},
    browsers: {},

    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl, browserName) {
        let puppeteerArgs = ['--disable-dev-shm-usage'];

        if (browserName === 'no_sandbox') {
            puppeteerArgs = [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ];
        }
        const browser = await puppeteer.launch({
            args: puppeteerArgs
        });
        this.browsers[id] = browser

        const page = await browser.newPage();

        await page.goto(pageUrl);
        this.openedPages[id] = page;
    },

    async closeBrowser (id) {
        delete this.openedPages[id];
        await this.browsers[id].close();
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
