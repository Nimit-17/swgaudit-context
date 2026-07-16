import { Builder, By, logging, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3333").replace(/\/$/, "");
const headless = process.env.SELENIUM_HEADLESS !== "0";
const timeoutMs = Number(process.env.SELENIUM_TIMEOUT_MS || 20000);

const paths = [
  { path: "/", text: /SWG Audit|SWGAudit|Security Web Gateway/i },
  { path: "/malware", text: /Malware/i },
  { path: "/phishing", text: /Phishing/i },
  { path: "/data-theft", text: /Data Theft|Data Exfiltration/i },
  { path: "/cyberslacking", text: /Cyberslacking|Productivity/i },
];

const allowedConsoleNoise = [
  /favicon/i,
  /ResizeObserver loop/i,
  /Uncaught ReferenceError: require is not defined/i,
  /Uncaught ReferenceError: WScript is not defined/i,
  /\/_mintlify\/api\/user.*404/i,
  /\/socket\.io\/.*404/i,
  /Failed to load resource: the server responded with a status of 404.*manifest/i,
];

function buildChromeOptions() {
  const options = new chrome.Options();
  if (headless) {
    options.addArguments("--headless=new");
  }
  options.addArguments(
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1440,1200",
  );
  options.setLoggingPrefs(new logging.Preferences().setLevel(logging.Type.BROWSER, logging.Level.ALL));
  return options;
}

async function assertRenderedPage(driver, path, expectedText) {
  const url = `${baseUrl}${path}`;
  await driver.get(url);
  await driver.wait(until.elementLocated(By.css("body")), timeoutMs);
  await driver.wait(async () => {
    const readyState = await driver.executeScript("return document.readyState");
    return readyState === "complete";
  }, timeoutMs);

  const bodyText = await driver.findElement(By.css("body")).getText();
  if (!expectedText.test(bodyText)) {
    throw new Error(`${path} did not render expected SWGAudit content`);
  }

  const brokenImages = await driver.executeScript(`
    return Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src)
      .slice(0, 10);
  `);
  if (brokenImages.length > 0) {
    throw new Error(`${path} has broken images: ${brokenImages.join(", ")}`);
  }

  const title = await driver.getTitle();
  if (!/SWG Audit|SWGAudit|Security Web Gateway/i.test(title) && path === "/") {
    throw new Error(`Home page title did not look like SWGAudit: ${title}`);
  }

  console.log(`OK selenium ${path}`);
}

async function assertNavigation(driver) {
  await driver.get(`${baseUrl}/`);
  await driver.wait(until.elementLocated(By.css("body")), timeoutMs);
  const linkChecks = await driver.executeScript(`
    const labels = ["Malware", "Phishing", "Data Theft", "Cyberslacking"];
    return labels.map((label) => {
      const link = Array.from(document.querySelectorAll("a")).find((anchor) =>
        anchor.textContent && anchor.textContent.trim().toLowerCase().includes(label.toLowerCase())
      );
      return { label, href: link ? link.href : null };
    });
  `);

  const missing = linkChecks.filter((item) => !item.href);
  if (missing.length > 0) {
    throw new Error(`Missing navigation links: ${missing.map((item) => item.label).join(", ")}`);
  }

  console.log("OK selenium navigation");
}

async function assertConsole(driver) {
  let entries = [];
  try {
    entries = await driver.manage().logs().get(logging.Type.BROWSER);
  } catch {
    return;
  }

  const serious = entries.filter((entry) => {
    if (entry.level.name !== "SEVERE") {
      return false;
    }
    return !allowedConsoleNoise.some((pattern) => pattern.test(entry.message));
  });

  if (serious.length > 0) {
    throw new Error(`Browser console errors:\n${serious.map((entry) => entry.message).join("\n")}`);
  }
}

let driver;
try {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(buildChromeOptions())
    .build();

  for (const page of paths) {
    await assertRenderedPage(driver, page.path, page.text);
  }
  await assertNavigation(driver);
  await assertConsole(driver);
} finally {
  if (driver) {
    await driver.quit();
  }
}
