import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "node:fs";
import path from "node:path";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3335").replace(/\/$/, "");
const timeoutMs = Number(process.env.SELENIUM_TIMEOUT_MS || 25000);
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
    // Older Selenium/Chrome combinations may not expose CDP; tests still work without it on CI.
  }
}

async function openPath(driver, path) {
  await blockBackgroundRequests(driver);
  await driver.get(`${baseUrl}${path}`);
  await waitForReady(driver);
  await driver.sleep(750);
}

async function setTestFile(driver, selector, fileName = "sample-data.txt") {
  await driver.wait(until.elementLocated(By.css(selector)), timeoutMs);
  await driver.executeScript(`
    const input = document.querySelector(arguments[0]);
    if (!input) throw new Error("Missing file input: " + arguments[0]);
    const file = new File([arguments[2]], arguments[1], { type: "text/plain" });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  `, selector, fileName, "name,email\nAda Lovelace,ada@example.test\nGrace Hopper,grace@example.test\n");
}

async function click(driver, selector) {
  await driver.wait(until.elementLocated(By.css(selector)), timeoutMs);
  await driver.executeScript(`
    const target = document.querySelector(arguments[0]);
    if (!target) throw new Error("Missing click target: " + arguments[0]);
    target.click();
  `, selector);
}

async function waitForText(driver, selector, pattern, label, waitMs = timeoutMs) {
  await driver.wait(async () => {
    const text = await driver.executeScript(`
      const node = document.querySelector(arguments[0]);
      return node ? node.textContent : "";
    `, selector);
    return pattern.test(text);
  }, waitMs, `${label} did not produce expected status`);
}

async function assertUpload(driver) {
  await openPath(driver, "/data-theft/personal-data-submission-in-normal-file");
  await setTestFile(driver, "input[name='personal_data_file']");
  await click(driver, "[data-file-submission-form] button[type='submit']");
  await waitForText(driver, "[data-test-output]", /Test failed/i, "normal file upload");
  console.log("OK data theft mechanics file-upload");
}

async function assertEncoding(driver) {
  await openPath(driver, "/data-theft/file-encoding");
  await setTestFile(driver, "[data-data-theft-encoding-form] input[type='file']");
  await click(driver, "[data-data-theft-encoding-form] button[type='submit']");
  await waitForText(driver, "[data-test-output]", /Test failed/i, "encoded file upload");
  console.log("OK data theft mechanics encoding");
}

async function assertEncryption(driver) {
  await openPath(driver, "/data-theft/file-encrypting");
  await setTestFile(driver, "[data-data-theft-encryption-form] input[type='file']");
  await click(driver, "[data-data-theft-encryption-form] button[type='submit']");
  await waitForText(driver, "[data-test-output]", /Test failed/i, "encrypted file upload");
  console.log("OK data theft mechanics encryption");
}

async function assertChunking(driver) {
  await openPath(driver, "/data-theft/file-chunking");
  await setTestFile(driver, "[data-data-theft-chunking-form] input[type='file']");
  await click(driver, "[data-data-theft-chunking-form] button[type='submit']");
  await waitForText(driver, "[data-test-output]", /Test failed/i, "chunked file upload");
  console.log("OK data theft mechanics chunking");
}

async function assertPathTunnel(driver) {
  await openPath(driver, "/data-theft/http-path-tunneling");
  await setTestFile(driver, "[data-path-tunnel-file]");
  await click(driver, "[data-path-tunnel-submit]");
  await waitForText(driver, "[data-path-tunnel-status]", /Test failed|reconstructed/i, "HTTP path tunnel", 45000);
  console.log("OK data theft mechanics http-path-tunnel");
}

async function assertDnsTunnelStarts(driver) {
  await openPath(driver, "/data-theft/dns-tunneling");
  await driver.executeScript(`
    if (!window.__swgDnsMechanicsInstalled) {
      const originalFetch = window.fetch.bind(window);
      window.__swgDnsMechanicsInstalled = true;
      window.__swgDnsTunnelRequests = [];
      window.fetch = function(input, init) {
        const url = typeof input === "string" ? input : input.url;
        if (/^https:\\/\\/[^/]+\\.swgaudit\\.com\\/?$/i.test(url)) {
          window.__swgDnsTunnelRequests.push(url);
          return Promise.resolve(new Response("", { status: 204 }));
        }
        return originalFetch(input, init);
      };
    }
  `);
  await setTestFile(driver, "[data-dns-tunnel-file]", "dns-sample.txt");
  await click(driver, "[data-dns-tunnel-submit]");
  await driver.wait(async () => {
    return await driver.executeScript("return (window.__swgDnsTunnelRequests || []).length > 0");
  }, timeoutMs, "DNS tunneling did not emit DNS-shaped requests");
  await waitForText(driver, "[data-dns-tunnel-status]", /DNS tunnell?ing|Checking server result|Test passed|Test failed|could not complete/i, "DNS tunnel", 10000);
  console.log("OK data theft mechanics dns-tunnel-start");
}

let driver;
try {
  driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions()).build();
  await assertUpload(driver);
  await assertEncoding(driver);
  await assertEncryption(driver);
  await assertChunking(driver);
  await assertPathTunnel(driver);
  await assertDnsTunnelStarts(driver);
} finally {
  if (driver) await driver.quit();
}
