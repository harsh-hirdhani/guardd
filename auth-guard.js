// ==========================================
// CyberGuard - Authentication Guard
// ==========================================

(async function () {

    try {

        const session = await getCurrentSession();

        if (!session) {

            const isPagesFolder =
                window.location.pathname.includes("/pages/");

            const loginPage =
                isPagesFolder
                    ? "../login.html"
                    : "login.html";

            window.location.replace(loginPage);

            return;
        }

        // User is authenticated
        console.log(
            "CyberGuard authentication verified."
        );

    } catch (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        const isPagesFolder =
            window.location.pathname.includes("/pages/");

        const loginPage =
            isPagesFolder
                ? "../login.html"
                : "login.html";

        window.location.replace(loginPage);
    }

})();