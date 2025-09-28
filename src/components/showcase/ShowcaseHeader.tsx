import { useState } from 'react';
import { Sparkles, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { showToast } from '@/lib/toast';

interface ShowcaseHeaderProps {
  onSubmitClick: () => void;
  onAuthClick: () => void;
  onAdminClick?: () => void;
}

export function ShowcaseHeader({ onSubmitClick, onAuthClick, onAdminClick }: ShowcaseHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    const toastId = showToast.loading('Signing out...');
    try {
      await signOut();
      setShowUserMenu(false);
      showToast.dismiss(toastId);
      showToast.success('Signed out successfully');
    } catch (error) {
      showToast.dismiss(toastId);
      showToast.error('Failed to sign out');
    }
  };

  const isAdmin = userProfile?.is_admin === true;

  return (
    <header className="header-blur sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="apple-title text-2xl">SnapAI</h1>
              <div className="flex items-center gap-2 -mt-1">
                <p className="apple-caption">Community Showcase</p>
                <span className="apple-caption text-gray-500">•</span>
                <a
                  href="https://codewithbeto.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-caption text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Code with Beto
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={onSubmitClick}
                  className="apple-button interactive"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Icon
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-all duration-200 interactive"
                  >
                    <User className="w-5 h-5 text-gray-300" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 glass-card fade-in">
                      <div className="p-4 border-b border-gray-700">
                        <p className="text-sm font-medium text-white truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {isAdmin ? 'Administrator' : 'Member'}
                        </p>
                      </div>

                      <div className="p-2 space-y-1">
                        {isAdmin && onAdminClick && (
                          <button
                            onClick={() => {
                              onAdminClick();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                          >
                            <Settings className="w-4 h-4" />
                            Admin Dashboard
                          </button>
                        )}

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors duration-200 text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="apple-button-secondary interactive px-3 py-1 rounded"
              >
                Sign In to Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}