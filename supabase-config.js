// ========================================
// CyberGuard - Supabase Configuration
// ========================================

const SUPABASE_URL = "https://vrtmgnqvqzdsvteshwri.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_7j_sQEz0cRiuVku-5BBbjA_r8dw6VkM";

// Initialize Supabase client
if (!window.supabase) {
    console.error(
        "Supabase library not loaded. Check the Supabase CDN script."
    );
} else {
    window.supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("CyberGuard Supabase client initialized.");
}
