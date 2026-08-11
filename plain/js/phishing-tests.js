/* Phishing test behaviors: chips, stored/canvas/cache open, credential submit. */
(function () {
  "use strict";

  function runConsoleFor(el) {
    var run = el && el.closest && el.closest(".swg-run");
    return run ? run.querySelector("[data-test-console]") : null;
  }

  function startConsole(el, command) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    consoleEl.innerHTML =
      '<div class="swg-console-line"><span class="swg-console-prompt">$</span> ' +
      command +
      "</div>";
  }

  function terminalLine(el, text, state) {
    var consoleEl = runConsoleFor(el);
    if (!consoleEl) return;
    var line = document.createElement("div");
    line.className = "swg-console-line";
    if (state) line.classList.add("swg-console-" + state);
    line.textContent = text;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  function sentenceCase(text) {
    var value = String(text || "").trim();
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
  }

  function terminalPass(el, text) {
    terminalLine(el, "Your perimeter security has passed. " + sentenceCase(text), "pass");
  }

  function terminalFail(el, text) {
    terminalLine(el, "Your perimeter security has failed. " + sentenceCase(text), "fail");
  }

  function openNewTab(url) {
    var opened = window.open(url, "_blank");
    if (opened) {
      try {
        opened.opener = null;
      } catch (error) {}
    }
    return opened;
  }

  function activeChip(groupId) {
    var group = document.querySelector('[data-pick="' + groupId + '"]');
    if (!group) return null;
    return group.querySelector("[data-chip].is-active") || group.querySelector("[data-chip]");
  }

  function isBlockedFetchError(err) {
    if (!err) return false;
    var msg = String(err.message || err);
    if (err instanceof TypeError) return true;
    if (msg === "Failed to fetch" || msg.indexOf("NetworkError") !== -1) return true;
    if (/HTTP (403|451|502|503)\b/.test(msg)) return true;
    return false;
  }

  function isBlockedHttpError(err) {
    if (!err) return false;
    if (isBlockedFetchError(err)) return true;
    var msg = String(err.message || err);
    return /HTTP (400|403|404|405|408|410|451|502|503)\b/.test(msg);
  }

  function cardOutput(form) {
    var run = form.closest(".swg-run") || form;
    return run.querySelector("[data-test-output]");
  }

  function setOutput(out, text, state) {
    if (!out) return;
    out.hidden = false;
    out.removeAttribute("hidden");
    out.style.display = "block";
    out.classList.remove("is-pass", "is-fail");
    if (state) out.classList.add(state);
    out.textContent = text;
  }

  function readJson(response) {
    return response.text().then(function (text) {
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch (error) {
        return { raw: text };
      }
    });
  }

function testId() {
  if (crypto.randomUUID) return crypto.randomUUID().replaceAll("-", "");
  var bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

function makeDummyMicrosoftLoginHtml() {
  return "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>SWG Audit Test - Dummy Microsoft Login</title>\n  <style>\n    * { box-sizing: border-box; }\n    body {\n      min-height: 100vh;\n      margin: 0;\n      display: grid;\n      place-items: center;\n      color: #1b1b1b;\n      background:\n        radial-gradient(circle at 12% 15%, rgba(0, 120, 215, 0.12), transparent 32rem),\n        radial-gradient(circle at 85% 72%, rgba(243, 119, 53, 0.11), transparent 26rem),\n        linear-gradient(135deg, #f6f8fc, #fff);\n      font-family: \"Segoe UI\", Arial, sans-serif;\n    }\n    main { width: min(440px, calc(100% - 36px)); }\n    .panel {\n      width: 100%;\n      min-height: 338px;\n      padding: 44px;\n      background: #fff;\n      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);\n    }\n    .brand {\n      display: flex;\n      align-items: center;\n      gap: 7px;\n      color: #737373;\n      font-size: 26px;\n      font-weight: 600;\n    }\n    .mark {\n      width: 24px;\n      height: 24px;\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 2px;\n    }\n    .mark span:nth-child(1) { background: #f35325; }\n    .mark span:nth-child(2) { background: #81bc06; }\n    .mark span:nth-child(3) { background: #05a6f0; }\n    .mark span:nth-child(4) { background: #ffba08; }\n    h1 {\n      margin: 24px 0 16px;\n      font-size: 24px;\n      font-weight: 600;\n      line-height: 1.18;\n    }\n    input {\n      width: 100%;\n      height: 36px;\n      border: 0;\n      border-bottom: 1px solid #666;\n      color: #1b1b1b;\n      font-size: 15px;\n      outline: 0;\n    }\n    input::placeholder {\n      color: #666;\n      opacity: 1;\n    }\n    input:focus {\n      border-bottom-color: #0067b8;\n    }\n    .links {\n      display: grid;\n      gap: 18px;\n      margin: 18px 0 0;\n      font-size: 13px;\n    }\n    .links a {\n      color: #0067b8;\n      text-decoration: none;\n    }\n    .actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 4px;\n      margin-top: 34px;\n    }\n    button {\n      min-width: 108px;\n      min-height: 32px;\n      border: 0;\n      font-size: 15px;\n      cursor: pointer;\n    }\n    .back { background: #ccc; }\n    .next { color: #fff; background: #0067b8; }\n    .options {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      min-height: 48px;\n      margin-top: 20px;\n      padding: 0 44px;\n      background: #fff;\n      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);\n      font-size: 15px;\n    }\n    .key {\n      width: 26px;\n      height: 26px;\n      object-fit: contain;\n    }\n    .result {\n      margin-top: 18px;\n      padding: 12px;\n      border-left: 4px solid #b00020;\n      color: #5f000f;\n      background: #fff3f3;\n      font-size: 13px;\n      line-height: 1.45;\n      word-break: break-word;\n    }\n    @media (max-width: 640px) {\n      .panel { min-height: auto; padding: 42px 28px 48px; }\n      .brand { font-size: 24px; }\n      .mark { width: 28px; height: 28px; }\n      h1 { font-size: 30px; }\n      input { font-size: 20px; }\n      .links, button, .options { font-size: 18px; }\n      .actions { flex-direction: column; }\n      button { width: 100%; }\n      .options { min-height: 64px; padding: 0 28px; }\n      .key { width: 28px; height: 28px; }\n    }\n  </style>\n</head>\n<body>\n  <main>\n    <section class=\"panel\" aria-labelledby=\"dummy-login-title\">\n      <div class=\"brand\" aria-label=\"Microsoft-style dummy brand\">\n        <span class=\"mark\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span></span>\n        <span>Microsoft</span>\n      </div>\n      <h1 id=\"dummy-login-title\">Sign in</h1>\n      <div class=\"result\" id=\"dummy-microsoft-result\" hidden></div>\n      <form id=\"dummy-microsoft-form\">\n        <input id=\"dummy-account\" name=\"dummy-account\" type=\"text\" autocomplete=\"off\" inputmode=\"email\" placeholder=\"Email, phone, or Skype\" aria-label=\"Email, phone, or Skype\">\n        <input id=\"dummy-password\" name=\"dummy-password\" type=\"password\" autocomplete=\"off\" placeholder=\"Password\" aria-label=\"Password\">\n        <div class=\"links\">\n          <span>No account? <a href=\"#\" aria-disabled=\"true\">Create one!</a></span>\n          <a href=\"#\" aria-disabled=\"true\">Can't access your account?</a>\n        </div>\n        <div class=\"actions\">\n          <button class=\"back\" type=\"button\">Back</button>\n          <button class=\"next\" type=\"submit\">Next</button>\n        </div>\n      </form>\n    </section>\n    <section class=\"options\" aria-label=\"Dummy sign-in options\">\n      <img class=\"key\" src=\"data:image/png;base64,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\" alt=\"\" aria-hidden=\"true\">\n      <span>Sign-in options</span>\n    </section>\n  </main>\n  <script>\n    const form = document.getElementById(\"dummy-microsoft-form\");\n    const result = document.getElementById(\"dummy-microsoft-result\");\n    const account = document.getElementById(\"dummy-account\");\n    const password = document.getElementById(\"dummy-password\");\n\n    form.addEventListener(\"submit\", (event) => {\n      event.preventDefault();\n      result.hidden = false;\n      result.innerHTML = \"<strong>Test Failed: credential submission was supposed to be blocked.</strong><br>Username: \" + account.value + \"<br>Password: \" + password.value;\n    });\n  </script>\n</body>\n</html>";
}

function openClientHtml(html) {
  var blob = new Blob([html], { type: "text/html" });
  var opened = window.open(URL.createObjectURL(blob), "_blank");
  if (opened) { try { opened.opener = null; } catch (e) {} }
  return opened;
}

function buildClientMhtml(html) {
  var boundary = "----SWG-Audit-" + testId();
  return [
    "MIME-Version: 1.0",
    'Content-Type: multipart/related; boundary="' + boundary + '"; type="text/html"',
    "X-SWG-Audit-Test: Client-generated MHTML phishing page",
    "",
    "--" + boundary,
    'Content-Type: text/html; charset="utf-8"',
    "Content-Location: https://client-generated.invalid/login.html",
    "",
    html,
    "--" + boundary + "--",
    "",
  ].join("\r\n");
}

function extractHtmlFromMhtml(mhtml) {
  var boundaryMatch = mhtml.match(/boundary="?([^";\r\n]+)"?/i);
  if (!boundaryMatch) throw new Error("The generated MHTML has no MIME boundary.");
  var htmlPart = mhtml
    .split("--" + boundaryMatch[1])
    .find(function (part) { return /Content-Type:\s*text\/html\b/i.test(part); });
  if (!htmlPart) throw new Error("The generated MHTML has no HTML part.");
  var contentStart = htmlPart.search(/\r?\n\r?\n/);
  if (contentStart === -1) throw new Error("The generated MHTML HTML part is malformed.");
  return htmlPart.slice(contentStart).replace(/^\r?\n\r?\n/, "").replace(/\r?\n$/, "");
}


function buildCanvasHtml() {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SWG Audit Test - Dummy GitHub Canvas Login</title><style>html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#0d1117}canvas{width:100vw;height:100vh;display:block;outline:none}.kbd{position:fixed;left:50%;top:72%;width:1px;height:1px;padding:0;border:0;opacity:.01;background:transparent;color:transparent;font-size:16px;caret-color:transparent;pointer-events:none}</style></head><body><canvas id="login-canvas" tabindex="0" aria-label="SWG Audit dummy GitHub-style login rendered entirely on canvas"></canvas><input id="canvas-keyboard" class="kbd" autocomplete="off" autocapitalize="none" spellcheck="false" aria-hidden="true"><script>' +
    'const canvas=document.getElementById("login-canvas"),keyboard=document.getElementById("canvas-keyboard"),ctx=canvas.getContext("2d"),state={active:"username",username:"",password:"",submitted:false,boxes:{},scale:1};' +
    'const rr=(x,y,w,h,r)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r)};' +
    'const write=(v,x,y,s,c,w,a)=>{ctx.fillStyle=c;ctx.font=(w||"400")+" "+s+"px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif";ctx.textAlign=a||"left";ctx.textBaseline="middle";ctx.fillText(v,x,y)};' +
    'const input=(n,l,v,x,y,w)=>{write(l,x,y,15,"#f0f6fc","600");const b={x:x,y:y+18,width:w,height:44};state.boxes[n]=b;rr(b.x,b.y,b.width,b.height,6);ctx.fillStyle="#0d1117";ctx.fill();ctx.strokeStyle=state.active===n?"#2f81f7":"#3d444d";ctx.lineWidth=state.active===n?2:1;ctx.stroke();write(v,b.x+12,b.y+b.height/2,16,"#f0f6fc")};' +
    'const draw=()=>{const vw=innerWidth,vh=innerHeight;state.scale=Math.min(1.14,vw/390,vh/650);const w=vw/state.scale,h=vh/state.scale,pw=Math.min(420,w-36),x=(w-pw)/2;let y=Math.max(44,(h-650)/2);state.boxes={};ctx.clearRect(0,0,vw,vh);ctx.save();ctx.scale(state.scale,state.scale);ctx.fillStyle="#0d1117";ctx.fillRect(0,0,w,h);ctx.fillStyle="#f0f6fc";ctx.beginPath();ctx.arc(w/2,y+30,28,0,Math.PI*2);ctx.fill();write("GH",w/2,y+31,16,"#0d1117","800","center");write("Sign in to GitHub",w/2,y+94,26,"#f0f6fc","600","center");y+=138;if(state.submitted){rr(x,y,pw,92,6);ctx.fillStyle="#2d1519";ctx.fill();ctx.strokeStyle="#f85149";ctx.stroke();write("Test Failed: submission was supposed to be blocked.",x+14,y+22,13,"#ffb4b4","700");write("Username: "+state.username,x+14,y+49,13,"#f0f6fc");write("Password: "+state.password,x+14,y+72,13,"#f0f6fc");y+=116}input("username","Username or email address",state.username,x,y,pw);y+=88;write("Forgot password?",x+pw,y,14,"#2f81f7","400","right");input("password","Password","*".repeat(state.password.length),x,y,pw);y+=86;const sub={x:x,y:y,width:pw,height:46};state.boxes.submit=sub;rr(sub.x,sub.y,sub.width,sub.height,6);ctx.fillStyle="#238636";ctx.fill();write("Sign in",w/2,sub.y+sub.height/2,16,"#fff","700","center");y+=82;ctx.strokeStyle="#3d444d";ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+pw*.44,y);ctx.moveTo(x+pw*.56,y);ctx.lineTo(x+pw,y);ctx.stroke();write("or",w/2,y,15,"#8b949e","400","center");write("Continue with Google",w/2,y+55,15,"#f0f6fc","600","center");write("Continue with Apple",w/2,y+102,15,"#f0f6fc","600","center");write("New to GitHub?  Create an account",w/2,y+162,15,"#2f81f7","400","center");ctx.restore()};' +
    'const resize=()=>{const r=devicePixelRatio||1;canvas.width=Math.floor(innerWidth*r);canvas.height=Math.floor(innerHeight*r);ctx.setTransform(r,0,0,r,0,0);draw()};const contains=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.width&&p.y>=b.y&&p.y<=b.y+b.height;const syncKeyboard=()=>{keyboard.type=state.active==="password"?"password":"text";keyboard.value=state[state.active];keyboard.setSelectionRange(keyboard.value.length,keyboard.value.length)};const focusField=()=>{syncKeyboard();keyboard.focus({preventScroll:true})};const press=e=>{const p={x:e.clientX/state.scale,y:e.clientY/state.scale};if(contains(p,state.boxes.username)){state.active="username";focusField()}else if(contains(p,state.boxes.password)){state.active="password";focusField()}else if(contains(p,state.boxes.submit)){state.submitted=true;keyboard.blur()}draw()};canvas.addEventListener("pointerdown",e=>{e.preventDefault();press(e)});canvas.addEventListener("touchstart",e=>{if(e.touches&&e.touches[0]){e.preventDefault();press(e.touches[0])}},{passive:false});canvas.addEventListener("mousedown",e=>{press(e)});keyboard.addEventListener("input",()=>{state[state.active]=keyboard.value;draw()});keyboard.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();state.submitted=true;keyboard.blur();draw()}else if(e.key==="Tab"){e.preventDefault();state.active=state.active==="username"?"password":"username";focusField();draw()}});canvas.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();state.active=state.active==="username"?"password":"username";syncKeyboard()}else if(e.key==="Enter"){e.preventDefault();state.submitted=true}else if(e.key==="Backspace"){e.preventDefault();state[state.active]=state[state.active].slice(0,-1);syncKeyboard()}else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();state[state.active]+=e.key;syncKeyboard()}draw()});addEventListener("resize",resize);resize();syncKeyboard();canvas.focus();' +
    '</script></body></html>';
}

  function readyConsoles() {
    document.querySelectorAll("[data-test-console]").forEach(function (consoleEl) {
      if (!consoleEl.textContent.trim()) {
        consoleEl.innerHTML =
          '<div class="swg-console-line"><span class="swg-console-prompt">$</span> swg-audit ready</div>';
      }
    });
  }

  document.addEventListener("DOMContentLoaded", readyConsoles);

  document.addEventListener("click", function (event) {
    var chip = event.target.closest("[data-chip]");
    if (chip) {
      var group = chip.closest("[data-pick]");
      if (group) {
        group.querySelectorAll("[data-chip]").forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
        });
      }
      return;
    }

    var cache = event.target.closest("[data-cache-launch]");
    if (cache) {
      event.preventDefault();
      startConsole(cache, "swg-audit cache-mutation");
      openNewTab("/phishing/cache-test.php?test=" + testId());
      terminalFail(cache, "content-change test page opened in a new tab.");
      return;
    }

    var stored = event.target.closest("[data-stored-launch]");
    if (stored) {
      event.preventDefault();
      var storedChip = activeChip(stored.getAttribute("data-stored-launch"));
      var format = storedChip ? storedChip.getAttribute("data-format") : "raw-html";
      startConsole(stored, "swg-audit stored-page --format=" + format);
      terminalLine(
        stored,
        format === "mhtml"
          ? "assembling MHTML payload in the browser ..."
          : "assembling raw HTML in the browser ..."
      );
      try {
        var localHtml = makeDummyMicrosoftLoginHtml();
        var renderedHtml =
          format === "mhtml" ? extractHtmlFromMhtml(buildClientMhtml(localHtml)) : localHtml;
        terminalLine(
          stored,
          "building blob from locally assembled " +
            (format === "mhtml" ? "MHTML" : "HTML") +
            " ..."
        );
        var opened = openClientHtml(renderedHtml);
        if (opened) terminalFail(stored, "locally assembled phishing page opened in a new tab.");
        else terminalPass(stored, "locally assembled phishing page was blocked by the browser.");
      } catch (err) {
        terminalLine(stored, "stored phishing page could not be built.");
      }
      return;
    }

    var canvas = event.target.closest("[data-canvas-launch]");
    if (canvas) {
      event.preventDefault();
      startConsole(canvas, "swg-audit canvas-page");
      var openedCanvas = openClientHtml(buildCanvasHtml());
      if (openedCanvas) terminalFail(canvas, "canvas-rendered phishing page opened in a new tab.");
      else terminalPass(canvas, "canvas-rendered phishing page was blocked by the browser.");
    }
  });

  document.addEventListener("submit", function (event) {
    var credential = event.target.closest("[data-credential-form]");
    if (!credential) return;
    event.preventDefault();
    var out = cardOutput(credential);
    setOutput(out, "Submitting dummy credential payload...");
    fetch(credential.action || "/phishing/credential-submit.php", {
      method: "post",
      body: new FormData(credential),
      headers: { Accept: "application/json, text/plain, */*" },
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Submission returned HTTP " + response.status);
        return readJson(response);
      })
      .then(function () {
        setOutput(out, "Test failed: dummy credential payload reached the simulation endpoint.", "is-fail");
      })
      .catch(function (err) {
        if (isBlockedHttpError(err)) {
          setOutput(out, "Test passed.", "is-pass");
          return;
        }
        setOutput(out, "Test could not complete. Please retry.");
      });
  });
})();
