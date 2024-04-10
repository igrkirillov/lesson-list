import puppeteer from "puppeteer";

describe("add item", () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test("invalid price", async () => {
    await page.goto("http://localhost:9000");

    const addButton = await page.$(".list-action-add");
    await addButton.click();

    const form = await page.$(".editor-form");
    const input = await form.$("#price");
    const submit = await form.$(".editor-button-save");

    await input.type("-500");
    await submit.click();

    // await page.waitForSelector(".submit[valid = true]");
  }, 10000);

  afterEach(async () => {
    await page.close();
    await browser.close();
  });
});
