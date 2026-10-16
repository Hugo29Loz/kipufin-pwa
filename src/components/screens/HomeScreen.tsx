import React, { useState } from 'react';
import { ALL_TOPIC_LESSONS, DICTIONARY_TERMS } from '../../data/mockData';
import { NavTab, TopicLesson, UserState } from '../../types';
import { Rule503020Calculator } from '../Rule503020Calculator';

interface HomeScreenProps {
  userState: UserState;
  onNavigate: (tab: NavTab) => void;
  onOpenCapsule: (lesson: TopicLesson) => void;
  onClaimAchievement: (achievementId: string, xp: number) => void;
  onToggleBookmark: (termId: string) => void;
  onSimulateWithAmount: (amount: number) => void;
  onAddXP: (xp: number, reason: string) => void;
  onSaveBudget?: (budget: {
    monthlyIncome: number;
    needs: number;
    wants: number;
    savings: number;
    updatedAt: string;
  }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userState,
  onNavigate,
  onOpenCapsule,
  onClaimAchievement,
  onToggleBookmark,
  onSimulateWithAmount,
  onAddXP,
  onSaveBudget,
}) => {
  // Topic category selector state
  const [selectedTopic, setSelectedTopic] = useState<'ahorro' | 'tarjetas' | 'prestamos' | 'servicios'>('ahorro');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-ahorro-1');
  const [capsuleMode, setCapsuleMode] = useState<'audio' | 'text'>('audio');
  const [cardQuizAnswered, setCardQuizAnswered] = useState<boolean>(false);
  const [cardQuizSelected, setCardQuizSelected] = useState<number | null>(null);

  // Herramienta Estrella state
  const [caprichoPrice, setCaprichoPrice] = useState<string>('180');
  const [disposableIncome, setDisposableIncome] = useState<string>('500');

  // Diccionario quick terms state
  const [selectedTermId, setSelectedTermId] = useState<string>('tcea');
  const [quickSearch, setQuickSearch] = useState<string>('');

  // Calculate affordability verdict
  const priceNum = Math.max(0, parseFloat(caprichoPrice) || 0);
  const incomeNum = Math.max(1, parseFloat(disposableIncome) || 1);
  const ratio = Math.round((priceNum / incomeNum) * 100);

  let verdictColor = 'text-primary';
  let verdictBg = 'bg-primary-fixed/20 border-primary-fixed';
  let verdictIcon = '🟢';
  let verdictTitle = '¡Compra aprobada y segura!';
  let verdictSub = `Ocupa el ${ratio}% de tu dinero libre (máx sugerido 40%).`;
  let verdictCheck = 'check_circle';

  if (ratio > 75) {
    verdictColor = 'text-error';
    verdictBg = 'bg-red-50 border-red-200';
    verdictIcon = '🔴';
    verdictTitle = '¡Alerta roja! No conviene ahora';
    verdictSub = `Representa el ${ratio}% de tu saldo disponible. Riesgo de deuda.`;
    verdictCheck = 'warning';
  } else if (ratio > 40) {
    verdictColor = 'text-secondary';
    verdictBg = 'bg-orange-50 border-orange-200';
    verdictIcon = '🟡';
    verdictTitle = 'Cuidado: Ajustará tus semanas';
    verdictSub = `Se lleva el ${ratio}% de tu plata libre. Te dejará poco margen.`;
    verdictCheck = 'info';
  }

  // Active topic lesson data
  const categoryLessons = ALL_TOPIC_LESSONS.filter((l) => l.categoryKey === selectedTopic);
  const currentLesson =
    categoryLessons.find((l) => l.id === selectedLessonId) || categoryLessons[0] || ALL_TOPIC_LESSONS[0];

  const handleSelectTopic = (cat: 'ahorro' | 'tarjetas' | 'prestamos' | 'servicios') => {
    setSelectedTopic(cat);
    const firstLesson = ALL_TOPIC_LESSONS.find((l) => l.categoryKey === cat);
    if (firstLesson) {
      setSelectedLessonId(firstLesson.id);
    }
    setCardQuizAnswered(false);
    setCardQuizSelected(null);
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCardQuizAnswered(false);
    setCardQuizSelected(null);
  };

  const handleCardQuizClick = (optIdx: number) => {
    if (cardQuizAnswered) return;
    setCardQuizSelected(optIdx);
    setCardQuizAnswered(true);
    if (optIdx === currentLesson.quiz.correctIndex) {
      onAddXP(currentLesson.quiz.xpBonus, `¡Correcto en el Mini Test de "${currentLesson.category}"!`);
    }
  };

  // Selected term details
  const currentTerm = DICTIONARY_TERMS.find((t) => t.id === selectedTermId) || DICTIONARY_TERMS[0];
  const isBookmarked = userState.bookmarkedTerms.includes(currentTerm.id);

  // Quick terms to show in 3 columns
  const teaTerm = DICTIONARY_TERMS.find((t) => t.id === 'tea')!;
  const tceaTerm = DICTIONARY_TERMS.find((t) => t.id === 'tcea')!;
  const treaTerm = DICTIONARY_TERMS.find((t) => t.id === 'trea')!;

  const handleSimulateCuotas = () => {
    onSimulateWithAmount(priceNum > 0 ? priceNum : 180);
    onNavigate('simulador');
  };

  return (
    <div className="flex flex-col w-full gap-4 pt-1">
      {/* 1. Header & Bento Gamification */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-on-surface-variant font-bold tracking-wider uppercase">
              Bienvenido de nuevo
            </p>
            <h1 className="text-2xl text-on-surface font-extrabold leading-tight">
              ¡Hola, {userState.name}! 👋
            </h1>
          </div>
          <div className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-bold">Día activo</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-5 gap-2 mt-0.5">
          {/* Level & XP Card (3 cols) */}
          <div
            onClick={() => onNavigate('progreso')}
            className="col-span-3 bg-surface-container-lowest p-3 rounded-2xl shadow-xs flex flex-col justify-between border border-surface-container cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🌱</span>
                <span className="text-xs font-bold text-primary truncate max-w-[110px]">
                  Nv. {userState.level}: {userState.levelName}
                </span>
              </div>
              <span className="text-[10px] text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full font-bold">
                {userState.currentXP} / {userState.nextLevelXP} XP
              </span>
            </div>

            <div className="space-y-1">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((userState.currentXP / userState.nextLevelXP) * 100))}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                <span>
                  Faltan {Math.max(0, userState.nextLevelXP - userState.currentXP)} XP
                </span>
                <span className="font-bold text-secondary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">military_tech</span>{' '}
                  Nv. {userState.level + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Streak Card (2 cols) */}
          <div
            onClick={() => onNavigate('progreso')}
            className="col-span-2 bg-secondary-fixed text-on-secondary-fixed p-3 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-secondary-fixed-dim/30 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center justify-between z-10">
              <span className="text-xl leading-none">🔥</span>
              <span className="text-[10px] bg-on-secondary-fixed/10 px-1.5 py-0.5 rounded-md uppercase font-extrabold tracking-wider">
                TOP
              </span>
            </div>
            <div className="z-10 mt-1">
              <p className="text-lg font-extrabold leading-none text-secondary">
                {userState.streakDays} días
              </p>
              <p className="text-[11px] text-on-secondary-fixed-variant font-bold mt-0.5 truncate">
                ¡Imparable!
              </p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-5xl text-secondary-fixed-dim/40 select-none pointer-events-none">
              local_fire_department
            </span>
          </div>
        </div>
      </section>

      {/* 2. Microlecciones de 4 a 5 min */}
      <section className="flex flex-col gap-2" id="section-temas-principales">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wide">
              Aprende al ritmo de tu día
            </span>
          </div>
          <h2 className="text-xl text-on-surface font-extrabold mt-1">
            Microlecciones de 4 a 5 min 🚀
          </h2>
          <p className="text-xs text-on-surface-variant">
            Explora por tema, resuelve su mini test y domina tus finanzas sin enredos
          </p>
        </div>

        {/* 4 Topic Selector Cards */}
        <div className="grid grid-cols-2 gap-2">
          {/* Ahorro */}
          <button
            onClick={() => handleSelectTopic('ahorro')}
            className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer relative bg-surface-container-lowest ${
              selectedTopic === 'ahorro'
                ? 'border-primary shadow-sm'
                : 'border-transparent hover:border-surface-container-highest shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🐷</span>
              {selectedTopic === 'ahorro' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary text-on-primary">
                  Activo
                </span>
              )}
            </div>
            <h3 className="text-sm text-on-surface font-extrabold leading-snug">Ahorro</h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
              Fondo de emergencia, retos y hacer crecer tu plata...
            </p>
          </button>

          {/* Tarjetas */}
          <button
            onClick={() => handleSelectTopic('tarjetas')}
            className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer relative bg-surface-container-lowest ${
              selectedTopic === 'tarjetas'
                ? 'border-primary shadow-sm'
                : 'border-transparent hover:border-surface-container-highest shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">💳</span>
              {selectedTopic === 'tarjetas' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary text-on-primary">
                  Activo
                </span>
              )}
            </div>
            <h3 className="text-sm text-on-surface font-extrabold leading-snug">
              Tarjetas de Crédito
            </h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
              Fecha de corte vs pago y evitar intereses trampa.
            </p>
          </button>

          {/* Préstamos */}
          <button
            onClick={() => handleSelectTopic('prestamos')}
            className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer relative bg-surface-container-lowest ${
              selectedTopic === 'prestamos'
                ? 'border-primary shadow-sm'
                : 'border-transparent hover:border-surface-container-highest shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🤝</span>
              {selectedTopic === 'prestamos' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary text-on-primary">
                  Activo
                </span>
              )}
            </div>
            <h3 className="text-sm text-on-surface font-extrabold leading-snug">Préstamos</h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
              Entiende el cobro real, TCEA y no caigas en informales.
            </p>
          </button>

          {/* Servicios */}
          <button
            onClick={() => handleSelectTopic('servicios')}
            className={`text-left p-3 rounded-2xl border-2 transition-all cursor-pointer relative bg-surface-container-lowest ${
              selectedTopic === 'servicios'
                ? 'border-primary shadow-sm'
                : 'border-transparent hover:border-surface-container-highest shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">⚡</span>
              {selectedTopic === 'servicios' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-primary text-on-primary">
                  Activo
                </span>
              )}
            </div>
            <h3 className="text-sm text-on-surface font-extrabold leading-snug">
              Servicios y Fijos
            </h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
              Control de recibos, gastos hormiga y suscripciones...
            </p>
          </button>
        </div>

        {/* Selector de Cápsulas en el tema seleccionado (si hay más de 1) */}
        {categoryLessons.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categoryLessons.map((les, idx) => {
              const isSelected = currentLesson.id === les.id;
              return (
                <button
                  key={les.id}
                  onClick={() => handleSelectLesson(les.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>{les.icon}</span>
                  <span>Cápsula {idx + 1}: {les.title.slice(0, 22)}...</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Capsule Card */}
        <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-xs border border-surface-container flex flex-col gap-3 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center text-2xl shrink-0">
                <span>{currentLesson.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-secondary font-extrabold uppercase tracking-wide">
                    {currentLesson.badge}
                  </span>
                  <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.2 rounded font-bold">
                    {currentLesson.durationMin} min
                  </span>
                  {(currentLesson.audioUrl || currentLesson.id === 'les-ahorro-1' || currentLesson.audioTranscript) && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                      Audio Guiado 🎙️
                    </span>
                  )}
                </div>
                <h3 className="text-base text-on-surface font-bold leading-tight mt-0.5">
                  {currentLesson.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            {currentLesson.desc}
          </p>

          {/* Término sin rollos */}
          <div className="bg-surface-container-low p-2.5 rounded-2xl border border-surface-container flex items-start gap-2">
            <span className="text-base select-none">💡</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-on-surface">
                {currentLesson.conceptTitle}
              </p>
              <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                {currentLesson.conceptDesc}
              </p>
            </div>
          </div>

          {/* Calculador Automático 50/30/20 en tiempo real */}
          {currentLesson.id === 'les-ahorro-1' && (
            <div className="pt-1">
              <Rule503020Calculator
                userState={userState}
                currencySymbol={userState.currencySymbol}
                onSaveBudget={onSaveBudget}
                onAddXP={onAddXP}
              />
            </div>
          )}

          {/* MINI TEST INTERACTIVO DIRECTO EN LA TARJETA */}
          <div className="bg-surface-container-low/80 p-3 rounded-2xl border border-primary/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🎯</span>
                <span className="text-xs font-extrabold text-on-surface uppercase tracking-wider">
                  Mini Test Rápido
                </span>
              </div>
              <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold">
                +{currentLesson.quiz.xpBonus} XP
              </span>
            </div>

            <p className="text-xs text-on-surface font-medium leading-snug">
              {currentLesson.quiz.question}
            </p>

            <div className="space-y-1 pt-0.5">
              {currentLesson.quiz.options.map((opt, oIdx) => {
                const isSelected = cardQuizSelected === oIdx;
                const isCorrect = oIdx === currentLesson.quiz.correctIndex;

                let optClass =
                  'bg-surface-container-lowest border-surface-container text-on-surface hover:border-primary/50';

                if (cardQuizAnswered) {
                  if (isCorrect) {
                    optClass = 'bg-green-50 border-green-500 text-green-900 font-bold';
                  } else if (isSelected) {
                    optClass = 'bg-red-50 border-red-400 text-red-900';
                  } else {
                    optClass = 'bg-surface-container-lowest border-surface-container opacity-50';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleCardQuizClick(oIdx)}
                    disabled={cardQuizAnswered}
                    className={`w-full text-left p-2 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between gap-1.5 ${optClass}`}
                  >
                    <span>{opt}</span>
                    {cardQuizAnswered && isCorrect && (
                      <span className="material-symbols-outlined text-green-600 text-sm">
                        check_circle
                      </span>
                    )}
                    {cardQuizAnswered && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-red-500 text-sm">
                        cancel
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {cardQuizAnswered && (
              <div className="text-[11px] p-2 rounded-xl bg-surface-container-lowest border border-surface-container leading-snug text-on-surface">
                {cardQuizSelected === currentLesson.quiz.correctIndex ? (
                  <span className="text-primary font-bold">
                    ¡Correcto! 🎉 {currentLesson.quiz.explanation}
                  </span>
                ) : (
                  <span className="text-secondary font-medium">
                    ⚠️ {currentLesson.quiz.explanation}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mode Pill Toggle (Audio vs Texto) */}
          <div className="bg-surface-container p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => {
                setCapsuleMode('audio');
                onOpenCapsule(currentLesson);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                capsuleMode === 'audio'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-base text-secondary">
                play_circle
              </span>
              <span>
                {currentLesson.audioUrl || currentLesson.id === 'les-ahorro-1' ? 'Escuchar audio de la cápsula 🎧' : `Escuchar audio (${currentLesson.durationMin} min)`}
              </span>
            </button>
            <button
              onClick={() => setCapsuleMode('text')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                capsuleMode === 'text'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>Píldora rápida</span>
            </button>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span> {currentLesson.durationMin} min
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span className="text-xs text-primary font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">bolt</span> +{currentLesson.xpReward} XP
              </span>
            </div>

            <button
              onClick={() => onOpenCapsule(currentLesson)}
              className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-full text-xs font-bold shadow-sm active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Comenzar cápsula</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Herramienta Estrella: ¿Puedo comprarlo sin sufrir a fin de mes? */}
      <section
        className="bg-gradient-to-br from-primary-container via-primary to-primary text-on-primary p-4 rounded-3xl shadow-md relative overflow-hidden"
        id="section-simulador-estrella"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-fixed/15 rounded-full pointer-events-none blur-xl" />
        <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-secondary-container/20 rounded-full pointer-events-none blur-lg" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-full font-extrabold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">auto_awesome</span> Herramienta Estrella
            </span>
            <span className="text-xs text-on-primary-container/90 bg-on-primary/10 px-2 py-0.5 rounded-full">
              ⚡ 10 segundos
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h2 className="text-lg text-on-primary leading-tight font-extrabold">
                ¿Puedo comprarlo sin sufrir a fin de mes? ⚖️
              </h2>
              <p className="text-xs text-on-primary-container/90 mt-1 leading-snug">
                Calcula al instante si esa compra cabe en tu presupuesto mensual sin desbalancearte ni endeudarte.
              </p>
            </div>
            <div className="w-14 h-14 bg-on-primary/10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-primary-fixed text-3xl">balance</span>
            </div>
          </div>

          {/* Mini Interactive Calculator */}
          <div className="bg-surface-container-lowest/15 backdrop-blur-md rounded-2xl p-3 flex flex-col gap-2 border border-on-primary/20">
            <div className="grid grid-cols-2 gap-2 text-on-primary">
              <div>
                <label className="text-[11px] block text-on-primary-container/90 mb-1 font-medium">
                  Precio del capricho ({userState.currencySymbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={caprichoPrice}
                  onChange={(e) => setCaprichoPrice(e.target.value)}
                  placeholder="Ej: 180"
                  className="w-full bg-surface-container-lowest text-on-surface px-2.5 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-fixed shadow-xs"
                />
              </div>
              <div>
                <label className="text-[11px] block text-on-primary-container/90 mb-1 font-medium">
                  Plata libre del mes ({userState.currencySymbol}):
                </label>
                <input
                  type="number"
                  min="1"
                  value={disposableIncome}
                  onChange={(e) => setDisposableIncome(e.target.value)}
                  placeholder="Ej: 500"
                  className="w-full bg-surface-container-lowest text-on-surface px-2.5 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-fixed shadow-xs"
                />
              </div>
            </div>

            {/* Verdict Box */}
            <div className="bg-surface-container-lowest text-on-surface p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{verdictIcon}</span>
                <div>
                  <p className="text-xs font-bold leading-tight">{verdictTitle}</p>
                  <p className="text-[11px] text-on-surface-variant leading-tight">{verdictSub}</p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-xl ${verdictColor}`}>
                {verdictCheck}
              </span>
            </div>
          </div>

          {/* Button to full simulator */}
          <button
            onClick={handleSimulateCuotas}
            className="w-full bg-surface-container-lowest text-primary py-2.5 px-4 rounded-2xl text-xs font-bold shadow-sm active:translate-y-0.5 transition-all flex items-center justify-center gap-2 hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-lg">calculate</span>
            <span>Simular con cuotas e intereses</span>
            <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 4. Diccionario Fácil: En Cristiano */}
      <section className="flex flex-col gap-2" id="section-diccionario-facil">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-on-surface flex items-center gap-1">
                Diccionario Fácil 📖
              </h2>
              <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold">
                En cristiano
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Sin tecnicismos raros ni letra chica bancaria
            </p>
          </div>
          <button
            onClick={() => onNavigate('diccionario')}
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            Explorar todo
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onNavigate('diccionario');
            }}
            placeholder="Busca siglas: TCEA, TEA, TREA, Interés..."
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs rounded-2xl pl-10 pr-10 py-2.5 border border-surface-container shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          <button
            onClick={() => onNavigate('diccionario')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface p-1 cursor-pointer"
            title="Abrir filtros de glosario"
          >
            <span className="material-symbols-outlined text-base">tune</span>
          </button>
        </div>

        {/* 3 Quick Cards (TEA, TCEA, TREA) */}
        <div className="grid grid-cols-3 gap-2">
          {/* TEA */}
          <div
            onClick={() => setSelectedTermId('tea')}
            className={`p-2.5 rounded-2xl shadow-xs flex flex-col justify-between cursor-pointer transition-all ${
              selectedTermId === 'tea'
                ? 'bg-surface-container-low border-2 border-primary shadow-sm'
                : 'bg-surface-container-lowest border border-surface-container hover:border-primary/50'
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary bg-secondary-fixed px-1.5 py-0.5 rounded">
                TEA
              </span>
              <p className="text-xs font-bold text-on-surface mt-1">{teaTerm.name}</p>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
              {teaTerm.shortDesc}
            </p>
          </div>

          {/* TCEA */}
          <div
            onClick={() => setSelectedTermId('tcea')}
            className={`p-2.5 rounded-2xl shadow-xs flex flex-col justify-between cursor-pointer transition-all relative ${
              selectedTermId === 'tcea'
                ? 'bg-surface-container-low border-2 border-primary shadow-sm'
                : 'bg-surface-container-lowest border border-surface-container hover:border-primary/50'
            }`}
          >
            <span className="absolute -top-2 right-2 text-[9px] bg-primary text-on-primary px-1.5 py-0.2 rounded-full font-bold">
              ¡La real!
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-primary bg-primary-fixed px-1.5 py-0.5 rounded">
                TCEA
              </span>
              <p className="text-xs font-bold text-on-surface mt-1">Costo Efectivo</p>
            </div>
            <p className="text-[11px] text-on-surface mt-1 leading-snug font-medium">
              {tceaTerm.shortDesc}
            </p>
          </div>

          {/* TREA */}
          <div
            onClick={() => setSelectedTermId('trea')}
            className={`p-2.5 rounded-2xl shadow-xs flex flex-col justify-between cursor-pointer transition-all ${
              selectedTermId === 'trea'
                ? 'bg-surface-container-low border-2 border-primary shadow-sm'
                : 'bg-surface-container-lowest border border-surface-container hover:border-primary/50'
            }`}
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded">
                TREA
              </span>
              <p className="text-xs font-bold text-on-surface mt-1">{treaTerm.name}</p>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
              {treaTerm.shortDesc}
            </p>
          </div>
        </div>

        {/* Selected Term Detail Box */}
        <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-xs border border-surface-container flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {currentTerm.badge}
            </span>
            <button
              onClick={() => onToggleBookmark(currentTerm.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-secondary-fixed text-secondary'
                  : 'bg-surface-container-low text-outline hover:text-secondary'
              }`}
              title={isBookmarked ? 'Guardado en favoritos' : 'Guardar en favoritos'}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            </button>
          </div>

          <div>
            <h3 className="text-base text-on-surface font-extrabold flex items-center gap-2">
              {currentTerm.sigla} ({currentTerm.name})
            </h3>
            <p className="text-xs text-on-surface mt-1 leading-relaxed">
              {currentTerm.explanation}
            </p>
          </div>

          <div className="pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant text-[11px]">
            <span className="flex items-center gap-1">
              💡 <span>{currentTerm.ruleOfGold}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 5. Mis Logros y Medallas */}
      <section className="flex flex-col gap-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-extrabold text-on-surface">Mis Logros</h2>
            <span className="text-base">🎉</span>
          </div>
          <button
            onClick={() => onNavigate('progreso')}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Ver todos (6/12)
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
          {/* Medalla 1: Ahorrador Inicial */}
          <div className="min-w-[145px] max-w-[155px] bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container flex flex-col items-center text-center snap-start">
            <div className="w-11 h-11 rounded-full bg-tertiary-fixed flex items-center justify-center text-xl shadow-xs mb-1.5">
              🏆
            </div>
            <span className="text-[10px] text-primary font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-full mb-1">
              Completado ✓
            </span>
            <h3 className="text-xs font-bold text-on-surface truncate w-full">
              Ahorrador Inicial
            </h3>
            <p className="text-[11px] text-on-surface-variant mt-0.5">+100 XP ganados</p>
          </div>

          {/* Medalla 2: Cero Deuda Oculta */}
          <div className="min-w-[145px] max-w-[155px] bg-surface-container-lowest p-3 rounded-2xl border border-surface-container flex flex-col items-center text-center snap-start">
            <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-xl shadow-xs mb-1.5">
              🛡️
            </div>
            <span className="text-[10px] text-primary font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-full mb-1">
              Completado ✓
            </span>
            <h3 className="text-xs font-bold text-on-surface truncate w-full">
              Cero Deuda Oculta
            </h3>
            <p className="text-[11px] text-on-surface-variant mt-0.5">TCEA entendida</p>
          </div>

          {/* Medalla 3: Racha Semanal (Claimable) */}
          <div className="min-w-[145px] max-w-[155px] bg-secondary-fixed text-on-secondary-fixed p-3 rounded-2xl shadow-xs flex flex-col items-center text-center snap-start relative overflow-hidden">
            <div className="w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center text-xl shadow-xs mb-1.5 animate-bounce">
              ⭐
            </div>
            <span className="text-[10px] text-secondary font-extrabold uppercase tracking-wider mb-1">
              7 de 7 días
            </span>
            <h3 className="text-xs font-bold text-on-secondary-fixed truncate w-full">
              Racha Semanal
            </h3>

            {userState.claimedStreakReward ? (
              <span className="mt-1.5 w-full bg-primary text-on-primary py-1 px-2 rounded-xl text-[11px] font-bold">
                ¡Reclamado! 🎉
              </span>
            ) : (
              <button
                onClick={() => onClaimAchievement('ach-3', 150)}
                className="mt-1.5 w-full bg-secondary-container text-on-primary py-1 px-2 rounded-xl text-[11px] font-bold shadow-xs active:scale-95 transition-transform flex items-center justify-center gap-1 cursor-pointer hover:bg-secondary"
              >
                <span>Reclamar</span> 🎁
              </button>
            )}
          </div>

          {/* Medalla 4: Auditor de Recibos */}
          <div className="min-w-[145px] max-w-[155px] bg-surface-container-low p-3 rounded-2xl flex flex-col items-center text-center snap-start opacity-90 border border-surface-container">
            <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-xl mb-1.5 text-outline">
              📊
            </div>
            <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full mb-1">
              2 / 3 listo
            </span>
            <h3 className="text-xs font-bold text-on-surface truncate w-full">
              Auditor de Recibos
            </h3>
            <p className="text-[11px] text-on-surface-variant mt-0.5">Falta 1 cápsula</p>
          </div>
        </div>
      </section>
    </div>
  );
};
