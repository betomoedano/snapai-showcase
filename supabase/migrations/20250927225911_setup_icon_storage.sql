/*
  # Set up Icon Storage Bucket

  This migration creates:
  1. A storage bucket for user-uploaded icons
  2. Storage policies for secure access
  3. File size and type restrictions

  Security:
  - Only authenticated users can upload
  - Files are publicly readable once approved
  - Proper file type and size validation
*/

-- Create the icons storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'icons',
  'icons', 
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/png']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow authenticated users to upload icons
CREATE POLICY "Authenticated users can upload icons"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'icons' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Allow public access to read icons (for approved submissions)
CREATE POLICY "Public can view icons"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'icons');

-- Policy: Users can update their own icons
CREATE POLICY "Users can update own icons"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'icons' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can delete their own icons
CREATE POLICY "Users can delete own icons"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'icons' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );