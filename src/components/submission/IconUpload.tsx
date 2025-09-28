import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { validateIconFile, formatFileSize } from '@/lib/storage';
import { showToast } from '@/lib/toast';

interface IconUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
  error?: string | null;
}

export function IconUpload({ onFileSelect, disabled = false, error }: IconUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = useCallback(async (file: File) => {
    setValidating(true);
    setValidationError(null);

    try {
      const validation = await validateIconFile(file);
      if (!validation.isValid) {
        const errorMsg = validation.error || 'Invalid file';
        setValidationError(errorMsg);
        setSelectedFile(null);
        setPreviewUrl(null);
        onFileSelect(null);
        showToast.error('Invalid file', errorMsg);
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
      onFileSelect(file);
      showToast.success('File selected', `${file.name} ready for upload`);
    } catch (err) {
      const errorMsg = 'Error validating file';
      setValidationError(errorMsg);
      setSelectedFile(null);
      setPreviewUrl(null);
      onFileSelect(null);
      showToast.error('Validation failed', errorMsg);
    } finally {
      setValidating(false);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    handleFileValidation(file);
  }, [handleFileValidation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    handleFileSelect(e.dataTransfer.files);
  }, [disabled, handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setValidationError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
    showToast.success('File removed');
  }, [previewUrl, onFileSelect]);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 apple-subtitle text-base">
        <FileImage className="w-5 h-5 text-blue-400" />
        Icon Image *
      </label>

      {/* File Drop Zone */}
      <div
        className={`
          upload-zone relative p-8 transition-all duration-300 cursor-pointer
          ${dragOver && !disabled ? 'drag-over' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'interactive'}
          ${validationError || error ? 'border-red-500/50 bg-red-500/5' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {validating ? (
          <div className="flex flex-col items-center gap-4">
            <div className="loading-spinner w-8 h-8"></div>
            <p className="apple-body text-center">Validating file...</p>
          </div>
        ) : selectedFile && previewUrl ? (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="apple-subtitle text-sm truncate text-white">{selectedFile.name}</p>
                    <p className="apple-caption">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 interactive"
                    disabled={disabled}
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
            <p className="apple-caption text-center">
              Click to replace or drag a new file
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="apple-subtitle text-base text-white">Drop your icon here or click to browse</p>
              <p className="apple-caption">
                Images: PNG, JPEG, WebP, SVG • Maximum 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {(validationError || error) && (
        <div className="glass-card bg-red-500/10 border-red-500/30 p-4">
          <p className="text-red-400 apple-body text-sm">{validationError || error}</p>
        </div>
      )}

      {/* Help Text */}
      <p className="apple-caption">
        Upload your icon as an image file (PNG, JPEG, WebP, or SVG). The file will be stored securely and displayed in the community showcase.
      </p>
    </div>
  );
}