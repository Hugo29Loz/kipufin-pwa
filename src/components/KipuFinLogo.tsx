import React from 'react';

interface KipuFinLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'full' | 'icon-only';
  customLogoUrl?: string;
}

export const KipuFinLogo: React.FC<KipuFinLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
  variant = 'full',
  customLogoUrl,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Emblem / Icon */}
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="KipuFin Logo"
          className={`${iconSizes[size]} object-contain rounded-xl shadow-xs`}
        />
      ) : (
        <div
          className={`${iconSizes[size]} relative rounded-2xl bg-gradient-to-br from-[#006948] via-[#005237] to-[#003825] p-1.5 flex items-center justify-center shadow-[0_2px_10px_rgba(0,105,72,0.25)] ring-1 ring-[#85f8c4]/30 overflow-hidden shrink-0`}
        >
          {/* Subtle background glow */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#85f8c4]/20 rounded-full blur-xs" />
          
          {/* Stylized Khipu (Quipu) Knot + Growth Node SVG */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Top horizontal main quipu cord */}
            <path
              d="M6 10H34"
              stroke="#85F8C4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Hanging cord 1 with knot */}
            <path
              d="M12 10V22C12 25 15 27 18 25"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="2.2" fill="#FFB955" />
            
            {/* Hanging cord 2 with double knot forming financial growth 'K' */}
            <path
              d="M20 10V30"
              stroke="#85F8C4"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="18" r="2.2" fill="#FFB955" />
            <circle cx="20" cy="26" r="2.5" fill="#FFE082" />

            {/* Ascending dynamic financial stroke */}
            <path
              d="M20 22L29 13"
              stroke="#FFB955"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M20 22L30 32"
              stroke="#85F8C4"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Sun/Coin Sol Node (top right knot) */}
            <circle cx="29" cy="13" r="3" fill="#FFB955" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Brand Name Typography */}
      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span
              className={`${titleSizes[size]} font-black tracking-tight text-[#006948] leading-none font-sans`}
            >
              Kipu<span className="text-[#00855d]">Fin</span>
            </span>
            <span className="text-[10px] bg-primary-fixed text-on-primary-fixed font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              PE 🇵🇪
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`${subtitleSizes[size]} font-bold text-on-surface-variant tracking-wide mt-0.5 leading-tight`}
            >
              Educación Financiera en Cristiano
            </span>
          )}
        </div>
      )}
    </div>
  );
};
