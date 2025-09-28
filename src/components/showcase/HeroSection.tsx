import { Sparkles, Github, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeroSectionProps {
  onSubmitClick: () => void;
  onAuthClick: () => void;
}

export function HeroSection({ onSubmitClick, onAuthClick }: HeroSectionProps) {
  const { user } = useAuth();

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">AI-Powered Icon Generation</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-br from-white via-sky-200 to-indigo-400 bg-clip-text text-transparent">
            Beautiful Icons <br /> Made with AI
          </span>
         {/*  <br />
          <span className="text-white">Made with AI</span> */}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl/7 text-gray-400 mb-8 max-w-3xl mx-auto font-light tracking-tigher">
          Discover stunning icons created with SnapAI. Get inspired by our community's
          masterpieces and share your own AI-generated creations.
        </p>

        {/* Branding */}
        <div className="mb-12">
          <p className="text-gray-500 text-sm mb-2">Powered by  <a
            href="http://bolt.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bolt ⚡︎
            </span>
          </a></p>
         
          {/* <a
            href="https://codewithbeto.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Code with Beto
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500 text-sm mt-1">Learn to build amazing apps • Check out our courses and resources</p> */}
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {user ? (
            <button
              onClick={onSubmitClick}
              className="apple-button text-lg px-12 py-5 interactive group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Submit Your Creation
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={onAuthClick}
              className="apple-button text-lg px-12 py-5 interactive group"
            >
              Join the Community
              <ArrowRight className="w-5 h-5 mr-2" />
            </button>
          )}

          <a
            href="https://github.com/betomoedano/snapai"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button-secondary text-lg px-12 py-5 interactive group flex items-center"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats or additional info */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">AI-Powered</div>
            <div className="text-sm text-gray-400">Advanced generation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">Community</div>
            <div className="text-sm text-gray-400">Driven platform</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">Open Source</div>
            <div className="text-sm text-gray-400">Free to contribute</div>
          </div>
        </div>
      </div>
    </section>
  );
}