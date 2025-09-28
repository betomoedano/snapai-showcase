import { Label } from '@/components/ui/label';
import { GitHubProfile } from '@/lib/github';

interface GitHubProfilePreviewProps {
  profile: GitHubProfile;
}

export function GitHubProfilePreview({ profile }: GitHubProfilePreviewProps) {
  return (
    <div className="space-y-2">
      <Label>GitHub Profile Preview</Label>
      <div className="bg-muted p-4 rounded-lg border">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar_url}
            alt={`${profile.username}'s avatar`}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{profile.name || profile.username}</h4>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
            {profile.bio && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{profile.bio}</p>
            )}
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>{profile.public_repos} repos</div>
            <div>{profile.followers} followers</div>
          </div>
        </div>
      </div>
    </div>
  );
}