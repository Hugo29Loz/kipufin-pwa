import React, { useState } from 'react';
import { AVATAR_URL } from '../../data/mockData';
import { UserState } from '../../types';

interface PerfilScreenProps {
  userState: UserState;
  onUpdateName: (newName: string) => void;
  onUpdateCurrency: (currency: string) => void;
  onAddXP: (xp: number, reason: string) => void;
  onResetProgress: () => void;
}

export const PerfilScreen: React.FC<PerfilScreenProps> = ({
  userState,
  onUpdateName,
  onUpdateCurrency,
  onAddXP,
  onResetProgress,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userState.name);
  const [goals, setGoals] = useState([
    { id: 'g-1', title: 'Fondo de Emergencia (Colchón en Soles)', current: 1200, target: 3000, icon: '🛟' },
    { id: 'g-2', title: 'Vacaciones en Máncora sin deuda', current: 450, target: 1200, icon: '✈️' },
    { id: 'g-3', title: 'Renovación de Laptop para chamba', current: 1400, target: 2800, icon: '💻' },
  ]);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('500');

  // Support section state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState<'error' | 'duda' | 'sugerencia'>('error');
  const [reportMessage, setReportMessage] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // WhatsApp support phone / link (customizable)
  const WHATSAPP_NUMBER = '51987654321';
  const OFFICIAL_WEBSITE = 'https://kipufin.com/ayuda';

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  const handleCreateGoal = () => {
    if (!newGoalTitle.trim()) return;
    const targetVal = parseFloat(newGoalTarget) || 500;
    setGoals((prev) => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        title: newGoalTitle.trim(),
        current: 0,
        target: targetVal,
        icon: '🎯',
      },
    ]);
    setNewGoalTitle('');
    setShowNewGoalModal(false);
    onAddXP(25, '¡Fijaste una nueva meta financiera!');
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const textToSend =
      customText ||
      `Hola equipo de KipuFin 👋, soy ${userState.name} (Nivel ${userState.level}). Tengo una consulta sobre la app:`;
    const encoded = encodeURIComponent(textToSend);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWebsite = () => {
    window.open(OFFICIAL_WEBSITE, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitReport = (viaWhatsApp: boolean = false) => {
    if (!reportMessage.trim()) return;

    if (viaWhatsApp) {
      const categoryLabel =
        reportCategory === 'error'
          ? '🐛 Reporte de Error'
          : reportCategory === 'duda'
          ? '❓ Duda sobre Lección'
          : '💡 Sugerencia';
      const msg = `Hola equipo de KipuFin 👋.\n\n*${categoryLabel}*\n*Usuario:* ${userState.name} (Nv. ${userState.level})\n*Detalle:* ${reportMessage.trim()}\n\n¿Me podrían ayudar?`;
      handleOpenWhatsApp(msg);
      setShowReportModal(false);
      setReportMessage('');
    } else {
      setReportSubmitted(true);
      setTimeout(() => {
        setReportSubmitted(false);
        setShowReportModal(false);
        setReportMessage('');
        onAddXP(15, '¡Gracias por ayudarnos a mejorar KipuFin!');
      }, 1500);
    }
  };

  const faqs = [
    {
      q: '¿Cómo contacto a soporte si tengo un error en un cálculo?',
      a: 'Puedes escribirnos directamente a nuestro WhatsApp Business oficial haciendo clic en el botón verde. Nuestro equipo te responde en menos de 15 minutos en horario comercial.',
    },
    {
      q: '¿KipuFin me pedirá claves bancarias o números de tarjeta?',
      a: '¡Jamás! KipuFin es una plataforma 100% educativa y segura. Nunca te pediremos contraseñas, números de tarjeta ni accesos bancarios.',
    },
    {
      q: '¿Por qué la TCEA siempre es más alta que la TEA?',
      a: 'Porque la TEA es la tasa limpia teórica, mientras que la TCEA suma de forma obligatoria los seguros (como desgravamen) y cargos de emisión. Puedes consultar el Diccionario para ver el desglose.',
    },
    {
      q: '¿Se guarda mi racha y mis puntos si cierro la app?',
      a: 'Sí, tu racha de días, XP y medallas se guardan automáticamente en tu dispositivo. Si tienes problemas para sincronizar, contáctanos por WhatsApp.',
    },
  ];

  return (
    <div className="flex flex-col w-full gap-4 pt-1">
      {/* Profile Card */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container shadow-xs flex flex-col items-center text-center relative">
        <div className="relative mb-2">
          <img
            src={AVATAR_URL}
            alt="Mateo"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-fixed shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-primary text-on-primary rounded-full flex items-center justify-center text-xs">
            ✓
          </span>
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-1.5 mt-1">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-surface-container-low text-on-surface px-2 py-1 rounded-xl text-sm font-bold border border-surface-container text-center"
            />
            <button
              onClick={handleSaveName}
              className="bg-primary text-on-primary px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mt-1">
            <h2 className="text-lg text-on-surface font-extrabold">{userState.name}</h2>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-outline hover:text-on-surface p-1 cursor-pointer"
              title="Editar nombre"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
        )}

        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
          Curioso Financiero • Nivel {userState.level}
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-3 border-t border-surface-container">
          <div className="flex flex-col items-center">
            <span className="text-base font-extrabold text-primary font-mono">
              {userState.currentXP}
            </span>
            <span className="text-[10px] text-on-surface-variant font-semibold">XP Ganados</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-extrabold text-secondary font-mono">
              {userState.streakDays}
            </span>
            <span className="text-[10px] text-on-surface-variant font-semibold">Días en Racha</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-extrabold text-tertiary font-mono">
              {userState.completedLessons.length}
            </span>
            <span className="text-[10px] text-on-surface-variant font-semibold">Cápsulas</span>
          </div>
        </div>
      </div>

      {/* SECCIÓN NUEVA: Soporte y Atención al Cliente */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">💬</span>
            <div>
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Centro de Ayuda & Atención
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                ¿Tienes alguna duda o encontraste un error? Estamos para ayudarte
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            En línea
          </span>
        </div>

        {/* Botones de Canales Oficiales: WhatsApp Business y Página Web */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Canal 1: WhatsApp Business */}
          <button
            onClick={() => handleOpenWhatsApp()}
            className="p-3 bg-gradient-to-r from-[#25D366]/15 to-[#128C7E]/10 hover:from-[#25D366]/25 hover:to-[#128C7E]/20 border border-[#25D366]/40 rounded-2xl flex items-center justify-between gap-3 text-left transition-all active:scale-[0.98] cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-lg font-bold">📱</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold text-on-surface">WhatsApp Business</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-tight">
                  Atención directa • Respuesta &lt; 15 min
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#128C7E]">
              arrow_forward
            </span>
          </button>

          {/* Canal 2: Página Web Oficial */}
          <button
            onClick={handleOpenWebsite}
            className="p-3 bg-surface-container-low hover:bg-surface-container border border-surface-container rounded-2xl flex items-center justify-between gap-3 text-left transition-all active:scale-[0.98] cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-xl">language</span>
              </div>
              <div>
                <span className="text-xs font-extrabold text-on-surface">Página Web Oficial</span>
                <p className="text-[11px] text-on-surface-variant leading-tight">
                  kipufin.com/ayuda • Guías y FAQs
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-outline">
              open_in_new
            </span>
          </button>
        </div>

        {/* Botón para reportar error o enviar sugerencia desde la app */}
        <div className="pt-1">
          <button
            onClick={() => setShowReportModal(true)}
            className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface py-2.5 px-3 rounded-2xl text-xs font-bold border border-surface-container flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-base">
              report_problem
            </span>
            <span>Reportar un error técnico o hacer una consulta</span>
          </button>
        </div>

        {/* Preguntas frecuentes rápidas */}
        <div className="pt-2 border-t border-surface-container space-y-1.5">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Preguntas Frecuentes Rápidas
          </p>

          <div className="space-y-1">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-surface-container overflow-hidden bg-surface-container-low/60"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-2.5 text-left flex items-center justify-between text-xs font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-sm text-outline-variant shrink-0 ml-1">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-2.5 pt-0 text-[11px] text-on-surface-variant leading-relaxed bg-surface-container-low border-t border-surface-container/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Termómetro de Salud Financiera */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🩺</span>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Termómetro KipuFin
            </h3>
          </div>
          <span className="text-xs font-extrabold text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded-full">
            84 / 100 • Saludable
          </span>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-on-surface mb-0.5">
              <span>Hábito de Ahorro (Regla 50/30/20)</span>
              <span className="font-bold text-primary">85%</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-on-surface mb-0.5">
              <span>Control de Tarjetas & TCEA</span>
              <span className="font-bold text-primary">92%</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-on-surface mb-0.5">
              <span>Cero Gastos Vampiro & Fugas</span>
              <span className="font-bold text-secondary">74%</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-secondary-container h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-2.5 rounded-xl text-xs text-on-surface-variant border border-surface-container flex items-start gap-1.5">
          <span>💡</span>
          <p className="leading-snug">
            <strong>Diagnóstico:</strong> Manejas muy bien las fechas de corte. Para subir a 90+,
            continúa automatizando el 20% de tu sueldo apenas lo cobras.
          </p>
        </div>
      </div>

      {/* Metas Activas de Ahorro */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🎯</span>
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Tus Metas Activas
            </h3>
          </div>
          <button
            onClick={() => setShowNewGoalModal(true)}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            + Nueva Meta
          </button>
        </div>

        <div className="space-y-2.5">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100));
            return (
              <div
                key={g.id}
                className="p-3 bg-surface-container-low rounded-2xl border border-surface-container space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{g.icon}</span>
                    <span className="font-bold text-on-surface">{g.title}</span>
                  </div>
                  <span className="font-bold text-primary font-mono text-[11px]">
                    {userState.currencySymbol} {g.current.toLocaleString()} / {userState.currencySymbol} {g.target.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>

                <div className="flex justify-between text-[10px] text-on-surface-variant">
                  <span>{pct}% completado</span>
                  <span>Faltan {userState.currencySymbol} {Math.max(0, g.target - g.current).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ajustes de Preferencias */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Preferencias de Aprendizaje
        </h3>

        {/* Currency selector */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface">Moneda de visualización:</span>
          <div className="flex bg-surface-container p-0.5 rounded-xl">
            {['S/', '$', '€'].map((sym) => (
              <button
                key={sym}
                onClick={() => onUpdateCurrency(sym)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                  userState.currencySymbol === sym
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {sym === 'S/' ? 'S/ (Soles)' : sym}
              </button>
            ))}
          </div>
        </div>

        {/* Bonus XP for testing */}
        <div className="pt-2 border-t border-surface-container flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">Probar subida de nivel:</span>
          <button
            onClick={() => onAddXP(100, '¡Bonus de prueba +100 XP!')}
            className="bg-primary-fixed text-on-primary-fixed px-3 py-1.5 rounded-full text-xs font-bold hover:bg-primary-fixed-dim transition-colors cursor-pointer"
          >
            +100 XP Bonus ⚡
          </button>
        </div>

        {/* Reset progress */}
        <div className="pt-1 flex items-center justify-between">
          <span className="text-xs text-outline">Reiniciar datos de demo:</span>
          <button
            onClick={onResetProgress}
            className="text-xs text-error hover:underline cursor-pointer"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Modal para Reportar Error o Hacer Consulta */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 border border-surface-container shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛠️</span>
                <h3 className="text-sm font-extrabold text-on-surface">
                  ¿Cómo te podemos ayudar?
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <span className="text-4xl block">🎉</span>
                <p className="text-sm font-bold text-primary">¡Reporte recibido con éxito!</p>
                <p className="text-xs text-on-surface-variant">
                  Nuestro equipo de atención revisará tu mensaje de inmediato.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-on-surface-variant">
                  Selecciona el tipo de consulta y envíanos tu mensaje por el canal que prefieras:
                </p>

                {/* Tipo de consulta */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setReportCategory('error')}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      reportCategory === 'error'
                        ? 'bg-red-50 border-red-300 text-red-800 shadow-xs'
                        : 'bg-surface-container-low border-surface-container text-on-surface-variant'
                    }`}
                  >
                    🐛 Error / Bug
                  </button>
                  <button
                    onClick={() => setReportCategory('duda')}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      reportCategory === 'duda'
                        ? 'bg-primary-fixed/30 border-primary-fixed text-primary shadow-xs'
                        : 'bg-surface-container-low border-surface-container text-on-surface-variant'
                    }`}
                  >
                    ❓ Duda lección
                  </button>
                  <button
                    onClick={() => setReportCategory('sugerencia')}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      reportCategory === 'sugerencia'
                        ? 'bg-secondary-fixed/40 border-secondary-fixed text-secondary shadow-xs'
                        : 'bg-surface-container-low border-surface-container text-on-surface-variant'
                    }`}
                  >
                    💡 Sugerencia
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-on-surface block mb-1">
                    Cuéntanos el detalle:
                  </label>
                  <textarea
                    rows={3}
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Ej: Tengo una duda con el cálculo de la TCEA en el simulador..."
                    className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {/* Botón WhatsApp Business */}
                  <button
                    onClick={() => handleSubmitReport(true)}
                    disabled={!reportMessage.trim()}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      reportMessage.trim()
                        ? 'bg-[#25D366] hover:bg-[#20ba5a] text-white'
                        : 'bg-surface-container text-outline-variant cursor-not-allowed'
                    }`}
                  >
                    <span>💬 Enviar directo a WhatsApp Business</span>
                  </button>

                  {/* Botón Enviar ticket interno */}
                  <button
                    onClick={() => handleSubmitReport(false)}
                    disabled={!reportMessage.trim()}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      reportMessage.trim()
                        ? 'bg-surface-container-lowest text-primary border-primary hover:bg-surface-container-low'
                        : 'bg-surface-container-low text-outline-variant border-surface-container cursor-not-allowed'
                    }`}
                  >
                    <span>Enviar como ticket en la app</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 border border-surface-container shadow-2xl flex flex-col gap-3">
            <h3 className="text-base font-extrabold text-on-surface">Nueva Meta de Ahorro</h3>

            <div>
              <label className="text-xs font-medium text-on-surface block mb-1">Nombre de la meta:</label>
              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Ej: Curso de programación, Moto..."
                className="w-full bg-surface-container-low text-on-surface p-2 rounded-xl text-xs border border-surface-container"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-on-surface block mb-1">
                Monto objetivo ({userState.currencySymbol}):
              </label>
              <input
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="Ej: 800"
                className="w-full bg-surface-container-low text-on-surface p-2 rounded-xl text-xs border border-surface-container"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowNewGoalModal(false)}
                className="flex-1 bg-surface-container-low text-on-surface py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateGoal}
                className="flex-1 bg-primary text-on-primary py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Crear Meta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
