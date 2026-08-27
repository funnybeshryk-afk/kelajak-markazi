import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { createClient as createSupabaseJsClient, type SupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";

export type SiteSettings = {
  address: string;
  phone: string;
  email: string;
  telegram: string;
};

// Same values currently hardcoded in Header/Footer/boglanish — used whenever
// Supabase is unreachable, errors, or has no active row yet.
const FALLBACK_SITE_SETTINGS: SiteSettings = {
  address: "Beshariq tumani, Farg‘ona viloyati",
  phone: "+998 90 123 45 67",
  email: "info@kelajakmarkazi.uz",
  telegram: "@kelajakmarkazi",
};

async function fetchSiteSettings(supabase: SupabaseClient): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("address, phone, email, telegram")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase: sayt sozlamalarini yuklashda xatolik:", error);
      return FALLBACK_SITE_SETTINGS;
    }

    if (!data) {
      return FALLBACK_SITE_SETTINGS;
    }

    return {
      address: data.address ?? FALLBACK_SITE_SETTINGS.address,
      phone: data.phone ?? FALLBACK_SITE_SETTINGS.phone,
      email: data.email ?? FALLBACK_SITE_SETTINGS.email,
      telegram: data.telegram ?? FALLBACK_SITE_SETTINGS.telegram,
    };
  } catch (err) {
    unstable_rethrow(err);
    console.error("Supabase: sayt sozlamalariga ulanib bo‘lmadi:", err);
    return FALLBACK_SITE_SETTINGS;
  }
}

// For /boglanish: cookie-aware SSR client, live per-request data. This page is
// already dynamic (it talks to Supabase directly), so using the cookie-based
// client here doesn't cost anything extra.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = await createServerSupabaseClient();
  return fetchSiteSettings(supabase);
});

// For the root layout (Header/Footer, rendered on every route): a plain
// cookie-free client. site_settings is public, unauthenticated data, so no
// session/cookies are actually needed to read it — and avoiding `cookies()`
// here means pages that don't otherwise use Supabase can stay static/SSG
// instead of the whole site being forced dynamic by the shared layout.
let publicClient: SupabaseClient | undefined;
function getPublicClient(): SupabaseClient {
  if (!publicClient) {
    publicClient = createSupabaseJsClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return publicClient;
}

export const getSiteSettingsStatic = cache(async (): Promise<SiteSettings> => {
  return fetchSiteSettings(getPublicClient());
});
