import { createClient } from "@supabase/supabase-js";

// Plain, cookie-free Supabase client. Unlike lib/supabase/server.ts (which calls
// cookies() and therefore forces dynamic rendering on any route that uses it),
// this client touches no Next.js dynamic APIs, so it's safe to call from
// generateStaticParams/generateMetadata and from statically-generated (SSG/ISR)
// pages without breaking their pre-rendering.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
