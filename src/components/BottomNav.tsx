import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { tab: NavTab; label: string; icon: string }[] = [
    { tab: 'inicio', label: 'Inicio', icon: 'home' },
    { tab: 'diccionario', label: 'Diccionario', icon: 'menu_book' },
    { tab: 'simulador', label: 'Simulador', icon: 'calculate' },
    { tab: 'progreso', label: 'Progreso', icon: 'leaderboard' },
    { tab: 'perfil', label: 'Perfil', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,8px)]">
      <div className="max-w-md mx-auto h-16 flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => {
                onTabChange(item.tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all rounded-xl cursor-pointer ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-2xl transition-transform"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
