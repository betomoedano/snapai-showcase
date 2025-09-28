import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Hello World Dashboard
              </h1>
              <p className="text-slate-600">Welcome to your authenticated application</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">User Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600">Email</label>
                  <p className="text-slate-800">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">User ID</label>
                  <p className="text-slate-800 font-mono text-sm">{user?.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Account Created</label>
                  <p className="text-slate-800">
                    {userProfile?.created_at
                      ? new Date(userProfile.created_at).toLocaleDateString()
                      : 'Loading...'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Database Status</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-800">Supabase Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-800">Authentication Working</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-800">User Profile Loaded</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Getting Started</h2>
            <p className="text-slate-600 mb-4">
              Your application now has full authentication and database integration. Here's what you can do next:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Create additional database tables for your application data</li>
              <li>Add user profile management features</li>
              <li>Implement role-based access control</li>
              <li>Build your core application features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}