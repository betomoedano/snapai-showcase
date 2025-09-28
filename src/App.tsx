import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { IconShowcase } from './components/showcase/IconShowcase';
import { SubmissionForm } from './components/submission/SubmissionForm';
import { AdminDashboard } from './components/admin/AdminDashboard';
// import { ToastProvider } from './components/ui/toast-provider';

type ViewMode = 'showcase' | 'auth' | 'submit' | 'admin';

function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAuthSuccess = () => {
    setViewMode('showcase');
  };

  if (viewMode === 'auth') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <AuthForm
          mode={authMode}
          onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
          onBack={() => setViewMode('showcase')}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  if (viewMode === 'submit' && user) {
    return (
      <SubmissionForm
        onBack={() => setViewMode('showcase')}
      />
    );
  }

  if (viewMode === 'admin' && user) {
    return (
      <AdminDashboard
        onBack={() => setViewMode('showcase')}
      />
    );
  }

  return (
    <IconShowcase
      onSubmitClick={() => {
        if (user) {
          setViewMode('submit');
        } else {
          setViewMode('auth');
        }
      }}
      onAuthClick={() => setViewMode('auth')}
      onAdminClick={() => setViewMode('admin')}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      {/* <ToastProvider /> */}
    </AuthProvider>
  );
}

export default App;
