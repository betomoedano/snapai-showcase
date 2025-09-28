import { useState, useEffect } from 'react';
import { supabase, Submission } from '@/lib/supabase';

export function useAdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      // First get all non-rejected submissions
      const { data: submissions, error: submissionsError } = await supabase
        .from('submissions')
        .select('*')
        .neq('rejected', true)
        .order('created_at', { ascending: false });

      if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
        return;
      }

      // Then get all users to join manually
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, email, github_username, github_name, is_admin');

      if (usersError) {
        console.error('Error fetching users:', usersError);
        return;
      }

      // Manually join the data
      const submissionsWithUsers = submissions?.map(submission => ({
        ...submission,
        users: users?.find(user => user.id === submission.user_id)
      })) || [];

      // Debug: console.log('Fetched submissions with users:', submissionsWithUsers);
      setSubmissions(submissionsWithUsers as any[]);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (submissionId: string, approved: boolean) => {
    setActionLoading(submissionId);
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ approved })
        .eq('id', submissionId);

      if (error) {
        console.error('Error updating submission:', error);
        return;
      }

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === submissionId ? { ...sub, approved } : sub
        )
      );
    } catch (err) {
      console.error('Error updating submission:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleFeature = async (submissionId: string, featured: boolean) => {
    setActionLoading(submissionId);
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ featured })
        .eq('id', submissionId);

      if (error) {
        console.error('Error updating submission:', error);
        return;
      }

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === submissionId ? { ...sub, featured } : sub
        )
      );
    } catch (err) {
      console.error('Error updating submission:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejection = async (submissionId: string) => {
    setActionLoading(submissionId);
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ rejected: true })
        .eq('id', submissionId);

      if (error) {
        console.error('Error rejecting submission:', error);
        return;
      }

      // Remove from local state
      setSubmissions(prev =>
        prev.filter(sub => sub.id !== submissionId)
      );
    } catch (err) {
      console.error('Error rejecting submission:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const pendingSubmissions = submissions.filter(sub => !sub.approved && !sub.rejected);
  const approvedSubmissions = submissions.filter(sub => sub.approved && !sub.rejected);

  return {
    submissions,
    loading,
    actionLoading,
    pendingSubmissions,
    approvedSubmissions,
    handleApproval,
    handleFeature,
    handleRejection
  };
}