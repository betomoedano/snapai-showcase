/*
  # Add Rejection and Command Fields to Submissions

  This migration adds:
  1. `rejected` flag to soft-delete rejected submissions
  2. `command` field to store the full SnapAI command with flags
  3. Index for better query performance on approved/rejected submissions

  These fields will enable:
  - Rejecting submissions without losing data
  - Displaying the exact command users used
  - Better filtering of submissions for display
*/

-- Add rejected flag and command field to submissions
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS rejected boolean DEFAULT false;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS command text;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions (approved, rejected, featured);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at DESC);