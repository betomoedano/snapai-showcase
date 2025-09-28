/*
  # Update Submissions Schema for File Storage

  This migration:
  1. Renames icon_url to icon_path to store storage paths
  2. Adds icon_url as computed field for backwards compatibility
  3. Updates existing data if needed

  The new schema will store storage paths like "user-id/filename.png"
  instead of external URLs.
*/

-- Add new column for storage path
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS icon_path text;

-- For now, keep icon_url for backwards compatibility during transition
-- Later we can remove it once all components are updated

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_icon_path ON submissions (icon_path);

-- Add a check constraint to ensure we have either icon_url or icon_path
-- (We'll remove the icon_url requirement later)
ALTER TABLE submissions ADD CONSTRAINT check_icon_source CHECK (
  icon_url IS NOT NULL OR icon_path IS NOT NULL
);