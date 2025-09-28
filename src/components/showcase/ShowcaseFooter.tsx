import { Github, ExternalLink, BookOpen, Users, Heart } from 'lucide-react';

export function ShowcaseFooter() {
  return (
    <footer className="border-t border-gray-800/50 bg-black/50 backdrop-blur-sm py-16 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h3 className="apple-title text-xl mb-2">SnapAI Showcase</h3>
              <p className="apple-caption">
                Showcase your AI-generated icons and inspire others in the community
              </p>
            </div>
            <a
              href="https://github.com/betomoedano/snapai"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-secondary inline-flex items-center gap-2 interactive px-3 py-1 rounded"
            >
              <Github className="w-4 h-4" />
              View Source
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Learn Section */}
          <div className="text-center md:text-left">
            <h4 className="apple-subtitle text-lg mb-4 text-blue-400">Learn & Grow</h4>
            <div className="space-y-3">
              <a
                href="https://codewithbeto.dev/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 apple-caption hover:text-blue-400 transition-colors group"
              >
                <BookOpen className="w-4 h-4 group-hover:text-blue-400" />
                Developer Courses
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://codewithbeto.dev/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 apple-caption hover:text-blue-400 transition-colors group"
              >
                <Users className="w-4 h-4 group-hover:text-blue-400" />
                Developer Resources
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Creator Section */}
          <div className="text-center md:text-left">
            <h4 className="apple-subtitle text-lg mb-4">Created by</h4>
            <a
              href="https://codewithbeto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mb-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-lg">B</span>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
                  Code with Beto
                </div>
                <div className="apple-caption -mt-1">Software Engineer & Educator</div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <p className="apple-caption leading-relaxed">
              Learn modern mobile/web development through practical projects and expert guidance.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 apple-caption">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>by</span>
            <a
              href="https://codewithbeto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Code with Beto
            </a>
          </div>

          <div className="flex items-center gap-6 apple-caption">
            <span>© {new Date().getFullYear()} SnapAI Showcase</span>
            <span>•</span>
            <a
              href="https://codewithbeto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              codewithbeto.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}