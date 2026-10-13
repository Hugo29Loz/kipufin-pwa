import React from 'react';

interface CelebrationToastProps {
  message: string | null;
  subMessage?: string;
  xp?: number;
  onClose: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({
  message,
  subMessage,
  xp,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm pointer-events-auto">
      <div className="bg-primary text-on-primary p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-primary-fixed/40 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-lg font-bold shrink-0">
            {xp ? '⚡' : '🎉'}
          </div>
          <div>
            <p className="font-bold text-xs leading-tight">{message}</p>
            {subMessage && (
              <p className="text-[11px] text-on-primary-container/85 leading-tight mt-0.5">
                {subMessage}
              </p>
            )}
          </div>
        </div>

        {xp && (
          <span className="bg-primary-fixed text-on-primary-fixed text-xs font-extrabold px-2 py-0.5 rounded-full shrink-0">
            +{xp} XP
          </span>
        )}

        <button
          onClick={onClose}
          className="text-on-primary/80 hover:text-on-primary p-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
