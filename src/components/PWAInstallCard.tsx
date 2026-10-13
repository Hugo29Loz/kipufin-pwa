import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallCard: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'success'>('idle');

  const handleInstallClick = async () => {
    setInstallState('installing');
    const success = await install();
    if (success) {
      setInstallState('success');
    } else {
      setInstallState('idle');
    }
  };

  return (
    <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📱</span>
          <div>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Instalar KipuFin en tu Teléfono
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Acceso rápido directo desde tu pantalla de inicio sin ocupar memoria
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-surface-container-low rounded-2xl border border-surface-container flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/logo.png"
            alt="KipuFin Icon"
            className="w-12 h-12 rounded-2xl shadow-xs ring-1 ring-primary/20 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-on-surface">KipuFin</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant truncate">
              KipuFin - Educación Financiera
            </p>
            <p className="text-[10px] text-outline">
              Ícono oficial • Nombre corto: KipuFin
            </p>
          </div>
        </div>

        {isInstalled ? (
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Instalada</span>
          </div>
        ) : isInstallable ? (
          <button
            onClick={handleInstallClick}
            disabled={installState === 'installing'}
            className="shrink-0 bg-primary hover:bg-primary-container text-on-primary px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>{installState === 'installing' ? 'Instalando...' : 'Instalar'}</span>
          </button>
        ) : isIOS ? (
          <button
            onClick={() => setShowIOSModal(true)}
            className="shrink-0 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">ios_share</span>
            <span>En iPhone</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSModal(true)}
            className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-outline/20"
          >
            <span className="material-symbols-outlined text-sm">info</span>
            <span>Ver cómo</span>
          </button>
        )}
      </div>

      {/* iOS & Manual instructions modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 border border-surface-container shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="KipuFin" className="w-8 h-8 rounded-xl" />
                <h3 className="text-sm font-bold text-on-surface">
                  Instalar KipuFin en tu pantalla
                </h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-on-surface-variant">
              <div className="flex items-start gap-2.5 p-2.5 bg-surface-container-low rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p>
                  En tu navegador (Chrome o Safari), pulsa el botón de <strong>Compartir</strong> o el menú de <strong>tres puntos (⋮)</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-surface-container-low rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p>
                  Selecciona la opción <strong>&quot;Agregar a la pantalla de inicio&quot;</strong> o <strong>&quot;Instalar aplicación&quot;</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-surface-container-low rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p>
                  Verás el ícono oficial de <strong>KipuFin</strong> y el nombre corto limpio. ¡Pulsa <strong>Agregar</strong> y listo!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-primary text-on-primary py-2.5 rounded-2xl text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
