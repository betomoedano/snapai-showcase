import { useState, useEffect } from 'react';
import { supabase, Submission } from '@/lib/supabase';

const ITEMS_PER_PAGE = 12;

export function useShowcaseSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSubmissions = async (pageNum: number = 1, reset: boolean = false) => {
    try {
      setLoading(true);

      // Calculate offset for pagination
      const from = (pageNum - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      // First get approved submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('submissions')
        .select('*')
        .eq('approved', true)
        .neq('rejected', true)
        .order('featured', { ascending: false }) // Featured first
        .order('created_at', { ascending: false }) // Then by newest
        .range(from, to);

      if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
        return;
      }

      // Then get users data
      const userIds = submissionsData?.map(s => s.user_id) || [];
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, email, github_username, github_name, github_avatar_url')
        .in('id', userIds);

      if (usersError) {
        console.error('Error fetching users:', usersError);
        return;
      }

      // Join submissions with user data
      const submissionsWithUsers = submissionsData?.map(submission => ({
        ...submission,
        users: users?.find(user => user.id === submission.user_id)
      })) || [];

      if (reset || pageNum === 1) {
        setSubmissions(submissionsWithUsers as any[]);
      } else {
        setSubmissions(prev => [...prev, ...(submissionsWithUsers as any[])]);
      }

      // Check if there are more items
      setHasMore((submissionsData?.length || 0) === ITEMS_PER_PAGE);

    } catch (err) {
      console.error('Error fetching showcase submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(1, true);
  }, []);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSubmissions(nextPage, false);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchSubmissions(1, true);
  };

  const featuredSubmissions = submissions.filter(sub => sub.featured);
  const regularSubmissions = submissions.filter(sub => !sub.featured);

  return {
    submissions,
    featuredSubmissions,
    regularSubmissions,
    loading,
    hasMore,
    loadMore,
    refresh
  };
}