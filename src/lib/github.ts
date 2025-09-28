export interface GitHubProfile {
  username: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export function extractGitHubUsername(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== 'github.com') {
      return null;
    }

    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length === 0) {
      return null;
    }

    return pathParts[0];
  } catch {
    return null;
  }
}

export async function fetchGitHubProfile(githubUrl: string): Promise<GitHubProfile | null> {
  const username = extractGitHubUsername(githubUrl);
  if (!username) {
    return null;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SnapAI-Showcase'
      }
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      username: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export function getGitHubAvatarUrl(username: string, size: number = 200): string {
  return `https://github.com/${username}.png?size=${size}`;
}