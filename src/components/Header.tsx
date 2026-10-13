import React from 'react';
import { KipuFinLogo } from './KipuFinLogo';
import { AVATAR_URL } from '../data/mockData';
import { NavTab } from '../types';

interface HeaderProps {
  currentXP: number;
  level: number;
  streakDays: number;
  userName?: string;
  avatarUrl?: string;
  onNavigate: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentXP,
  level,
  streakDays,
  userName = 'Mateo',
  avatarUrl = AVATAR_URL,
  onNavigate,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-1 focus:outline-none cursor-pointer group text-left"
          title="Ir al Inicio"
        >
          <KipuFinLogo size="sm" variant="full" />
        </button>

        {/* Gamification Pills and Avatar */}
        <div className="flex items-center gap-1.5">
          {/* Streak pill */}
          <button
            onClick={() => onNavigate('progreso')}
            className="flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded-full shadow-[0_1px_4px_rgba(157,67,0,0.08)] cursor-pointer hover:opacity-90 transition-opacity"
            title="Ver tu racha de días"
          >
            <span className="text-sm leading-none">🔥</span>
            <span className="text-[11px] font-bold whitespace-nowrap">
              {streakDays} {streakDays === 1 ? 'día' : 'días'}
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

          {/* Avatar / Profile icon */}
          <button
            onClick={() => onNavigate('perfil')}
            className="cursor-pointer group relative flex items-center justify-center shrink-0 ml-0.5"
            title={`Perfil de ${userName}`}
          >
            {avatarUrl ? (
              <img
                alt={`Perfil de ${userName}`}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 transition-transform group-hover:scale-105"
                src={avatarUrl}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-primary/20">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-surface rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};
