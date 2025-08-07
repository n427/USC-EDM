import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://twmmzdgspxaqetgtiptu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3bW16ZGdzcHhhcWV0Z3RpcHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MzYxNjYsImV4cCI6MjA2ODIxMjE2Nn0.QZVTWTscVGd9CJpbq0O7op9mOpuYIxCozLokECR0p3M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 