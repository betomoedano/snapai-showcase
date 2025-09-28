/*
  # Update icons bucket to support multiple image formats

  1. Changes
    - Update the 'icons' storage bucket to allow multiple image MIME types
    - Add support for: PNG, JPEG, JPG, WebP, and SVG formats
    - Maintain existing file size limit and public access settings

  2. Supported Formats
    - image/png (existing)
    - image/jpeg (new)
    - image/jpg (new - for compatibility)  
    - image/webp (new)
    - image/svg+xml (new)

  3. Security
    - File size limit remains at 5MB
    - Public read access maintained for community showcase
    - RLS policies remain unchanged
*/

UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'image/png',
  'image/jpeg', 
  'image/jpg',
  'image/webp',
  'image/svg+xml'
]
WHERE name = 'icons';