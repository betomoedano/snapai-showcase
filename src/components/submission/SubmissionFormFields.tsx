import { Github, Globe, Terminal, Sparkles } from 'lucide-react';
import { SubmissionFormData } from './useSubmissionForm';
import { IconUpload } from './IconUpload';
import { GitHubProfilePreview } from './GitHubProfilePreview';
import { GitHubProfile } from '@/lib/github';

interface SubmissionFormFieldsProps {
  formData: SubmissionFormData;
  selectedFile: File | null;
  loading: boolean;
  error: string | null;
  githubProfile: GitHubProfile | null;
  githubLoading: boolean;
  onInputChange: (field: keyof SubmissionFormData, value: string) => void;
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SubmissionFormFields({
  formData,
  selectedFile,
  loading,
  error,
  githubProfile,
  githubLoading,
  onInputChange,
  onFileSelect,
  onSubmit
}: SubmissionFormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Icon Upload */}
      <IconUpload
        onFileSelect={onFileSelect}
        disabled={loading}
        error={selectedFile ? null : error} // Use selectedFile to avoid TS warning
      />

      {/* Command */}
      <div className="space-y-4">
        <label htmlFor="command" className="flex items-center gap-2 apple-subtitle text-base">
          <Terminal className="w-5 h-5 text-blue-400" />
          SnapAI Command *
        </label>
        <input
          id="command"
          placeholder="snapai --style modern --color blue --format jpg"
          value={formData.command || ''}
          onChange={(e) => onInputChange('command', e.target.value)}
          required
          className="apple-input font-mono text-sm"
        />
        <p className="apple-caption">
          The exact SnapAI command you used (including all flags and options)
        </p>
      </div>

      {/* Prompt */}
      <div className="space-y-4">
        <label htmlFor="prompt" className="apple-subtitle text-base">AI Prompt *</label>
        <textarea
          id="prompt"
          placeholder="Describe the prompt you used to generate this icon..."
          value={formData.prompt}
          onChange={(e) => onInputChange('prompt', e.target.value)}
          rows={4}
          required
          className="apple-input resize-none"
        />
        <p className="apple-caption">
          Share the prompt that created this amazing icon
        </p>
      </div>

      {/* GitHub Profile */}
      <div className="space-y-4">
        <label htmlFor="github_profile" className="flex items-center gap-2 apple-subtitle text-base">
          <Github className="w-5 h-5 text-blue-400" />
          GitHub Profile *
        </label>
        <div className="relative">
          <input
            id="github_profile"
            type="url"
            placeholder="https://github.com/yourusername"
            value={formData.github_profile}
            onChange={(e) => onInputChange('github_profile', e.target.value)}
            required
            className="apple-input"
          />
          {githubLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="loading-spinner w-4 h-4"></div>
            </div>
          )}
        </div>
        <p className="apple-caption">
          Your GitHub profile so others can follow your work
        </p>
      </div>

      {githubProfile && <GitHubProfilePreview profile={githubProfile} />}

      {/* Website URL */}
      <div className="space-y-4">
        <label htmlFor="website_url" className="flex items-center gap-2 apple-subtitle text-base">
          <Globe className="w-5 h-5 text-gray-400" />
          Website/App URL
        </label>
        <input
          id="website_url"
          type="url"
          placeholder="https://yourwebsite.com or app store link"
          value={formData.website_url}
          onChange={(e) => onInputChange('website_url', e.target.value)}
          className="apple-input"
        />
        <p className="apple-caption">
          Optional: Link to your website, portfolio, or published app
        </p>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <label htmlFor="description" className="apple-subtitle text-base">Description</label>
        <textarea
          id="description"
          placeholder="Tell us more about your icon creation process..."
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          rows={4}
          className="apple-input resize-none"
        />
        <p className="apple-caption">
          Optional: Additional details about your icon or creation process
        </p>
      </div>

      {error && (
        <div className="glass-card bg-red-500/10 border-red-500/30 p-4">
          <p className="text-red-400 apple-body text-sm">{error}</p>
        </div>
      )}

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="apple-button w-full text-lg py-4 interactive"
        >
          {loading ? (
            <>
              <div className="loading-spinner w-5 h-5 mr-3"></div>
              Submitting...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Submit Icon
            </>
          )}
        </button>
      </div>
    </form>
  );
}