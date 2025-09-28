/*
  # Add Admin Roles and GitHub Profile Data

  1. Users Table Updates
    - Add `is_admin` (boolean) - Whether the user has admin privileges
    - Add `github_username` (text) - GitHub username extracted from profile URL
    - Add `github_avatar_url` (text) - User's GitHub profile picture
    - Add `github_name` (text) - User's display name from GitHub
    - Add `github_bio` (text) - User's bio from GitHub

  2. Submissions Table Updates
    - Add `github_username` (text) - GitHub username of submitter
    - Add `github_avatar_url` (text) - Profile picture of submitter
    - Add `github_name` (text) - Display name of submitter
    - Add `github_bio` (text) - Bio of submitter

  3. Security
    - Add RLS policy for admin users to manage all submissions
    - Ensure only admins can update approval status

  4. Important Notes
    - Admin status is managed through the database
    - GitHub data is fetched and stored when submissions are created
    - Profile data enhances the showcase experience
*/

-- Add new columns to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE users ADD COLUMN is_admin boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'github_username'
  ) THEN
    ALTER TABLE users ADD COLUMN github_username text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'github_avatar_url'
  ) THEN
    ALTER TABLE users ADD COLUMN github_avatar_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'github_name'
  ) THEN
    ALTER TABLE users ADD COLUMN github_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'github_bio'
  ) THEN
    ALTER TABLE users ADD COLUMN github_bio text;
  END IF;
END $$;

-- Add new columns to submissions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'github_username'
  ) THEN
    ALTER TABLE submissions ADD COLUMN github_username text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'github_avatar_url'
  ) THEN
    ALTER TABLE submissions ADD COLUMN github_avatar_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'github_name'
  ) THEN
    ALTER TABLE submissions ADD COLUMN github_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'github_bio'
  ) THEN
    ALTER TABLE submissions ADD COLUMN github_bio text;
  END IF;
END $$;

-- Add admin policies for submissions management
CREATE POLICY "Admin users can read all submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

CREATE POLICY "Admin users can update all submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Set admin status for a specific user (replace with your email)
-- UPDATE users SET is_admin = true WHERE email = 'your-email@example.com';