import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

interface SubmissionSuccessProps {
  onBack: () => void;
  onSubmitAnother: () => void;
}

export function SubmissionSuccess({ onBack, onSubmitAnother }: SubmissionSuccessProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="glass-card max-w-lg w-full p-10">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h2 className="apple-title text-3xl mb-6">Submission Received!</h2>
          <p className="apple-body mb-8 leading-relaxed">
            Thank you for sharing your creation! Your icon submission has been received and will be reviewed before appearing in the showcase.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={onBack}
              className="apple-button w-full text-lg py-4 interactive group"
            >
              Back to Showcase
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onSubmitAnother}
              className="apple-button-secondary w-full text-lg py-4 interactive flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Submit Another Icon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}