import { SKILL_BADGES } from "./skills";

export interface GithubProfileData {
  name: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  github: string;
  workingOnName: string;
  workingOnUrl: string;
  detectedSkills: string[];
  avatarUrl: string;
  publicRepos: number;
  followers: number;
}

export async function fetchGithubProfile(username: string): Promise<GithubProfileData | null> {
  const cleanUsername = username.trim().replace(/^@/, '');
  if (!cleanUsername) return null;

  try {
    // 1. Fetch User Data
    const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`);
    if (!userRes.ok) {
      throw new Error(`GitHub user ${cleanUsername} not found`);
    }
    const userData = await userRes.json();

    // 2. Fetch User Repositories to detect top projects and languages
    let workingOnName = '';
    let workingOnUrl = '';
    const detectedSkillsSet = new Set<string>();

    try {
      const reposRes = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData) && reposData.length > 0) {
          const topRepo = reposData[0];
          workingOnName = topRepo.name || '';
          workingOnUrl = topRepo.html_url || '';

          // Auto-detect languages from repos
          reposData.forEach((repo: any) => {
            if (repo.language) {
              const langLower = repo.language.toLowerCase();
              const matchedBadge = SKILL_BADGES.find(
                (b) => b.id === langLower || b.name.toLowerCase() === langLower
              );
              if (matchedBadge) {
                detectedSkillsSet.add(matchedBadge.id);
              }
            }
          });
        }
      }
    } catch (e) {
      console.warn("Repos fetch non-critical error", e);
    }

    // Default fallback skills if none detected
    if (detectedSkillsSet.size === 0) {
      ['typescript', 'react', 'nodejs', 'git'].forEach(s => detectedSkillsSet.add(s));
    }

    return {
      name: userData.name || userData.login || cleanUsername,
      bio: userData.bio || `Developer building open-source projects on GitHub.`,
      location: userData.location || '',
      website: userData.blog || '',
      twitter: userData.twitter_username || '',
      github: userData.login || cleanUsername,
      workingOnName: workingOnName || 'ProfileForge',
      workingOnUrl: workingOnUrl || `https://github.com/${cleanUsername}`,
      detectedSkills: Array.from(detectedSkillsSet),
      avatarUrl: userData.avatar_url || '',
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return null;
  }
}
