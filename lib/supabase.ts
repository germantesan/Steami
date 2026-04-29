import { createClient } from '@supabase/supabase-js'

// Estas variables leen lo que pusiste en tu .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Este es el objeto que usaréis en toda la web para pedir datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey)