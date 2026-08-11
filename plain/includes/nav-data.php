<?php
/**
 * Sidebar / category nav data (single source of truth).
 * href values are relative to the site root (plain/).
 */
return [
    [
        'id' => 'phishing',
        'label' => 'Phishing',
        'href' => 'phishing/',
        'tests' => [
            ['href' => 'phishing/url-manipulation', 'title' => 'URL manipulation'],
            ['href' => 'phishing/site-stored-as-mhtml-or-raw-html', 'title' => 'Page assembled on browser'],
            ['href' => 'phishing/canvas-engine', 'title' => 'Canvas page'],
            ['href' => 'phishing/cached-content-mutation', 'title' => 'Content mutation'],
            ['href' => 'phishing/form-submission-on-random-site', 'title' => 'Credential form submission'],
        ],
    ],
    [
        'id' => 'malware',
        'label' => 'Malware',
        'href' => 'malware/',
        'tests' => [
            ['href' => 'malware/ransomware-file', 'title' => 'Ransomware'],
            ['href' => 'malware/personal-data-file', 'title' => 'Personal-data download'],
            ['href' => 'malware/different-file-formats', 'title' => 'Different file formats'],
            ['href' => 'malware/executable-files', 'title' => 'Executable files'],
            ['href' => 'malware/http-https-and-cloud-delivery', 'title' => 'HTTP, HTTPS, and cloud downloads'],
            ['href' => 'malware/nested-file-download', 'title' => 'Nested file download'],
            ['href' => 'malware/password-protected-file', 'title' => 'Password-protected file'],
            ['href' => 'malware/file-spoofing', 'title' => 'File spoofing'],
            ['href' => 'malware/encoded-files', 'title' => 'Encoded files'],
            ['href' => 'malware/encrypted-files', 'title' => 'Encrypted files'],
            ['href' => 'malware/browser-open-docm', 'title' => 'Macro document'],
            ['href' => 'malware/webassembly-eicar', 'title' => 'Web Assembly'],
            ['href' => 'malware/chunk-attacks-different-orders', 'title' => 'Chunk attacks'],
            ['href' => 'malware/smuggling-html-js-css-or-svg', 'title' => 'Smuggling through frontend files'],
            ['href' => 'malware/browser-resource-abuse', 'title' => 'Browser resource abuse'],
        ],
    ],
    [
        'id' => 'data-theft',
        'label' => 'Data Theft',
        'href' => 'data-theft/',
        'tests' => [
            ['href' => 'data-theft/personal-data-submission-in-normal-file', 'title' => 'File submission'],
            ['href' => 'data-theft/file-encoding', 'title' => 'File encoding'],
            ['href' => 'data-theft/file-encrypting', 'title' => 'File encrypting'],
            ['href' => 'data-theft/file-chunking', 'title' => 'File chunking'],
            ['href' => 'data-theft/dns-tunneling', 'title' => 'DNS tunneling'],
            ['href' => 'data-theft/http-path-tunneling', 'title' => 'HTTP path tunneling'],
        ],
    ],
    [
        'id' => 'cyberslacking',
        'label' => 'Facility Abuse',
        'href' => 'cyberslacking/',
        'tests' => [
            ['href' => 'cyberslacking/video-content-category-simulation', 'title' => 'Video content category simulation'],
        ],
    ],
];
