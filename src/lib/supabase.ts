import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the icon URL for a submission
export function getSubmissionIconUrl(submission: Submission): string {
  console.log('Getting icon URL for submission:', submission?.id, { icon_path: submission?.icon_path, icon_url: submission?.icon_url });

  if (submission?.icon_path) {
    // New storage-based path
    const { data: { publicUrl } } = supabase.storage
      .from('icons')
      .getPublicUrl(submission.icon_path);
    console.log('Using storage URL:', publicUrl);
    return publicUrl;
  }

  // Fallback to legacy URL
  const fallbackUrl = submission?.icon_url || '';
  console.log('Using fallback URL:', fallbackUrl);
  return fallbackUrl;
}

export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_admin?: boolean;
  github_username?: string;
  github_avatar_url?: string;
  github_name?: string;
  github_bio?: string;
};

export type Submission = {
  id: string;
  user_id: string;
  icon_url?: string; // Legacy field, will be deprecated
  icon_path?: string; // New field for storage paths
  prompt: string;
  github_profile: string;
  website_url?: string;
  description?: string;
  featured: boolean;
  approved: boolean;
  rejected?: boolean;
  command?: string;
  created_at: string;
  updated_at: string;
  github_username?: string;
  github_avatar_url?: string;
  github_name?: string;
  github_bio?: string;
};