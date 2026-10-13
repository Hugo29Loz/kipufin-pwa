import React from 'react';
import { LOGO_URL, AVATAR_URL } from '../data/mockData';
import { NavTab } from '../types';

interface HeaderProps {
  currentXP: number;
  level: number;
  streakDays: number;
  onNavigate: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentXP, level, streakDays, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-1.5 focus:outline-none cursor-pointer group text-left"
          title="Ir al Inicio"
        >
          <img
            alt="KipuFin Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGO_URL}
          />
          <span className="font-bold text-lg text-primary tracking-tight font-sans">
            KipuFin
          </span>
        </button>

        {/* Gamification Pills and Avatar */}
        <div className="flex items-center gap-2">
          {/* Streak pill */}
          <button
            onClick={() => onNavigate('progreso')}
            className="flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full shadow-[0_1px_4px_rgba(157,67,0,0.08)] cursor-pointer hover:opacity-90 transition-opacity"
            title="Ver tu racha de días"
          >
            <span className="text-sm leading-none">🔥</span>
            <span className="text-[11px] font-bold whitespace-nowrap">
              {streakDays} días
            </span>
          </button>

          {/* Level and XP pill */}
          <button
            onClick={() => onNavigate('progreso')}
            className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full shadow-[0_1px_4px_rgba(102,95,61,0.08)] cursor-pointer hover:opacity-90 transition-opacity"
            title="Ver tu nivel y experiencia"
          >
            <span className="material-symbols-outlined text-[14px] leading-none text-tertiary">
              military_tech
            </span>
            <span className="text-[11px] font-bold whitespace-nowrap">
              Nv. {level} • {currentXP} XP
            </span>
          </button>

          {/* Avatar */}
          <button
            onClick={() => onNavigate('perfil')}
            className="cursor-pointer group relative"
            title="Ver tu perfil"
          >
            <img
              alt="Perfil de Mateo"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-highest transition-transform group-hover:scale-105"
              src={AVATAR_URL}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-surface rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
