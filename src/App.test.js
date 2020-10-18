const playwright = require('playwright');
jest.setTimeout(120000);

const pathToScheduler = "https://hackathonlogin-95995.firebaseapp.com";
let browser;
let context;
let page;


beforeAll(async () => {
    browser = await playwright.webkit.launch({headless: false, slowMo: 1000});
})

beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
})

afterEach(async () => {
    await context.close();
})

afterAll(async () => {
    await browser.close();
})

describe ("Personal scheduling UI tests", () =>{
  test("0. Open scheduler", async () => {
    await page.goto(pathToScheduler);
    await page.waitForSelector("#root");
  })
  
  test("3.1 Scroll of months to the left", async () => {
    await page.goto(pathToScheduler);
    await page.waitForSelector(".Arrow");
    await page.click(".Arrow");
    await page.waitForSelector(".month");
    const nameOfPrevMonth = await page.$eval(".month", el => el.textContent);
    expect(nameOfPrevMonth).toEqual("Сентябрь - 2020");
  })
  test("3.2 Scroll of months to the right", async () => {
    await page.goto(pathToScheduler);
    await page.waitForSelector(".arrow-next");
    await page.click(".arrow-next");
    const nameOfNextMonth = await page.$eval(".month", el => el.textContent);
    expect(nameOfNextMonth).toEqual("Ноябрь - 2020");
  })
  test("3.3 Scroll of months by Today button", async () => {
    await page.goto(pathToScheduler);
    await page.waitForSelector(".Arrow");
    // Store value of current month
    const nameOfCurrentMonth = await page.$eval(".month", el => el.textContent);
    await page.click(".Arrow");
    const firstOfNewMonth = await page.$eval(".month", el => el.textContent);
    await page.click(".Arrow");
    await page.waitForSelector(".header__today");
    await page.click(".header__today");
    const nameOfNewMonth = await page.$eval(".month", el => el.textContent);
    expect(nameOfNewMonth).toEqual(nameOfCurrentMonth);
  })

  test.skip("7.1 Change event status to done", async () => {
    await page.goto(pathToScheduler);
    //Create Event
    await page.waitForSelector("div.event :nth-child(2) > input");
    const oldNumberEvents = await page.$eval("span.done-event", el => el.textContent);
    await page.click("div.event :nth-child(2) > input");
    const newNumberEvents = await page.$eval("span.done-current", el => el.textContent);
    expect(Number(newNumberEvents)).toEqual(Number(oldNumberEvents)-1);
  })


})