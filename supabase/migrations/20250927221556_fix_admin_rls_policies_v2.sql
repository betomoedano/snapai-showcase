/*
  # Fix Admin RLS Policies for Submissions

  The admin dashboard is not showing submissions because the RLS policies 
  need to be updated to properly work with the Supabase client queries.

  1. Update admin read policy to be more explicit
  2. Ensure the policy works with JOIN queries
  3. Add proper users table policy for admin access

  This will fix the issue where admins can't see submissions in the dashboard.
*/

-- Drop existing admin policies to recreate them
DROP POLICY IF EXISTS "Admin users can read all submissions" ON submissions;
DROP POLICY IF EXISTS "Admin users can update all submissions" ON submissions;
DROP POLICY IF EXISTS "Admin users can read all user profiles" ON users;

-- Create more explicit admin policies for submissions
CREATE POLICY "Admin users can read all submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (
    (SELECT is_admin FROM users WHERE users.id = auth.uid()) = true
  );

CREATE POLICY "Admin users can update all submissions"  
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT is_admin FROM users WHERE users.id = auth.uid()) = true
  )
  WITH CHECK (
    (SELECT is_admin FROM users WHERE users.id = auth.uid()) = true
  );

-- Ensure users table has proper RLS for admin access
CREATE POLICY "Admin users can read all user profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    (SELECT is_admin FROM users WHERE users.id = auth.uid()) = true
  );