import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CapsuleDrawer } from './components/CapsuleDrawer';
import { CelebrationToast } from './components/CelebrationToast';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { DiccionarioScreen } from './components/screens/DiccionarioScreen';
import { SimuladorScreen } from './components/screens/SimuladorScreen';
import { ProgresoScreen } from './components/screens/ProgresoScreen';
import { PerfilScreen } from './components/screens/PerfilScreen';
import { NavTab, TopicLesson, UserState } from './types';
import { AVATAR_URL } from './data/mockData';

const DEMO_USER_STATE: UserState = {
  name: 'Mateo',
  email: 'mateo@kipufin.pe',
  financialGoal: 'Dominar tarjetas y TCEA',
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const auth = localStorage.getItem('kipufin_is_authenticated');
      return auth === 'true';
    } catch {
      return false;
    }
  });

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
    return DEMO_USER_STATE;
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

  const handleAuthSuccess = (data: {
    name: string;
    email: string;
    financialGoal: string;
    isNewUser: boolean;
  }) => {
    if (data.isNewUser) {
      const newUserState: UserState = {
        name: data.name,
        email: data.email,
        financialGoal: data.financialGoal,
        level: 1,
        levelName: 'Novato',
        currentXP: 50,
        nextLevelXP: 150,
        streakDays: 1,
        claimedStreakReward: false,
        avatarUrl: '',
        completedLessons: [],
        bookmarkedTerms: ['tcea'],
        unlockedAchievements: ['ach-1'],
        currencySymbol: 'S/',
      };
      setUserState(newUserState);
      try {
        localStorage.setItem('kipufin_user_state', JSON.stringify(newUserState));
      } catch {
        // ignore
      }
      showToast(
        `¡Bienvenido a KipuFin, ${data.name}! 🎉`,
        'Bono de +50 XP y 1er día de racha acreditados a tu cuenta.',
        50
      );
    } else {
      setUserState((prev) => {
        const updated = {
          ...prev,
          name: data.name || prev.name,
          email: data.email || prev.email,
          financialGoal: data.financialGoal || prev.financialGoal,
        };
        try {
          localStorage.setItem('kipufin_user_state', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
      showToast(`¡Hola de nuevo, ${data.name}! 👋`, 'Tus datos personalizados están listos.');
    }

    try {
      localStorage.setItem('kipufin_is_authenticated', 'true');
    } catch {
      // ignore
    }
    setIsAuthenticated(true);
    setActiveTab('inicio');
  };

  const handleLogout = () => {
    try {
      localStorage.setItem('kipufin_is_authenticated', 'false');
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    showToast('Has cerrado sesión', 'Esperamos verte pronto en KipuFin');
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
        if (newLevel === 2) newLevelName = 'Aprendiz';
        else if (newLevel === 3) newLevelName = 'Curioso';
        else if (newLevel === 4) newLevelName = 'Estratega';
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
    setUserState(DEMO_USER_STATE);
    showToast('Datos de demostración reiniciados', 'Listo para empezar de nuevo');
  };

  // If user is not authenticated, render Welcome / Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface text-on-surface font-sans antialiased">
        <CelebrationToast
          message={toast?.message || null}
          subMessage={toast?.subMessage}
          xp={toast?.xp}
          onClose={() => setToast(null)}
        />
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

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
        userName={userState.name}
        avatarUrl={userState.avatarUrl}
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
            onLogout={handleLogout}
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
