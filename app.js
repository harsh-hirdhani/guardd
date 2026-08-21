/* =====================================================
   CYBERGUARD | DIGITAL SECURITY CENTER
   MAIN APPLICATION
   ===================================================== */

"use strict";


/* =====================================================
   GLOBAL STATE
   ===================================================== */

const CyberGuardState = {

    score: 100,

    threats: 0,

    scanning: false,

    selectedThreat: null,

    scanHistory: []

};


/* =====================================================
   THREAT MANAGER
   ===================================================== */

const ThreatManager = {

    storageKey: "cyberguard_threats",


    getThreats() {

        try {

            const saved =
                localStorage.getItem(
                    this.storageKey
                );

            if (!saved) {

                return [];

            }

            const threats =
                JSON.parse(saved);

            return Array.isArray(threats)
                ? threats
                : [];

        }

        catch (error) {

            console.error(
                "Unable to load threats:",
                error
            );

            return [];

        }

    },


    saveThreats(threats) {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(
                threats
            )

        );

    },


    addThreat(threat) {

        const threats =
            this.getThreats();

        threats.unshift(
            threat
        );

        this.saveThreats(
            threats
        );

        return threat;

    },


    updateThreat(
        id,
        updates
    ) {

        const threats =
            this.getThreats();

        const index =
            threats.findIndex(
                threat =>
                    String(threat.id) ===
                    String(id)
            );

        if (index === -1) {

            return null;

        }

        threats[index] = {

            ...threats[index],

            ...updates

        };

        this.saveThreats(
            threats
        );

        return threats[index];

    },


    removeThreat(id) {

        const threats =
            this.getThreats();

        const filtered =
            threats.filter(
                threat =>
                    String(threat.id) !==
                    String(id)
            );

        this.saveThreats(
            filtered
        );

    },


    clearThreats() {

        localStorage.removeItem(
            this.storageKey
        );

    }

};


/* =====================================================
   CYBERGUARD APPLICATION
   ===================================================== */

const CyberGuard = {


    state:
        CyberGuardState,


    /* =================================================
       INITIALIZATION
       ================================================= */

    init() {

    console.log(
        "CyberGuard initializing..."
    );


    this.loadScanHistory();


    this.initNavigation();


    this.initSecurityScan();


    this.initPhishingDetector();


    this.initThreatCenter();
    this.initSecurityReports();
if (
    document.querySelector(
        "#reportScanHistory"
    )
) {

    this.renderReportScanHistory();

}

    this.initPasswordAnalyzer();


    this.initIncidentPanel();


    this.renderThreats();


    this.renderScanHistory();


    // =========================================
    // CLEAR SCAN HISTORY BUTTON
    // =========================================

    const clearHistoryButton =
        document.querySelector("#clearScanHistory");

    if (clearHistoryButton) {

        clearHistoryButton.onclick = () => {

            this.clearScanHistory();

        };

    }


    this.renderSecurityTimeline();


    this.updateDashboardSecurity();


    this.updateSystemStatus();
this.updateSystemClock();

setInterval(
    () => {

        this.updateSystemClock();

    },
    1000
);

    console.log(
        "CyberGuard initialized successfully."
    );

},
    /* =================================================
       NAVIGATION
       ================================================= */

    initNavigation() {

        const links =
            document.querySelectorAll(
                "[data-page]"
            );


        links.forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const page =
                            link.dataset.page;

                        if (!page) {

                            return;

                        }

                        console.log(
                            "Navigation:",
                            page
                        );

                    }
                );

            }
        );

    },


    /* =================================================
       SECURITY SCAN
       ================================================= */

    initSecurityScan() {

        const button =
            document.querySelector(
                ".scan-button"
            );


        if (!button) {

            return;

        }


        button.onclick =
            () => {

                this.startSecurityScan();

            };

    },


    startSecurityScan() {

        if (
            this.state.scanning
        ) {

            return;

        }


        const button =
            document.querySelector(
                ".scan-button"
            );


        const score =
            document.querySelector(
                ".score strong"
            );


        const progress =
            document.querySelector(
                ".progress-bar"
            );


        const threatStatus =
            document.querySelector(
                ".threat-status strong"
            );


        const threatCount =
            document.querySelector(
                ".threat-meta strong"
            );


        const protection =
            document.querySelector(
                ".protection-value strong"
            );


        const lastScan =
            document.querySelector(
                ".last-scan"
            );


        const orb =
            document.querySelector(
                ".security-orb"
            );


        this.state.scanning =
            true;


        if (button) {

            button.disabled =
                true;

            button.textContent =
                "Scanning...";

        }


        if (score) {

            score.textContent =
                "--";

        }


        if (progress) {

            progress.style.width =
                "0%";

        }


        if (threatStatus) {

            threatStatus.textContent =
                "Analyzing...";

        }


        if (threatCount) {

            threatCount.textContent =
                "...";

        }


        if (protection) {

            protection.textContent =
                "Scanning";

        }


        if (orb) {

            orb.style.transform =
                "scale(1.06)";

        }


        let progressValue = 0;


        const progressTimer =
            setInterval(
                () => {

                    progressValue += 10;


                    if (progress) {

                        progress.style.width =
                            progressValue +
                            "%";

                    }


                    if (
                        progressValue >=
                        100
                    ) {

                        clearInterval(
                            progressTimer
                        );

                    }

                },
                120
            );


        setTimeout(
            () => {

               /* =========================================
   ADVANCED SECURITY ANALYSIS
   ========================================= */

const checks = {

    password:
        Math.random() < 0.75,

    phishing:
        Math.random() < 0.80,

    suspiciousActivity:
        Math.random() < 0.70,

    threatProtection:
        Math.random() < 0.85

};


/* Count failed security checks */

const failedChecks =
    Object.values(checks)
        .filter(
            check =>
                check === false
        ).length;


/* Calculate security score */

let securityScore =
    100 -
    (failedChecks * 12);


/* Keep score between 40 and 100 */

securityScore =
    Math.max(
        40,
        Math.min(
            100,
            securityScore
        )
    );


/* Determine threat count */

const threats =
    failedChecks;


                this.state.scanning =
                    false;


                this.state.score =
                    securityScore;


                this.state.threats =
                    threats;


                this.saveScanHistory(

                    securityScore,

                    threats

                );


                this.renderScanHistory();
this.renderSecurityTimeline();

                if (score) {

                    score.textContent =
                        securityScore;

                }


                if (progress) {

                    progress.style.width =
                        securityScore +
                        "%";

                }


                if (threatCount) {

                    threatCount.textContent =
                        threats;

                }


                if (
                    threats === 0
                ) {

                    if (threatStatus) {

                        threatStatus.textContent =
                            "Low Risk";

                    }


                    if (protection) {

                        protection.textContent =
                            "Active";

                    }

                }

                else {

                    if (threatStatus) {

                        threatStatus.textContent =
                            "Review Required";

                    }


                    if (protection) {

                        protection.textContent =
                            "Attention";

                    }

                }


                if (lastScan) {

                    lastScan.textContent =
                        "Last scan: Just now";

                }


                if (button) {

                    button.disabled =
                        false;

                    button.textContent =
                        "Run Security Scan";

                }


                if (orb) {

                    orb.style.transform =
                        "scale(1)";

                }


                this.updateDashboardSecurity();


                this.updateSystemStatus();


                console.log(
                    "Security scan completed:",
                    securityScore
                );


            },
            3000
        );

    },


    /* =================================================
       DASHBOARD SECURITY
       ================================================= */

   updateDashboardSecurity() {

    const scoreElement =
        document.querySelector(
            "#securityScore"
        );

    const messageElement =
        document.querySelector(
            "#securityScoreMessage"
        );

    const statusElement =
        document.querySelector(
            "#dashboardThreatStatus"
        );
const protectionElement =
    document.querySelector(
        "#dashboardProtection"
    );
    const score =
        this.state.score;


    /* =========================================
       EXISTING SECURITY SCORE
       ========================================= */

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }


    if (score >= 85) {

        if (messageElement) {

            messageElement.textContent =
                "Your security posture is strong.";

        }

        if (statusElement) {

            statusElement.textContent =
                "Secure";

        }
if (protectionElement) {

    protectionElement.textContent =
        "Protected";

}
    }

    else if (score >= 60) {

        if (messageElement) {

            messageElement.textContent =
                "Your security needs attention.";

        }

        if (statusElement) {

            statusElement.textContent =
                "Needs Attention";

        }
if (protectionElement) {

    protectionElement.textContent =
        "Monitoring";

}
    }

    else {

        if (messageElement) {

            messageElement.textContent =
                "Your security is at high risk.";

        }

        if (statusElement) {

            statusElement.textContent =
                "High Risk";

        }
if (protectionElement) {

    protectionElement.textContent =
        "Attention";

}
    }


    /* =========================================
       STEP 30 — THREAT SUMMARY
       ========================================= */

    const threats =
        ThreatManager.getThreats();


    const highCount =
        threats.filter(
            threat =>
                String(threat.risk)
                    .toLowerCase() === "high" &&
                threat.status !== "Resolved"
        ).length;


    const mediumCount =
        threats.filter(
            threat =>
                String(threat.risk)
                    .toLowerCase() === "medium" &&
                threat.status !== "Resolved"
        ).length;


    const lowCount =
        threats.filter(
            threat =>
                String(threat.risk)
                    .toLowerCase() === "low" &&
                threat.status !== "Resolved"
        ).length;


    const resolvedCount =
        threats.filter(
            threat =>
                threat.status === "Resolved"
        ).length;


    const highElement =
        document.querySelector(
            "#dashboardHighThreats"
        );

    const mediumElement =
        document.querySelector(
            "#dashboardMediumThreats"
        );

    const lowElement =
        document.querySelector(
            "#dashboardLowThreats"
        );

    const resolvedElement =
        document.querySelector(
            "#dashboardResolvedThreats"
        );


    if (highElement) {

        highElement.textContent =
            highCount;

    }


    if (mediumElement) {

        mediumElement.textContent =
            mediumCount;

    }


    if (lowElement) {

        lowElement.textContent =
            lowCount;

    }


    if (resolvedElement) {

        resolvedElement.textContent =
            resolvedCount;

    }
    /* =========================================
       LIVE THREAT COUNT + PROTECTION
       ========================================= */

    const allThreats =
        ThreatManager.getThreats();

    const activeThreats =
        allThreats.filter(
            threat =>
                threat.status !==
                "Resolved"
        );

    const threatCount =
        activeThreats.length;


    const dashboardThreatCount =
        document.querySelector(
            "#dashboardThreatCount"
        );


    if (dashboardThreatCount) {

        dashboardThreatCount.textContent =
            threatCount;

    }


    if (statusElement) {

        if (threatCount === 0) {

            statusElement.textContent =
                "Secure";

        }

        else {

            statusElement.textContent =
                "Review Required";

        }

    }


    if (protectionElement) {

        if (threatCount === 0) {

            protectionElement.textContent =
                "Protected";

        }

        else {

            protectionElement.textContent =
                "Attention";

        }

    }
},


    /* =================================================
       SYSTEM STATUS
       ================================================= */

    updateSystemStatus() {

        const status =
            document.querySelector(
                "#systemStatus"
            );


        if (!status) {

            return;

        }


        if (this.state.scanning) {

            status.textContent =
                "Scanning";

            return;

        }


        const threats =
            ThreatManager.getThreats();


        const activeThreats =
            threats.filter(
                threat =>
                    threat.status !==
                    "Resolved"
            );


        if (
            activeThreats.length ===
            0
        ) {

            status.textContent =
                "Protected";

        }

        else {

            status.textContent =
                "Monitoring";

        }

    },
updateSystemClock() {

    const clock =
        document.querySelector(
            "#systemClock"
        );

    if (!clock) {
        return;
    }

    const now =
        new Date();

    clock.textContent =
        now.toLocaleTimeString();

},

    /* =================================================
       SCAN HISTORY
       ================================================= */

    loadScanHistory() {

        try {

            const saved =
                localStorage.getItem(
                    "cyberguard_scan_history"
                );


            if (!saved) {

                this.state.scanHistory =
                    [];

                return;

            }


            const history =
                JSON.parse(
                    saved
                );


            this.state.scanHistory =
                Array.isArray(history)
                    ? history
                    : [];

        }

        catch (error) {

            console.error(
                "Unable to load scan history:",
                error
            );

            this.state.scanHistory =
                [];

        }

    },


    saveScanHistory(
        score,
        threats
    ) {

        const history =
            this.state.scanHistory ||
            [];


        history.unshift({

            id:
                Date.now(),

            score:
                score,

            threats:
                threats,

            time:
                new Date().toISOString()

        });


        const limitedHistory =
            history.slice(
                0,
                20
            );


        this.state.scanHistory =
            limitedHistory;


        localStorage.setItem(

            "cyberguard_scan_history",

            JSON.stringify(
                limitedHistory
            )

        );

    },


    renderScanHistory() {

        const container =
            document.querySelector(
                "#scanHistory"
            );


        if (!container) {

            return;

        }


        const history =
            this.state.scanHistory ||
            [];


        if (
            history.length ===
            0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    No security scans performed yet.

                </div>

            `;

            return;

        }


        container.innerHTML =
            history
                .map(
                    scan => {

                        const date =
                            new Date(
                                scan.time
                            );


                        return `

                            <div class="scan-history-item">

                                <div>

                                    <strong>
                                        Security Score:
                                        ${this.escapeHTML(
                                            scan.score
                                        )}
                                    </strong>

                                    <small>
                                        ${date.toLocaleString()}
                                    </small>

                                </div>

                                <span>
                                    Threats:
                                    ${this.escapeHTML(
                                        scan.threats
                                    )}
                                </span>

                            </div>

                        `;

                    }
                )
                .join("");

    },


    clearScanHistory() {

    const confirmed = confirm(
        "Clear all saved security scan history?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "cyberguard_scan_history"
    );
    this.scanHistory = [];
    this.renderScanHistory();

    console.log(
        "Scan history cleared successfully."
    );
},
        /* =================================================
       PHISHING DETECTOR
       ================================================= */

    initPhishingDetector() {

        const urlInput =
            document.querySelector(
                "#urlInput"
            );


        const analyzeButton =
            document.querySelector(
                "#analyzeURL"
            );


        if (
            !urlInput ||
            !analyzeButton
        ) {

            return;

        }


        analyzeButton.onclick =
            () => {

                const url =
                    urlInput.value.trim();


                this.analyzeURL(
                    url
                );

            };


        urlInput.oninput =
            () => {

                if (
                    urlInput.value.trim() ===
                    ""
                ) {

                    this.resetURLAnalyzer();

                }

            };

    },


    analyzeURL(url) {

        if (!url) {

            this.resetURLAnalyzer();

            return;

        }


        let parsedURL;


        try {

            const normalizedURL =
                /^https?:\/\//i.test(url)
                    ? url
                    : "https://" + url;


            parsedURL =
                new URL(
                    normalizedURL
                );

        }

        catch (error) {

            this.updateURLResult(

                100,

                "Invalid URL",

                "High Risk",

                false,

                false,

                true,

                true,

                "The entered value is not a valid URL."

            );

            return;

        }


        const usesHTTPS =
            parsedURL.protocol ===
            "https:";


        const hostname =
            parsedURL.hostname
                .toLowerCase();


        const isIPAddress =
            /^[0-9.]+$/.test(
                hostname
            );


        const domainParts =
            hostname
                .split(".")
                .filter(
                    Boolean
                );


        const suspiciousDomain =
            isIPAddress ||
            domainParts.length < 2 ||
            hostname.includes(
                "--"
            );


        const suspiciousKeywords = [

            "login",
            "verify",
            "verification",
            "account",
            "secure",
            "update",
            "confirm",
            "password",
            "wallet",
            "bank",
            "signin",
            "authenticate",
            "credential",
            "suspended",
            "urgent"

        ];


        const fullURL =
            (
                parsedURL.hostname +
                parsedURL.pathname +
                parsedURL.search
            ).toLowerCase();


        const foundKeywords =
            suspiciousKeywords.filter(
                keyword =>
                    fullURL.includes(
                        keyword
                    )
            );


        const subdomainCount =
            Math.max(
                0,
                domainParts.length - 2
            );


        const excessiveSubdomains =
            subdomainCount >= 3;


        const veryLongURL =
            parsedURL.href.length >
            100;


        const containsAtSymbol =
            url.includes("@");


        let riskScore = 0;


        if (!usesHTTPS) {

            riskScore += 20;

        }


        if (isIPAddress) {

            riskScore += 35;

        }


        if (suspiciousDomain) {

            riskScore += 20;

        }


        riskScore +=
            Math.min(
                foundKeywords.length * 5,
                20
            );


        if (
            excessiveSubdomains
        ) {

            riskScore += 15;

        }


        if (veryLongURL) {

            riskScore += 10;

        }


        if (containsAtSymbol) {

            riskScore += 20;

        }


        riskScore =
            Math.min(
                100,
                riskScore
            );


        let label;

        let level;

        let advice;


        if (
            riskScore >= 70
        ) {

            label =
                "High Risk";

            level =
                "Danger";

            advice =
                "This URL contains multiple phishing indicators. Avoid entering credentials or payment information.";

        }

        else if (
            riskScore >= 40
        ) {

            label =
                "Suspicious";

            level =
                "Review";

            advice =
                "This URL contains suspicious characteristics. Verify the domain through an independent source before continuing.";

        }

        else {

            label =
                "Low Risk";

            level =
                "Likely Safe";

            advice =
                "No major phishing indicators were detected by this local analysis. This does not guarantee the website is safe.";

        }


        this.updateURLResult(

            riskScore,

            label,

            level,

            usesHTTPS,

            !suspiciousDomain,

            foundKeywords.length === 0,

            !excessiveSubdomains,

            advice

        );

    },


   updateURLResult(

    score,
    label,
    level,
    usesHTTPS,
    domainSafe,
    keywordsSafe,
    subdomainsSafe,
    advice

) {

    const scoreElement =
        document.querySelector(
            "#urlRiskScore"
        );


    const labelElement =
        document.querySelector(
            "#urlRiskLabel"
        );


    const levelElement =
        document.querySelector(
            "#urlRiskLevel"
        );


    const progressElement =
        document.querySelector(
            "#urlRiskProgress"
        );


    const adviceElement =
        document.querySelector(
            "#urlAdvice"
        );


    /* =====================================
       SCORE
       ===================================== */

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }


    /* =====================================
       RISK LABEL
       ===================================== */

    if (labelElement) {

        labelElement.textContent =
            label;

    }


    /* =====================================
       RISK LEVEL
       ===================================== */

    if (levelElement) {

        levelElement.textContent =
            level;

    }


    /* =====================================
       PROGRESS BAR
       ===================================== */

    if (progressElement) {

        progressElement.style.width =
            score + "%";

    }


    /* =====================================
       ADVICE
       ===================================== */

    if (adviceElement) {

        adviceElement.textContent =
            advice;

    }


    /* =====================================
       SECURITY INDICATORS
       ===================================== */

    const httpsElement =
        document.querySelector(
            "#httpsCheck"
        );


    const domainElement =
        document.querySelector(
            "#domainCheck"
        );


    const keywordElement =
        document.querySelector(
            "#keywordCheck"
        );


    const subdomainElement =
        document.querySelector(
            "#subdomainCheck"
        );


    if (httpsElement) {

        httpsElement.textContent =
            usesHTTPS
                ? "✓"
                : "✕";

        httpsElement.classList.toggle(
            "check-passed",
            usesHTTPS
        );

    }


    if (domainElement) {

        domainElement.textContent =
            domainSafe
                ? "✓"
                : "✕";

        domainElement.classList.toggle(
            "check-passed",
            domainSafe
        );

    }


    if (keywordElement) {

        keywordElement.textContent =
            keywordsSafe
                ? "✓"
                : "✕";

        keywordElement.classList.toggle(
            "check-passed",
            keywordsSafe
        );

    }


    if (subdomainElement) {

        subdomainElement.textContent =
            subdomainsSafe
                ? "✓"
                : "✕";

        subdomainElement.classList.toggle(
            "check-passed",
            subdomainsSafe
        );

    }


    /* =====================================
       RISK COLOR CLASS
       ===================================== */

    if (levelElement) {

        levelElement.classList.remove(
            "risk-safe",
            "risk-review",
            "risk-danger"
        );


        if (score >= 70) {

            levelElement.classList.add(
                "risk-danger"
            );

        }

        else if (score >= 40) {

            levelElement.classList.add(
                "risk-review"
            );

        }

        else {

            levelElement.classList.add(
                "risk-safe"
            );

        }

    }


    /* =====================================
       CREATE THREAT
       ===================================== */

    if (score >= 40) {

        const input =
            document.querySelector(
                "#urlInput"
            );


        const sourceURL =
            input
                ? input.value.trim()
                : "";


        const existing =
            ThreatManager
                .getThreats()
                .find(
                    threat =>
                        threat.sourceURL ===
                        sourceURL
                );


        if (!existing) {

            ThreatManager.addThreat({

                id:
                    Date.now(),

                title:
                    label +
                    " URL Detected",

                category:
                    "Phishing",

                risk:
                    score >= 70
                        ? "High"
                        : "Medium",

                status:
                    "Active",

                details:
                    advice,

                sourceURL:
                    sourceURL,

                time:
                    new Date().toISOString()

            });

        }


        this.renderThreats();

        this.updateThreatStatistics(
            ThreatManager.getThreats()
        );

        this.updateSystemStatus();

    }

},


    resetURLAnalyzer() {

        const result =
            document.querySelector(
                "#urlResult"
            );


        if (result) {

            result.style.display =
                "none";

        }


        const score =
            document.querySelector(
                "#urlRiskScore"
            );


        const label =
            document.querySelector(
                "#urlRiskLabel"
            );


        const advice =
            document.querySelector(
                "#urlAdvice"
            );


        if (score) {

            score.textContent =
                "--";

        }


        if (label) {

            label.textContent =
                "Not Analyzed";

        }


        if (advice) {

            advice.textContent =
                "";

        }

    },


    /* =================================================
       THREAT CENTER
       ================================================= */

    initThreatCenter() {

        const searchInput =
            document.querySelector(
                "#threatSearch"
            );


        const filter =
            document.querySelector(
                "#threatFilter"
            );


        if (searchInput) {

            searchInput.oninput =
                () => {

                    this.renderThreats();

                };

        }


               if (filter) {

            filter.onchange =
                () => {

                    this.renderThreats();

                };

        }


        // =========================================
        // CLEAR TEST DATA BUTTON
        // =========================================

        const clearThreatsButton =
            document.querySelector("#clearThreats");

        if (clearThreatsButton) {

            clearThreatsButton.onclick = () => {

                console.log(
                    "Clear Test Data clicked"
                );

                localStorage.removeItem(
                    "cyberguard_threats"
                );

                this.renderThreats();

                this.updateThreatStatistics();

                this.renderSecurityTimeline();

                console.log(
                    "Threat test data cleared"
                );

            };

        }


        this.renderThreats();

    },

    renderThreats() {

        const threatList =
            document.querySelector(
                "#threatList"
            );


        if (!threatList) {

            return;

        }


        const searchInput =
            document.querySelector(
                "#threatSearch"
            );


        const filter =
            document.querySelector(
                "#threatFilter"
            );


        const search =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedFilter =
            filter
                ? filter.value
                : "all";


        let threats =
            ThreatManager.getThreats();


        if (search) {

            threats =
                threats.filter(
                    threat => {

                        const text =
                            (
                                threat.title +
                                " " +
                                threat.category +
                                " " +
                                threat.risk +
                                " " +
                                threat.details
                            )
                            .toLowerCase();


                        return text.includes(
                            search
                        );

                    }
                );

        }


        if (
            selectedFilter !==
            "all"
        ) {

            threats =
                threats.filter(
                    threat =>
                        threat.risk
                            .toLowerCase() ===
                        selectedFilter
                );

        }


        if (
            threats.length ===
            0
        ) {

            threatList.innerHTML = `

                <div class="empty-threat-state">

                    <div class="empty-icon">
                        ◇
                    </div>

                    <strong>
                        No threats detected
                    </strong>

                    <p>
                        CyberGuard has not detected
                        any matching security events.
                    </p>

                </div>

            `;


            this.updateThreatStatistics(
                []
            );


            return;

        }


        threatList.innerHTML =
            threats
                .map(
                    threat =>
                        this.createThreatRow(
                            threat
                        )
                )
                .join("");


        const threatRows =
            threatList.querySelectorAll(
                ".threat-row"
            );


        threatRows.forEach(
            row => {

                row.addEventListener(
                    "click",
                    () => {

                        const threatId =
                            row.dataset.threatId;


                        this.openIncident(
                            threatId
                        );

                    }
                );

            }
        );


        this.updateThreatStatistics(
            threats
        );

    },
    initSecurityReports() {

    const score =
        document.querySelector("#reportScore");

    const threatsElement =
        document.querySelector("#reportThreats");

    const resolvedElement =
        document.querySelector("#reportResolved");

    const highElement =
        document.querySelector("#reportHigh");

    const mediumElement =
        document.querySelector("#reportMedium");

    const lowElement =
        document.querySelector("#reportLow");

    const statusElement =
        document.querySelector("#reportStatus");

    const messageElement =
        document.querySelector("#reportMessage");


    /* Get existing CyberGuard threats */

    const threats =
        typeof ThreatManager !== "undefined"
            ? ThreatManager.getThreats()
            : [];


    const activeThreats =
        threats.filter(
            threat =>
                threat.status !== "Resolved"
        );


    const resolvedThreats =
        threats.filter(
            threat =>
                threat.status === "Resolved"
        );


    const high =
        activeThreats.filter(
            threat =>
                threat.risk === "High"
        ).length;


    const medium =
        activeThreats.filter(
            threat =>
                threat.risk === "Medium"
        ).length;


    const low =
        activeThreats.filter(
            threat =>
                threat.risk === "Low"
        ).length;


    /* Security Score */

    const securityScore =
        Number(this.state.score || 0);


    if (score) {

        score.textContent =
            securityScore;

    }


    /* Threat numbers */

    if (threatsElement) {

        threatsElement.textContent =
            activeThreats.length;

    }


    if (resolvedElement) {

        resolvedElement.textContent =
            resolvedThreats.length;

    }


    if (highElement) {

        highElement.textContent =
            high;

    }


    if (mediumElement) {

        mediumElement.textContent =
            medium;

    }


    if (lowElement) {

        lowElement.textContent =
            low;

    }


    /* Security status */

    if (securityScore >= 85) {

        if (statusElement) {

            statusElement.textContent =
                "Secure";

        }

        if (messageElement) {

            messageElement.textContent =
                "Your security posture is strong.";

        }

    }

    else if (securityScore >= 60) {

        if (statusElement) {

            statusElement.textContent =
                "Needs Attention";

        }

        if (messageElement) {

            messageElement.textContent =
                "Your security needs attention.";

        }

    }

    else {

        if (statusElement) {

            statusElement.textContent =
                "High Risk";

        }

        if (messageElement) {

            messageElement.textContent =
                "Your security is at high risk.";

        }

    }

},
renderReportScanHistory() {

    const container =
        document.querySelector(
            "#reportScanHistory"
        );

    if (!container) {
        return;
    }


    const history =
        this.state.scanHistory ||
        JSON.parse(
            localStorage.getItem(
                "cyberguard_scan_history"
            ) || "[]"
        );


    if (
        history.length === 0
    ) {

        container.innerHTML = `

            <div class="report-empty">
                No security scans recorded yet.
            </div>

        `;

        return;
    }


    container.innerHTML =
        history
            .slice(0, 5)
            .map(
                scan => {

                    const score =
                        Number(
                            scan.score || 0
                        );

                    const threats =
                        Number(
                            scan.threats || 0
                        );


                    const time =
                        scan.time
                            ? new Date(
                                scan.time
                            ).toLocaleString()
                            : "Recent scan";


                    return `

                        <div class="report-scan-item">

                            <div>

                                <strong>
                                    Security Scan
                                </strong>

                                <small>
                                    ${this.escapeHTML(
                                        time
                                    )}
                                </small>

                            </div>


                            <div>

                                <strong>
                                    ${score}/100
                                </strong>

                                <small>
                                    Threats: ${threats}
                                </small>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

},
createThreatRow(
    threat
) {

    const date =
        new Date(
            threat.time
        );


    const time =
        date.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const riskClass =
        String(
            threat.risk ||
            "Low"
        ).toLowerCase();


    const statusClass =
        String(
            threat.status ||
            "Active"
        )
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );


    /* Risk icon */

    let riskIcon = "◆";

    if (
        riskClass ===
        "high"
    ) {

        riskIcon = "⚠";

    }

    else if (
        riskClass ===
        "medium"
    ) {

        riskIcon = "▲";

    }

    else {

        riskIcon = "●";

    }


    /* Status text */

    const statusText =
        threat.status ||
        "Active";


    return `

        <div
            class="threat-row ${riskClass}"
            data-threat-id="${this.escapeHTML(
                threat.id
            )}"
        >

            <!-- Threat Event -->

            <div class="threat-event">

                <div
                    class="threat-event-icon ${riskClass}"
                >
                    ${riskIcon}
                </div>

                <div class="threat-event-info">

                    <strong>
                        ${this.escapeHTML(
                            threat.title
                        )}
                    </strong>

                    <small>
                        ${this.escapeHTML(
                            threat.details
                        )}
                    </small>

                </div>

            </div>


            <!-- Category -->

            <div class="threat-category">

                <span class="category-label">

                    ${this.escapeHTML(
                        threat.category
                    )}

                </span>

            </div>


            <!-- Risk -->

            <div>

                <span
                    class="risk-badge ${riskClass}"
                >

                    ${riskIcon}

                    ${this.escapeHTML(
                        threat.risk ||
                        "Low"
                    )}

                </span>

            </div>


            <!-- Time -->

            <div class="threat-time">

                ${time}

            </div>


            <!-- Status -->

            <div>

                <span
                    class="threat-status ${statusClass}"
                >

                    ${this.escapeHTML(
                        statusText
                    )}

                </span>

            </div>

        </div>

    `;

},
        /* =================================================
       THREAT STATISTICS
       ================================================= */

    updateThreatStatistics(
        threats
    ) {

        const total =
            document.querySelector(
                "#totalThreats"
            );


        const high =
            document.querySelector(
                "#highThreats"
            );


        const medium =
            document.querySelector(
                "#mediumThreats"
            );


        const low =
            document.querySelector(
                "#lowThreats"
            );

const resolvedThreats =
    threats.filter(
        threat =>
            threat.status === "Resolved"
    ).length;


// Update Threat Summary
const dashboardHigh =
    document.querySelector(
        "#dashboardHighThreats"
    );

const dashboardMedium =
    document.querySelector(
        "#dashboardMediumThreats"
    );

const dashboardLow =
    document.querySelector(
        "#dashboardLowThreats"
    );

const dashboardResolved =
    document.querySelector(
        "#dashboardResolvedThreats"
    );


if (dashboardHigh) {
    dashboardHigh.textContent =
        highCount;
}

if (dashboardMedium) {
    dashboardMedium.textContent =
        mediumCount;
}

if (dashboardLow) {
    dashboardLow.textContent =
        lowCount;
}

if (dashboardResolved) {
    dashboardResolved.textContent =
        resolvedThreats;
}
        const resolved =
            document.querySelector(
                "#resolvedThreats"
            );


        const allThreats =
            ThreatManager.getThreats();


        const highCount =
            allThreats.filter(
                threat =>
                    threat.risk ===
                    "High" &&
                    threat.status !==
                    "Resolved"
            ).length;


        const mediumCount =
            allThreats.filter(
                threat =>
                    threat.risk ===
                    "Medium" &&
                    threat.status !==
                    "Resolved"
            ).length;


        const lowCount =
            allThreats.filter(
                threat =>
                    threat.risk ===
                    "Low" &&
                    threat.status !==
                    "Resolved"
            ).length;


        const resolvedCount =
            allThreats.filter(
                threat =>
                    threat.status ===
                    "Resolved"
            ).length;


        const activeCount =
            allThreats.filter(
                threat =>
                    threat.status !==
                    "Resolved"
            ).length;


        if (total) {

            total.textContent =
                activeCount;

        }


        if (high) {

            high.textContent =
                highCount;

        }


        if (medium) {

            medium.textContent =
                mediumCount;

        }


        if (low) {

            low.textContent =
                lowCount;

        }


        if (resolved) {

            resolved.textContent =
                resolvedCount;

        }

    },


    /* =================================================
       INCIDENT PANEL
       ================================================= */

    initIncidentPanel() {

        const closeButton =
            document.querySelector(
                "#closeIncident"
            );


        if (closeButton) {

            closeButton.onclick =
                () => {

                    this.closeIncident();

                };

        }

    },


    openIncident(id) {

        const threats =
            ThreatManager.getThreats();


        const threat =
            threats.find(
                item =>
                    String(item.id) ===
                    String(id)
            );


        if (!threat) {

            console.log(
                "Threat not found:",
                id
            );

            return;

        }


        this.state.selectedThreat =
            threat.id;


        const panel =
            document.querySelector(
                "#incidentPanel"
            );


        if (!panel) {

            return;

        }


        const title =
            document.querySelector(
                "#incidentTitle"
            );


        const category =
            document.querySelector(
                "#incidentCategory"
            );


        const risk =
            document.querySelector(
                "#incidentRisk"
            );


        const status =
            document.querySelector(
                "#incidentStatus"
            );


        const details =
            document.querySelector(
                "#incidentDetails"
            );


        const time =
            document.querySelector(
                "#incidentTime"
            );


        if (title) {

            title.textContent =
                threat.title;

        }


        if (category) {

            category.textContent =
                threat.category;

        }


        if (risk) {

            risk.textContent =
                threat.risk;

        }


        if (status) {

            status.textContent =
                threat.status;

        }


        if (details) {

            details.textContent =
                threat.details;

        }


        if (time) {

            time.textContent =
                new Date(
                    threat.time
                ).toLocaleString();

        }


        /* =============================================
           RESOLVE BUTTON
           ============================================= */

        const resolveButton =
            document.querySelector(
                "#resolveThreat"
            );


        if (resolveButton) {

            resolveButton.onclick =
                () => {

                    console.log(
                        "Resolve button clicked:",
                        threat.id
                    );


                    this.resolveSelectedThreat();

                };


            if (
                threat.status ===
                "Resolved"
            ) {

                resolveButton.disabled =
                    true;


                resolveButton.textContent =
                    "Threat Resolved";

            }

            else {

                resolveButton.disabled =
                    false;


                resolveButton.textContent =
                    "Resolve Threat";

            }

        }


        /* =============================================
           INVESTIGATE BUTTON
           ============================================= */

        const investigateButton =
            document.querySelector(
                "#investigateThreat"
            );


        if (investigateButton) {

            investigateButton.onclick =
                () => {

                    this.investigateSelectedThreat();

                };

        }


        panel.style.display =
            "block";


        panel.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });

    },


    closeIncident() {

        const panel =
            document.querySelector(
                "#incidentPanel"
            );


        if (panel) {

            panel.style.display =
                "none";

        }


        this.state.selectedThreat =
            null;

    },


    /* =================================================
       RESOLVE THREAT
       ================================================= */

    resolveSelectedThreat() {

        console.log(
            "Resolving threat:",
            this.state.selectedThreat
        );


        if (
            this.state.selectedThreat ===
                null ||
            this.state.selectedThreat ===
                undefined
        ) {

            console.log(
                "No threat selected"
            );

            return;

        }


        const threats =
            ThreatManager.getThreats();


        const threat =
            threats.find(
                item =>
                    String(item.id) ===
                    String(
                        this.state.selectedThreat
                    )
            );


        if (!threat) {

            console.log(
                "Threat not found:",
                this.state.selectedThreat
            );

            return;

        }


        /* Mark as resolved */

        threat.status =
            "Resolved";


        /* Save */

        ThreatManager.saveThreats(
            threats
        );


        console.log(
            "Threat resolved successfully:",
            threat.id
        );


        /* Update incident */

        const statusElement =
            document.querySelector(
                "#incidentStatus"
            );


        if (statusElement) {

            statusElement.textContent =
                "Resolved";

        }


        /* Update button */

        const resolveButton =
            document.querySelector(
                "#resolveThreat"
            );


        if (resolveButton) {

            resolveButton.disabled =
                true;


            resolveButton.textContent =
                "Threat Resolved";

        }


        /* Refresh UI */

        this.renderThreats();


        this.updateThreatStatistics(
            threats
        );


        this.renderSecurityTimeline();


        this.updateDashboardSecurity();


        this.updateSystemStatus();
this.renderSecurityTimeline();
this.renderThreats();
    },


    /* =================================================
       INVESTIGATE THREAT
       ================================================= */

    investigateSelectedThreat() {

        if (
            this.state.selectedThreat ===
                null ||
            this.state.selectedThreat ===
                undefined
        ) {

            console.log(
                "No threat selected"
            );

            return;

        }


        const threat =
            ThreatManager
                .getThreats()
                .find(
                    item =>
                        String(item.id) ===
                        String(
                            this.state.selectedThreat
                        )
                );


        if (!threat) {

            console.log(
                "Threat not found"
            );

            return;

        }


        console.log(
            "Investigating threat:",
            threat
        );


        alert(

            "Investigation started\n\n" +

            "Threat: " +
            threat.title +

            "\nCategory: " +
            threat.category +

            "\nRisk: " +
            threat.risk +

            "\nStatus: " +
            threat.status

        );

    },


    /* =================================================
       SECURITY TIMELINE
       ================================================= */

    renderSecurityTimeline() {

        const container =
            document.querySelector(
                "#securityTimeline"
            );


        if (!container) {

            return;

        }


        const threats =
            ThreatManager.getThreats();


        const history =
            this.state.scanHistory ||
            [];


        const events = [];


        threats.forEach(
            threat => {

                events.push({

                    type:
                        "threat",

                    title:
                        threat.title,

                    details:
                        threat.category +
                        " • " +
                        threat.risk,

                    time:
                        threat.time

                });

            }
        );


        history.forEach(
            scan => {

                events.push({

                    type:
                        "scan",

                    title:
                        "Security Scan Completed",

                    details:
                        "Security Score: " +
                        scan.score,

                    time:
                        scan.time

                });

            }
        );


        events.sort(
            (
                a,
                b
            ) =>
                new Date(
                    b.time
                ) -
                new Date(
                    a.time
                )
        );


        if (
            events.length ===
            0
        ) {

            container.innerHTML = `

                <div class="empty-state">

                    No security activity yet.

                </div>

            `;

            return;

        }


        container.innerHTML =
            events
                .slice(
                    0,
                    20
                )
                .map(
                    event => `

                        <div class="timeline-item">

                            <div class="timeline-dot">
                                ${event.type === "scan"
                                    ? "✓"
                                    : "⚠"}
                            </div>

                            <div class="timeline-content">

                                <strong>
                                    ${this.escapeHTML(
                                        event.title
                                    )}
                                </strong>

                                <p>
                                    ${this.escapeHTML(
                                        event.details
                                    )}
                                </p>

                                <small>
                                    ${new Date(
                                        event.time
                                    ).toLocaleString()}
                                </small>

                            </div>

                        </div>

                    `
                )
                .join("");

    },

renderSecurityTimeline() {

    const container =
        document.querySelector(
            "#securityTimeline"
        );

    if (!container) {
        return;
    }

    const events = [];

    /* Scan history */

    const scanHistory =
        this.state.scanHistory || [];

    scanHistory.forEach(scan => {

        events.push({

            type: "SECURITY SCAN",

            title:
                "Security scan completed",

            details:
                "Security score: " +
                scan.score +
                "/100 · Threats: " +
                scan.threats,

            time:
                scan.time

        });

    });


    /* Threat activity */

    const threats =
        ThreatManager.getThreats();

    threats.forEach(threat => {

        events.push({

            type: "THREAT",

            title:
                threat.title,

            details:
                threat.risk +
                " risk · " +
                threat.status,

            time:
                threat.time

        });

    });


    events.sort(
        (a, b) =>
            new Date(b.time) -
            new Date(a.time)
    );


    if (events.length === 0) {

        container.innerHTML = `
            <div class="timeline-empty">
                No security activity recorded yet.
            </div>
        `;

        return;

    }


    container.innerHTML =
        events
            .slice(0, 20)
            .map(event => {

                return `
                    <div class="timeline-item">

                        <span class="timeline-dot"></span>

                        <span class="timeline-type">
                            ${this.escapeHTML(
                                event.type
                            )}
                        </span>

                        <h3>
                            ${this.escapeHTML(
                                event.title
                            )}
                        </h3>

                        <p>
                            ${this.escapeHTML(
                                event.details
                            )}
                        </p>

                        <span class="timeline-time">
                            ${new Date(
                                event.time
                            ).toLocaleString()}
                        </span>

                    </div>
                `;

            })
            .join("");

},
    /* =================================================
       PASSWORD ANALYZER
       ================================================= */

    initPasswordAnalyzer() {

        const input =
            document.querySelector(
                "#passwordInput"
            );


        const analyzeButton =
            document.querySelector(
                "#analyzePassword"
            );


        const toggleButton =
            document.querySelector(
                "#togglePassword"
            );


        if (
            !input ||
            !analyzeButton
        ) {

            return;

        }


        analyzeButton.onclick =
            () => {

                this.analyzePassword(
                    input.value
                );

            };


        if (toggleButton) {

            toggleButton.onclick =
                () => {

                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";


                        toggleButton.textContent =
                            "Hide";

                    }

                    else {

                        input.type =
                            "password";


                        toggleButton.textContent =
                            "Show";

                    }

                };

        }


        input.oninput =
            () => {

                if (
                    input.value ===
                    ""
                ) {

                    this.resetPasswordAnalyzer();

                }

                else {

                    this.analyzePassword(
                        input.value
                    );

                }

            };

    },


analyzePassword(
    password
) {

    if (!password) {

        this.resetPasswordAnalyzer();

        return;

    }


    /* =========================================
       PASSWORD SCORE
       ========================================= */

    let score = 0;


    if (password.length >= 8) {
        score += 20;
    }

    if (password.length >= 12) {
        score += 15;
    }

    if (password.length >= 16) {
        score += 15;
    }


    if (/[a-z]/.test(password)) {
        score += 10;
    }

    if (/[A-Z]/.test(password)) {
        score += 10;
    }

    if (/[0-9]/.test(password)) {
        score += 10;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 20;
    }


    score =
        Math.min(
            100,
            score
        );


    /* =========================================
       REQUIREMENTS
       ========================================= */

    const lengthOK =
        password.length >= 12;

    const upperOK =
        /[A-Z]/.test(password);

    const lowerOK =
        /[a-z]/.test(password);

    const numberOK =
        /[0-9]/.test(password);

    const specialOK =
        /[^A-Za-z0-9]/.test(password);


    const updateCheck =
        (id, passed) => {

            const element =
                document.querySelector(id);

            if (!element) {
                return;
            }

            element.textContent =
                passed ? "✓" : "○";

            element.classList.toggle(
                "check-passed",
                passed
            );

        };


    updateCheck(
        "#lengthCheck",
        lengthOK
    );

    updateCheck(
        "#upperCheck",
        upperOK
    );

    updateCheck(
        "#lowerCheck",
        lowerOK
    );

    updateCheck(
        "#numberCheck",
        numberOK
    );

    updateCheck(
        "#specialCheck",
        specialOK
    );


    /* =========================================
       STRENGTH LEVEL
       ========================================= */

    let strength;

    if (score >= 80) {

        strength =
            "Strong";

    }

    else if (score >= 55) {

        strength =
            "Moderate";

    }

    else {

        strength =
            "Weak";

    }


    /* =========================================
       UPDATE SCORE
       ========================================= */

    const scoreElement =
        document.querySelector(
            "#passwordScore"
        );

    const strengthElement =
        document.querySelector(
            "#strengthLabel"
        );

    const progress =
        document.querySelector(
            "#strengthProgress"
        );

    const securityLevel =
        document.querySelector(
            "#securityLevel"
        );


    if (scoreElement) {

        scoreElement.textContent =
            score;

    }


    if (strengthElement) {

        strengthElement.textContent =
            strength;

    }


    if (securityLevel) {

        securityLevel.textContent =
            strength;

    }


    if (progress) {

        progress.style.width =
            score + "%";

    }
    /* =========================================
       ADVANCED SECURITY ANALYSIS
       ========================================= */

    const entropyElement =
        document.querySelector(
            "#entropyValue"
        );

    const qualityElement =
        document.querySelector(
            "#qualityMessage"
        );

    const adviceElement =
        document.querySelector(
            "#passwordAdvice"
        );

    const patternElement =
        document.querySelector(
            "#patternMessage"
        );


    /* =========================================
       ENTROPY ESTIMATION
       ========================================= */

    let characterPool = 0;

    if (/[a-z]/.test(password)) {
        characterPool += 26;
    }

    if (/[A-Z]/.test(password)) {
        characterPool += 26;
    }

    if (/[0-9]/.test(password)) {
        characterPool += 10;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        characterPool += 32;
    }


    let entropy = 0;

    if (characterPool > 0) {

        entropy =
            password.length *
            Math.log2(characterPool);

    }


    if (entropyElement) {

        entropyElement.textContent =
            "Entropy: " +
            Math.round(entropy) +
            " bits";

    }


    /* =========================================
       PASSWORD QUALITY
       ========================================= */

    let qualityMessage;


    if (score >= 85) {

        qualityMessage =
            "Excellent password structure with strong character diversity.";

    }

    else if (score >= 70) {

        qualityMessage =
            "Good password structure, but additional length can improve security.";

    }

    else if (score >= 50) {

        qualityMessage =
            "Moderate password strength. Several security improvements are recommended.";

    }

    else {

        qualityMessage =
            "Weak password structure. It should be strengthened significantly.";

    }


    if (qualityElement) {

        qualityElement.textContent =
            qualityMessage;

    }


    /* =========================================
       SECURITY RECOMMENDATION
       ========================================= */

    let advice;


    if (password.length < 12) {

        advice =
            "Use at least 12 characters for better protection.";

    }

    else if (
        !upperOK ||
        !lowerOK
    ) {

        advice =
            "Mix uppercase and lowercase letters.";

    }

    else if (!numberOK) {

        advice =
            "Add numbers to increase password complexity.";

    }

    else if (!specialOK) {

        advice =
            "Add special characters such as !, @, # or %.";

    }

    else if (score >= 85) {

        advice =
            "Excellent structure. Avoid reusing this password on other accounts.";

    }

    else {

        advice =
            "Increase password length and character diversity.";

    }


    if (adviceElement) {

        adviceElement.textContent =
            advice;

    }


/* =========================================
   PATTERN DETECTION
   ========================================= */

const patterns = [];


if (
    /(.)\1{2,}/.test(
        password
    )
) {

    patterns.push(
        "repeated characters"
    );

}


if (
    /123|234|345|456|567|678|789|890/.test(
        password
    )
) {

    patterns.push(
        "sequential numbers"
    );

}


if (
    /abc|bcd|cde|def|xyz/i.test(
        password
    )
) {

    patterns.push(
        "sequential letters"
    );

}


if (
    /password|admin|qwerty|welcome|letmein/i.test(
        password
    )
) {

    patterns.push(
        "common password pattern"
    );

}


if (patterns.length > 0) {

    if (patternElement) {

        patternElement.textContent =
            "Detected: " +
            patterns.join(
                ", "
            ) +
            ".";

    }

}

else {

    if (patternElement) {

        patternElement.textContent =
            "No obvious weak patterns detected.";

    }

}

},


    /* =================================================
       HTML SAFETY
       ================================================= */

    escapeHTML(
        value
    ) {

        return String(
            value ??
            ""
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

    }

};


/* =====================================================
   START CYBERGUARD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        CyberGuard.init();

    }
);