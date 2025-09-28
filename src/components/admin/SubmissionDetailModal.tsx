import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Submission, getSubmissionIconUrl } from '@/lib/supabase';

interface SubmissionDetailModalProps {
  submission: Submission | null;
  onClose: () => void;
}

export function SubmissionDetailModal({ submission, onClose }: SubmissionDetailModalProps) {
  if (!submission) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Submission Details
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={getSubmissionIconUrl(submission)}
                alt="Submission"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {(submission as any).users?.github_name || 'Anonymous'}
              </h3>
              <p className="text-muted-foreground mb-2">
                {(submission as any).users?.email}
              </p>
              <div className="flex gap-2">
                <Badge variant={submission.approved ? "default" : "secondary"}>
                  {submission.approved ? 'Approved' : 'Pending'}
                </Badge>
                {submission.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">AI Prompt</h4>
            <p className="text-muted-foreground bg-muted p-3 rounded-lg">{submission.prompt}</p>
          </div>

          {submission.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{submission.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <a href={submission.github_profile} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub Profile
              </a>
            </Button>
            {submission.website_url && (
              <Button asChild variant="outline">
                <a href={submission.website_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>

          <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
            <span>Submitted: {formatDate(submission.created_at)}</span>
            <span>Updated: {formatDate(submission.updated_at)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}