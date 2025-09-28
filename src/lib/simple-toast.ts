// Simple toast system without external dependencies
type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
  duration: number;
}

class SimpleToastManager {
  private toasts: Toast[] = [];
  private container: HTMLDivElement | null = null;

  constructor() {
    this.createContainer();
  }

  private createContainer() {
    if (typeof window === 'undefined') return;

    this.container = document.createElement('div');
    this.container.id = 'simple-toast-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private renderToast(toast: Toast): HTMLDivElement {
    const element = document.createElement('div');
    element.style.cssText = `
      background: rgba(28, 28, 30, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      max-width: 400px;
      pointer-events: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 500;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease-out;
    `;

    const getTypeColor = (type: ToastType) => {
      switch (type) {
        case 'success': return '#30d158';
        case 'error': return '#ff3b30';
        case 'info': return '#007aff';
        case 'loading': return '#007aff';
        default: return '#ffffff';
      }
    };

    const typeColor = getTypeColor(toast.type);
    element.style.borderColor = `${typeColor}30`;

    element.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 4px; height: 100%; background: ${typeColor}; border-radius: 2px; flex-shrink: 0;"></div>
        <div style="flex: 1;">
          <div style="color: ${typeColor}; font-weight: 600; margin-bottom: 4px;">
            ${toast.message}
          </div>
          ${toast.description ? `<div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; font-weight: 400;">${toast.description}</div>` : ''}
        </div>
      </div>
    `;

    // Animate in
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    }, 10);

    return element;
  }

  private show(type: ToastType, message: string, description?: string, duration: number = 3000): string {
    if (!this.container) return '';

    const id = this.generateId();
    const toast: Toast = { id, message, description, type, duration };

    this.toasts.push(toast);

    const element = this.renderToast(toast);
    this.container.appendChild(element);

    // Auto remove
    setTimeout(() => {
      this.dismiss(id);
    }, duration);

    return id;
  }

  success(message: string, description?: string): string {
    return this.show('success', message, description, 3000);
  }

  error(message: string, description?: string): string {
    return this.show('error', message, description, 4000);
  }

  info(message: string, description?: string): string {
    return this.show('info', message, description, 3000);
  }

  loading(message: string): string {
    return this.show('loading', message, undefined, 0); // Don't auto-dismiss loading toasts
  }

  dismiss(id?: string): void {
    if (!this.container) return;

    if (id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index > -1) {
        this.toasts.splice(index, 1);
        const element = this.container.children[index] as HTMLElement;
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateX(100%)';
          setTimeout(() => {
            if (element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }, 300);
        }
      }
    }
  }

  promise<T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> {
    const loadingId = this.loading(loading);

    return promise
      .then((data) => {
        this.dismiss(loadingId);
        const successMessage = typeof success === 'function' ? success(data) : success;
        this.success(successMessage);
        return data;
      })
      .catch((err) => {
        this.dismiss(loadingId);
        const errorMessage = typeof error === 'function' ? error(err) : error;
        this.error(errorMessage);
        throw err;
      });
  }
}

// Create singleton instance
const toastManager = new SimpleToastManager();

// Export simple API that matches sonner
export const showToast = {
  success: (message: string, description?: string) => toastManager.success(message, description),
  error: (message: string, description?: string) => toastManager.error(message, description),
  info: (message: string, description?: string) => toastManager.info(message, description),
  loading: (message: string) => toastManager.loading(message),
  dismiss: (id?: string) => toastManager.dismiss(id),
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => toastManager.promise(promise, options),
};