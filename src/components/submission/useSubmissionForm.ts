import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { fetchGitHubProfile, extractGitHubUsername, GitHubProfile } from '@/lib/github';
import { uploadIcon } from '@/lib/storage';

export interface SubmissionFormData {
  command: string;
  prompt: string;
  github_profile: string;
  website_url: string;
  description: string;
}

export interface SubmissionFormState {
  formData: SubmissionFormData;
  selectedFile: File | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  githubProfile: GitHubProfile | null;
  githubLoading: boolean;
}

export function useSubmissionForm() {
  const [formData, setFormData] = useState<SubmissionFormData>({
    command: '',
    prompt: '',
    github_profile: '',
    website_url: '',
    description: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);

  const { user } = useAuth();

  const validateGitHubUrl = (url: string) => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_]+\/?$/;
    return githubRegex.test(url);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (error) setError(null);
  };

  const fetchGitHubData = async (githubUrl: string) => {
    if (!validateGitHubUrl(githubUrl)) {
      setGithubProfile(null);
      return;
    }

    setGithubLoading(true);
    try {
      const profile = await fetchGitHubProfile(githubUrl);
      setGithubProfile(profile);
    } catch (err) {
      console.error('Error fetching GitHub profile:', err);
      setGithubProfile(null);
    } finally {
      setGithubLoading(false);
    }
  };

  const handleInputChange = (field: keyof SubmissionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);

    if (field === 'github_profile' && value) {
      const timeoutId = setTimeout(() => {
        fetchGitHubData(value);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  };

  const validateForm = (): string | null => {
    if (!selectedFile || !formData.command || !formData.prompt || !formData.github_profile) {
      return 'Please fill in all required fields and select an icon file';
    }

    if (!validateGitHubUrl(formData.github_profile)) {
      return 'Please enter a valid GitHub profile URL (e.g., https://github.com/username)';
    }

    if (formData.website_url && !validateUrl(formData.website_url)) {
      return 'Please enter a valid website URL';
    }

    return null;
  };

  const submitForm = async (): Promise<boolean> => {
    if (!user || !selectedFile) return false;

    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return false;
    }

    try {
      // First, upload the icon file
      const uploadResult = await uploadIcon(selectedFile, user.id);
      if (!uploadResult.success) {
        setError(uploadResult.error || 'Failed to upload icon');
        setLoading(false);
        return false;
      }

      // Get GitHub profile data
      let profileData = githubProfile;
      if (!profileData && formData.github_profile) {
        profileData = await fetchGitHubProfile(formData.github_profile);
      }

      // Submit the form with the uploaded file path
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            user_id: user.id,
            icon_path: uploadResult.path,
            command: formData.command,
            prompt: formData.prompt,
            github_profile: formData.github_profile,
            website_url: formData.website_url || null,
            description: formData.description || null,
            github_username: profileData?.username || extractGitHubUsername(formData.github_profile),
            github_avatar_url: profileData?.avatar_url || null,
            github_name: profileData?.name || null,
            github_bio: profileData?.bio || null,
          }
        ]);

      if (error) {
        throw error;
      }

      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit icon');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setFormData({
      command: '',
      prompt: '',
      github_profile: '',
      website_url: '',
      description: ''
    });
    setSelectedFile(null);
    setGithubProfile(null);
    setError(null);
  };

  return {
    formData,
    selectedFile,
    loading,
    error,
    success,
    githubProfile,
    githubLoading,
    handleInputChange,
    handleFileSelect,
    submitForm,
    resetForm
  };
}