/*
  # Create Icon Submissions Table

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `user_id` (uuid, foreign key) - Reference to the user who submitted the icon
      - `icon_url` (text) - URL to download/view the icon
      - `prompt` (text) - The prompt used to generate the icon
      - `github_profile` (text) - User's GitHub profile URL
      - `website_url` (text, optional) - User's personal website or app URL
      - `description` (text, optional) - Additional description of the icon
      - `featured` (boolean) - Whether this submission should be featured
      - `approved` (boolean) - Whether the submission has been approved for display
      - `created_at` (timestamp) - When the submission was created
      - `updated_at` (timestamp) - When the submission was last updated

  2. Security
    - Enable RLS on `submissions` table
    - Add policy for authenticated users to create submissions
    - Add policy for authenticated users to read their own submissions
    - Add policy for everyone to read approved submissions
    - Add policy for authenticated users to update their own submissions

  3. Important Notes
    - Submissions require approval before being displayed publicly
    - Featured submissions can be highlighted in the showcase
    - All submissions are linked to authenticated users
*/

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  icon_url text NOT NULL,
  prompt text NOT NULL,
  github_profile text NOT NULL,
  website_url text,
  description text,
  featured boolean DEFAULT false,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create submissions"
  ON submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can read approved submissions"
  ON submissions
  FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Users can update own submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger to automatically update updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_submissions_updated_at'
  ) THEN
    CREATE TRIGGER update_submissions_updated_at
      BEFORE UPDATE ON submissions
      FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
  END IF;
END $$;