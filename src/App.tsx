import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CapsuleDrawer } from './components/CapsuleDrawer';
import { CelebrationToast } from './components/CelebrationToast';
import { HomeScreen } from './components/screens/HomeScreen';
import { DiccionarioScreen } from './components/screens/DiccionarioScreen';
import { SimuladorScreen } from './components/screens/SimuladorScreen';
import { ProgresoScreen } from './components/screens/ProgresoScreen';
import { PerfilScreen } from './components/screens/PerfilScreen';
import { NavTab, TopicLesson, UserState } from './types';
import { AVATAR_URL } from './data/mockData';

const INITIAL_USER_STATE: UserState = {
  name: 'Mateo',
  level: 3,
  levelName: 'Curioso',
  currentXP: 450,
  nextLevelXP: 600,
  streakDays: 7,
  claimedStreakReward: false,
  avatarUrl: AVATAR_URL,
  completedLessons: ['les-ahorro-1'],
  bookmarkedTerms: ['tcea'],
  unlockedAchievements: ['ach-1', 'ach-2', 'ach-3'],
  currencySymbol: 'S/',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem('kipufin_user_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currencySymbol === '$') parsed.currencySymbol = 'S/';
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_USER_STATE;
  });

  const [activeCapsuleLesson, setActiveCapsuleLesson] = useState<TopicLesson | null>(null);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  const [simulatorPreloadAmount, setSimulatorPreloadAmount] = useState<number>(180);
  const [toast, setToast] = useState<{ message: string; subMessage?: string; xp?: number } | null>(
    null
  );

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('kipufin_user_state', JSON.stringify(userState));
    } catch {
      // ignore
    }
  }, [userState]);

  const showToast = (message: string, subMessage?: string, xp?: number) => {
    setToast({ message, subMessage, xp });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAddXP = (xp: number, reason: string) => {
    setUserState((prev) => {
      let newXP = prev.currentXP + xp;
      let newLevel = prev.level;
      let newLevelName = prev.levelName;
      let newNextLevelXP = prev.nextLevelXP;

      // Check level up
      if (newXP >= prev.nextLevelXP) {
        newLevel += 1;
        newNextLevelXP = Math.round(prev.nextLevelXP * 1.5);
        if (newLevel === 4) newLevelName = 'Estratega';
        else if (newLevel >= 5) newLevelName = 'Maestro';
        showToast(`¡Subiste al Nivel ${newLevel}: ${newLevelName}! 🚀`, reason, xp);
      } else {
        showToast(reason, undefined, xp);
      }

      return {
        ...prev,
        currentXP: newXP,
        level: newLevel,
        levelName: newLevelName,
        nextLevelXP: newNextLevelXP,
      };
    });
  };

  const handleClaimAchievement = (achId: string, xp: number) => {
    setUserState((prev) => ({
      ...prev,
      claimedStreakReward: true,
      unlockedAchievements: Array.from(new Set([...prev.unlockedAchievements, achId])),
    }));
    handleAddXP(xp, '¡Recompensa de Racha Semanal reclamada!');
  };

  const handleToggleBookmark = (termId: string) => {
    setUserState((prev) => {
      const exists = prev.bookmarkedTerms.includes(termId);
      const updated = exists
        ? prev.bookmarkedTerms.filter((id) => id !== termId)
        : [...prev.bookmarkedTerms, termId];

      showToast(
        exists ? 'Término removido de favoritos' : '★ Término guardado en favoritos',
        'Puedes consultarlo cuando quieras en el Diccionario'
      );

      return {
        ...prev,
        bookmarkedTerms: updated,
      };
    });
  };

  const handleOpenCapsule = (lesson: TopicLesson) => {
    setActiveCapsuleLesson(lesson);
    setIsCapsuleOpen(true);
  };

  const handleCompleteCapsule = (lessonId: string, xp: number) => {
    setUserState((prev) => ({
      ...prev,
      completedLessons: Array.from(new Set([...prev.completedLessons, lessonId])),
    }));
    handleAddXP(xp, '¡Cápsula completada con éxito!');
  };

  const handleSimulateWithAmount = (amount: number) => {
    setSimulatorPreloadAmount(amount);
  };

  const handleResetProgress = () => {
    setUserState(INITIAL_USER_STATE);
    showToast('Datos de demostración reiniciados', 'Listo para empezar de nuevo');
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased flex flex-col relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Toast Notification */}
      <CelebrationToast
        message={toast?.message || null}
        subMessage={toast?.subMessage}
        xp={toast?.xp}
        onClose={() => setToast(null)}
      />

      {/* Top Header */}
      <Header
        currentXP={userState.currentXP}
        level={userState.level}
        streakDays={userState.streakDays}
        onNavigate={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-18 pb-24 flex flex-col">
        {activeTab === 'inicio' && (
          <HomeScreen
            userState={userState}
            onNavigate={setActiveTab}
            onOpenCapsule={handleOpenCapsule}
            onClaimAchievement={handleClaimAchievement}
            onToggleBookmark={handleToggleBookmark}
            onSimulateWithAmount={handleSimulateWithAmount}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'diccionario' && (
          <DiccionarioScreen
            userState={userState}
            onToggleBookmark={handleToggleBookmark}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'simulador' && (
          <SimuladorScreen
            userState={userState}
            initialAmount={simulatorPreloadAmount}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'progreso' && (
          <ProgresoScreen
            userState={userState}
            onNavigate={setActiveTab}
            onClaimAchievement={handleClaimAchievement}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'perfil' && (
          <PerfilScreen
            userState={userState}
            onUpdateName={(newName) => setUserState((prev) => ({ ...prev, name: newName }))}
            onUpdateCurrency={(sym) => setUserState((prev) => ({ ...prev, currencySymbol: sym }))}
            onAddXP={handleAddXP}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Bottom Capsule Player Drawer */}
      <CapsuleDrawer
        lesson={activeCapsuleLesson}
        isOpen={isCapsuleOpen}
        onClose={() => setIsCapsuleOpen(false)}
        onComplete={handleCompleteCapsule}
        onAddXP={handleAddXP}
        isAlreadyCompleted={
          activeCapsuleLesson ? userState.completedLessons.includes(activeCapsuleLesson.id) : false
        }
      />

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
