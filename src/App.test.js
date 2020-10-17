// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';
const playwright = require('playwright');
jest.setTimeout(120000);

const pathToScheduler = "http://localhost:3000/";
let browser;
let context;
let page;


beforeAll(async () => {
    browser = await playwright.firefox.launch({headless: false, slowMo: 1000});
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
  test("Open scheduler", async () => {
    await page.goto(pathToScheduler);
    await page.waitForSelector("#root");

  })
})

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

