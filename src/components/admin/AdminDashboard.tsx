import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldX, ArrowRight } from 'lucide-react';
import { Submission } from '@/lib/supabase';
import { useAdminSubmissions } from './useAdminSubmissions';
import { AdminHeader } from './AdminHeader';
import { SubmissionCard } from './SubmissionCard';
import { SubmissionDetailModal } from './SubmissionDetailModal';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const { user, userProfile } = useAuth();

  const {
    loading,
    actionLoading,
    pendingSubmissions,
    approvedSubmissions,
    handleApproval,
    handleFeature,
    handleRejection
  } = useAdminSubmissions();

  // Security check - only allow admins
  if (!user || !userProfile?.is_admin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="glass-card max-w-lg w-full p-10 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="apple-title text-2xl mb-4 text-red-400">Access Denied</h2>
          <p className="apple-body mb-8">
            You don't have permission to access this page.
          </p>
          <button
            onClick={onBack}
            className="apple-button-secondary interactive group"
          >
            Return to Showcase
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto"></div>
          <p className="mt-6 apple-body">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader onBack={onBack} pendingCount={pendingSubmissions.length} />

      <div className="container max-w-6xl mx-auto py-12 px-6 space-y-12">
        {/* Pending Submissions */}
        <section>
          <h2 className="apple-title text-2xl mb-8">Pending Submissions ({pendingSubmissions.length})</h2>
          {pendingSubmissions.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="apple-body">No pending submissions</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {pendingSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  actionLoading={actionLoading}
                  onApproval={handleApproval}
                  onRejection={handleRejection}
                  onViewDetails={setSelectedSubmission}
                />
              ))}
            </div>
          )}
        </section>

        {/* Approved Submissions */}
        <section>
          <h2 className="apple-title text-2xl mb-8">Approved Submissions ({approvedSubmissions.length})</h2>
          {approvedSubmissions.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="apple-body">No approved submissions yet</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {approvedSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  actionLoading={actionLoading}
                  onApproval={handleApproval}
                  onViewDetails={setSelectedSubmission}
                  onFeature={handleFeature}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <SubmissionDetailModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}