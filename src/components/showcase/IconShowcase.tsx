import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Submission } from '@/lib/supabase';
import { ShowcaseHeader } from './ShowcaseHeader';
import { HeroSection } from './HeroSection';
import { IconCard } from './IconCard';
import { IconDetailModal } from './IconDetailModal';
import { ShowcaseFooter } from './ShowcaseFooter';
import { useShowcaseSubmissions } from './useShowcaseSubmissions';

interface IconShowcaseProps {
  onSubmitClick: () => void;
  onAuthClick: () => void;
  onAdminClick?: () => void;
}

export function IconShowcase({ onSubmitClick, onAuthClick, onAdminClick }: IconShowcaseProps) {
  const [selectedIcon, setSelectedIcon] = useState<Submission | null>(null);
  const { featuredSubmissions, regularSubmissions, loading, hasMore, loadMore } = useShowcaseSubmissions();

  return (
    <div className="min-h-screen bg-background">
      <ShowcaseHeader
        onSubmitClick={onSubmitClick}
        onAuthClick={onAuthClick}
        onAdminClick={onAdminClick}
      />

      <HeroSection
        onSubmitClick={onSubmitClick}
        onAuthClick={onAuthClick}
      />

      {/* Featured Icons */}
      {featuredSubmissions.length > 0 && (
        <section className="py-24 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Featured Creations</span>
              </div>
              <h2 className="apple-title text-4xl mb-4">Showcase Excellence</h2>
              <p className="apple-body text-lg max-w-2xl mx-auto">
                Discover the most inspiring AI-generated icons from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
              {featuredSubmissions.map((icon, index) => (
                <div
                  key={icon.id}
                  className="fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconCard
                    icon={icon}
                    featured={true}
                    onClick={() => setSelectedIcon(icon)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community Gallery */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Community Creations</span>
            </div>
            <h2 className="apple-title text-4xl mb-6">Gallery of Innovation</h2>
            <p className="apple-body text-lg max-w-3xl mx-auto leading-relaxed">
              Discover the incredible diversity of AI-generated icons created by our talented community of developers and designers.
            </p>
          </div>

          {loading && regularSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="loading-spinner mb-4" />
              <p className="apple-body">Loading amazing creations...</p>
            </div>
          ) : regularSubmissions.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="apple-subtitle mb-4">No submissions yet</h3>
              <p className="apple-body mb-8 max-w-md mx-auto">
                Be the first to share your AI-generated icon with the community!
              </p>
              <button onClick={onSubmitClick} className="apple-button">
                <Sparkles className="w-4 h-4" />
                Submit Your Icon
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {regularSubmissions.map((icon, index) => (
                  <div
                    key={icon.id}
                    className="fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <IconCard
                      icon={icon}
                      onClick={() => setSelectedIcon(icon)}
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="apple-button-secondary interactive px-8 py-4 text-lg"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner mr-3" />
                        Loading more amazing creations...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Discover More Icons
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ShowcaseFooter />

      <IconDetailModal
        icon={selectedIcon}
        onClose={() => setSelectedIcon(null)}
      />
    </div>
  );
}