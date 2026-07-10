const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  for (const url of ["/contribute", "/", "/phishing/url-manipulation"]) {
    await page.goto("http://localhost:3333" + url, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1000));
    const m = await page.evaluate(() => {
      const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height) }; };
      const app = document.querySelector(".swg-app");
      const info = {
        innerH: window.innerHeight,
        docScrollH: document.documentElement.scrollHeight,
        bodyScrollH: document.body.scrollHeight,
        appParentTag: app && app.parentElement ? app.parentElement.tagName + "." + app.parentElement.className : null,
        appOffsetTop: app ? app.offsetTop : null,
        nav: r(document.querySelector(".swg-nav")),
        shell: r(document.querySelector(".swg-shell")),
        mainCol: r(document.querySelector(".swg-main-col") || document.querySelector(".swg-main")),
        foot: r(document.querySelector(".swg-foot")),
        sb: r(document.querySelector(".swg-sb")),
      };
      return info;
    });
    console.log(url, JSON.stringify(m));
  }
  await browser.close();
})();
