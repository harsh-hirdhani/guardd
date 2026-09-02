// ==========================================
// CyberGuard - Real Authentication
// Supabase Authentication
// ==========================================

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// ==========================================
// SIGN UP
// ==========================================

async function signUpUser(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: window.location.origin + "/guardd/"
        }
    });

    if (error) {
        throw error;
    }

    return data;
}

// ==========================================
// LOGIN
// ==========================================

async function loginUser(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        throw error;
    }

    return data;
}

// ==========================================
// LOGOUT
// ==========================================

async function logoutUser() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        throw error;
    }

    const isPagesFolder =
        window.location.pathname.includes("/pages/");

    window.location.href = isPagesFolder
        ? "../login.html"
        : "login.html";
}

// ==========================================
// GET CURRENT USER
// ==========================================

async function getCurrentUser() {
    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    return user;
}

// ==========================================
// GET CURRENT SESSION
// ==========================================

async function getCurrentSession() {
    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    return session;
}