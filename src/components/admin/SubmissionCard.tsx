import { useState } from 'react';
import { Check, X, Eye, Calendar, Github, Terminal, Copy, Sparkles } from 'lucide-react';
import { Submission, getSubmissionIconUrl } from '@/lib/supabase';
import { createPlaceholderSVG } from '@/lib/placeholders';
import { showToast } from '@/lib/toast';

interface SubmissionCardProps {
  submission: Submission;
  actionLoading: string | null;
  onApproval: (id: string, approved: boolean) => void;
  onRejection?: (id: string) => void;
  onViewDetails: (submission: Submission) => void;
  onFeature?: (id: string, featured: boolean) => void;
}

export function SubmissionCard({
  submission,
  actionLoading,
  onApproval,
  onRejection,
  onViewDetails,
  onFeature
}: SubmissionCardProps) {
  const [copyState, setCopyState] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPending = !submission.approved;

  const copyCommand = async () => {
    if (!submission.command) return;

    try {
      await navigator.clipboard.writeText(submission.command);
      setCopyState(true);
      showToast.success('Command copied!', submission.command);

      setTimeout(() => setCopyState(false), 2000);
    } catch (err) {
      showToast.error('Failed to copy command');
    }
  };

  return (
    <div className={`glass-card p-6 transition-all duration-300 ${
      isPending ? 'border-orange-500/30 bg-orange-500/5' : 'border-green-500/30 bg-green-500/5'
    }`}>
      <div className="flex gap-6">
        <div className="w-28 h-28 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
          <img
            src={getSubmissionIconUrl(submission)}
            alt="Submitted icon"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = createPlaceholderSVG(112, 112, 'Icon');
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="apple-subtitle text-lg">
                {(submission as any).users?.email || 'Anonymous'}
              </h3>
              {(submission as any).users?.github_name && (
                <p className="apple-caption mt-1">
                  {(submission as any).users?.github_name}
                </p>
              )}
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
              isPending
                ? 'status-pending'
                : submission.featured
                  ? 'status-featured'
                  : 'status-approved'
            }`}>
              {isPending ? 'Pending' : submission.featured ? 'Featured' : 'Approved'}
            </div>
          </div>

          <p className="apple-body mb-4 line-clamp-2">{submission.prompt}</p>

          {submission.command && (
            <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="apple-caption font-medium">Command</span>
                </div>
                <button
                  onClick={copyCommand}
                  className={`copy-icon transition-all duration-300 p-2 rounded-lg hover:bg-gray-700 ${
                    copyState ? 'copying text-green-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {copyState ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <code className="text-sm font-mono text-gray-300 line-clamp-2">
                {submission.command}
              </code>
            </div>
          )}

          {submission.description && (
            <p className="apple-body text-sm mb-4">{submission.description}</p>
          )}

          <div className="flex items-center gap-6 apple-caption mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formatDate(submission.created_at)}
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-gray-400" />
              {submission.github_profile.split('/').pop()}
            </div>
          </div>

          <div className="flex gap-3">
            {isPending ? (
              <>
                <button
                  onClick={() => onApproval(submission.id, true)}
                  disabled={actionLoading === submission.id}
                  className="apple-button-success text-sm px-4 py-2 interactive"
                >
                  {actionLoading === submission.id ? (
                    <div className="loading-spinner w-4 h-4 mr-2"></div>
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </button>
                <button
                  onClick={() => onRejection && onRejection(submission.id)}
                  disabled={actionLoading === submission.id}
                  className="apple-button-danger text-sm px-4 py-2 interactive"
                >
                  {actionLoading === submission.id ? (
                    <div className="loading-spinner w-4 h-4 mr-2"></div>
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </button>
              </>
            ) : (
              onFeature && (
                <button
                  onClick={() => onFeature(submission.id, !submission.featured)}
                  disabled={actionLoading === submission.id}
                  className="apple-button-secondary text-sm px-4 py-2 interactive flex items-center gap-2"
                >
                  {actionLoading === submission.id ? (
                    <div className="loading-spinner w-4 h-4"></div>
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {submission.featured ? 'Unfeature' : 'Feature'}
                </button>
              )
            )}
            <button
              onClick={() => onViewDetails(submission)}
              className="apple-button-secondary text-sm px-4 py-2 interactive"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}