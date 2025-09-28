import { useState } from 'react';
import { Github, Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { Submission, getSubmissionIconUrl } from '@/lib/supabase';
import { createPlaceholderSVG } from '@/lib/placeholders';
import { showToast } from '@/lib/toast';

interface IconCardProps {
  icon: Submission;
  featured?: boolean;
  onClick: () => void;
}

export function IconCard({ icon, featured = false, onClick }: IconCardProps) {
  const [copyStates, setCopyStates] = useState<{[key: string]: boolean}>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyCommand = async (e: React.MouseEvent, command: string) => {
    e.stopPropagation();
    if (!command) return;

    try {
      await navigator.clipboard.writeText(command);
      setCopyStates(prev => ({ ...prev, [icon.id]: true }));
      showToast.success('Command copied!', `${command}`);

      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [icon.id]: false }));
      }, 2000);
    } catch (error) {
      showToast.error('Failed to copy command');
    }
  };

  const userName = (icon as any).users?.github_name ||
                  (icon as any).users?.github_username ||
                  (icon as any).users?.email?.split('@')[0] ||
                  'Anonymous';

  return (
    <div
      className={`glass-card cursor-pointer group transition-all duration-300 hover:scale-[1.02] h-full flex flex-col ${
        featured ? 'ring-2 ring-purple-500/30 shadow-purple-500/20' : ''
      }`}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Icon Display */}
        <div className="aspect-square bg-gray-900 rounded-2xl mb-5 flex items-center justify-center overflow-hidden relative group shadow-lg">
          <img
            src={getSubmissionIconUrl(icon)}
            alt={icon.description || 'Generated icon'}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = createPlaceholderSVG(128, 128, 'Icon');
            }}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>

        {/* Featured Label */}
        {featured && (
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg">
              <span className="text-xs font-medium text-purple-400">Featured</span>
            </div>
          </div>
        )}

        {/* Command Section - Fixed Height */}
        <div className="mb-4 h-16 flex items-center">
          {icon.command ? (
            <div className="w-full p-3 bg-gray-900 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400">Command</span>
                </div>
                <button
                  onClick={(e) => copyCommand(e, icon.command!)}
                  className={`copy-icon transition-all duration-300 p-1.5 rounded-lg hover:bg-gray-700 ${
                    copyStates[icon.id] ? 'copying text-green-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {copyStates[icon.id] ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <code className="text-xs text-gray-300 font-mono line-clamp-1">
                {icon.command}
              </code>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <span className="text-xs text-gray-600">No command provided</span>
            </div>
          )}
        </div>

        {/* Prompt - Fixed Height */}
        <div className="mb-5 flex-1">
          <p className="apple-body text-sm line-clamp-3 leading-relaxed">
            {icon.prompt}
          </p>
        </div>

        {/* Footer - Always at bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800/50">
          <div className="flex items-center gap-2">
            {(icon as any).users?.github_avatar_url ? (
              <img
                src={(icon as any).users.github_avatar_url}
                alt={`${userName}'s avatar`}
                className="w-6 h-6 rounded-full border border-gray-700 shadow-sm"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                <Github className="w-3 h-3 text-gray-400" />
              </div>
            )}
            <span className="text-xs text-gray-400 font-medium">
              {userName}
            </span>
          </div>
          <span className="apple-caption text-xs">
            {formatDate(icon.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}