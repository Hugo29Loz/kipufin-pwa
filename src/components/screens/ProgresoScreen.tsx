import React, { useState } from 'react';
import { ACHIEVEMENTS_DATA, DAILY_MISSIONS } from '../../data/mockData';
import { Achievement, DailyMission, NavTab, UserState } from '../../types';

interface ProgresoScreenProps {
  userState: UserState;
  onNavigate: (tab: NavTab) => void;
  onClaimAchievement: (achievementId: string, xp: number) => void;
  onAddXP: (xp: number, reason: string) => void;
}

export const ProgresoScreen: React.FC<ProgresoScreenProps> = ({
  userState,
  onNavigate,
  onClaimAchievement,
  onAddXP,
}) => {
  const [filter, setFilter] = useState<'todos' | 'completados' | 'bloqueados'>('todos');
  const [missions, setMissions] = useState<DailyMission[]>(DAILY_MISSIONS);
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  const daysOfWeek = [
    { day: 'Lun', date: '6 Oct', active: true },
    { day: 'Mar', date: '7 Oct', active: true },
    { day: 'Mié', date: '8 Oct', active: true },
    { day: 'Jue', date: '9 Oct', active: true },
    { day: 'Vie', date: '10 Oct', active: true },
    { day: 'Sáb', date: '11 Oct', active: true },
    { day: 'Dom', date: '12 Oct', active: true },
  ];

  const levelsMap = [
    { lvl: 1, name: 'Novato Financiero', minXP: 0, icon: '🌱' },
    { lvl: 2, name: 'Aprendiz Consciente', minXP: 200, icon: '🌿' },
    { lvl: 3, name: 'Curioso Analítico', minXP: 450, icon: '🌳', current: true },
    { lvl: 4, name: 'Estratega Sin Deudas', minXP: 600, icon: '⚡' },
    { lvl: 5, name: 'Maestro KipuFin', minXP: 1000, icon: '👑' },
  ];

  const handleToggleMission = (missionId: string, xp: number) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && !m.completed) {
          onAddXP(xp, `Misión cumplida: ${m.title}`);
          return { ...m, completed: true };
        }
        return m;
      })
    );
  };

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((ach) => {
    const isCompleted = userState.unlockedAchievements.includes(ach.id) || ach.completed;
    if (filter === 'completados') return isCompleted;
    if (filter === 'bloqueados') return !isCompleted;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 pt-1">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-md font-extrabold uppercase">
            Tu camino al dominio
          </span>
        </div>
        <h1 className="text-2xl text-on-surface font-extrabold mt-1">
          Progreso & Medallas 🏆
        </h1>
        <p className="text-xs text-on-surface-variant">
          Cada microlección y cálculo suma experiencia para subir de nivel y proteger tu patrimonio.
        </p>
      </div>

      {/* Level Roadmap Bento */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <div>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                Nivel Actual
              </p>
              <h2 className="text-base text-on-surface font-extrabold">
                Nv. {userState.level}: {userState.levelName}
              </h2>
            </div>
          </div>
          <span className="text-xs font-bold text-primary bg-primary-fixed/40 px-2.5 py-1 rounded-full">
            {userState.currentXP} / {userState.nextLevelXP} XP
          </span>
        </div>

        {/* Level Steps */}
        <div className="grid grid-cols-5 gap-1 pt-2">
          {levelsMap.map((l) => {
            const isCompleted = userState.level > l.lvl;
            const isCurrent = userState.level === l.lvl;
            return (
              <div key={l.lvl} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
                    isCurrent
                      ? 'bg-primary text-on-primary ring-3 ring-primary-fixed shadow-xs font-bold scale-110'
                      : isCompleted
                      ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                      : 'bg-surface-container text-outline-variant opacity-60'
                  }`}
                >
                  {isCompleted ? '✓' : l.icon}
                </div>
                <span className="text-[10px] font-bold text-on-surface mt-1 truncate w-full">
                  Nv. {l.lvl}
                </span>
                <span className="text-[9px] text-on-surface-variant line-clamp-1">
                  {l.name.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Calendar (Racha de 7 Días) */}
      <div className="bg-secondary-fixed text-on-secondary-fixed p-4 rounded-3xl shadow-xs border border-secondary-fixed-dim/30 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <h3 className="text-sm font-extrabold text-secondary">
                Racha Semanal Imparable
              </h3>
              <p className="text-[11px] text-on-secondary-fixed-variant">
                ¡Has aprendido 7 días seguidos esta semana!
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold bg-on-secondary-fixed/15 px-2 py-0.5 rounded-full text-secondary">
            7 / 7 días
          </span>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1.5 mt-3 relative z-10">
          {daysOfWeek.map((d, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest/80 backdrop-blur-xs p-2 rounded-xl flex flex-col items-center text-center shadow-xs"
            >
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                {d.day}
              </span>
              <span className="text-sm my-0.5">🔥</span>
              <span className="material-symbols-outlined text-xs text-primary font-bold">
                check_circle
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Missions */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🎯</span>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Misiones del Día
            </h3>
          </div>
          <span className="text-[10px] text-on-surface-variant font-medium">
            Se reinician a medianoche
          </span>
        </div>

        <div className="space-y-2">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                m.completed
                  ? 'bg-primary-fixed/20 border-primary-fixed/50'
                  : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleToggleMission(m.id, m.xp)}
                  disabled={m.completed}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    m.completed
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline hover:border-primary'
                  }`}
                >
                  {m.completed && (
                    <span className="material-symbols-outlined text-xs font-bold">check</span>
                  )}
                </button>
                <span
                  className={`text-xs ${
                    m.completed ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium'
                  }`}
                >
                  {m.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    m.completed
                      ? 'bg-primary text-on-primary'
                      : 'bg-primary-fixed text-on-primary-fixed'
                  }`}
                >
                  +{m.xp} XP
                </span>
                {!m.completed && (
                  <button
                    onClick={() => onNavigate(m.actionTab)}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Ir ➔
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Achievements Collection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-on-surface">
              Colección de Logros ({ACHIEVEMENTS_DATA.filter((a) => a.completed).length}/
              {ACHIEVEMENTS_DATA.length})
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Reclama recompensas y colecciona todas las medallas
            </p>
          </div>

          <div className="flex bg-surface-container p-0.5 rounded-xl text-[10px]">
            <button
              onClick={() => setFilter('todos')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                filter === 'todos' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('completados')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                filter === 'completados'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant'
              }`}
            >
              Listos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filteredAchievements.map((ach) => {
            const isCompleted = ach.completed;
            const canClaim = ach.canClaim && !userState.claimedStreakReward;

            return (
              <div
                key={ach.id}
                onClick={() => setSelectedBadge(ach)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-surface-container-lowest border-surface-container shadow-xs hover:border-primary/50'
                    : 'bg-surface-container-low border-surface-container opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{ach.icon}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        isCompleted
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {ach.progressText || (isCompleted ? 'Listo ✓' : 'Bloqueado')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface">{ach.title}</h4>
                  <p className="text-[10px] text-on-surface-variant line-clamp-2 mt-0.5 leading-snug">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[10px] font-bold text-secondary">
                    +{ach.xpReward} XP
                  </span>

                  {canClaim ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClaimAchievement(ach.id, ach.xpReward);
                      }}
                      className="bg-secondary-container text-on-primary px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-xs active:scale-95 cursor-pointer"
                    >
                      Reclamar 🎁
                    </button>
                  ) : (
                    <span className="text-[10px] text-outline">Ver detalle</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 border border-surface-container shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-3xl mb-2">
              {selectedBadge.icon}
            </div>
            <h3 className="text-base font-extrabold text-on-surface">{selectedBadge.title}</h3>
            <span className="text-xs font-bold text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full mt-1 mb-2">
              +{selectedBadge.xpReward} XP Recompensa
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {selectedBadge.description}
            </p>

            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-4 w-full bg-primary hover:bg-primary-container text-on-primary py-2 rounded-full text-xs font-bold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
