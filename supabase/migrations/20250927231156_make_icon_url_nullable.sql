/*
  # Make icon_url nullable for file upload transition

  Since we're moving from URL-based icons to file storage,
  we need to make icon_url nullable so new submissions can
  use icon_path instead.

  Changes:
  1. Remove NOT NULL constraint from icon_url
  2. Update the check constraint to allow either icon_url OR icon_path
*/

-- Remove the existing check constraint
ALTER TABLE submissions DROP CONSTRAINT IF EXISTS check_icon_source;

-- Make icon_url nullable
ALTER TABLE submissions ALTER COLUMN icon_url DROP NOT NULL;

-- Add new check constraint that requires either icon_url or icon_path
ALTER TABLE submissions ADD CONSTRAINT check_icon_source_flexible CHECK (
  icon_url IS NOT NULL OR icon_path IS NOT NULL
);