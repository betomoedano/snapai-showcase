export interface IconShowcase {
  id: string;
  icon_url: string;
  prompt: string;
  github_profile: string;
  website_url?: string;
  description?: string;
  featured: boolean;
  created_at: string;
  github_username?: string;
  github_avatar_url?: string;
  github_name?: string;
  github_bio?: string;
}

export const sampleIcons: IconShowcase[] = [
  {
    id: "1",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/glassy.png",
    prompt: "Create a modern glassy icon with transparency effects and smooth gradients",
    github_profile: "https://github.com/betomoedano",
    website_url: "https://betomoedano.com",
    description: "Beautiful glassy effect icon perfect for modern UI designs",
    featured: true,
    created_at: "2024-01-15T10:30:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "2",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/icon-calculator-neon.png",
    prompt: "Design a neon-style calculator icon with glowing edges and vibrant colors",
    github_profile: "https://github.com/betomoedano",
    description: "Neon calculator icon with electric blue glow effects",
    featured: true,
    created_at: "2024-01-14T15:45:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "3",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/icon-camera-glass.png",
    prompt: "Create a glass-style camera icon with realistic lens reflections",
    github_profile: "https://github.com/betomoedano",
    description: "Professional camera icon with glass morphism design",
    featured: false,
    created_at: "2024-01-13T09:15:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "4",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/icon-lens-retro.png",
    prompt: "Design a retro-style camera lens icon with vintage color scheme",
    github_profile: "https://github.com/betomoedano",
    description: "Vintage camera lens with retro aesthetic and warm tones",
    featured: false,
    created_at: "2024-01-12T14:20:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "5",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/icon-messaging.png",
    prompt: "Create a modern messaging app icon with clean lines and friendly appearance",
    github_profile: "https://github.com/betomoedano",
    description: "Clean messaging icon perfect for chat applications",
    featured: false,
    created_at: "2024-01-11T11:30:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "6",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/icon-sound-wave.png",
    prompt: "Design a dynamic sound wave icon with flowing animation curves",
    github_profile: "https://github.com/betomoedano",
    description: "Dynamic sound wave visualization for audio apps",
    featured: false,
    created_at: "2024-01-10T16:45:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "7",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/minimal.png",
    prompt: "Create a minimalist icon with clean geometry and subtle shadows",
    github_profile: "https://github.com/betomoedano",
    description: "Ultra-minimal design focusing on essential elements",
    featured: false,
    created_at: "2024-01-09T13:15:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  },
  {
    id: "8",
    icon_url: "https://raw.githubusercontent.com/betomoedano/snapai/main/test-icons/pixel.png",
    prompt: "Design a pixel art style icon with retro gaming aesthetic",
    github_profile: "https://github.com/betomoedano",
    description: "Nostalgic pixel art icon reminiscent of classic games",
    featured: false,
    created_at: "2024-01-08T08:30:00Z",
    github_username: "betomoedano",
    github_avatar_url: "https://github.com/betomoedano.png",
    github_name: "Beto Moedano",
    github_bio: "Mobile Developer & AI Enthusiast"
  }
];