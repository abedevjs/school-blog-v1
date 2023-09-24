// jNZqk2yu8*SmMqh

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; //* anon key, source: https://supabase.com/dashboard/project/bufuebjpkpewvlqvpyny/settings/api
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// console.log(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_KEY
// );

// console.log(import.meta.env.VITE_SUPABASE_URL);
