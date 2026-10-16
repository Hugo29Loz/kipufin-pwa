import React, { useState, useEffect, useRef } from 'react';
import { TopicLesson, UserState } from '../types';
import { Rule503020Calculator } from './Rule503020Calculator';

interface CapsuleDrawerProps {
  lesson: TopicLesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lessonId: string, xp: number) => void;
  onAddXP: (xp: number, reason: string) => void;
  isAlreadyCompleted: boolean;
  userState?: UserState;
  onSaveBudget?: (budget: {
    monthlyIncome: number;
    needs: number;
    wants: number;
    savings: number;
    updatedAt: string;
  }) => void;
}

export const CapsuleDrawer: React.FC<CapsuleDrawerProps> = ({
  lesson,
  isOpen,
  onClose,
  onComplete,
  onAddXP,
  isAlreadyCompleted,
  userState,
  onSaveBudget,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [totalSec, setTotalSec] = useState<number>(230); // ~3:50 default
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [useSpeechFallback, setUseSpeechFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // Mini test state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [hasAnsweredQuiz, setHasAnsweredQuiz] = useState<boolean>(false);

  const activeAudioUrl = uploadedAudioUrl || lesson?.audioUrl || null;

  // Reset state when lesson changes
  useEffect(() => {
    setSelectedQuizOption(null);
    setHasAnsweredQuiz(false);
    setProgressSec(0);
    setIsPlaying(false);
    setUploadedAudioUrl(null);
    setAudioFileName(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [lesson?.id]);

  // Handle HTML5 Audio time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgressSec(Math.floor(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setTotalSec(Math.floor(audio.duration));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgressSec(Math.floor(audio.duration || totalSec));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeAudioUrl, totalSec]);

  // Fallback timer when not using real audio file or speech synthesis
  useEffect(() => {
    if (activeAudioUrl) return; // Managed by audio element
    let interval: NodeJS.Timeout;
    if (isPlaying && !useSpeechFallback) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= totalSec) {
            setIsPlaying(false);
            return totalSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeAudioUrl, useSpeechFallback, totalSec, playbackSpeed]);

  if (!isOpen || !lesson) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (uploadedAudioUrl) {
        URL.revokeObjectURL(uploadedAudioUrl);
      }
      const url = URL.createObjectURL(file);
      setUploadedAudioUrl(url);
      setAudioFileName(file.name);
      setIsPlaying(false);
      setProgressSec(0);
      setUseSpeechFallback(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const togglePlay = () => {
    if (activeAudioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback error:', err);
            setIsPlaying(false);
          });
      }
      return;
    }

    // If no audio file uploaded, optionally use Web Speech API narration in Spanish
    if ('speechSynthesis' in window && !isPlaying) {
      window.speechSynthesis.cancel();
      const narrationText = `${lesson.title}. ${lesson.desc}. ${lesson.conceptTitle}: ${lesson.conceptDesc}. ${lesson.explanationList.map((e) => `${e.title}: ${e.desc}`).join('. ')}. Regla de oro: ${lesson.takeaway}`;
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.lang = 'es-PE';
      utterance.rate = playbackSpeed;

      utterance.onend = () => {
        setIsPlaying(false);
        setUseSpeechFallback(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setUseSpeechFallback(false);
      };

      setUseSpeechFallback(true);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setUseSpeechFallback(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = Math.round(ratio * totalSec);
    setProgressSec(targetSec);
    if (uploadedAudioUrl && audioRef.current) {
      audioRef.current.currentTime = targetSec;
    }
  };

  const handleSkip = (delta: number) => {
    const newSec = Math.max(0, Math.min(totalSec, progressSec + delta));
    setProgressSec(newSec);
    if (activeAudioUrl && audioRef.current) {
      audioRef.current.currentTime = newSec;
    }
  };

  const handleSpeedToggle = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (activeAudioUrl && audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (hasAnsweredQuiz) return;
    setSelectedQuizOption(optionIndex);
    setHasAnsweredQuiz(true);

    if (optionIndex === lesson.quiz.correctIndex) {
      onAddXP(lesson.quiz.xpBonus, `¡Acertaste el Mini Test de "${lesson.category}"!`);
    }
  };

  const handleComplete = () => {
    if (justCompleted) return;
    setJustCompleted(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete(lesson.id, lesson.xpReward);
    setTimeout(() => {
      setJustCompleted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center transition-opacity animate-in fade-in duration-200">
      {/* Hidden audio element for real audio testing */}
      {activeAudioUrl && (
        <audio
          ref={audioRef}
          src={activeAudioUrl}
          preload="auto"
          className="hidden"
        />
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAudioUpload}
        accept="audio/*"
        className="hidden"
      />

      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-t-3xl shadow-2xl p-5 flex flex-col max-h-[90vh] overflow-y-auto transform transition-transform duration-300 border-t border-surface-container"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Drag handle */}
        <div
          onClick={onClose}
          className="w-12 h-1.5 bg-outline-variant/60 hover:bg-outline-variant rounded-full mx-auto mb-3 cursor-pointer"
        />

        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-secondary-fixed flex items-center justify-center text-2xl shrink-0 shadow-xs">
              {lesson.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {lesson.category}
                </span>
                <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded font-bold">
                  {lesson.durationMin} min
                </span>
                {activeAudioUrl && (
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    {uploadedAudioUrl ? 'Audio Personalizado' : 'Audio Oficial KipuFin'}
                  </span>
                )}
              </div>
              <h3 className="text-base text-on-surface font-extrabold leading-tight mt-1">
                {lesson.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer transition-colors"
            title="Cerrar"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Interactive Audio Player with Real Audio & File Test */}
        <div className="mt-3.5 p-3.5 bg-surface-container-low rounded-2xl border border-surface-container flex flex-col gap-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-on-surface">
            <div className="flex items-center gap-1.5">
              <span
                className={`material-symbols-outlined text-primary text-base ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                graphic_eq
              </span>
              <span>Modo Audio Guiado</span>
              {isPlaying && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-primary text-on-primary font-semibold">
                  {activeAudioUrl ? 'Reproduciendo Audio Oficial' : 'Narración activa'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeedToggle}
                className="text-[10px] bg-surface-container px-2 py-0.5 rounded-md font-mono font-bold text-on-surface hover:bg-surface-container-high transition-colors"
                title="Cambiar velocidad de reproducción"
              >
                {playbackSpeed}x
              </button>
              <span className="text-on-surface-variant font-mono font-normal text-[11px]">
                {formatTime(progressSec)} / {formatTime(totalSec)}
              </span>
            </div>
          </div>

          {/* Scrubber bar */}
          <div
            onClick={handleSeek}
            className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden cursor-pointer relative group"
            title="Haz clic para avanzar o retroceder"
          >
            <div
              className="bg-secondary-container h-full rounded-full transition-all group-hover:bg-secondary"
              style={{ width: `${Math.min(100, (progressSec / (totalSec || 1)) * 100)}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Audio Upload / Test button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-semibold text-primary hover:text-primary-container flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg border border-surface-container-high transition-colors cursor-pointer"
              title="Cargar archivo MP3 para probar la lección (ej. leccion1.mp3)"
            >
              <span className="material-symbols-outlined text-sm">audio_file</span>
              <span className="truncate max-w-[110px]">
                {audioFileName ? audioFileName : 'Probar MP3'}
              </span>
            </button>

            {/* Play / Skip buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSkip(-10)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer transition-colors"
                title="Retroceder 10 segundos"
              >
                <span className="material-symbols-outlined text-xl">replay_10</span>
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer hover:bg-primary-container"
                title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                onClick={() => handleSkip(10)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer transition-colors"
                title="Adelantar 10 segundos"
              >
                <span className="material-symbols-outlined text-xl">forward_10</span>
              </button>
            </div>

            {/* Transcript toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`text-[11px] font-semibold px-2 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                showTranscript
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container text-on-surface border-surface-container-high hover:bg-surface-container-high'
              }`}
              title="Ver transcripción del audio"
            >
              <span className="material-symbols-outlined text-sm">subtitles</span>
              <span>Guión</span>
            </button>
          </div>

          {/* Transcript drawer / panel */}
          {showTranscript && (
            <div className="mt-2 p-3 bg-surface-container-lowest rounded-xl border border-surface-container text-xs text-on-surface space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-primary font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  Guión y Transcripción del Audio
                </span>
                <span className="text-[10px] text-on-surface-variant font-normal">
                  {lesson.audioDuration}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed italic bg-surface-container-low/50 p-2.5 rounded-lg border border-surface-container">
                &ldquo;{lesson.audioTranscript || `Hola, bienvenido a la cápsula de ${lesson.category} en KipuFin. Hoy aprenderás: ${lesson.title}. ${lesson.desc}`}&rdquo;
              </p>
              <div className="text-[11px] space-y-1.5 pt-1 border-t border-surface-container">
                <p className="font-bold text-on-surface text-[10px] uppercase tracking-wider text-primary">
                  Puntos Clave del Audio:
                </p>
                {lesson.explanationList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                    <span className="text-secondary font-bold text-xs leading-none">•</span>
                    <span>
                      <strong>{item.title}:</strong> {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 1. Explicación Didáctica Completa */}
        <div className="mt-3.5 space-y-3 text-sm text-on-surface leading-relaxed">
          {/* Término sin tecnicismos */}
          <div className="bg-primary-fixed/20 p-3.5 rounded-2xl border border-primary-fixed/60">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <span className="text-base">💡</span>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                {lesson.conceptTitle}
              </h4>
            </div>
            <p className="text-xs text-on-surface-variant mb-2">
              {lesson.conceptDesc}
            </p>

            <div className="pt-2 border-t border-primary-fixed/50">
              <p className="text-[11px] font-bold text-on-surface uppercase tracking-wide mb-1.5">
                📖 Desglose con peras y manzanas:
              </p>
              <ul className="space-y-1.5 text-xs text-on-surface">
                {lesson.explanationList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold text-base leading-none">•</span>
                    <span>
                      <strong>{item.title}:</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Regla de oro */}
          <div className="p-3 bg-surface-container-low rounded-2xl border border-surface-container text-xs text-on-surface flex items-start gap-2">
            <span className="text-base select-none">📌</span>
            <div>
              <p className="font-bold text-on-surface mb-0.5">
                Regla de oro KipuFin:
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                {lesson.takeaway}
              </p>
            </div>
          </div>

          {/* Calculador Automático 50/30/20 para eliminar fricción matemática */}
          {lesson.id === 'les-ahorro-1' && (
            <div className="pt-1">
              <Rule503020Calculator
                userState={userState}
                currencySymbol={userState?.currencySymbol || 'S/'}
                onSaveBudget={onSaveBudget}
                onAddXP={onAddXP}
              />
            </div>
          )}

          {/* 2. MINI TEST INTERACTIVO INCORPORADO */}
          <div className="p-3.5 bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl border-2 border-primary/40 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🎯</span>
                <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">
                  Mini Test de Comprobación
                </h4>
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                +{lesson.quiz.xpBonus} XP Bono
              </span>
            </div>

            <p className="text-xs font-bold text-on-surface leading-snug">
              {lesson.quiz.question}
            </p>

            {/* Opciones del Mini Test */}
            <div className="space-y-1.5 pt-1">
              {lesson.quiz.options.map((option, idx) => {
                const isSelected = selectedQuizOption === idx;
                const isCorrect = idx === lesson.quiz.correctIndex;

                let btnStyles =
                  'bg-surface-container-lowest border-surface-container text-on-surface hover:border-primary/50';

                if (hasAnsweredQuiz) {
                  if (isCorrect) {
                    btnStyles = 'bg-green-50 border-green-500 text-green-900 font-bold';
                  } else if (isSelected) {
                    btnStyles = 'bg-red-50 border-red-400 text-red-900 font-semibold';
                  } else {
                    btnStyles = 'bg-surface-container-lowest border-surface-container opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={hasAnsweredQuiz}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {hasAnsweredQuiz && isCorrect && (
                      <span className="material-symbols-outlined text-green-600 text-base shrink-0">
                        check_circle
                      </span>
                    )}
                    {hasAnsweredQuiz && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-red-500 text-base shrink-0">
                        cancel
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación del Mini Test */}
            {hasAnsweredQuiz && (
              <div
                className={`p-2.5 rounded-xl text-xs mt-2 border flex items-start gap-2 ${
                  selectedQuizOption === lesson.quiz.correctIndex
                    ? 'bg-green-50/80 border-green-300 text-green-900'
                    : 'bg-orange-50/80 border-orange-300 text-orange-950'
                }`}
              >
                <span className="text-base">
                  {selectedQuizOption === lesson.quiz.correctIndex ? '🌟' : '💡'}
                </span>
                <div>
                  <p className="font-bold">
                    {selectedQuizOption === lesson.quiz.correctIndex
                      ? '¡Excelente deducción! (+25 XP)'
                      : '¡Casi! Pero toma nota:'}
                  </p>
                  <p className="text-[11px] mt-0.5 leading-snug">
                    {lesson.quiz.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-lg">
              verified
            </span>
            <span className="text-xs font-bold text-primary">
              +{lesson.xpReward} XP al completar
            </span>
          </div>

          <button
            onClick={handleComplete}
            disabled={justCompleted}
            className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 ${
              justCompleted
                ? 'bg-secondary-container text-on-primary'
                : isAlreadyCompleted
                ? 'bg-primary-container text-on-primary'
                : 'bg-primary hover:bg-primary-container text-on-primary'
            }`}
          >
            {justCompleted ? (
              <span>¡Completada! +{lesson.xpReward} XP 🌟</span>
            ) : isAlreadyCompleted ? (
              <span>Repasar y marcar de nuevo ✓</span>
            ) : (
              <span>Marcar como aprendida 🎉</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
