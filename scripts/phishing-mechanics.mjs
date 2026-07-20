import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "node:fs";
import path from "node:path";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3335").replace(/\/$/, "");
const timeoutMs = Number(process.env.SELENIUM_TIMEOUT_MS || 20000);
const headless = process.env.SELENIUM_HEADLESS !== "0";

function chromeOptions() {
  const profileRoot = process.env.CHROME_PROFILE_ROOT || path.join(process.cwd(), ".tmp", "chrome");
  fs.mkdirSync(profileRoot, { recursive: true });
  const options = new chrome.Options();
  if (headless) options.addArguments("--headless=new");
  options.addArguments(
    "--disable-background-networking",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=${fs.mkdtempSync(path.join(profileRoot, `profile-${process.pid}-`))}`,
    "--window-size=1440,1200"
  );
  return options;
}

async function waitForReady(driver) {
  await driver.wait(until.elementLocated(By.css("body")), timeoutMs);
  await driver.wait(async () => (await driver.executeScript("return document.readyState")) === "complete", timeoutMs);
}

async function blockBackgroundRequests(driver) {
  if (driver.__swgBackgroundRequestsBlocked) return;
  driver.__swgBackgroundRequestsBlocked = true;
  try {
    await driver.sendDevToolsCommand("Network.enable", {});
    await driver.sendDevToolsCommand("Network.setBlockedURLs", { urls: ["*?_rsc=*", "*/socket.io/*"] });
  } catch {
  }
}

async function openPath(driver, path) {
  await blockBackgroundRequests(driver);
  await driver.get(`${baseUrl}${path}`);
  await waitForReady(driver);
  await driver.sleep(750);
}

async function clickAndSwitchToNewWindow(driver, selector) {
  const before = await driver.getAllWindowHandles();
  await driver.wait(until.elementLocated(By.css(selector)), timeoutMs);
  await driver.executeScript(`
    const target = document.querySelector(arguments[0]);
    if (!target) throw new Error("Missing click target: " + arguments[0]);
    target.click();
  `, selector);
  await driver.wait(async () => (await driver.getAllWindowHandles()).length > before.length, timeoutMs);
  const after = await driver.getAllWindowHandles();
  const next = after.find((handle) => !before.includes(handle));
  if (!next) throw new Error(`No new window opened for ${selector}`);
  await driver.switchTo().window(next);
  await waitForReady(driver);
  return { previous: before[0], opened: next };
}

async function closeOpenedWindow(driver, previous) {
  await driver.close();
  await driver.switchTo().window(previous);
}

async function assertBodyMatches(driver, pattern, label) {
  const bodyText = await driver.findElement(By.css("body")).getText();
  if (!pattern.test(bodyText)) throw new Error(`${label} did not render expected text`);
}

async function assertDummyMicrosoftLogin(driver, label) {
  await assertBodyMatches(driver, /Microsoft[\s\S]*Sign in/i, label);
  const hasExpectedForm = await driver.executeScript(`
    return Boolean(
      document.querySelector("#dummy-microsoft-form") &&
      document.querySelector("#dummy-microsoft-result") &&
      document.querySelector("#dummy-account") &&
      document.querySelector("#dummy-password")
    );
  `);
  if (!hasExpectedForm) throw new Error(`${label} did not render the content-mutation dummy login form`);
}

async function assertUrlManipulation(driver) {
  await openPath(driver, "/phishing/url-manipulation");
  const { previous } = await clickAndSwitchToNewWindow(driver, "[data-open='url-manipulation']");
  const url = await driver.getCurrentUrl();
  if (!url.includes("/phishing/rnicrosoft-Iogin/")) {
    throw new Error(`URL manipulation opened unexpected URL: ${url}`);
  }
  await assertDummyMicrosoftLogin(driver, "URL manipulation target");
  await closeOpenedWindow(driver, previous);
  console.log("OK phishing mechanics url-manipulation");
}

async function assertStoredPage(driver, format) {
  await openPath(driver, "/phishing/site-stored-as-mhtml-or-raw-html");
  if (format === "mhtml") {
    await driver.wait(until.elementLocated(By.css("[data-chip][data-format='mhtml']")), timeoutMs);
    await driver.executeScript(`
      const target = document.querySelector("[data-chip][data-format='mhtml']");
      if (!target) throw new Error("Missing MHTML format chip");
      target.click();
    `);
  }
  const { previous } = await clickAndSwitchToNewWindow(driver, "[data-stored-launch]");
  const url = await driver.getCurrentUrl();
  if (!url.startsWith("blob:")) throw new Error(`${format} stored page should open as a browser-generated blob, got ${url}`);
  await assertDummyMicrosoftLogin(driver, `stored ${format} page`);
  await closeOpenedWindow(driver, previous);
  console.log(`OK phishing mechanics stored-${format}`);
}

async function assertCanvasPage(driver) {
  await openPath(driver, "/phishing/canvas-engine");
  const { previous } = await clickAndSwitchToNewWindow(driver, "[data-canvas-launch]");
  const url = await driver.getCurrentUrl();
  if (!url.startsWith("blob:")) throw new Error(`canvas page should open as a browser-generated blob, got ${url}`);
  const hasCanvas = await driver.executeScript("return Boolean(document.querySelector('#login-canvas'))");
  if (!hasCanvas) throw new Error("canvas page did not render the phishing canvas");
  await closeOpenedWindow(driver, previous);
  console.log("OK phishing mechanics canvas");
}

async function assertContentMutation(driver) {
  await openPath(driver, "/phishing/cached-content-mutation");
  const { previous } = await clickAndSwitchToNewWindow(driver, "[data-cache-launch]");
  const firstUrl = await driver.getCurrentUrl();
  if (!/\/phishing\/cache-test\.php\?test=[a-f0-9]{32}$/.test(firstUrl)) {
    throw new Error(`content mutation opened unexpected URL: ${firstUrl}`);
  }
  await assertBodyMatches(driver, /Page not loaded[\s\S]*Refresh/i, "content mutation prime page");
  await driver.navigate().refresh();
  await waitForReady(driver);
  await assertDummyMicrosoftLogin(driver, "content mutation changed page");
  await closeOpenedWindow(driver, previous);
  console.log("OK phishing mechanics content-mutation");
}

async function assertCredentialSubmission(driver) {
  await openPath(driver, "/phishing/form-submission-on-random-site");
  await driver.wait(until.elementLocated(By.css("[data-credential-form] button[type='submit']")), timeoutMs);
  await driver.executeScript(`
    const button = document.querySelector("[data-credential-form] button[type='submit']");
    if (!button) throw new Error("Missing credential submit button");
    button.click();
  `);
  await driver.wait(async () => {
    const output = await driver.executeScript(`
      const output = document.querySelector("[data-test-output]");
      return output ? output.textContent : "";
    `);
    return /Test failed/i.test(output);
  }, timeoutMs);
  console.log("OK phishing mechanics credential-submit");
}

let driver;
try {
  driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions()).build();
  await assertUrlManipulation(driver);
  await assertStoredPage(driver, "raw-html");
  await assertCanvasPage(driver);
  await assertContentMutation(driver);
  await assertCredentialSubmission(driver);
} finally {
  if (driver) await driver.quit();
}
