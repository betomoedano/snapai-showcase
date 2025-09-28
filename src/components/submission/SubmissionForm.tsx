import { ArrowLeft, Sparkles } from 'lucide-react';
import { useSubmissionForm } from './useSubmissionForm';
import { SubmissionFormFields } from './SubmissionFormFields';
import { SubmissionSuccess } from './SubmissionSuccess';

interface SubmissionFormProps {
  onBack: () => void;
}

export function SubmissionForm({ onBack }: SubmissionFormProps) {
  const {
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
  } = useSubmissionForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleSubmitAnother = () => {
    resetForm();
  };

  if (success) {
    return (
      <SubmissionSuccess
        onBack={onBack}
        onSubmitAnother={handleSubmitAnother}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="container max-w-3xl mx-auto py-12">
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="apple-button-secondary interactive flex items-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showcase
          </button>
        </div>

        {/* Main Form Card */}
        <div className="glass-card p-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="apple-title text-2xl">Submit Your Creation</h1>
                <p className="apple-caption -mt-1">Share your AI-generated icon</p>
              </div>
            </div>
            <p className="apple-body">
              Share your AI-generated icon with the community. All submissions are reviewed before being displayed.
            </p>
          </div>

          <div className="space-y-8">
            <SubmissionFormFields
              formData={formData}
              selectedFile={selectedFile}
              loading={loading}
              error={error}
              githubProfile={githubProfile}
              githubLoading={githubLoading}
              onInputChange={handleInputChange}
              onFileSelect={handleFileSelect}
              onSubmit={handleSubmit}
            />

            <div className="text-center pt-6 border-t border-gray-700">
              <p className="apple-caption">
                Your submission will be reviewed and published within 24 hours.
                <br />
                Only high-quality, appropriate icons will be featured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}