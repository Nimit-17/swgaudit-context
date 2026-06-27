<?php
function swg_categories(): array
{
    return [
      'phishing' => [
        'label' => 'Phishing',
        'title' => 'Phishing Tests - SWG Audit',
        'description' => 'Validate perimeter security against safe phishing simulations across baseline, evasion, and advanced attack scenarios.',
        'intro' => 'Use these safe phishing tests to validate how perimeter controls handle credential collection, deceptive pages, and common evasion techniques used to deliver them.',
        'icon' => '/assets/images/phishing-icon.png'
      ],
      'malware' => [
        'label' => 'Malware',
        'title' => 'Malware Tests - SWG Audit',
        'description' => 'Validate perimeter security against safe malware-delivery test structures across baseline, evasion, and advanced scenarios.',
        'intro' => 'Safe malware-delivery simulations that test whether the SWG can inspect, detect, and block malicious file downloads delivered directly or through evasive methods.',
        'icon' => '/assets/images/malware-icon.png'
      ],
      'data-theft' => [
        'label' => 'Data Theft',
        'title' => 'Data Theft Tests - SWG Audit',
        'description' => 'Validate perimeter security against safe data-theft and exfiltration test structures across baseline, evasion, and advanced scenarios.',
        'intro' => 'Safe data-exfiltration simulations that test whether the SWG can detect and block sensitive data leaving the network through uploads, alternate transfer channels, and covert delivery methods.',
        'icon' => '/assets/images/data-theft-icon.png'
      ],
      'cyberslacking' => [
        'label' => 'Cyberslacking',
        'title' => 'Cyberslacking Tests - SWG Audit',
        'description' => 'Validate perimeter security against safe cyberslacking and streaming media access simulations.',
        'intro' => 'Use these safe browsing and media tests to validate whether non-work content, streaming, and recreational categories are blocked by perimeter policy.',
        'icon' => '/assets/images/cyberslacking-icon.png'
      ]
    ];
}

function swg_tests(): array
{
    return [
      [
        'category' => 'phishing',
        'slug' => 'known-phishing-domains',
        'title' => 'Known phishing domains',
        'difficulty' => 'Bare Minimum',
        'action' => 'Run Inline',
        'control' => 'URL filtering / reputation',
        'summary' => 'Checks whether known phishing destinations are blocked by reputation, category, or threat-intelligence controls.',
        'explanation' => 'Checks whether known phishing destinations are blocked by reputation, category, or threat-intelligence controls.',
        'does' => 'This page runs the Known phishing domains simulation in the Phishing category. Checks whether known phishing destinations are blocked by reputation, category, or threat-intelligence controls.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['url-manipulation', 'misclassified-domains'],
        'run_area' => 'includes/run-areas/known-phishing-domains.php',
        'detail_id' => 'phishing-bare-minimum-test-1-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'url-manipulation',
        'title' => 'URL manipulation',
        'difficulty' => 'Evasion Detection',
        'action' => 'Open Test Page',
        'control' => 'URL parsing / redirect inspection',
        'summary' => 'Covers hiding in subdomains, extra words, misspellings, shorteners, redirects, fake paths, and homograph-style lookalikes.',
        'explanation' => 'Covers hiding in subdomains, extra words, misspellings, shorteners, redirects, fake paths, and homograph-style lookalikes.',
        'does' => 'This page runs the URL manipulation simulation in the Phishing category. Covers hiding in subdomains, extra words, misspellings, shorteners, redirects, fake paths, and homograph-style lookalikes.',
        'pass' => 'The page launch is blocked, redirected, warned, or prevented according to policy.',
        'fail' => 'The simulated destination opens successfully without meaningful control intervention.',
        'related' => ['known-phishing-domains', 'cached-content-mutation'],
        'run_area' => 'includes/run-areas/url-manipulation.php',
        'detail_id' => 'phishing-evasion-detection-test-1-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'misclassified-domains',
        'title' => 'Misclassified domains',
        'difficulty' => 'Evasion Detection',
        'action' => 'Run Inline',
        'control' => 'Category recategorization / threat intelligence',
        'summary' => 'Uses domains that are not initially classified as phishing but later host phishing behavior.',
        'explanation' => 'Uses domains that are not initially classified as phishing but later host phishing behavior.',
        'does' => 'This page runs the Misclassified domains simulation in the Phishing category. Uses domains that are not initially classified as phishing but later host phishing behavior.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['known-phishing-domains', 'unknown-domains-zero-hour'],
        'run_area' => 'includes/run-areas/misclassified-domains.php',
        'detail_id' => 'phishing-evasion-detection-test-2-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'cached-content-mutation',
        'title' => 'Cached content mutation',
        'difficulty' => 'Evasion Detection',
        'action' => 'Open Test Page',
        'control' => 'Content mutation / cache inspection',
        'summary' => 'Shows harmless content first, then changes the same URL to a dummy Microsoft-style login page.',
        'explanation' => 'Shows harmless content first, then changes the same URL to a dummy Microsoft-style login page.',
        'does' => 'This page runs the Cached content mutation simulation in the Phishing category. Shows harmless content first, then changes the same URL to a dummy Microsoft-style login page.',
        'pass' => 'The page launch is blocked, redirected, warned, or prevented according to policy.',
        'fail' => 'The simulated destination opens successfully without meaningful control intervention.',
        'related' => ['url-manipulation', 'site-stored-as-mhtml-or-raw-html'],
        'run_area' => 'includes/run-areas/cached-content-mutation.php',
        'detail_id' => 'phishing-evasion-detection-test-3-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'site-stored-as-mhtml-or-raw-html',
        'title' => 'Site stored as MHTML or raw HTML',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Open Test Page',
        'control' => 'Static content inspection / saved-page formats',
        'summary' => 'Tests whether saved-page formats can hide a phishing page from static request and response inspection.',
        'explanation' => 'Tests whether saved-page formats can hide a phishing page from static request and response inspection.',
        'does' => 'This page runs the Site stored as MHTML or raw HTML simulation in the Phishing category. Tests whether saved-page formats can hide a phishing page from static request and response inspection.',
        'pass' => 'The page launch is blocked, redirected, warned, or prevented according to policy.',
        'fail' => 'The simulated destination opens successfully without meaningful control intervention.',
        'related' => ['cached-content-mutation', 'canvas-engine'],
        'run_area' => 'includes/run-areas/site-stored-as-mhtml-or-raw-html.php',
        'detail_id' => 'phishing-advanced-threat-simulation-test-1-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'unknown-domains-zero-hour',
        'title' => 'Unknown domains - zero hour',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Run Inline',
        'control' => 'New-domain policy / zero-hour reputation',
        'summary' => 'Models phishing on newly seen domains before reputation systems catch up.',
        'explanation' => 'Models phishing on newly seen domains before reputation systems catch up.',
        'does' => 'This page runs the Unknown domains - zero hour simulation in the Phishing category. Models phishing on newly seen domains before reputation systems catch up.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['misclassified-domains', 'browser-fingerprinting'],
        'run_area' => 'includes/run-areas/unknown-domains-zero-hour.php',
        'detail_id' => 'phishing-advanced-threat-simulation-test-2-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'canvas-engine',
        'title' => 'Canvas engine',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Open Test Page',
        'control' => 'DOM inspection / rendered-content analysis',
        'summary' => 'Uses canvas-rendered page elements to reduce normal DOM-based inspection visibility.',
        'explanation' => 'Uses canvas-rendered page elements to reduce normal DOM-based inspection visibility.',
        'does' => 'This page runs the Canvas engine simulation in the Phishing category. Uses canvas-rendered page elements to reduce normal DOM-based inspection visibility.',
        'pass' => 'The page launch is blocked, redirected, warned, or prevented according to policy.',
        'fail' => 'The simulated destination opens successfully without meaningful control intervention.',
        'related' => ['site-stored-as-mhtml-or-raw-html', 'browser-fingerprinting'],
        'run_area' => 'includes/run-areas/canvas-engine.php',
        'detail_id' => 'phishing-advanced-threat-simulation-test-3-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'browser-fingerprinting',
        'title' => 'Browser fingerprinting',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Run Inline',
        'control' => 'Adaptive content / anti-analysis detection',
        'summary' => 'Checks whether phishing content can adapt based on browser, device, or inspection signals.',
        'explanation' => 'Checks whether phishing content can adapt based on browser, device, or inspection signals.',
        'does' => 'This page runs the Browser fingerprinting simulation in the Phishing category. Checks whether phishing content can adapt based on browser, device, or inspection signals.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['unknown-domains-zero-hour', 'canvas-engine'],
        'run_area' => 'includes/run-areas/browser-fingerprinting.php',
        'detail_id' => 'phishing-advanced-threat-simulation-test-4-detail'
      ],
      [
        'category' => 'phishing',
        'slug' => 'form-submission-on-random-site',
        'title' => 'Form submission on random site',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Submit Test Form',
        'control' => 'Credential submission / form DLP',
        'summary' => 'Represents the current SWG Audit style test: credential-style form submission on an unexpected site.',
        'explanation' => 'Represents the current SWG Audit style test: credential-style form submission on an unexpected site.',
        'does' => 'This page runs the Form submission on random site simulation in the Phishing category. Represents the current SWG Audit style test: credential-style form submission on an unexpected site.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['known-phishing-domains', 'url-manipulation'],
        'run_area' => 'includes/run-areas/form-submission-on-random-site.php',
        'detail_id' => 'phishing-advanced-threat-simulation-test-5-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'ransomware-or-personal-data-file',
        'title' => 'Ransomware or personal-data file',
        'difficulty' => 'Bare Minimum',
        'action' => 'Download Sample',
        'control' => 'Risky file download policy',
        'summary' => 'Checks whether direct downloads of high-risk file types and payload categories are stopped.',
        'explanation' => 'Checks whether direct downloads of high-risk file types and payload categories are stopped.',
        'does' => 'This page runs the Ransomware or personal-data file simulation in the Malware category. Checks whether direct downloads of high-risk file types and payload categories are stopped.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['different-file-formats', 'executable-files'],
        'run_area' => 'includes/run-areas/ransomware-or-personal-data-file.php',
        'detail_id' => 'malware-bare-minimum-test-1-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'different-file-formats',
        'title' => 'Different file formats',
        'difficulty' => 'Bare Minimum',
        'action' => 'Download Sample',
        'control' => 'File type detection / malware scanning',
        'summary' => 'Validates detection across multiple archive, document, script, and executable-style formats.',
        'explanation' => 'Validates detection across multiple archive, document, script, and executable-style formats.',
        'does' => 'This page runs the Different file formats simulation in the Malware category. Validates detection across multiple archive, document, script, and executable-style formats.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['ransomware-or-personal-data-file', 'nested-file-download'],
        'run_area' => 'includes/run-areas/different-file-formats.php',
        'detail_id' => 'malware-bare-minimum-test-2-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'executable-files',
        'title' => 'Executable files',
        'difficulty' => 'Bare Minimum',
        'action' => 'Download Sample',
        'control' => 'Executable and script blocking',
        'summary' => 'Checks whether direct downloads of executable and script-style risky file formats are stopped.',
        'explanation' => 'Checks whether direct downloads of executable and script-style risky file formats are stopped.',
        'does' => 'This page runs the Executable files simulation in the Malware category. Checks whether direct downloads of executable and script-style risky file formats are stopped.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['different-file-formats', 'file-spoofing'],
        'run_area' => 'includes/run-areas/executable-files.php',
        'detail_id' => 'malware-bare-minimum-test-3-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'http-https-and-cloud-delivery',
        'title' => 'HTTP, HTTPS, and cloud delivery',
        'difficulty' => 'Bare Minimum',
        'action' => 'Download Sample',
        'control' => 'Protocol and cloud download inspection',
        'summary' => 'Checks whether download controls behave differently across plain HTTP, HTTPS, and cloud-hosted file delivery.',
        'explanation' => 'Checks whether download controls behave differently across plain HTTP, HTTPS, and cloud-hosted file delivery.',
        'does' => 'This page runs the HTTP, HTTPS, and cloud delivery simulation in the Malware category. Checks whether download controls behave differently across plain HTTP, HTTPS, and cloud-hosted file delivery.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['different-file-formats', 'nested-file-download'],
        'run_area' => 'includes/run-areas/http-https-and-cloud-delivery.php',
        'detail_id' => 'malware-bare-minimum-test-4-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'nested-file-download',
        'title' => 'Nested file download',
        'difficulty' => 'Evasion Detection',
        'action' => 'Download Sample',
        'control' => 'Archive recursion / nested-content inspection',
        'summary' => 'Checks whether threats hidden inside nested archives or container files are detected.',
        'explanation' => 'Checks whether threats hidden inside nested archives or container files are detected.',
        'does' => 'This page runs the Nested file download simulation in the Malware category. Checks whether threats hidden inside nested archives or container files are detected.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['password-protected-file', 'file-spoofing'],
        'run_area' => 'includes/run-areas/nested-file-download.php',
        'detail_id' => 'malware-evasion-detection-test-1-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'password-protected-file',
        'title' => 'Password-protected file',
        'difficulty' => 'Evasion Detection',
        'action' => 'Download Sample',
        'control' => 'Encrypted archive policy',
        'summary' => 'Tests whether protected archives are blocked, warned, or handled safely when content cannot be inspected normally.',
        'explanation' => 'Tests whether protected archives are blocked, warned, or handled safely when content cannot be inspected normally.',
        'does' => 'This page runs the Password-protected file simulation in the Malware category. Tests whether protected archives are blocked, warned, or handled safely when content cannot be inspected normally.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['nested-file-download', 'encrypted-files'],
        'run_area' => 'includes/run-areas/password-protected-file.php',
        'detail_id' => 'malware-evasion-detection-test-2-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'file-spoofing',
        'title' => 'File spoofing',
        'difficulty' => 'Evasion Detection',
        'action' => 'Download Sample',
        'control' => 'Extension spoofing / content-type validation',
        'summary' => 'Checks whether disguised or misleading files are treated as risky downloads.',
        'explanation' => 'Checks whether disguised or misleading files are treated as risky downloads.',
        'does' => 'This page runs the File spoofing simulation in the Malware category. Checks whether disguised or misleading files are treated as risky downloads.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['executable-files', 'nested-file-download'],
        'run_area' => 'includes/run-areas/file-spoofing.php',
        'detail_id' => 'malware-evasion-detection-test-3-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'encoded-files',
        'title' => 'Encoded files',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Download Sample',
        'control' => 'Encoded payload detection',
        'summary' => 'Checks whether encoded payloads are detected before or after decoding.',
        'explanation' => 'Checks whether encoded payloads are detected before or after decoding.',
        'does' => 'This page runs the Encoded files simulation in the Malware category. Checks whether encoded payloads are detected before or after decoding.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['encrypted-files', 'chunk-attacks-different-orders'],
        'run_area' => 'includes/run-areas/encoded-files.php',
        'detail_id' => 'malware-advanced-threat-simulation-test-1-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'encrypted-files',
        'title' => 'Encrypted files',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Download Sample',
        'control' => 'Encrypted payload handling',
        'summary' => 'Tests handling for encrypted file delivery where content inspection is limited.',
        'explanation' => 'Tests handling for encrypted file delivery where content inspection is limited.',
        'does' => 'This page runs the Encrypted files simulation in the Malware category. Tests handling for encrypted file delivery where content inspection is limited.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['password-protected-file', 'encoded-files'],
        'run_area' => 'includes/run-areas/encrypted-files.php',
        'detail_id' => 'malware-advanced-threat-simulation-test-2-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'chunk-attacks-different-orders',
        'title' => 'Chunk attacks - different orders',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Download Sample',
        'control' => 'Client-side reconstruction / chunk inspection',
        'summary' => 'Models reconstruction of malware through chunks delivered in unusual order.',
        'explanation' => 'Models reconstruction of malware through chunks delivered in unusual order.',
        'does' => 'This page runs the Chunk attacks - different orders simulation in the Malware category. Models reconstruction of malware through chunks delivered in unusual order.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['encoded-files', 'smuggling-html-js-css-or-svg'],
        'run_area' => 'includes/run-areas/chunk-attacks-different-orders.php',
        'detail_id' => 'malware-advanced-threat-simulation-test-3-detail'
      ],
      [
        'category' => 'malware',
        'slug' => 'smuggling-html-js-css-or-svg',
        'title' => 'Smuggling - HTML, JS, CSS, or SVG',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Download Sample',
        'control' => 'HTML smuggling / last-mile assembly',
        'summary' => 'Tests browser-side file construction or smuggling through web content formats.',
        'explanation' => 'Tests browser-side file construction or smuggling through web content formats.',
        'does' => 'This page runs the Smuggling - HTML, JS, CSS, or SVG simulation in the Malware category. Tests browser-side file construction or smuggling through web content formats.',
        'pass' => 'The sample is blocked, stripped, warned, or otherwise prevented from reaching the endpoint as a usable download.',
        'fail' => 'The browser receives the sample without meaningful intervention from the SWG or related control.',
        'related' => ['chunk-attacks-different-orders', 'encoded-files'],
        'run_area' => 'includes/run-areas/smuggling-html-js-css-or-svg.php',
        'detail_id' => 'malware-advanced-threat-simulation-test-4-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'personal-data-submission-in-normal-file',
        'title' => 'Personal data submission in normal file',
        'difficulty' => 'Bare Minimum',
        'action' => 'Upload Sample',
        'control' => 'DLP upload inspection',
        'summary' => 'Checks whether common sensitive data inside a normal file is detected before upload or submission.',
        'explanation' => 'Checks whether common sensitive data inside a normal file is detected before upload or submission.',
        'does' => 'This page runs the Personal data submission in normal file simulation in the Data Theft category. Checks whether common sensitive data inside a normal file is detected before upload or submission.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['file-encoding', 'file-encrypting'],
        'run_area' => 'includes/run-areas/personal-data-submission-in-normal-file.php',
        'detail_id' => 'data-theft-bare-minimum-test-1-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'file-encoding',
        'title' => 'File encoding',
        'difficulty' => 'Evasion Detection',
        'action' => 'Upload Sample',
        'control' => 'Encoded content DLP',
        'summary' => 'Checks whether encoded sensitive data is still detected during upload or egress.',
        'explanation' => 'Checks whether encoded sensitive data is still detected during upload or egress.',
        'does' => 'This page runs the File encoding simulation in the Data Theft category. Checks whether encoded sensitive data is still detected during upload or egress.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['personal-data-submission-in-normal-file', 'file-chunking'],
        'run_area' => 'includes/run-areas/file-encoding.php',
        'detail_id' => 'data-theft-evasion-detection-test-1-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'file-encrypting',
        'title' => 'File encrypting',
        'difficulty' => 'Evasion Detection',
        'action' => 'Upload Sample',
        'control' => 'Encrypted content policy',
        'summary' => 'Tests whether encrypted sensitive-data files are blocked, warned, or controlled.',
        'explanation' => 'Tests whether encrypted sensitive-data files are blocked, warned, or controlled.',
        'does' => 'This page runs the File encrypting simulation in the Data Theft category. Tests whether encrypted sensitive-data files are blocked, warned, or controlled.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['file-encoding', 'file-chunking'],
        'run_area' => 'includes/run-areas/file-encrypting.php',
        'detail_id' => 'data-theft-evasion-detection-test-2-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'file-chunking',
        'title' => 'File chunking',
        'difficulty' => 'Evasion Detection',
        'action' => 'Upload Sample',
        'control' => 'Chunked upload / reassembly detection',
        'summary' => 'Models splitting sensitive data into pieces to avoid single-file inspection.',
        'explanation' => 'Models splitting sensitive data into pieces to avoid single-file inspection.',
        'does' => 'This page runs the File chunking simulation in the Data Theft category. Models splitting sensitive data into pieces to avoid single-file inspection.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['file-encoding', 'http-path-tunneling'],
        'run_area' => 'includes/run-areas/file-chunking.php',
        'detail_id' => 'data-theft-evasion-detection-test-3-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'websocket',
        'title' => 'WebSocket',
        'difficulty' => 'Evasion Detection',
        'action' => 'Run Inline',
        'control' => 'WebSocket egress monitoring',
        'summary' => 'Checks whether sensitive data movement over WebSocket channels is inspected or controlled.',
        'explanation' => 'Checks whether sensitive data movement over WebSocket channels is inspected or controlled.',
        'does' => 'This page runs the WebSocket simulation in the Data Theft category. Checks whether sensitive data movement over WebSocket channels is inspected or controlled.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['http-path-tunneling', 'dns-tunnelling'],
        'run_area' => 'includes/run-areas/websocket.php',
        'detail_id' => 'data-theft-evasion-detection-test-4-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'sent-by-malware',
        'title' => 'Sent by malware',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Run Inline',
        'control' => 'Malware-driven exfiltration behavior',
        'summary' => 'Models sensitive data leaving through malware-driven exfiltration behavior.',
        'explanation' => 'Models sensitive data leaving through malware-driven exfiltration behavior.',
        'does' => 'This page runs the Sent by malware simulation in the Data Theft category. Models sensitive data leaving through malware-driven exfiltration behavior.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['dns-tunnelling', 'browser-session-or-credential-theft'],
        'run_area' => 'includes/run-areas/sent-by-malware.php',
        'detail_id' => 'data-theft-advanced-threat-simulation-test-1-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'dns-tunnelling',
        'title' => 'DNS tunnelling',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Upload Sample',
        'control' => 'DNS tunnelling / DNS egress inspection',
        'summary' => 'Checks whether sensitive data can be encoded and sent through DNS channels.',
        'explanation' => 'Checks whether sensitive data can be encoded and sent through DNS channels.',
        'does' => 'This page runs the DNS tunnelling simulation in the Data Theft category. Checks whether sensitive data can be encoded and sent through DNS channels.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['http-path-tunneling', 'sent-by-malware'],
        'run_area' => 'includes/run-areas/dns-tunnelling.php',
        'detail_id' => 'data-theft-advanced-threat-simulation-test-2-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'http-path-tunneling',
        'title' => 'HTTP path tunneling',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Upload Sample',
        'control' => 'URL path inspection / long path exfiltration',
        'summary' => 'Checks whether sensitive data can be encoded and sent through ordinary HTTPS URL path segments.',
        'explanation' => 'Checks whether sensitive data can be encoded and sent through ordinary HTTPS URL path segments.',
        'does' => 'This page runs the HTTP path tunneling simulation in the Data Theft category. Checks whether sensitive data can be encoded and sent through ordinary HTTPS URL path segments.',
        'pass' => 'The submission is blocked, disrupted, stripped, or cannot complete through the protected path.',
        'fail' => 'The submitted data reaches the server-side simulation endpoint successfully.',
        'related' => ['dns-tunnelling', 'file-chunking'],
        'run_area' => 'includes/run-areas/http-path-tunneling.php',
        'detail_id' => 'data-theft-advanced-threat-simulation-test-3-detail'
      ],
      [
        'category' => 'data-theft',
        'slug' => 'browser-session-or-credential-theft',
        'title' => 'Browser session or credential theft',
        'difficulty' => 'Advanced Threat Simulation',
        'action' => 'Run Inline',
        'control' => 'Session theft / credential exfiltration controls',
        'summary' => 'Represents theft of browser sessions or credentials that can enable downstream data access.',
        'explanation' => 'Represents theft of browser sessions or credentials that can enable downstream data access.',
        'does' => 'This page runs the Browser session or credential theft simulation in the Data Theft category. Represents theft of browser sessions or credentials that can enable downstream data access.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => ['sent-by-malware', 'dns-tunnelling'],
        'run_area' => 'includes/run-areas/browser-session-or-credential-theft.php',
        'detail_id' => 'data-theft-advanced-threat-simulation-test-4-detail'
      ],
      [
        'category' => 'cyberslacking',
        'slug' => 'video-content-category-simulation',
        'title' => 'Video content category simulation',
        'difficulty' => 'Bare Minimum',
        'action' => 'Run Inline',
        'control' => 'Video category / streaming media policy',
        'summary' => 'Loads a safe YouTube video embed so you can check whether streaming media or non-work video content is blocked by the SWG.',
        'explanation' => 'Loads a safe YouTube video embed so you can check whether streaming media or non-work video content is blocked by the SWG.',
        'does' => 'This page runs the Video content category simulation simulation in the Cyberslacking category. Loads a safe YouTube video embed so you can check whether streaming media or non-work video content is blocked by the SWG.',
        'pass' => 'The inline action is blocked, disrupted, or produces the expected defensive outcome.',
        'fail' => 'The inline action completes in a way the relevant SWG or DLP control should have prevented.',
        'related' => [],
        'run_area' => 'includes/run-areas/video-content-category-simulation.php',
        'detail_id' => 'cyberslacking-video-filtering-detail'
      ]
    ];
}

function swg_category_label(string $category): string
{
    $categories = swg_categories();
    return $categories[$category]['label'] ?? $category;
}

function swg_tests_by_category(string $category): array
{
    return array_values(array_filter(swg_tests(), fn($test) => $test['category'] === $category));
}

function swg_find_test(string $slug): ?array
{
    foreach (swg_tests() as $test) {
        if ($test['slug'] === $slug) {
            return $test;
        }
    }
    return null;
}

function swg_find_related_tests(array $test): array
{
    $related = [];
    foreach ($test['related'] as $slug) {
        $match = swg_find_test($slug);
        if ($match) {
            $related[] = $match;
        }
    }
    return $related ?: array_values(array_filter(swg_tests_by_category($test['category']), fn($candidate) => $candidate['slug'] !== $test['slug']));
}

function swg_test_url(array $test): string
{
    return '/' . $test['category'] . '/' . $test['slug'] . '/';
}
