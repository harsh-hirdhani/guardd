// ==========================================
// CyberGuard - User Account UI
// ==========================================

(async function () {

    try {

        const user = await getCurrentUser();

        if (!user) {
            return;
        }

        const navbar = document.querySelector(".navbar");

        if (!navbar) {
            return;
        }

        // Prevent duplicate account UI
        if (document.getElementById("cyberguardAccount")) {
            return;
        }

        const account = document.createElement("div");

        account.id = "cyberguardAccount";
        account.className = "cyberguard-account";

        account.innerHTML = `
            <div class="cyberguard-user">
                <span class="cyberguard-user-icon">●</span>
                <span class="cyberguard-user-email">
                    ${escapeHtml(user.email || "User")}
                </span>
            </div>

            <button
                type="button"
                id="cyberguardLogout"
                class="cyberguard-logout"
            >
                Logout
            </button>
        `;

        navbar.appendChild(account);

        const logoutButton =
            document.getElementById("cyberguardLogout");

        logoutButton.addEventListener("click", async function () {

            logoutButton.disabled = true;
            logoutButton.textContent = "Logging out...";

            try {

                await logoutUser();

            } catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );

                logoutButton.disabled = false;
                logoutButton.textContent = "Logout";

                alert(
                    error.message ||
                    "Unable to logout."
                );
            }

        });

    } catch (error) {

        console.error(
            "Unable to load account information:",
            error
        );

    }

})();


// ==========================================
// Basic HTML escaping
// ==========================================

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}