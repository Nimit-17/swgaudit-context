const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const page = (slug, title, category, tier, control, run, threat, how, pass, fail) => ({
  slug,
  title,
  category,
  tier,
  control,
  run,
  threat: threat || "This test safely reproduces a web security bypass pattern from the v2 SWG Audit site.",
  how: how || "Run the sample and confirm whether the SWG blocks, warns, rewrites, or otherwise prevents the risky action.",
  pass: pass || "The gateway blocks, warns on, or otherwise stops the risky action.",
  fail: fail || "The action completes with no warning or interruption.",
});

const pages = [
  page("phishing/url-manipulation", "URL manipulation", "Phishing", "Bare Minimum", "Suspicious URL and redirect detection", `
        <div className="swg-run-pick">Choose a manipulated URL:</div>
        <div className="swg-dd" data-dd data-dd-dl="url-manipulation">
          <button className="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Typo lookalike URL</span><span className="swg-caret" /></button>
          <div className="swg-dd-menu" data-dd-menu hidden>
            <button className="swg-dd-opt is-active" type="button" data-dd-opt data-url="/phishing/rnicrosoft-Iogin/">Typo lookalike URL</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-url="/phishing/micrоsoft-Iogin/">Homograph URL</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-url="/phishing/redirect/?url=/phishing/rnicrosoft-Iogin/">Redirect to lookalike</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-url="/go/ms-login/">Short URL redirect</button>
          </div>
        </div>
        <div className="swg-dl-row">
          <button className="swg-dl" type="button" data-open="url-manipulation">Open selected URL</button>
        </div>`, "Attackers rarely link to a domain that obviously looks fake. They rely on typo squatting, lookalike characters, redirects, and shortened links to get past a quick glance and past simple blocklists.", "Pick one of the sample links below. Each one opens in a new tab and points to a page built to imitate a real login page using a different disguise technique.", "The gateway blocks the link, shows a warning page, or stops the page from loading.", "The lookalike login page opens normally in the new tab."),
  page("phishing/site-stored-as-mhtml-or-raw-html", "Page assembled on browser", "Phishing", "Evasion Detection", "Locally stored phishing page detection", `
        <div className="swg-run-pick">Choose a stored page format:</div>
        <div className="swg-pick" data-pick="stored-site">
          <button className="swg-chip is-active" type="button" data-chip data-format="raw-html">Raw HTML</button>
          <button className="swg-chip" type="button" data-chip data-format="mhtml">MHTML</button>
        </div>
        <div className="swg-dl-row">
          <button className="swg-dl" type="button" data-stored-launch="stored-site">Open stored page</button>
        </div>`, "Instead of hosting a phishing page on a live server, an attacker can hand someone a local HTML or MHTML file. Tools that only inspect network traffic can miss content that never crosses the wire as a normal request.", "Choose a format, then open it. The browser builds a fake login page locally in that format and opens it in a new tab, the same way an opened phishing file would behave.", "The gateway or browser flags, blocks, or warns before the local page is shown.", "The fake login page opens and renders normally."),
  page("phishing/canvas-engine", "Canvas page", "Phishing", "Evasion Detection", "Canvas-rendered page detection", `
        <div className="swg-dl-row">
          <button className="swg-dl" type="button" data-canvas-launch>Open canvas-rendered page</button>
        </div>`, "Some phishing kits draw their fake login form onto an HTML canvas instead of using real text and input fields. With no readable HTML text on the page, scanners that look for words like 'password' or 'sign in' can be fooled.", "Click the button to open the v2 GitHub-style canvas-rendered login page in a new tab. It is drawn onto canvas instead of normal DOM text and inputs.", "The gateway blocks the page despite the lack of readable text.", "The canvas-drawn login page opens and displays normally."),
  page("phishing/cached-content-mutation", "Content mutation", "Phishing", "Advanced Threat Simulation", "Same URL content change detection", `
        <div className="swg-dl-row">
          <button className="swg-dl" type="button" data-cache-launch>Open content-change test</button>
        </div>`, "A gateway might scan a page once, mark it safe, and then trust that verdict even after the content changes. Attackers exploit this by serving something harmless first and swapping in a phishing page later.", "Open the harmless page in a new tab, then refresh that tab once. The same URL changes to the dummy Microsoft-style login page without relying on cached content.", "The gateway blocks the changed login page when the same URL is refreshed.", "The changed login page loads normally with no warning."),
  page("phishing/form-submission-on-random-site", "Credential form submission", "Phishing", "Advanced Threat Simulation", "Credential submission detection", `
        <form className="swg-form" method="post" action="/phishing/credential-submit.php" autoComplete="off" data-credential-form>
          <label className="swg-field">Username <input name="swg_audit_username" defaultValue="user@example.com" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
          <label className="swg-field">Password <input name="swg_audit_password" type="password" defaultValue="password" autoComplete="off" data-lpignore="true" data-1p-ignore required /></label>
          <p className="swg-run-hint">Submitted credentials are discarded immediately.</p>
          <div className="swg-dl-row">
            <button className="swg-dl" type="submit">Submit credentials</button>
          </div>
          <div className="swg-output" data-test-output hidden />
        </form>`, "Phishing pages exist to collect real credentials. If outbound form submissions aren't inspected, a username and password can leave the network even after landing on a suspicious page.", "Submit the prefilled test credentials. The endpoint only reports whether the submission reached the server and discards the values immediately.", "The submission is blocked, disrupted, stripped, or cannot complete through the protected path.", "The submitted data reaches the server-side simulation endpoint successfully."),

  page("malware/ransomware-file", "Ransomware", "Malware", "Bare Minimum", "Ransomware-style file detection", `
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-single-download data-url="/test-files/malware/bare-minimum/ransomware-note-simulation.txt" data-name="ransomware-note-simulation.txt">Download ransomware sample</button></div>`, "Ransomware incidents often leave behind instructions or warning files that are not executable but still indicate a serious compromise.", "Download the harmless ransomware-note simulation and check whether perimeter controls stop recognisable ransomware-style content.", "The download is blocked before it reaches your device.", "The ransomware-style file downloads normally with no warning."),
  page("malware/personal-data-file", "Personal-data download", "Malware", "Bare Minimum", "Sensitive-data file detection", `
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-single-download data-url="/test-files/malware/bare-minimum/pii-file.xlsx" data-name="pii-file.xlsx">Download personal-data sample</button></div>`, "Files containing personal information can be risky even when they contain no executable code or known malware signature.", "Download the harmless spreadsheet shaped like personal data and check whether policy controls recognise and stop the sensitive file.", "The download is blocked before it reaches your device.", "The personal-data file downloads normally with no warning."),
  page("malware/different-file-formats", "Different file formats", "Malware", "Bare Minimum", "Malware file-type detection", `
        <div className="swg-run-pick">Choose a file format:</div>
        <div className="swg-pick" data-pick="different-file-formats">
          <button className="swg-chip is-active" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.txt" data-name="eicar.txt">TXT</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.pdf" data-name="eicar.pdf">PDF</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.docx" data-name="eicar.docx">DOCX</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.docm" data-name="eicar.docm">DOCM</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.xlsx" data-name="eicar.xlsx">XLSX</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.pptx" data-name="eicar.pptx">PPTX</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/file-formats/eicar.zip" data-name="eicar.zip">ZIP</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="different-file-formats">Download selected format</button></div>`, "Malware scanners sometimes lean too heavily on file extension instead of inspecting what's actually inside. A payload wrapped in a document, spreadsheet, or archive can slip past extension-based rules.", "Choose a file format and download it. Every format wraps the same harmless EICAR test signature, so any difference in outcome comes from how that format is handled, not the payload itself.", "The download is blocked for that format.", "The file downloads with no warning, regardless of its format."),
  page("malware/executable-files", "Executable files", "Malware", "Bare Minimum", "Executable download blocking", `
        <div className="swg-pick" data-pick="executable-files">
          ${["exe","scr","bat","cmd","ps1","js","vbs","hta","iso"].map((ext, i) => `<button className="swg-chip${i === 0 ? " is-active" : ""}" type="button" data-chip data-kind="direct" data-url="/test-files/malware/executable-files/test.${ext}" data-name="test.${ext}">${ext.toUpperCase()}</button>`).join("\n          ")}
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="executable-files">Download executable</button></div>`, "Executables and scripts are the most direct way to run code on a device. If a gateway lets any of these formats download unchecked, ransomware and other malware have a straightforward way in.", "Choose a format and download it. Each file is a harmless stand-in, but every extension listed has been used to deliver real malware.", "The download is blocked before it reaches your device.", "The executable or script downloads with no warning."),
  page("malware/http-https-and-cloud-delivery", "HTTP, HTTPS, and cloud downloads", "Malware", "Bare Minimum", "Multi-channel malware delivery detection", `
        <div className="swg-run-pick">Choose a delivery channel:</div>
        <div className="swg-pick" data-pick="http-https-and-cloud-delivery">
          <button className="swg-chip is-active" type="button" data-chip data-kind="link" data-url="http://images.swgaudit.com/random-image.png" data-name="random-image.png">HTTP delivery</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/delivery/random-image.png" data-name="random-image.png">HTTPS local delivery</button>
          <button className="swg-chip" type="button" data-chip data-kind="link" data-url="https://drive.google.com/uc?export=download&id=1-JD7otH7POh5RVGZXG1ni2NZRd3TEmtL" data-name="cloud-download.png">Cloud delivery</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="http-https-and-cloud-delivery">Download sample</button></div>`, "Malware doesn't only arrive from suspicious sites. It can be delivered over cleartext HTTP, trusted HTTPS hosts, or cloud storage where domain reputation checks alone aren't enough.", "Choose a delivery channel. Each option downloads the same harmless image-style payload from a different source: cleartext HTTP on another host, HTTPS from this site, or Google Drive.", "The download is inspected and blocked regardless of where it was hosted.", "The file downloads successfully from that source."),
  page("malware/nested-file-download", "Nested file download", "Malware", "Evasion Detection", "Nested archive and document inspection", `
        <div className="swg-run-pick">Choose a nested file:</div>
        <div className="swg-dd" data-dd data-dd-dl="nested-file-download">
          <button className="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>ZIP -&gt; ZIP -&gt; EICAR TXT</span><span className="swg-caret" /></button>
          <div className="swg-dd-menu" data-dd-menu hidden>
            ${[
              ["ZIP -> ZIP -> EICAR TXT", "direct", "/test-files/malware/nested-files/zip-zip-eicar-txt.zip", "zip-zip-eicar-txt.zip"],
              ["ISO -> ZIP -> EICAR TXT", "direct", "/test-files/malware/nested-files/iso-zip-eicar-txt.iso", "iso-zip-eicar-txt.iso"],
              ["ZIP -> 7Z -> EICAR DOCM", "direct", "/test-files/malware/nested-files/zip-7z-eicar-docm.zip", "zip-7z-eicar-docm.zip"],
              ["PPTX -> XLSX -> EICAR DOCM", "direct", "/test-files/malware/nested-files/pptx-xlsx-eicar-docm.pptx", "pptx-xlsx-eicar-docm.pptx"],
              ["ZIP -> DOCX -> EICAR TXT", "direct", "/test-files/malware/nested-files/zip-docx-eicar-txt.zip", "zip-docx-eicar-txt.zip"],
              ["ZIP -> DOCX -> EICAR DOCM", "direct", "/test-files/malware/nested-files/zip-docx-eicar-docm.zip", "zip-docx-eicar-docm.zip"],
              ["ISO -> DOCX -> EICAR DOCM", "direct", "/test-files/malware/nested-files/iso-docx-eicar-docm.iso", "iso-docx-eicar-docm.iso"],
              ["ZIP -> ZIP -> ZIP -> EICAR TXT", "direct", "/test-files/malware/nested-files/zip-zip-zip-eicar-txt.zip", "zip-zip-zip-eicar-txt.zip"],
              ["ZIP -> invoice.pdf.docm", "direct", "/test-files/malware/nested-files/zip-misleading-invoice-pdf-docm.zip", "zip-misleading-invoice-pdf-docm.zip"],
            ].map(([label, kind, url, name], i) => `<button className="swg-dd-opt${i === 0 ? " is-active" : ""}" type="button" data-dd-opt data-kind="${kind}" data-url="${url}" data-name="${name}">${label}</button>`).join("\n            ")}
          </div>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="nested-file-download">Download nested sample</button></div>`, "Wrapping a payload inside layers of archives or documents, a ZIP inside an ISO inside a document, can cause scanners that only check the outer file to miss what's buried inside.", "Choose a nesting pattern and download it. Each sample buries the same test payload two or three layers deep inside different container formats.", "The gateway unpacks the layers and blocks the file based on what's inside.", "The nested file downloads without being unpacked or flagged."),
  page("malware/password-protected-file", "Password-protected file", "Malware", "Evasion Detection", "Protected archive inspection", `
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-single-download data-url="/test-files/malware/password-protected/test-password-protected.zip" data-name="test-password-protected.zip">Download password-protected ZIP</button></div>`, "Encrypting an archive with a password stops most automated scanners from looking inside, since they can't open the file without it. Attackers often mention the password in the same email as the attachment.", "Download the sample, a ZIP archive protected with the password 123456. This mirrors a common technique where the password is trivial but still blocks automated inspection.", "The protected archive is blocked.", "The password-protected archive downloads with no warning."),
  page("malware/file-spoofing", "File spoofing", "Malware", "Evasion Detection", "Double-extension executable detection", `
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-single-download data-url="/test-files/malware/file-spoofing/dummy.pdf.exe" data-name="dummy.pdf.exe">Download dummy.pdf.exe</button></div>`, "Renaming or double-extending a file, like naming an executable 'invoice.pdf.exe', can trick a user who only sees the first part of the filename, or an operating system that hides extensions by default.", "Download the sample file. It looks like a PDF at a glance, but it's actually a Windows executable.", "The gateway spots the mismatch between the apparent and real file type and blocks it.", "The disguised executable downloads with no warning."),
  page("malware/encoded-files", "Encoded files", "Malware", "Advanced Threat Simulation", "Encoded malware reconstruction detection", `
        <div className="swg-run-pick">Choose an encoded payload:</div>
        <div className="swg-pick" data-pick="encoded-files">
          <button className="swg-chip is-active" type="button" data-chip data-kind="assemble" data-url="/test-files/malware/payloads/decode-eicar-docm.json">Base64 DOCM payload</button>
          <button className="swg-chip" type="button" data-chip data-kind="assemble" data-url="/test-files/malware/payloads/decode-eicar-docm-base32.json">Base32 DOCM payload</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="encoded-files">Rebuild and download</button></div>`, "Encoding a payload as text turns binary content into something that looks harmless in transit. Tools that only check known file signatures can miss content that's been encoded first.", "Choose an encoding. The browser fetches the encoded DOCM data, decodes it locally, and offers the rebuilt file for download. The DOCM contains a macro that prints the EICAR string on screen when the file is opened.", "The gateway blocks the encoded transfer or the rebuilt file before it can be used.", "The payload is fetched, decoded, and downloaded with no interruption."),
  page("malware/encrypted-files", "Encrypted files", "Malware", "Advanced Threat Simulation", "Encrypted malware reconstruction detection", `
        <div className="swg-run-pick">Choose an encrypted payload:</div>
        <div className="swg-pick" data-pick="encrypted-files">
          <button className="swg-chip is-active" type="button" data-chip data-kind="assemble" data-url="/test-files/malware/payloads/decrypt-eicar-txt.json">AES-GCM TXT payload</button>
          <button className="swg-chip" type="button" data-chip data-kind="assemble" data-url="/test-files/malware/payloads/decrypt-eicar-docm.json">AES-GCM DOCM payload</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/encrypted-files/eicar-docm-aes256.zip" data-name="eicar-docm-aes256.zip">AES ZIP</button>
          <button className="swg-chip" type="button" data-chip data-kind="direct" data-url="/test-files/malware/encrypted-files/eicar-docm-encrypted.7z" data-name="eicar-docm-encrypted.7z">Encrypted 7Z</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="encrypted-files">Run encrypted-file test</button></div>`, "Encrypting a payload before transfer hides its contents from anything that inspects traffic in transit. Since the data only becomes readable after decryption, gateways that only scan network traffic can miss it entirely.", "Choose a payload or archive. Some options decrypt AES-GCM ciphertext directly in the browser before download, others download an archive that's already encrypted.", "The transfer or the resulting file is blocked despite the encryption.", "The encrypted or decrypted file downloads with no warning."),
  page("malware/browser-open-docm", "Macro document", "Malware", "Advanced Threat Simulation", "Direct DOCM delivery detection", `
        <div className="swg-dl-row"><a className="swg-dl" href="/test-files/malware/file-formats/eicar.docm" target="_blank" rel="noreferrer" data-reveal>Open EICAR DOCM</a></div>`, "A macro-enabled Office document can reach an endpoint through an ordinary browser navigation. Even though the browser cannot display the file, it can hand it off as a download, creating a path for document-borne malware.", "Click the button to fetch eicar.docm from this server and ask the browser to open it in a new tab. The browser cannot render DOCM content, so an allowed response should trigger a download instead.", "The gateway or browser security control blocks the request, displays a warning, or prevents the DOCM from downloading.", "The DOCM request succeeds and the browser downloads the file without a security warning."),
  page("malware/webassembly-eicar", "Web Assembly", "Malware", "Advanced Threat Simulation", "WebAssembly malware reconstruction detection", `
        <div className="swg-pick" data-pick="webassembly-eicar">
          <button className="swg-chip is-active" type="button" data-chip data-kind="wasm" data-url="/test-files/malware/wasm/eicar.wasm" data-name="eicar.txt" data-mime="text/plain">WebAssembly module</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="webassembly-eicar">Assemble and download EICAR</button></div>`, "A web page can fetch code that looks harmless in transit and use WebAssembly to construct a known malicious payload entirely inside the browser. A gateway that only scans complete downloadable files may never see the final content.", "Run the test to fetch and instantiate the WebAssembly module from the original SWG Audit test. The module writes the standard harmless EICAR test string into browser memory; JavaScript reads that memory and creates eicar.txt locally.", "The WebAssembly module, browser-side reconstruction, or resulting EICAR download is blocked or warned on.", "The browser executes the module, assembles eicar.txt locally, and downloads it without a security warning."),
  page("malware/chunk-attacks-different-orders", "Chunk attacks", "Malware", "Advanced Threat Simulation", "Chunk reconstruction detection", `
        <div className="swg-run-pick">Choose a chunking pattern:</div>
        <div className="swg-dd" data-dd data-dd-dl="chunk-attacks-different-orders">
          <button className="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Straight split</span><span className="swg-caret" /></button>
          <div className="swg-dd-menu" data-dd-menu hidden>
            ${["straight-split","reverse-order","randomized-size","mixed-noise","parallel-burst"].map((mode, i) => `<button className="swg-dd-opt${i === 0 ? " is-active" : ""}" type="button" data-dd-opt data-kind="chunk" data-url="/test-files/malware/chunk-attacks/${mode}/manifest.json">${mode.replaceAll("-", " ")}</button>`).join("\n            ")}
          </div>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="chunk-attacks-different-orders">Reassemble chunks</button></div>`, "Splitting a file into small pieces and fetching them separately can keep size- or signature-based scanners from ever seeing the complete payload in one request.", "Choose a chunking pattern. The browser fetches every chunk for that pattern, in order, reversed, resized, mixed with decoy data, or fetched in parallel, then reassembles the original file.", "The gateway spots the reconstruction pattern and blocks the reassembled file.", "All chunks are fetched and reassembled into a working file with no interruption."),
  page("malware/smuggling-html-js-css-or-svg", "Smuggling through frontend files", "Malware", "Advanced Threat Simulation", "HTML/JS/CSS/SVG smuggling detection", `
        <div className="swg-run-pick">Choose a smuggling carrier:</div>
        <div className="swg-pick" data-pick="smuggling-html-js-css-or-svg">
          <button className="swg-chip is-active" type="button" data-chip data-kind="smuggle" data-carrier="html" data-name="html-smuggled-eicar.docm">HTML</button>
          <button className="swg-chip" type="button" data-chip data-kind="smuggle" data-carrier="js" data-name="js-smuggled-eicar.docm">JavaScript</button>
          <button className="swg-chip" type="button" data-chip data-kind="smuggle" data-carrier="css" data-name="css-smuggled-eicar.docm">CSS</button>
          <button className="swg-chip" type="button" data-chip data-kind="smuggle" data-carrier="svg" data-name="svg-smuggled-eicar.docm">SVG</button>
        </div>
        <div className="swg-dl-row"><button className="swg-dl" type="button" data-dl="smuggling-html-js-css-or-svg">Extract smuggled file</button></div>`, "HTML smuggling hides a file's data inside a web page, script, stylesheet, or image metadata, then rebuilds it entirely inside the browser. Because the file never crosses the network as a normal download, many gateways never see it.", "Choose a carrier format. The payload is already embedded in the page using that method. Clicking the button extracts and reassembles it into a downloadable file, entirely in your browser.", "The reconstruction is detected and blocked before the file is produced.", "The file is rebuilt and downloaded with no interruption."),

  page("data-theft/personal-data-submission-in-normal-file", "File submission", "Data Theft", "Bare Minimum", "Outbound file upload detection", `
        <form className="swg-form" method="post" action="/data-theft/upload.php" encType="multipart/form-data" data-file-submission-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" name="personal_data_file" /></label>
          <p className="swg-run-hint">Submitted files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row"><button className="swg-dl" type="submit">Upload file</button></div>
          <div className="swg-output" data-test-output hidden />
        </form>`, "Files leave the network all the time, and any of them can carry sensitive material out with them — personal data, PII, financial records, or confidential documents. A gateway that doesn't inspect outbound uploads can't tell an ordinary file from one that is quietly leaking data.", "Choose any file and upload it. This test is designed to check how your SWG treats outbound file uploads in general — whether it inspects, restricts, or freely allows different file types (personal data, PII, and other documents) leaving the network.", "The upload is blocked or intercepted before it leaves the browser.", "The file uploads successfully with no interruption."),
  page("data-theft/file-encoding", "File encoding", "Data Theft", "Evasion Detection", "Encoded exfiltration detection", `
        <form className="swg-form" data-data-theft-encoding-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" name="source_file" /></label>
          <div className="swg-run-pick">Choose encoding:</div>
          <div className="swg-pick" data-pick="file-encoding">
            <button className="swg-chip is-active" type="button" data-chip data-mode="base64">Base64</button>
            <button className="swg-chip" type="button" data-chip data-mode="double-base64">Double Base64</button>
            <button className="swg-chip" type="button" data-chip data-mode="hex">Hex</button>
            <button className="swg-chip" type="button" data-chip data-mode="url">URL encoded</button>
          </div>
          <p className="swg-run-hint">Reconstructed files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row"><button className="swg-dl" type="submit">Submit</button></div>
          <div className="swg-output" data-test-output hidden />
        </form>`, "Encoding a file with Base64 or hex before uploading it can defeat simple content matching, since the sensitive data no longer appears in its original, readable form.", "Choose a file and an encoding method, then submit. The file is encoded in the browser and sent to a test endpoint that tries to decode and reconstruct it.", "The upload is blocked, or the server can't reconstruct the original file.", "The server successfully reconstructs the original file from the encoded upload."),
  page("data-theft/file-encrypting", "File encrypting", "Data Theft", "Evasion Detection", "Encrypted exfiltration detection", `
        <form className="swg-form" data-data-theft-encryption-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" name="source_file" /></label>
          <div className="swg-run-pick">Choose encryption:</div>
          <div className="swg-pick" data-pick="file-encrypting">
            <button className="swg-chip is-active" type="button" data-chip data-mode="aes-gcm">AES-GCM</button>
            <button className="swg-chip" type="button" data-chip data-mode="aes-gcm-password">AES-GCM with password</button>
          </div>
          <p className="swg-run-hint">Password: 123456. Reconstructed files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row"><button className="swg-dl" type="submit">Submit</button></div>
          <div className="swg-output" data-test-output hidden />
        </form>`, "Encrypting a file before upload hides its content from inspection entirely, since only someone with the key can read it. Attackers use this to move data past scanners that rely on reading file contents.", "Choose a file and an encryption method, then submit. The file is encrypted in the browser with AES-GCM and sent along with the metadata needed to decrypt it on the server.", "The upload is blocked, or the server can't decrypt and reconstruct the file.", "The server successfully decrypts and reconstructs the original file."),
  page("data-theft/file-chunking", "File chunking", "Data Theft", "Evasion Detection", "Chunked exfiltration detection", `
        <form className="swg-form" data-data-theft-chunking-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" name="source_file" /></label>
          <div className="swg-run-pick">Choose chunking:</div>
          <div className="swg-dd" data-dd data-dd-dl="file-chunking">
            <button className="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Straight split</span><span className="swg-caret" /></button>
            <div className="swg-dd-menu" data-dd-menu hidden>
              ${["straight-split","reverse-order","randomized-size","mixed-noise","parallel-burst"].map((mode, i) => `<button className="swg-dd-opt${i === 0 ? " is-active" : ""}" type="button" data-dd-opt data-mode="${mode}">${mode.replaceAll("-", " ")}</button>`).join("\n              ")}
            </div>
          </div>
          <p className="swg-run-hint">Reconstructed files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row"><button className="swg-dl" type="submit">Submit</button></div>
          <div className="swg-output" data-test-output hidden />
        </form>`, "Splitting a file into small pieces before upload can help it slip past size limits or pattern matching that only looks at complete files in a single request.", "Choose a file and a chunking pattern, then submit. The file is split and uploaded piece by piece using that pattern, and the server tries to reassemble it.", "The upload is blocked, or the server can't reassemble the complete file.", "The server successfully reassembles the original file from the chunks."),
  page("data-theft/dns-tunneling", "DNS tunneling", "Data Theft", "Advanced Threat Simulation", "DNS exfiltration detection", `
        <form className="swg-form" data-dns-tunnel-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" data-dns-tunnel-file /></label>
          <p className="swg-run-hint">Use a file under 100 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row">
            <button className="swg-dl" type="submit" data-dns-tunnel-submit>Run DNS tunnel</button>
            <button className="swg-dl swg-dl-alt" type="button" data-dns-tunnel-reset hidden>Reset</button>
          </div>
          <div className="swg-output" data-dns-tunnel-status hidden />
        </form>`, "DNS queries are rarely inspected as closely as normal web traffic. Encoding stolen data into a series of DNS lookups can move information out of a network even when every other outbound channel is locked down.", "Choose a file and run the test. The file is encoded and sent out as a sequence of DNS queries, then reconstruction is attempted on the receiving end.", "The DNS queries are blocked, or the file can't be reconstructed.", "The file is successfully reconstructed from the DNS queries."),
  page("data-theft/http-path-tunneling", "HTTP path tunneling", "Data Theft", "Advanced Threat Simulation", "HTTP path exfiltration detection", `
        <form className="swg-form" data-path-tunnel-form>
          <label className="swg-file-field"><span className="swg-file-button">Choose file</span><span className="swg-file-name" data-file-name>No file chosen</span><input className="swg-file-input" type="file" data-path-tunnel-file /></label>
          <p className="swg-run-hint">Use a file under 200 KB. Reconstructed files are deleted from the server after 10 minutes.</p>
          <div className="swg-dl-row">
            <button className="swg-dl" type="submit" data-path-tunnel-submit>Run path tunnel</button>
            <button className="swg-dl swg-dl-alt" type="button" data-path-tunnel-reset hidden>Reset</button>
          </div>
          <div className="swg-output" data-path-tunnel-status hidden />
        </form>`, "Instead of using a request body, data can be encoded directly into the URL path of a series of HTTP requests, a channel that's sometimes logged but rarely inspected for hidden content.", "Choose a file and run the test. The file is encoded into a series of URL paths and sent as separate requests, then reconstruction is attempted on the receiving end.", "The requests are blocked, or the file can't be reconstructed.", "The file is successfully reconstructed from the URL path requests."),

  page("cyberslacking/video-content-category-simulation", "Video content category simulation", "Cyberslacking", "Bare Minimum", "Streaming category policy", `
        <div className="swg-dd" data-dd data-dd-frame="video-frame">
          <button className="swg-dd-btn" type="button" data-dd-toggle><span data-dd-label>Entertainment</span><span className="swg-caret" /></button>
          <div className="swg-dd-menu" data-dd-menu hidden>
            <button className="swg-dd-opt is-active" type="button" data-dd-opt data-video="https://www.youtube.com/embed/YjlgahImVwI">Entertainment</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/zQGOcOUBi6s">Education</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/cqGjhVJWtEg">Film &amp; Animation</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/ootFmPxtBIo">Autos &amp; Vehicles</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/kJQP7kiw5Fk">Music</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/B3u4EFTwprM">Pets &amp; Animals</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/K3o2QaaXN0o">Sports</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/WT5JvAq50OE">Travel &amp; Events</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/QdBZY2fkU-0">Gaming</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/H-1HEyPr4Ew">People &amp; Blogs</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/SQD7AO3_nmU">News &amp; Politics</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/Mg7aJdnbY48">Howto &amp; Style</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/9hWQpY-656M">Science &amp; Technology</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/uYPbbksJxIg">Movies</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/TcMBFSGVi1c">Action/Adventure</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/D30r0CwtIKc">Drama</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/LEjhY15eCx0">Family</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/isOGD_7hNIY">Foreign</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/k10ETZ41q5o">Horror</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/WR7cc5t7tv8">Thriller</button>
            <button className="swg-dd-opt" type="button" data-dd-opt data-video="https://www.youtube.com/embed/LembwKDo1Dk">Trailers</button>
          </div>
        </div>
        <div className="swg-video"><iframe id="video-frame" src="https://www.youtube.com/embed/YjlgahImVwI" title="SWG Audit cyberslacking video test" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>`, "Entertainment and streaming platforms can quietly eat into productivity and bandwidth if category-based content policies aren't actually being enforced.", "Choose a video category from the dropdown. The embedded player loads the same sample video used by the v2 site so you can check what your policy actually allows through.", "The category is blocked, or the video does not play.", "The video loads and plays with no restriction."),
];

const pickDescriptions = {
  "phishing/url-manipulation": {
    "Typo lookalike URL": "Lookalike path: 'rn' mimics 'm' and a capital I stands in for a lowercase L, so rnicrosoft-Iogin reads as 'microsoft-login' at a glance.",
    "Homograph URL": "Homograph path: the Latin 'o' is replaced with a Cyrillic 'o' lookalike. The text looks identical but uses a different character, defeating simple string matching.",
    "Redirect to lookalike": "Redirect parameter: a clean-looking URL carries a destination value that forwards to the lookalike page, hiding the real target from a quick glance.",
    "Short URL redirect": "Short URL: a short, friendly path redirects to the phishing page, masking the final URL behind a shortener-style link.",
  },
  "phishing/site-stored-as-mhtml-or-raw-html": {
    "Raw HTML": "Builds the phishing-style page directly as local HTML in the browser, then opens it in a new tab.",
    "MHTML": "Builds the same page as a browser-generated MHTML-style payload, extracts its HTML part, then opens it in a new tab.",
  },
  "malware/ransomware-or-personal-data-file": {
    "Ransomware note (.txt)": "Downloads a harmless text file that looks like a ransom note. This checks whether the gateway blocks obvious ransomware-style content before it reaches the browser.",
    "Personal-data file (.xlsx)": "Downloads a harmless spreadsheet shaped like sensitive personal data. This checks whether the gateway stops risky business-data files from leaving or reaching endpoints.",
  },
  "malware/executable-files": {
    "EXE": "Windows executable sample. This should be one of the most strictly controlled direct-download formats.",
    "SCR": "Screensaver executable sample. Often abused because it looks less obvious than an EXE but still runs code.",
    "BAT": "Batch script sample. Checks whether script-like files are blocked even when they are simple text commands.",
    "CMD": "Command script sample. Similar to BAT, but commonly used for Windows command execution.",
    "PS1": "PowerShell script sample. Checks whether administrative scripting formats are blocked on download.",
    "JS": "JavaScript file sample. Checks whether browser/script payloads are handled as executable content.",
    "VBS": "VBScript sample. Older Windows scripting formats still matter for policy coverage.",
    "HTA": "HTML application sample. Checks whether hybrid HTML executable files are treated as runnable content.",
    "ISO": "Disk image sample. Attackers often use ISO files to wrap executable content and bypass simple filters.",
  },
  "malware/http-https-and-cloud-delivery": {
    "HTTP delivery": "Downloads the sample over cleartext HTTP from images.swgaudit.com, testing whether unencrypted cross-origin delivery is blocked.",
    "HTTPS local delivery": "Downloads the same image-style payload over HTTPS from this site.",
    "Cloud delivery": "Downloads the sample from Google Drive, testing whether major cloud hosting is still inspected.",
  },
  "malware/nested-file-download": {
    "ZIP -> ZIP -> EICAR TXT": "A ZIP inside a ZIP containing the text payload. Tests double-archive unpacking.",
    "ISO -> ZIP -> EICAR TXT": "A disk image containing a ZIP containing the text payload. Tests ISO inspection plus archive extraction.",
    "ZIP -> 7Z -> EICAR DOCM": "A ZIP containing a 7Z archive with a macro-enabled document. Tests nested archive format coverage.",
    "PPTX -> XLSX -> EICAR DOCM": "A presentation containing a spreadsheet containing a macro-enabled document. Tests Office-to-Office nesting.",
    "ZIP -> DOCX -> EICAR TXT": "A ZIP containing a document that contains the text payload. Tests nested archive and document unpacking.",
    "ZIP -> DOCX -> EICAR DOCM": "A ZIP containing a document that leads to a macro-enabled document. Tests deeper Office-document inspection.",
    "ISO -> DOCX -> EICAR DOCM": "A disk image containing an Office nesting chain. Tests whether disk images are unpacked before document scanning.",
    "ZIP -> ZIP -> ZIP -> EICAR TXT": "Three nested ZIP layers before the text payload. Tests deep archive unpacking.",
    "ZIP -> invoice.pdf.docm": "A ZIP with a misleading invoice-style filename hiding a macro-enabled document.",
  },
  "malware/encoded-files": {
    "Base64 DOCM payload": "Rebuilds the macro-enabled document from a Base64 JSON payload. The DOCM has a macro that prints the EICAR string on screen when the file is opened.",
    "Base32 DOCM payload": "Rebuilds the same macro-enabled document from a Base32 JSON payload. The DOCM has a macro that prints the EICAR string on screen when the file is opened.",
  },
  "malware/encrypted-files": {
    "AES-GCM TXT payload": "Decrypts the text payload in the browser with AES-GCM and downloads the reconstructed sample.",
    "AES-GCM DOCM payload": "Decrypts the macro-enabled document in the browser, testing client-side encrypted delivery.",
    "AES ZIP": "Downloads an AES-encrypted ZIP archive, checking whether protected archives are blocked or handled with policy.",
    "Encrypted 7Z": "Downloads an encrypted 7Z archive, checking whether non-ZIP encrypted containers are covered.",
  },
  "malware/chunk-attacks-different-orders": {
    "straight split": "Fetches ordered chunks and reassembles the payload normally in the browser.",
    "reverse order": "Fetches chunks in reverse order, then sorts them back into the original payload.",
    "randomized size": "Uses uneven chunk sizes to check whether reconstruction logic is detected beyond fixed-size patterns.",
    "mixed noise": "Adds decoy chunks around the real payload, testing whether controls ignore noise and identify the reconstruction.",
    "parallel burst": "Fetches chunks in parallel, simulating a bursty client-side reconstruction pattern.",
  },
  "malware/smuggling-html-js-css-or-svg": {
    "HTML": "Extracts the payload from HTML-carried data and rebuilds the downloaded file in the browser.",
    "JavaScript": "Extracts the payload from script-carried data, matching a JavaScript smuggling pattern.",
    "CSS": "Extracts the payload from CSS-carried data, checking whether non-script carriers are still inspected.",
    "SVG": "Extracts the payload from SVG metadata, testing an image/document-style smuggling carrier.",
  },
  "data-theft/file-chunking": {
    "straight split": "Splits the selected file into ordered chunks and submits a manifest for reconstruction.",
    "reverse order": "Submits the chunks in reverse order while preserving manifest order for reconstruction.",
    "randomized size": "Uses uneven chunk sizes to avoid a simple fixed-size split pattern.",
    "mixed noise": "Adds decoy chunks before and after the real data to test whether reconstruction ignores noise.",
    "parallel burst": "Submits a burst-style chunk set using the same reconstruction mechanism.",
  },
};

const descriptionlessRunSlugs = new Set([
  "phishing/site-stored-as-mhtml-or-raw-html",
  "phishing/canvas-engine",
  "malware/ransomware-file",
  "malware/personal-data-file",
  "malware/executable-files",
  "malware/http-https-and-cloud-delivery",
  "malware/nested-file-download",
  "malware/encoded-files",
  "malware/encrypted-files",
  "malware/browser-open-docm",
  "malware/webassembly-eicar",
]);

const compactRunSlugs = new Set([
  "phishing/cached-content-mutation",
  "malware/password-protected-file",
  "malware/file-spoofing",
  "malware/browser-open-docm",
]);

const noTerminalSlugs = new Set([
  "cyberslacking/video-content-category-simulation",
  "phishing/form-submission-on-random-site",
]);

const runModifierClasses = {
  "phishing/form-submission-on-random-site": " swg-run--form",
  "cyberslacking/video-content-category-simulation": " swg-run--media",
};

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function addPickDescriptions(slug, run) {
  const descriptions = pickDescriptions[slug];
  if (!descriptions) return run;

  let firstDescription = "";
  let output = run.replace(/<button\b([^>]*)>([^<]+)<\/button>/g, (match, attrs, label) => {
    const desc = descriptions[label.trim()];
    if (!desc) return match;
    if (!firstDescription) firstDescription = desc;
    if (/\sdata-desc=/.test(attrs)) {
      return match.replace(/\sdata-desc="[^"]*"/, ` data-desc="${escapeAttr(desc)}"`);
    }
    return `<button${attrs} data-desc="${escapeAttr(desc)}">${label}</button>`;
  });

  if (!firstDescription || output.includes("data-pick-desc")) return output;
  return output.replace(/(<\/div>\s*)(<p className="swg-run-hint"|<div className="swg-dl-row">|<div className="swg-output"|<\/form>)/, `$1<p className="swg-pick-desc" data-pick-desc>${firstDescription}</p>\n          $2`);
}

const nav = {
  Phishing: "/phishing/",
  Malware: "/malware/",
  "Data Theft": "/data-theft/",
  Cyberslacking: "/cyberslacking/",
};

function footerHtml() {
  return `      <div className="swg-foot">
        All tests are non-malicious and safe for production environments. By continuing, you agree to our <a className="swg-foot-link" href="/terms">Terms of Use</a> and <a className="swg-foot-link" href="/privacy">Privacy Policy</a>.
      </div>`;
}

function navHtml(active) {
  const aboutActive = active === "about" ? " is-active" : "";
  const contributeActive = active === "contribute" ? " is-active" : "";
  return `<div className="swg-nav" role="navigation" aria-label="Primary">
    <a className="swg-brand" href="/">
      <img className="swg-brand-mark" src="/images/logo.png" alt="" width="31" height="31" />
      SWG Audit
    </a>
    <div className="swg-nav-actions">
      <a className="swg-nl swg-about-link${aboutActive}" href="/about">About us</a>
      <a className="swg-nl swg-contribute-link${contributeActive}" href="/contribute">Contribute</a>
      <a className="swg-gh" href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noreferrer">
        <img src="/images/github-mark.svg" alt="" />
        <span className="swg-sr-only">GitHub</span>
      </a>
    </div>
  </div>
  <script src="/favicon.js" defer></script>`;
}

function sidebarHtml(currentSlug) {
  const groups = ["Phishing", "Malware", "Data Theft", "Cyberslacking"];
  const gsActive = currentSlug === "getting-started" ? " is-active" : "";
  const aboutActive = currentSlug === "about" ? " is-active" : "";
  const contributeActive = currentSlug === "contribute" ? " is-active" : "";
  return `<div className="swg-sb" role="complementary" aria-label="Tests">
      <a className="swg-sb-link${gsActive}" href="/getting-started">Getting started</a>
      <div className="swg-sb-sep" />
      ${groups.map((group, index) => {
        const id = `sbg-${group.toLowerCase().replace(/\s+/g, "-")}`;
        const items = pages.filter((p) => p.category === group);
        const isOpen = currentSlug === nav[group].replace(/^\/|\/$/g, "") || items.some((p) => p.slug === currentSlug);
        return `${index ? '<div className="swg-sb-sep" />' : ""}
      <div className="swg-sb-cat${isOpen ? " is-open" : " is-collapsed"}">
        <a className="swg-sb-cat-link" href="${nav[group]}">${group}</a>
        <button className="swg-sb-toggle" type="button" data-sb-toggle="${id}" aria-label="${isOpen ? "Collapse" : "Expand"} ${group} tests" aria-expanded="${isOpen ? "true" : "false"}">
          <span className="swg-caret" aria-hidden="true" />
        </button>
      </div>
      <div className="swg-sb-group${isOpen ? "" : " is-collapsed"}" id="${id}">
        ${items.map((p) => `<a className="swg-si${p.slug === currentSlug ? " is-active" : ""}" href="/${p.slug}"${p.slug === currentSlug ? ' aria-current="page"' : ""}>${p.title}</a>`).join("\n        ")}
      </div>`;
      }).join("\n      ")}
      <div className="swg-sb-sep" />
      <a className="swg-sb-link${aboutActive}" href="/about">About us</a>
      <a className="swg-sb-link${contributeActive}" href="/contribute">Contribute</a>
    </div>`;
}

function titleHtml(p) {
  if (p.slug.endsWith("smuggling-html-js-css-or-svg")) {
    return "Smuggling through <em>frontend files</em>";
  }
  return p.title;
}

function breadcrumbHtml(p) {
  return `<div className="swg-bc" role="navigation" aria-label="Breadcrumb">
          <a className="swg-bc-home" href="/">Home</a>
          <span className="swg-bc-sep">/</span>
          <a className="swg-bc-category" href="${nav[p.category]}">${p.category}</a>
          <span className="swg-bc-sep">/</span>
          <span className="swg-bc-cur swg-bc-current">${p.title}</span>
        </div>`;
}

function passFailHtml(p) {
  return `              <div className="swg-pf">
                <div className="swg-pf-card swg-pf-pass">
                  <span className="swg-pf-glyph">&#10003;</span>
                  <div>
                    <div className="swg-pf-label">Test pass condition</div>
                    <p className="swg-pf-text">${p.pass}</p>
                  </div>
                </div>
                <div className="swg-pf-card swg-pf-fail">
                  <span className="swg-pf-glyph">&#10007;</span>
                  <div>
                    <div className="swg-pf-label">Test fail condition</div>
                    <p className="swg-pf-text">${p.fail}</p>
                  </div>
                </div>
              </div>`;
}

function serverFileBtn() {
  return `              <div className="swg-dl-row"><button className="swg-dl swg-dl-alt" type="button" data-open-server-file hidden>Open reconstructed file</button></div>`;
}

function stripRunPick(html) {
  // Drop every "Choose ..." label above the pickers/dropdowns across all tests.
  return html.replace(/\s*<div className="swg-run-pick">[\s\S]*?<\/div>/g, "");
}

function splitRunAction(run) {
  const trimmed = run.trim();
  const match = trimmed.match(
    /^([\s\S]*?)(\s*<div className="swg-dl-row">[\s\S]*?<\/div>)(\s*[\s\S]*)$/
  );
  if (!match) {
    return { lead: trimmed, action: "", tail: "" };
  }
  return {
    lead: match[1].trim(),
    action: match[2].trim(),
    tail: match[3].trim(),
  };
}

function banner() {
  return "";
}

function smuggleRunArea(p, run, extra) {
  // Smuggling: no "Carrier format" label and no per-option descriptions.
  const controls = stripRunPick(run)
    .replace(/<div className="swg-dl-row">[\s\S]*?<\/div>\s*$/, "")
    .trim();

  return `        <div className="swg-run">
          <div className="swg-run-label">Try it yourself</div>
          <div className="swg-run-body">
            <div className="swg-run-controls">
              <div>
${controls}
              </div>
${passFailHtml(p)}
              <div className="swg-dl-row swg-dl-anchor"><button className="swg-dl" type="button" data-dl="smuggling-html-js-css-or-svg">Run test</button></div>
${banner()}
            </div>
            <div className="swg-console" data-smuggle-console></div>
          </div>
        </div>${extra}`;
}

function runAreaHtml(p, run, extra) {
  if (p.slug.endsWith("smuggling-html-js-css-or-svg")) {
    return smuggleRunArea(p, run, extra);
  }

  const preparedRun = stripRunPick(descriptionlessRunSlugs.has(p.slug) ? run : addPickDescriptions(p.slug, run));
  const { lead, action, tail } = splitRunAction(preparedRun);
  const serverBtn = p.category === "Data Theft" ? serverFileBtn() : "";
  const blocks = [lead, passFailHtml(p), action, tail, serverBtn, banner()].filter(Boolean);
  const compactClass = compactRunSlugs.has(p.slug) ? " swg-run--compact" : "";
  const noTerminal = noTerminalSlugs.has(p.slug);
  const modifierClass = runModifierClasses[p.slug] || "";

  return `        <div className="swg-run${compactClass}${noTerminal ? " swg-run--no-terminal" : ""}${modifierClass}">
          <div className="swg-run-label">Try it yourself</div>
          <div className="swg-run-body${noTerminal ? " swg-run-body--solo" : ""}">
            <div className="swg-run-controls">
${blocks.join("\n")}
            </div>
            ${noTerminal ? "" : '<div className="swg-console" data-test-console></div>'}
          </div>
        </div>`;
}

function hiddenSmugglingCarriers() {
  const payloadPath = path.join(root, "test-files", "malware", "payloads", "decode-eicar-docm.json");
  const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8")).payload;
  return `
        <div hidden data-smuggling-carrier="html" data-smuggling-payload="${payload}" />
        <script type="application/json" data-smuggling-carrier="js" data-smuggling-payload="${payload}"></script>
        <style data-smuggling-carrier="css">{':root{--smuggled-payload:"${payload}";}'}</style>
        <svg hidden data-smuggling-carrier="svg"><metadata>${payload}</metadata></svg>`;
}

function pageHtml(p) {
  const extra = p.slug.endsWith("smuggling-html-js-css-or-svg") ? hiddenSmugglingCarriers() : "";
  return `---
title: "${p.title}"
description: "${p.control}"
mode: "custom"
---

<div className="swg-app swg-audit-ui">
  ${navHtml(p.category)}
  <div className="swg-shell">
    ${sidebarHtml(p.slug)}
    <div className="swg-main swg-main-col" role="main">
      <div className="swg-content">
        ${breadcrumbHtml(p)}
        <h1>${titleHtml(p)}</h1>
        <div className="swg-divider" />
        <div className="swg-info">
          <section className="swg-block">
            <div className="swg-block-label">The threat</div>
            <p className="swg-block-text">${p.threat}</p>
          </section>
          <section className="swg-block">
            <div className="swg-block-label">How the test works</div>
            <p className="swg-block-text">${p.how}</p>
          </section>
        </div>
${runAreaHtml(p, p.run, extra)}
        <script src="/swg.js" defer></script>
      </div>
${footerHtml()}
    </div>
  </div>
</div>
`;
}

const categoryCopy = {
  Phishing: [
    "Phishing began with broad, easily recognised email lures and has evolved into convincing, context-aware experiences delivered through redirects, cloned interfaces, local files, and rapidly changing web content.",
    "Our simulations represent that progression as safe browser interactions. They move from recognisable deception patterns toward techniques that obscure what a user sees, where a page came from, or what happens after trust has been established—without reproducing real credential theft.",
  ],
  Malware: [
    "Malware delivery has moved beyond obvious executable attachments. Modern campaigns use documents, archives, trusted hosting, encryption, encoding, fragmented transfers, and browser-side reconstruction to keep a complete payload away from perimeter inspection.",
    "Our simulations represent those delivery generations with harmless test artefacts and the industry-standard EICAR string. They exercise direct downloads, disguised containers, layered formats, transformed content, and client-side assembly without introducing real malicious code.",
  ],
  "Data Theft": [
    "Data theft has evolved from simple file uploads into quieter exfiltration that disguises sensitive material, transforms it before transfer, divides it across requests, or moves it through channels that resemble ordinary application traffic.",
    "Our simulations represent these shifts using user-selected test files and controlled reconstruction endpoints. They explore how content can be encoded, encrypted, segmented, or carried through alternate request structures while keeping the exercise contained and observable.",
  ],
  Cyberslacking: [
    "Acceptable-use controls once relied mainly on static website lists. Streaming platforms, embedded players, shared infrastructure, and frequently changing media catalogues have made activity-based classification more important than a domain name alone.",
    "Our simulations represent this change through safe, embedded media scenarios across common content categories. They help show whether policy decisions follow the activity being requested while avoiding real productivity, conduct, or compliance assumptions.",
  ],
};

function categoryPageHtml(category) {
  const slug = nav[category].replace(/^\/|\/$/g, "");
  const copy = categoryCopy[category];
  return `---
title: "${category}"
description: "${category} security test overview."
mode: "custom"
---

<div className="swg-app swg-audit-ui swg-category-page">
  ${navHtml("")}
  <div className="swg-shell">
    ${sidebarHtml(slug)}
    <div className="swg-main swg-main-col" role="main">
      <div className="swg-content swg-category-content">
        <div className="swg-bc" role="navigation" aria-label="Breadcrumb">
          <a className="swg-bc-home" href="/">Home</a>
          <span className="swg-bc-sep">/</span>
          <span className="swg-bc-cur swg-bc-category">${category}</span>
        </div>
        <h1>${category}</h1>
        <div className="swg-divider" />
        <div className="swg-category-copy">
          <p>${copy[0]}</p>
          <p>${copy[1]}</p>
        </div>
      </div>
${footerHtml()}
    </div>
  </div>
</div>
`;
}

function aboutHtml() {
  return `---
title: "About"
description: "Why SWG Audit exists."
mode: "custom"
---

<div className="swg-app swg-audit-ui swg-about-page">
  ${navHtml("about")}
  <div className="swg-shell">
    ${sidebarHtml("about")}
    <div className="swg-main swg-about-body" role="main">
      <div className="swg-about-main">
        <div className="swg-container swg-about-wrap">
          <div className="swg-about-intro-section">
            <div className="swg-about-text">In today's cybersecurity landscape, attackers have significantly outpaced traditional security tools.</div>
          </div>

          <div className="swg-about-warning-section">
            <div className="swg-about-warning-item">
              <div className="swg-about-warning-icon" aria-hidden="true">!</div>
              <div className="swg-about-text">Many vendors continue to promote outdated solutions with bold marketing claims, offering little transparency or proof of actual protection.</div>
            </div>
            <div className="swg-about-warning-item">
              <div className="swg-about-warning-icon" aria-hidden="true">!</div>
              <div className="swg-about-text">Buyers are often left in the dark, relying solely on vendor promises without any means of independent verification.</div>
            </div>
          </div>

          <div className="swg-about-hero">
            <h1>SWG Audit was created to change that.</h1>
            <div className="swg-about-text">We are an open-source initiative to help buyers validate the real-world effectiveness of their perimeter security solutions against web-based threats.</div>
          </div>

          <div className="swg-about-feature-section">
            <div className="swg-about-feature-card">
              <div className="swg-about-lock" aria-hidden="true">
                <div className="swg-about-lock-shackle"></div>
                <div className="swg-about-lock-body"></div>
              </div>
              <div className="swg-about-text">Empower cybersecurity professionals and buyers to independently assess whether a solution can truly defend against modern threats before investing in it.</div>
            </div>
          </div>

          <div className="swg-about-cta">
            <div className="swg-about-text">Join the community. Test honestly. Buy confidently.</div>
          </div>
        </div>
      </div>
${footerHtml()}
    </div>
  </div>
</div>
`;
}

function gettingStartedHtml() {
  return `---
title: "Getting started"
description: "How SWG Audit works and where to begin."
mode: "custom"
---

<div className="swg-app swg-audit-ui swg-getstarted-page">
  ${navHtml("")}
  <div className="swg-shell">
    ${sidebarHtml("getting-started")}
    <div className="swg-main swg-gs-body" role="main">
      <div className="swg-gs-wrap swg-container">
        <div className="swg-gs-eyebrow">SWG Audit</div>
        <h1 className="swg-gs-title">Getting started</h1>
        <div className="swg-gs-copy">
          <p>SWG Audit is an open source initiative designed to safely simulate modern web-based cyber threats. The Bare Minimum category contains simple tests which every SWG should be able to block. Attackers employ several evasion techniques to bypass the defensive measures set up. To test these out, the next category is Evasion Detection.</p>
        </div>
      </div>
${footerHtml()}
    </div>
  </div>
</div>
`;
}

function articlePageHtml(title, description, activeNav, bodyHtml) {
  return `---
title: "${title}"
description: "${description}"
mode: "custom"
---

<div className="swg-app swg-audit-ui swg-article-page">
  ${navHtml(activeNav)}
  <div className="swg-shell">
    ${sidebarHtml(activeNav)}
    <div className="swg-main swg-article-body" role="main">
      <div className="swg-article swg-container">
        <h1 className="swg-article-title">${title}</h1>
${bodyHtml}
      </div>
${footerHtml()}
    </div>
  </div>
</div>
`;
}

function contributeHtml() {
  const body = `        <p>Thank you for considering contributing to SWG Audit! We welcome contributions from the community to help improve this project. Please take a moment to review this document to make the contribution process easy and effective for everyone involved.</p>
        <h2>How Can You Contribute?</h2>
        <h3>Reporting Issues</h3>
        <p>If you encounter any bugs, issues, or have suggestions for improvements, please open an issue in the repository. Provide as much detail as possible, including steps to reproduce the issue and any relevant screenshots or logs.</p>
        <h3>Submitting Code Changes</h3>
        <ol>
          <li><strong>Fork the Repository</strong>: Create a personal fork of the repository on GitHub.</li>
          <li><strong>Create a Branch</strong>: Create a new branch for your changes. Use a descriptive name, such as <code>fix-bug-123</code> or <code>add-new-feature</code>.</li>
          <li><strong>Make Changes</strong>: Implement your changes in the appropriate files. Ensure your code follows the project's coding standards.</li>
          <li><strong>Test Your Changes</strong>: Verify that your changes work as expected and do not break existing functionality.</li>
          <li><strong>Submit a Pull Request</strong>: Push your changes to your fork and submit a pull request to the main repository. Provide a clear and concise description of your changes.</li>
        </ol>
        <h3>Writing Documentation</h3>
        <p>If you notice missing or outdated documentation, feel free to update it. This includes updating <code>README.md</code> files, adding comments to code, or creating new documentation files.</p>
        <h3>Suggesting Features</h3>
        <p>If you have an idea for a new feature, open an issue to discuss it with the maintainers. Provide as much detail as possible about the feature and its potential benefits.</p>
        <h2>Code of Conduct</h2>
        <p>Please adhere to our <a href="https://github.com/Nimit-17/swgaudit-context" target="_blank" rel="noreferrer">Code of Conduct</a> to ensure a welcoming and inclusive environment for everyone.</p>
        <h2>Getting Help</h2>
        <p>If you have any questions or need assistance, feel free to reach out by opening an issue or contacting the maintainers directly.</p>
        <p>We appreciate your contributions and look forward to working together to improve SWG Audit!</p>`;
  return articlePageHtml("Contributing to SWG Audit", "How to contribute to SWG Audit.", "contribute", body);
}

function termsHtml() {
  const body = `        <p><strong>Effective Date:</strong> July 8, 2025</p>
        <p>Welcome to SWG Audit. By accessing or using our website and services (the "Service"), you agree to be bound by these Terms of Use. Please read them carefully.</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By using the Service, you agree to comply with and be legally bound by these Terms. If you do not agree to these Terms, please do not use the Service.</p>
        <h2>2. Use of the Service</h2>
        <ul>
          <li>You may use the Service only for lawful purposes and in accordance with these Terms.</li>
          <li>You agree not to misuse the Service or interfere with its normal operation.</li>
          <li>You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.</li>
        </ul>
        <h2>3. Intellectual Property</h2>
        <p>All content, trademarks, and data on this site, including but not limited to software, databases, text, graphics, icons, and hyperlinks are the property of SWG Audit or its licensors and are protected by applicable intellectual property laws.</p>
        <h2>4. User Content</h2>
        <ul>
          <li>You retain ownership of any content you submit, upload, or display on the Service.</li>
          <li>By submitting content, you grant SWG Audit a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content as necessary to operate the Service.</li>
          <li>You are responsible for ensuring that your content does not violate any laws or infringe the rights of others.</li>
        </ul>
        <h2>5. Disclaimers</h2>
        <p>The Service is provided on an "as is" and "as available" basis. SWG Audit makes no warranties, express or implied, regarding the Service, including but not limited to its accuracy, reliability, or availability.</p>
        <h2>6. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, SWG Audit shall not be liable for any damages arising out of or in connection with your use of the Service.</p>
        <h2>7. Changes to Terms</h2>
        <p>We may update these Terms of Use from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the Service after changes are posted constitutes your acceptance of the new Terms.</p>
        <h2>8. Governing Law</h2>
        <p>These Terms are governed by and construed in accordance with the laws of the jurisdiction in which SWG Audit operates, without regard to its conflict of law principles.</p>
        <h2>9. Contact Us</h2>
        <p>If you have any questions about these Terms of Use, please contact us at: Master+contact@swgaudit.com</p>
        <hr />
        <p>© 2025 SWG Audit Contributors. All rights reserved.</p>`;
  return articlePageHtml("Terms of Use", "SWG Audit Terms of Use.", "terms", body);
}

function privacyHtml() {
  const body = `        <p><strong>Effective Date:</strong> July 8, 2025</p>
        <p>SWG Audit ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (the "Service").</p>
        <h2>1. Information We Collect</h2>
        <h3>a. Information You Provide</h3>
        <ul>
          <li><strong>Contact Information:</strong> When you contact us or submit forms, we may collect your name, email address, and any other information you provide.</li>
          <li><strong>Uploaded Files:</strong> If you use our data exfiltration simulation or upload files, we process and temporarily store those files for the purpose of the simulation.</li>
        </ul>
        <h3>b. Automatically Collected Information</h3>
        <ul>
          <li><strong>Usage Data:</strong> We may collect information about your device, browser, IP address, and usage patterns through cookies, server logs, and analytics tools.</li>
          <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience and analyze usage. You can control cookies through your browser settings.</li>
        </ul>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide, operate, and maintain the Service.</li>
          <li>To improve, personalize, and expand our Service.</li>
          <li>To communicate with you, including responding to your inquiries.</li>
          <li>To monitor and analyze usage and trends to improve user experience.</li>
          <li>To ensure the security and integrity of our Service.</li>
        </ul>
        <h2>3. How We Share Your Information</h2>
        <p>We do <strong>not</strong> sell or rent your personal information. We may share information:</p>
        <ul>
          <li>With service providers who assist us in operating the Service (subject to confidentiality agreements).</li>
          <li>If required by law, regulation, or legal process.</li>
          <li>To protect the rights, property, or safety of SWG Audit, our users, or others.</li>
        </ul>
        <h2>4. Data Retention</h2>
        <ul>
          <li>Uploaded files and simulation data are stored only as long as necessary for the simulation and are deleted automatically after a short period (e.g., 10 minutes).</li>
          <li>Other information is retained only as long as necessary for the purposes described in this policy.</li>
        </ul>
        <h2>5. Security</h2>
        <p>We implement reasonable technical and organizational measures to protect your information. However, no method of transmission or storage is 100% secure.</p>
        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. To exercise these rights, please contact us at [your contact email].</p>
        <h2>7. Third-Party Links</h2>
        <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.</p>
        <h2>8. Children's Privacy</h2>
        <p>Our Service is not intended for children under 16. We do not knowingly collect personal information from children under 16.</p>
        <h2>9. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: Master+contact@swgaudit.com</p>
        <hr />
        <p>© 2025 SWG Audit Contributors. All rights reserved.</p>`;
  return articlePageHtml("Privacy Policy", "SWG Audit Privacy Policy.", "privacy", body);
}

function indexHtml() {
  const counts = {
    Phishing: pages.filter((p) => p.category === "Phishing").length,
    Malware: pages.filter((p) => p.category === "Malware").length,
    "Data Theft": pages.filter((p) => p.category === "Data Theft").length,
    Cyberslacking: pages.filter((p) => p.category === "Cyberslacking").length,
  };
  const cards = [
    ["Phishing", "phishing-icon.png"],
    ["Malware", "malware-icon.png"],
    ["Data Theft", "data-theft-icon.png"],
    ["Cyberslacking", "cyberslacking-icon.png"],
  ].map(([label, icon]) => `<a className="swg-card is-link" href="${nav[label]}">
          <img className="swg-card-img" src="/images/${icon}" alt="" />
          <div className="swg-card-body">
            <h3>${label}</h3>
            <div className="swg-card-count">${counts[label]} test${counts[label] === 1 ? "" : "s"}</div>
          </div>
          <div className="swg-card-arr">&rarr;</div>
        </a>`).join("\n        ");
  return `---
title: "SWG Audit"
description: "Validate the real-world effectiveness of your perimeter security."
mode: "custom"
---

<div className="swg-app swg-audit-ui swg-app--home">
  ${navHtml("")}
  <div className="swg-shell">
    ${sidebarHtml("")}
    <div className="swg-main swg-home-body" role="main">
      <div className="swg-home-main">
        <div className="swg-hero">
          <div className="swg-container swg-hero-copy">
            <h1>Validate the real-world effectiveness of your perimeter security</h1>
            <div className="swg-cta-row">
              <a className="swg-cta" href="/getting-started">
                <span className="swg-cta-glow" aria-hidden="true" />
                <span className="swg-cta-text">Get started</span>
                <span className="swg-cta-arrow" aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>
        </div>
        <section className="swg-section">
          <div className="swg-container">
            <div className="swg-card-grid">
              ${cards}
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
`;
}

fs.writeFileSync(path.join(root, "index.mdx"), indexHtml());
fs.writeFileSync(path.join(root, "about.mdx"), aboutHtml());
fs.writeFileSync(path.join(root, "getting-started.mdx"), gettingStartedHtml());
fs.writeFileSync(path.join(root, "contribute.mdx"), contributeHtml());
fs.writeFileSync(path.join(root, "terms.mdx"), termsHtml());
fs.writeFileSync(path.join(root, "privacy.mdx"), privacyHtml());
for (const category of Object.keys(nav)) {
  fs.writeFileSync(path.join(root, `${nav[category].replace(/^\/|\/$/g, "")}.mdx`), categoryPageHtml(category));
}
for (const p of pages) {
  const out = path.join(root, `${p.slug}.mdx`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, pageHtml(p));
}

fs.writeFileSync(path.join(root, "docs.json"), JSON.stringify({
  $schema: "https://mintlify.com/docs.json",
  theme: "mint",
  name: "SWG Audit",
  colors: { primary: "#ff2538", light: "#ff4d5e", dark: "#ff2538" },
  appearance: { default: "dark", strict: true },
  background: { color: { dark: "#040406" } },
  styling: { eyebrows: "section" },
  favicon: "/favicon.png",
  logo: { light: "/images/logo.png", dark: "/images/logo.png" },
  navigation: {
    pages: [
      "index",
      "getting-started",
      "about",
      "contribute",
      ...Object.keys(nav).flatMap((category) => [
        nav[category].replace(/^\/|\/$/g, ""),
        ...pages.filter((p) => p.category === category).map((p) => p.slug),
      ]),
      "terms",
      "privacy",
    ],
  },
}, null, 2));

console.log(`Generated ${pages.length} test pages.`);
