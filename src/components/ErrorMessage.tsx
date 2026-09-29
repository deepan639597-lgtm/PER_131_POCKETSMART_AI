import React from 'react';
import { AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onReset?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onReset,
}) => {
  return (
    <div className="mx-auto my-8 max-w-lg rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-slate-200 shadow-xl backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-red-500/20 p-2 text-red-400 border border-red-500/30 shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white">Generation Error</h4>
          <p className="mt-1 text-xs text-red-200/90 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-red-500/20">
        {onReset && (
          <button
            onClick={onReset}
            className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors"
          >
            Clear Form
          </button>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-red-500 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
