import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'rgba(28, 28, 30, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        className: 'apple-toast',
        duration: 3000,
      }}
    />
  );
}