import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles, Calendar, User, Terminal, Copy } from 'lucide-react';
import { Submission, getSubmissionIconUrl } from '@/lib/supabase';

interface IconDetailModalProps {
  icon: Submission | null;
  onClose: () => void;
}

export function IconDetailModal({ icon, onClose }: IconDetailModalProps) {
  if (!icon) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyCommand = async () => {
    if (icon.command) {
      try {
        await navigator.clipboard.writeText(icon.command);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy command:', err);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              {icon.featured && (
                <>
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Featured</span>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </div>

          <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden max-w-sm mx-auto">
            <img
              src={getSubmissionIconUrl(icon)}
              alt={icon.description || 'Generated icon'}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-4">
            {icon.command && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  SnapAI Command
                </h4>
                <div className="bg-muted p-3 rounded-lg relative">
                  <code className="text-sm font-mono text-muted-foreground break-all">
                    {icon.command}
                  </code>
                  <Button
                    onClick={copyCommand}
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 px-2"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Prompt</h4>
              <p className="text-muted-foreground bg-muted p-3 rounded-lg">{icon.prompt}</p>
            </div>

            {icon.description && (
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{icon.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="flex-1">
                <a href={icon.github_profile} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Profile
                </a>
              </Button>

              {icon.website_url && (
                <Button asChild variant="outline" className="flex-1">
                  <a href={icon.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t">
              {/* Creator Info */}
              <div className="flex items-center gap-3">
                {icon.github_avatar_url ? (
                  <img
                    src={icon.github_avatar_url}
                    alt={`${icon.github_username || 'User'}'s avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{icon.github_name || icon.github_username || 'Anonymous'}</h4>
                  <p className="text-sm text-muted-foreground">@{icon.github_username || icon.github_profile.split('/').pop()}</p>
                  {icon.github_bio && (
                    <p className="text-sm text-muted-foreground mt-1">{icon.github_bio}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(icon.created_at)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}