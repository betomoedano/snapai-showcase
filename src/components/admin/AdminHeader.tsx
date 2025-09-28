import { ArrowLeft, Settings, Clock } from 'lucide-react';

interface AdminHeaderProps {
  onBack: () => void;
  pendingCount: number;
}

export function AdminHeader({ onBack, pendingCount }: AdminHeaderProps) {
  return (
    <header className="header-blur sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back button */}
          <button
            onClick={onBack}
            className="apple-button-secondary interactive flex items-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showcase
          </button>

          {/* Center - Title with icon */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="apple-title text-xl">Admin Dashboard</h1>
              <p className="apple-caption -mt-1">Content Management</p>
            </div>
          </div>

          {/* Right side - Pending count badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="apple-caption text-orange-400 font-medium">
              {pendingCount} pending approval
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}