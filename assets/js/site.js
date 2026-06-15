const menuButton = document.querySelector(".mobile-toggle");
const mobilePanel = document.querySelector("#mobile-panel");
const accordions = document.querySelectorAll(".mobile-accordion");
const dropdownTriggers = document.querySelectorAll(".nav-trigger");

if (menuButton && mobilePanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobilePanel.dataset.open = String(!isOpen);
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mobilePanel.dataset.open = "false";
    });
  });
}

accordions.forEach((accordion) => {
  const button = accordion.querySelector("button");
  const panel = accordion.querySelector("div");

  if (!button || !panel) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.dataset.open = String(!isOpen);
  });
});

dropdownTriggers.forEach((trigger) => {
  const item = trigger.closest(".nav-item");
  if (!item) return;

  item.addEventListener("mouseenter", () => trigger.setAttribute("aria-expanded", "true"));
  item.addEventListener("mouseleave", () => trigger.setAttribute("aria-expanded", "false"));
  item.addEventListener("focusin", () => trigger.setAttribute("aria-expanded", "true"));
  item.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!item.contains(document.activeElement)) {
        trigger.setAttribute("aria-expanded", "false");
      }
    }, 0);
  });
});

document.querySelectorAll("[data-level-card]").forEach((card) => {
  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    card.setAttribute("aria-expanded", String(open));
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;

    const willOpen = !card.classList.contains("is-open");
    document.querySelectorAll("[data-level-card]").forEach((otherCard) => {
      otherCard.classList.remove("is-open");
      otherCard.setAttribute("aria-expanded", "false");
    });
    setOpen(willOpen);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

document.querySelectorAll("[data-test-card]").forEach((card) => {
  const detail = document.getElementById(card.getAttribute("aria-controls"));

  if (!detail) return;

  const setOpen = (open) => {
    card.classList.toggle("is-open", open);
    card.setAttribute("aria-expanded", String(open));
    detail.hidden = !open;
  };

  const toggleCard = () => {
    const willOpen = card.getAttribute("aria-expanded") !== "true";
    const grid = card.closest(".test-card-grid");

    if (grid) {
      grid.querySelectorAll("[data-test-card]").forEach((otherCard) => {
        if (otherCard === card) return;

        const otherDetail = document.getElementById(otherCard.getAttribute("aria-controls"));
        otherCard.classList.remove("is-open");
        otherCard.setAttribute("aria-expanded", "false");
        if (otherDetail) otherDetail.hidden = true;
      });
    }

    setOpen(willOpen);
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("button, a, .test-card-detail")) return;
    toggleCard();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest("button, a")) return;
    event.preventDefault();
    toggleCard();
  });
});

document.querySelectorAll("[data-run-test]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;

    if (!output) return;

    output.hidden = false;
    output.textContent = "Run Test selected. This flexible slot is ready for the real simulation flow for this test.";
  });
});

document.querySelectorAll("[data-credential-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const card = form.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");
    output.textContent = "Submitting test credentials...";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method || "post",
        body: new FormData(form),
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Submission returned HTTP ${response.status}`);
      }

      output.classList.add("is-fail");
      output.textContent = "Test Failed: credential form submission succeeded.";
    } catch (error) {
      output.classList.add("is-pass");
      output.textContent = "Pass: credential form submission did not complete.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

const dummyMicrosoftKeyIcon = "data:image/png;base64,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";

const makeDummyMicrosoftLoginHtml = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SWG Audit Test - Dummy Microsoft Login</title>
  <style>
    * { box-sizing: border-box; }
    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      color: #1b1b1b;
      background:
        radial-gradient(circle at 12% 15%, rgba(0, 120, 215, 0.12), transparent 32rem),
        radial-gradient(circle at 85% 72%, rgba(243, 119, 53, 0.11), transparent 26rem),
        linear-gradient(135deg, #f6f8fc, #fff);
      font-family: "Segoe UI", Arial, sans-serif;
    }
    main { width: min(440px, calc(100% - 36px)); }
    .panel {
      width: 100%;
      min-height: 338px;
      padding: 44px;
      background: #fff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 7px;
      color: #737373;
      font-size: 26px;
      font-weight: 600;
    }
    .mark {
      width: 24px;
      height: 24px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
    }
    .mark span:nth-child(1) { background: #f35325; }
    .mark span:nth-child(2) { background: #81bc06; }
    .mark span:nth-child(3) { background: #05a6f0; }
    .mark span:nth-child(4) { background: #ffba08; }
    h1 {
      margin: 24px 0 16px;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.18;
    }
    input {
      width: 100%;
      height: 36px;
      border: 0;
      border-bottom: 1px solid #666;
      color: #1b1b1b;
      font-size: 15px;
      outline: 0;
    }
    input::placeholder {
      color: #666;
      opacity: 1;
    }
    input:focus {
      border-bottom-color: #0067b8;
    }
    .links {
      display: grid;
      gap: 18px;
      margin: 18px 0 0;
      font-size: 13px;
    }
    .links a {
      color: #0067b8;
      text-decoration: none;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      margin-top: 34px;
    }
    button {
      min-width: 108px;
      min-height: 32px;
      border: 0;
      font-size: 15px;
      cursor: pointer;
    }
    .back { background: #ccc; }
    .next { color: #fff; background: #0067b8; }
    .options {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 48px;
      margin-top: 20px;
      padding: 0 44px;
      background: #fff;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
      font-size: 15px;
    }
    .key {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
    .result {
      margin-top: 18px;
      padding: 12px;
      border-left: 4px solid #b00020;
      color: #5f000f;
      background: #fff3f3;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    @media (max-width: 640px) {
      .panel { min-height: auto; padding: 42px 28px 48px; }
      .brand { font-size: 24px; }
      .mark { width: 28px; height: 28px; }
      h1 { font-size: 30px; }
      input { font-size: 20px; }
      .links, button, .options { font-size: 18px; }
      .actions { flex-direction: column; }
      button { width: 100%; }
      .options { min-height: 64px; padding: 0 28px; }
      .key { width: 28px; height: 28px; }
    }
  </style>
</head>
<body>
  <main>
    <section class="panel" aria-labelledby="dummy-login-title">
      <div class="brand" aria-label="Microsoft-style dummy brand">
        <span class="mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span>Microsoft</span>
      </div>
      <h1 id="dummy-login-title">Sign in</h1>
      <div class="result" id="dummy-microsoft-result" hidden></div>
      <form id="dummy-microsoft-form">
        <input id="dummy-account" name="dummy-account" type="text" autocomplete="off" inputmode="email" placeholder="Email, phone, or Skype" aria-label="Email, phone, or Skype">
        <input id="dummy-password" name="dummy-password" type="password" autocomplete="off" placeholder="Password" aria-label="Password">
        <div class="links">
          <span>No account? <a href="#" aria-disabled="true">Create one!</a></span>
          <a href="#" aria-disabled="true">Can't access your account?</a>
        </div>
        <div class="actions">
          <button class="back" type="button">Back</button>
          <button class="next" type="submit">Next</button>
        </div>
      </form>
    </section>
    <section class="options" aria-label="Dummy sign-in options">
      <img class="key" src="${dummyMicrosoftKeyIcon}" alt="" aria-hidden="true">
      <span>Sign-in options</span>
    </section>
  </main>
  <script>
    const form = document.getElementById("dummy-microsoft-form");
    const result = document.getElementById("dummy-microsoft-result");
    const account = document.getElementById("dummy-account");
    const password = document.getElementById("dummy-password");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      result.hidden = false;
      result.innerHTML = "<strong>Test Failed: credential submission was supposed to be blocked.</strong><br>Username: " + account.value + "<br>Password: " + password.value;
    });
  </script>
</body>
</html>`;

const makeDummyLinkedInLoginHtml = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SWG Audit Test - Dummy LinkedIn Login</title>
  <style>
    * { box-sizing: border-box; }
    body {
      min-height: 100vh;
      margin: 0;
      color: #191919;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    }
    .brand {
      position: fixed;
      top: 42px;
      left: 62px;
      color: #0a66c2;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .brand span {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      margin-left: 2px;
      border-radius: 3px;
      color: #fff;
      background: #0a66c2;
      font-size: 24px;
      letter-spacing: 0;
    }
    main {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 80px 20px 54px;
    }
    .card {
      width: min(352px, calc(100vw - 36px));
      border-radius: 8px;
      background: #fff;
      padding: 24px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
    }
    h1 {
      margin: 0 0 16px;
      color: #1f1f1f;
      font-size: 32px;
      line-height: 1.15;
      font-weight: 600;
    }
    .sso {
      width: 100%;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 10px;
      border: 1px solid #777;
      border-radius: 999px;
      color: #1f1f1f;
      background: #fff;
      font-size: 16px;
      font-weight: 500;
    }
    .google { color: #4285f4; font-weight: 800; }
    .microsoft {
      width: 20px;
      height: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px;
    }
    .microsoft span:nth-child(1) { background: #f35325; }
    .microsoft span:nth-child(2) { background: #81bc06; }
    .microsoft span:nth-child(3) { background: #05a6f0; }
    .microsoft span:nth-child(4) { background: #ffba08; }
    .apple { color: #000; font-size: 18px; font-weight: 800; }
    .terms {
      margin: 12px 0 22px;
      font-size: 12px;
      line-height: 1.45;
    }
    a { color: #0a66c2; text-decoration: none; font-weight: 600; }
    .divider {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 14px;
      margin-bottom: 22px;
      color: #666;
      font-size: 14px;
    }
    .divider::before,
    .divider::after {
      content: "";
      height: 1px;
      background: #ddd;
    }
    input {
      width: 100%;
      min-height: 52px;
      margin-bottom: 18px;
      border: 1px solid #666;
      border-radius: 4px;
      padding: 0 12px;
      color: #191919;
      font-size: 18px;
    }
    input::placeholder { color: #666; opacity: 1; }
    .password-wrap {
      position: relative;
    }
    .password-wrap input { padding-right: 70px; }
    .show {
      position: absolute;
      top: 18px;
      right: 12px;
      color: #0a66c2;
      font-weight: 700;
    }
    .forgot {
      display: inline-block;
      margin: -4px 0 14px;
      font-size: 16px;
    }
    .remember {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      font-size: 16px;
    }
    .checkbox {
      width: 22px;
      height: 22px;
      display: inline-grid;
      place-items: center;
      border-radius: 3px;
      color: #fff;
      background: #0a66c2;
      font-weight: 800;
    }
    .signin {
      width: 100%;
      min-height: 52px;
      border: 0;
      border-radius: 999px;
      color: #fff;
      background: #0a66c2;
      font-size: 16px;
      font-weight: 700;
    }
    .join {
      margin-top: 30px;
      text-align: center;
      font-size: 16px;
    }
    .test-note {
      margin-top: 16px;
      color: #666;
      font-size: 12px;
      line-height: 1.4;
      text-align: center;
    }
    .result {
      margin-top: 16px;
      padding: 12px;
      border-left: 4px solid #b00020;
      color: #5f000f;
      background: #fff3f3;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    @media (max-width: 720px) {
      .brand { position: static; padding: 26px 20px 0; }
      main { min-height: auto; padding-top: 28px; }
    }
  </style>
</head>
<body>
  <div class="brand">Linked<span>in</span></div>
  <main>
    <div>
      <section class="card" aria-labelledby="dummy-linkedin-title">
        <h1 id="dummy-linkedin-title">Sign in</h1>
        <div class="result" id="dummy-linkedin-result" hidden></div>
        <button class="sso" type="button"><span class="google">G</span>Continue with Google</button>
        <button class="sso" type="button"><span class="microsoft" aria-hidden="true"><span></span><span></span><span></span><span></span></span>Sign in with Microsoft</button>
        <button class="sso" type="button"><span class="apple">A</span>Sign in with Apple</button>
        <p class="terms">By clicking Continue, you agree to LinkedIn's <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.</p>
        <div class="divider">or</div>
        <form id="dummy-linkedin-form">
          <input id="dummy-linkedin-account" type="text" autocomplete="off" placeholder="Email or phone" aria-label="Email or phone">
          <div class="password-wrap">
            <input id="dummy-linkedin-password" type="password" autocomplete="off" placeholder="Password" aria-label="Password">
            <span class="show">Show</span>
          </div>
          <a class="forgot" href="#">Forgot password?</a>
          <div class="remember"><span class="checkbox">&#10003;</span><span>Keep me logged in</span></div>
          <button class="signin" type="submit">Sign in</button>
        </form>
      </section>
      <p class="join">New to LinkedIn? <a href="#">Join now</a></p>
    </div>
  </main>
  <script>
    const form = document.getElementById("dummy-linkedin-form");
    const result = document.getElementById("dummy-linkedin-result");
    const account = document.getElementById("dummy-linkedin-account");
    const password = document.getElementById("dummy-linkedin-password");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      result.hidden = false;
      result.innerHTML = "<strong>Test Failed: credential submission was supposed to be blocked.</strong><br>Username: " + account.value + "<br>Password: " + password.value;
    });
  </script>
</body>
</html>`;

const makeMhtmlPayload = (html) => [
  "MIME-Version: 1.0",
  "Content-Type: multipart/related; boundary=\"----SWGAuditDummyMhtmlBoundary\"; type=\"text/html\"",
  "X-SWG-Audit-Test: Dummy phishing page stored as MHTML-style content",
  "",
  "------SWGAuditDummyMhtmlBoundary",
  "Content-Type: text/html; charset=\"utf-8\"",
  "Content-Location: https://dummy-login.invalid/swg-audit-test.html",
  "",
  html,
  "------SWGAuditDummyMhtmlBoundary--",
].join("\r\n");

const extractHtmlFromMhtml = (mhtml) => {
  const match = mhtml.match(/Content-Type:\s*text\/html[^\r\n]*[\s\S]*?\r?\n\r?\n([\s\S]*?)\r?\n------SWGAuditDummyMhtmlBoundary--/i);
  return match ? match[1] : "";
};

document.querySelectorAll("[data-phishing-stored-site-launch]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const select = card ? card.querySelector("[data-stored-site-format]") : null;
    const selectedFormat = select ? select.value : "html";
    const dummyHtml = selectedFormat === "mhtml" ? makeDummyLinkedInLoginHtml() : makeDummyMicrosoftLoginHtml();
    const storedPayload = selectedFormat === "mhtml" ? window.btoa(makeMhtmlPayload(dummyHtml)) : window.btoa(dummyHtml);
    const renderedHtml = selectedFormat === "mhtml" ? extractHtmlFromMhtml(window.atob(storedPayload)) : window.atob(storedPayload);
    const blobUrl = URL.createObjectURL(new Blob([renderedHtml], { type: "text/html" }));
    const openedWindow = window.open(blobUrl, "_blank");

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");

    if (openedWindow) {
      output.textContent = `Opened dummy ${selectedFormat.toUpperCase()} phishing-page rendering test in a new tab.`;
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return;
    }

    URL.revokeObjectURL(blobUrl);
    output.classList.add("is-fail");
    output.textContent = "Test launch was blocked by the browser.";
  });
});

const makeDummyGithubCanvasHtml = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SWG Audit Test - Dummy GitHub Canvas Login</title>
  <style>
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #0d1117;
    }
    canvas {
      width: 100vw;
      height: 100vh;
      display: block;
      background: #0d1117;
      outline: none;
    }
  </style>
</head>
<body>
  <canvas id="github-login-canvas" tabindex="0" aria-label="SWG Audit dummy GitHub-style login rendered on canvas"></canvas>
  <script>
    const canvas = document.getElementById("github-login-canvas");
    const ctx = canvas.getContext("2d");
    const state = {
      activeField: "username",
      username: "",
      password: "",
      submitted: false,
      boxes: {},
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    };
    const design = { width: 1440, height: 900 };

    const fitCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const inBox = (point, box) => point.x >= box.x && point.x <= box.x + box.width && point.y >= box.y && point.y <= box.y + box.height;

    const toDesignPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left - state.offsetX) / state.scale,
        y: (event.clientY - rect.top - state.offsetY) / state.scale,
      };
    };

    const roundRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const text = (value, x, y, size, color, weight = "400", align = "left") => {
      ctx.fillStyle = color;
      ctx.font = weight + " " + size + "px -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif";
      ctx.textAlign = align;
      ctx.textBaseline = "middle";
      ctx.fillText(value, x, y);
    };

    const drawInput = (name, x, y, width, height, value) => {
      state.boxes[name] = { x, y, width, height };
      roundRect(x, y, width, height, 6);
      ctx.fillStyle = "#0d1117";
      ctx.fill();
      ctx.strokeStyle = state.activeField === name ? "#2f81f7" : "#3d444d";
      ctx.lineWidth = state.activeField === name ? 2 : 1;
      ctx.stroke();
      text(value, x + 14, y + height / 2, 18, "#f0f6fc", "400");
      if (state.activeField === name && Math.floor(Date.now() / 500) % 2 === 0) {
        const caretX = x + 14 + ctx.measureText(value).width + 2;
        ctx.strokeStyle = "#f0f6fc";
        ctx.beginPath();
        ctx.moveTo(caretX, y + 15);
        ctx.lineTo(caretX, y + height - 15);
        ctx.stroke();
      }
    };

    const drawButton = (key, x, y, width, height, fill, stroke, label, icon) => {
      state.boxes[key] = { x, y, width, height };
      roundRect(x, y, width, height, 6);
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (icon) text(icon, x + width / 2 - 96, y + height / 2, 22, icon === "G" ? "#4285f4" : "#f0f6fc", "700", "center");
      text(label, x + width / 2 + (icon ? 16 : 0), y + height / 2, 18, "#f0f6fc", "700", "center");
    };

    const drawLogo = (cx, cy) => {
      ctx.fillStyle = "#f0f6fc";
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      text("GH", cx, cy + 1, 17, "#0d1117", "800", "center");
    };

    const drawResult = (x, y, width) => {
      const height = 118;
      roundRect(x, y, width, height, 6);
      ctx.fillStyle = "#2d1519";
      ctx.fill();
      ctx.strokeStyle = "#f85149";
      ctx.stroke();
      text("Test Failed: credential submission was supposed to be blocked.", x + 16, y + 24, 15, "#ffb4b4", "700");
      text("Username: " + state.username, x + 16, y + 58, 15, "#f0f6fc");
      text("Password: " + state.password, x + 16, y + 88, 15, "#f0f6fc");
    };

    const submit = () => {
      state.submitted = true;
      draw();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      state.boxes = {};
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, w, h);
      state.scale = Math.min(w / design.width, h / design.height);
      state.offsetX = (w - design.width * state.scale) / 2;
      state.offsetY = (h - design.height * state.scale) / 2;

      ctx.save();
      ctx.translate(state.offsetX, state.offsetY);
      ctx.scale(state.scale, state.scale);

      const formWidth = 476;
      const x = (design.width - formWidth) / 2;
      let y = 68;

      drawLogo(design.width / 2, y + 30);
      text("Sign in to GitHub", design.width / 2, y + 104, 28, "#f0f6fc", "700", "center");
      y += 144;

      if (state.submitted) {
        drawResult(x, y, formWidth);
        y += 142;
      } else {
        y += 24;
      }

      text("Username or email address", x, y, 18, "#f0f6fc", "700");
      drawInput("username", x, y + 26, formWidth, 54, state.username);
      y += 112;

      text("Password", x, y, 18, "#f0f6fc", "700");
      text("Forgot password?", x + formWidth, y, 18, "#2f81f7", "400", "right");
      drawInput("password", x, y + 26, formWidth, 54, "*".repeat(state.password.length));
      y += 102;

      drawButton("submit", x, y, formWidth, 54, "#238636", null, "Sign in");
      y += 96;

      ctx.strokeStyle = "#3d444d";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + formWidth * 0.46, y);
      ctx.moveTo(x + formWidth * 0.54, y);
      ctx.lineTo(x + formWidth, y);
      ctx.stroke();
      text("or", x + formWidth / 2, y, 20, "#f0f6fc", "400", "center");
      y += 42;

      drawButton("google", x, y, formWidth, 54, "#21262d", "#3d444d", "Continue with Google", "G");
      y += 64;
      drawButton("apple", x, y, formWidth, 54, "#21262d", "#3d444d", "Continue with Apple", "A");
      y += 98;

      text("New to GitHub?", design.width / 2 - 6, y, 18, "#f0f6fc", "400", "right");
      text("Create an account", design.width / 2, y, 18, "#2f81f7", "400", "left");
      text("Sign in with a passkey", design.width / 2, y + 50, 18, "#2f81f7", "700", "center");
      ctx.restore();
    };

    canvas.addEventListener("mousedown", (event) => {
      const point = toDesignPoint(event);
      canvas.focus();
      if (inBox(point, state.boxes.username)) state.activeField = "username";
      else if (inBox(point, state.boxes.password)) state.activeField = "password";
      else if (inBox(point, state.boxes.submit)) submit();
      draw();
    });

    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        state.activeField = state.activeField === "username" ? "password" : "username";
        draw();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        submit();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        state[state.activeField] = state[state.activeField].slice(0, -1);
        draw();
        return;
      }
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        state[state.activeField] += event.key;
        draw();
      }
    });

    window.addEventListener("resize", fitCanvas);
    window.setInterval(draw, 500);
    fitCanvas();
    canvas.focus();
  </script>
</body>
</html>`;

document.querySelectorAll("[data-phishing-canvas-launch]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest("[data-test-card]");
    const output = card ? card.querySelector("[data-test-output]") : null;
    const blobUrl = URL.createObjectURL(new Blob([makeDummyGithubCanvasHtml()], { type: "text/html" }));
    const openedWindow = window.open(blobUrl, "_blank");

    if (!output) return;

    output.hidden = false;
    output.classList.remove("is-pass", "is-fail");

    if (openedWindow) {
      output.textContent = "Opened dummy GitHub-style canvas rendering test in a new tab.";
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return;
    }

    URL.revokeObjectURL(blobUrl);
    output.classList.add("is-fail");
    output.textContent = "Test launch was blocked by the browser.";
  });
});

document.querySelectorAll("[data-download-select]").forEach((select) => {
  const targetId = select.getAttribute("data-download-target");
  const link = targetId ? document.getElementById(targetId) : null;

  if (!link) return;

  select.addEventListener("change", () => {
    link.href = select.value;
  });
});

document.querySelectorAll("[data-chunk-attack-description]").forEach((description) => {
  const picker = description.closest(".test-picker");
  const select = picker ? picker.querySelector("select") : null;

  if (!select) return;

  const updateDescription = () => {
    const selectedOption = select.options[select.selectedIndex];
    description.textContent = selectedOption ? selectedOption.getAttribute("data-description") || "" : "";
  };

  select.addEventListener("change", updateDescription);
  updateDescription();
});

const base64ToBytes = (value) => {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const downloadBytes = (bytes, filename, mimeType, openInNewTab = false) => {
  const blob = new Blob([bytes], { type: mimeType || "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  if (openInNewTab) {
    window.open(url, "_blank", "noopener");
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    return;
  }

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const derivePayloadKey = async (password, salt) => {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 200000,
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
};

const makeBlobLinkPreparer = (link, buildBlob) => {
  let preparedUrl = "";
  let preparingPromise = null;
  let preparedKey = "";

  const revokePreparedUrl = () => {
    if (!preparedUrl) return;

    URL.revokeObjectURL(preparedUrl);
    preparedUrl = "";
  };

  const setDirectLink = (url) => {
    revokePreparedUrl();
    preparedKey = url;
    link.href = url;
    link.download = url.split("/").pop() || "download";
  };

  const prepareLink = async () => {
    const select = document.getElementById(link.getAttribute("data-source-select"));
    if (!select) return false;

    const selectedUrl = select.value;

    if (!selectedUrl.endsWith(".json")) {
      setDirectLink(selectedUrl);
      return true;
    }

    if (preparedKey === selectedUrl && preparedUrl) return true;
    if (preparingPromise) return preparingPromise;

    link.setAttribute("aria-busy", "true");
    preparingPromise = buildBlob(selectedUrl)
      .then(({ bytes, filename, mime }) => {
        revokePreparedUrl();
        preparedUrl = URL.createObjectURL(new Blob([bytes], { type: mime || "application/octet-stream" }));
        preparedKey = selectedUrl;
        link.href = preparedUrl;
        link.download = filename || selectedUrl.split("/").pop() || "download";
        return true;
      })
      .catch((error) => {
        window.alert(`Download test failed: ${error.message}`);
        return false;
      })
      .finally(() => {
        link.removeAttribute("aria-busy");
        preparingPromise = null;
      });

    return preparingPromise;
  };

  const warmLink = () => {
    prepareLink();
  };

  const hasPreparedHref = () => link.href && link.href !== "#" && link.href !== window.location.href + "#";

  const openPreparedLinkInNewTab = async (event) => {
    event.preventDefault();

    const newTab = window.open("about:blank", "_blank", "noopener");
    if (await prepareLink()) {
      if (newTab) {
        newTab.location = link.href;
      } else {
        window.open(link.href, "_blank", "noopener");
      }
    } else if (newTab) {
      newTab.close();
    }
  };

  ["pointerenter", "focus", "mousedown", "contextmenu"].forEach((eventName) => {
    link.addEventListener(eventName, warmLink);
  });

  link.addEventListener("auxclick", (event) => {
    if (event.button === 1 && !hasPreparedHref()) {
      openPreparedLinkInNewTab(event);
    }
  });

  link.addEventListener("click", async (event) => {
    if ((event.ctrlKey || event.metaKey) && !hasPreparedHref()) {
      openPreparedLinkInNewTab(event);
      return;
    }

    if (hasPreparedHref()) return;

    event.preventDefault();
    if (await prepareLink()) {
      link.click();
    }
  });

  const select = document.getElementById(link.getAttribute("data-source-select"));
  if (select) {
    select.addEventListener("change", () => {
      revokePreparedUrl();
      preparedKey = "";
      link.href = "#";
      warmLink();
    });
  }

  window.addEventListener("pagehide", revokePreparedUrl);
  warmLink();
};

const buildAssembledPayload = async (selectedUrl) => {
  const response = await fetch(selectedUrl, { cache: "no-store" });
  const payload = await response.json();
  let bytes;

  if (payload.mode === "decode-base64") {
    bytes = base64ToBytes(payload.payload);
  } else if (payload.mode === "decrypt-aes-gcm") {
    const salt = base64ToBytes(payload.salt);
    const iv = base64ToBytes(payload.iv);
    const ciphertext = base64ToBytes(payload.payload);
    const key = await derivePayloadKey(payload.password || "123456", salt);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    bytes = new Uint8Array(decrypted);
  } else {
    throw new Error("Unsupported assembly mode.");
  }

  return { bytes, filename: payload.filename, mime: payload.mime };
};

document.querySelectorAll("[data-assembled-download]").forEach((link) => {
  makeBlobLinkPreparer(link, buildAssembledPayload);
});

const extractSmugglingPayload = (format) => {
  const carrier = document.querySelector(`[data-smuggling-carrier="${format}"]`);

  if (!carrier) return "";

  if (format === "html" || format === "js") {
    return carrier.getAttribute("data-smuggling-payload") || "";
  }

  if (format === "css") {
    const payloadMatch = carrier.textContent.match(/--smuggled-payload:\s*["']([A-Za-z0-9+/=\s]+)["']/);
    return payloadMatch ? payloadMatch[1] : "";
  }

  if (format === "svg") {
    const payload = carrier.querySelector("metadata");
    return payload ? payload.textContent : "";
  }

  return "";
};

document.querySelectorAll("[data-smuggling-download]").forEach((link) => {
  let smugglingUrl = "";

  const revokeSmugglingUrl = () => {
    if (!smugglingUrl) return;

    URL.revokeObjectURL(smugglingUrl);
    smugglingUrl = "";
  };

  const prepareSmugglingLink = () => {
    const select = document.getElementById(link.getAttribute("data-source-select"));
    const selectedOption = select ? select.options[select.selectedIndex] : null;

    if (!selectedOption) return false;

    const format = selectedOption.value || "html";
    const filename = selectedOption.getAttribute("data-smuggling-filename") || `${format}_smuggling.docm`;
    const payload = extractSmugglingPayload(format).replace(/\s+/g, "");

    if (!payload) {
      throw new Error(`${format.toUpperCase()} smuggling payload was not found on the page.`);
    }

    revokeSmugglingUrl();
    smugglingUrl = URL.createObjectURL(
      new Blob([base64ToBytes(payload)], { type: "application/vnd.ms-word.document.macroEnabled.12" })
    );
    link.href = smugglingUrl;
    link.download = filename;
    return true;
  };

  const safelyPrepareSmugglingLink = () => {
    try {
      return prepareSmugglingLink();
    } catch (error) {
      window.alert(`Smuggling test failed: ${error.message}`);
      return false;
    }
  };

  ["pointerenter", "focus", "mousedown", "contextmenu"].forEach((eventName) => {
    link.addEventListener(eventName, safelyPrepareSmugglingLink);
  });

  link.addEventListener("click", (event) => {
    if (!safelyPrepareSmugglingLink()) {
      event.preventDefault();
    }
  });

  const select = document.getElementById(link.getAttribute("data-source-select"));
  if (select) {
    select.addEventListener("change", safelyPrepareSmugglingLink);
  }

  window.addEventListener("pagehide", revokeSmugglingUrl);
  safelyPrepareSmugglingLink();
});

const buildChunkAttackPayload = async (selectedUrl) => {
  const manifestResponse = await fetch(selectedUrl, { cache: "no-store" });

  if (!manifestResponse.ok) {
    throw new Error("Manifest request failed.");
  }

  const manifest = await manifestResponse.json();
  const fetchChunk = async (chunk) => {
    const response = await fetch(chunk.url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Chunk request failed: ${chunk.url}`);
    }

    return {
      include: chunk.include !== false,
      order: Number(chunk.order),
      text: (await response.text()).replace(/\r?\n$/, ""),
    };
  };
  let chunkResponses;

  if (manifest.fetchMode === "parallel") {
    chunkResponses = await Promise.all(manifest.chunks.map(fetchChunk));
  } else {
    chunkResponses = [];

    for (const chunk of manifest.chunks) {
      chunkResponses.push(await fetchChunk(chunk));
    }
  }

  const assembledText = chunkResponses
    .filter((chunk) => chunk.include)
    .sort((left, right) => left.order - right.order)
    .map((chunk) => chunk.text)
    .join("");

  return {
    bytes: new TextEncoder().encode(assembledText),
    filename: manifest.filename || "eicar-chunk-attack.txt",
    mime: manifest.mime || "text/plain",
  };
};

document.querySelectorAll("[data-chunk-attack-download]").forEach((link) => {
  makeBlobLinkPreparer(link, buildChunkAttackPayload);
});
