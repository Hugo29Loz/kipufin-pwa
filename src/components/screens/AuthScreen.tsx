import React, { useState } from 'react';
import { KipuFinLogo } from '../KipuFinLogo';

interface AuthScreenProps {
  onAuthSuccess: (userData: {
    name: string;
    email: string;
    financialGoal: string;
    isNewUser: boolean;
  }) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Aprender a ahorrar (Regla 50/30/20)');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const goalOptions = [
    { id: 'ahorro', label: '🐷 Aprender a ahorrar sin sufrir (Regla 50/30/20)' },
    { id: 'tarjetas', label: '💳 Dominar tarjetas y nunca pagar intereses de más (TCEA)' },
    { id: 'emergencia', label: '🛟 Armar mi primer colchón de emergencia de S/ 1,000' },
    { id: 'trea', label: '📈 Hacer crecer mis ahorros conociendo la TREA real' },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre o apodo para personalizar tu panel.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: name.trim(),
        email: email.trim(),
        financialGoal: selectedGoal,
        isNewUser: true,
      });
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor ingresa tu correo electrónico registrado.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Por favor ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Derive nice name from email if not filled
      const derivedName = name.trim() || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
      onAuthSuccess({
        name: derivedName,
        email: email.trim(),
        financialGoal: selectedGoal,
        isNewUser: false,
      });
    }, 450);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Mateo',
        email: 'mateo@kipufin.pe',
        financialGoal: 'Dominar tarjetas y TCEA',
        isNewUser: false,
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9f5] via-surface to-surface flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-[#ffb955]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto z-10 flex flex-col gap-5">
        {/* Top Branding Section */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="p-3 bg-surface-container-lowest rounded-3xl shadow-[0_4px_20px_rgba(0,105,72,0.08)] border border-surface-container">
            <KipuFinLogo size="lg" showSubtitle={false} />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-primary-fixed/60 text-on-primary-fixed px-3 py-1 rounded-full text-xs font-extrabold tracking-wide">
              <span>🇵🇪</span>
              <span>Educación Financiera en Cristiano</span>
            </div>
            <h1 className="text-2xl font-black text-on-surface tracking-tight leading-tight">
              Aprende a cuidar tus <span className="text-primary underline decoration-primary-fixed underline-offset-4">Soles</span>
            </h1>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
              Sin tecnicismos bancarios ni letra chica. Domina la TCEA, cuotas y microahorros en lecciones de 4 minutos.
            </p>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-surface-container-lowest p-2 rounded-2xl border border-surface-container shadow-2xs">
            <span className="text-sm block">💡</span>
            <span className="text-[10px] font-bold text-on-surface leading-tight block mt-0.5">
              Cero Tecnicismos
            </span>
          </div>
          <div className="bg-surface-container-lowest p-2 rounded-2xl border border-surface-container shadow-2xs">
            <span className="text-sm block">🧮</span>
            <span className="text-[10px] font-bold text-on-surface leading-tight block mt-0.5">
              Simulador Real
            </span>
          </div>
          <div className="bg-surface-container-lowest p-2 rounded-2xl border border-surface-container shadow-2xs">
            <span className="text-sm block">🔥</span>
            <span className="text-[10px] font-bold text-on-surface leading-tight block mt-0.5">
              Rachas & XP
            </span>
          </div>
        </div>

        {/* Main Card (Login / Register) */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col gap-4">
          {/* Segmented Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-surface-container rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Crear Cuenta
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-error rounded-xl p-2.5 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-sm shrink-0">error</span>
              <span className="leading-tight">{errorMsg}</span>
            </div>
          )}

          {/* Form Content */}
          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
              {/* Nombre */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Tu Nombre o Apodo:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                    person
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Mateo Lozano"
                    className="w-full bg-surface-container-low text-on-surface pl-9 pr-3 py-2 rounded-xl text-xs border border-surface-container focus:outline-none focus:border-primary font-medium"
                    required
                  />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-surface-container-low text-on-surface pl-9 pr-3 py-2 rounded-xl text-xs border border-surface-container focus:outline-none focus:border-primary font-medium"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Contraseña:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    className="w-full bg-surface-container-low text-on-surface pl-9 pr-10 py-2 rounded-xl text-xs border border-surface-container focus:outline-none focus:border-primary font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface text-base cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Meta Financiera Principal */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  ¿Cuál es tu meta principal al empezar?
                </label>
                <div className="flex flex-col gap-1.5">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedGoal(opt.label)}
                      className={`text-left p-2 rounded-xl text-[11px] font-medium border transition-all cursor-pointer flex items-center justify-between ${
                        selectedGoal === opt.label
                          ? 'bg-primary-fixed/30 border-primary text-primary font-bold shadow-2xs'
                          : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="leading-tight">{opt.label}</span>
                      {selectedGoal === opt.label && (
                        <span className="material-symbols-outlined text-sm text-primary">
                          check_circle
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus XP Banner */}
              <div className="bg-primary-fixed/20 border border-primary/20 rounded-2xl p-2.5 flex items-center gap-2">
                <span className="text-lg">🎁</span>
                <p className="text-[11px] text-primary font-bold leading-snug">
                  ¡Bono de bienvenida! Recibe <strong>+50 XP</strong> y activa tu racha de 1 día al registrarte hoy.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-2xl text-xs font-bold transition-all shadow-[0_2px_8px_rgba(0,105,72,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-1"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creando tu cuenta...</span>
                  </>
                ) : (
                  <>
                    <span>Crear Cuenta y Empezar (+50 XP)</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              {/* Correo */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com o mateo@kipufin.pe"
                    className="w-full bg-surface-container-low text-on-surface pl-9 pr-3 py-2 rounded-xl text-xs border border-surface-container focus:outline-none focus:border-primary font-medium"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Contraseña:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña secreta"
                    className="w-full bg-surface-container-low text-on-surface pl-9 pr-10 py-2 rounded-xl text-xs border border-surface-container focus:outline-none focus:border-primary font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface text-base cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recordar sesión */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-on-surface select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-primary focus:ring-primary w-3.5 h-3.5"
                  />
                  <span>Recordar mi sesión</span>
                </label>
                <button
                  type="button"
                  onClick={() => setErrorMsg('Para recuperar tu clave contáctanos en Soporte WhatsApp.')}
                  className="text-primary hover:underline font-bold text-[11px]"
                >
                  ¿Olvidaste tu clave?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-2xl text-xs font-bold transition-all shadow-[0_2px_8px_rgba(0,105,72,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-1"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar a KipuFin</span>
                    <span className="material-symbols-outlined text-sm">login</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-surface-container" />
            <span className="shrink mx-2 text-[10px] text-outline uppercase font-bold tracking-wider">
              O prueba rápida
            </span>
            <div className="flex-grow border-t border-surface-container" />
          </div>

          {/* Demo Instant Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface py-2.5 px-3 rounded-2xl text-xs font-bold transition-all border border-surface-container flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>⚡ Explorar como Mateo (Demo • Nivel 3)</span>
          </button>
        </div>

        {/* Security / Privacy reassurance footer */}
        <div className="text-center space-y-1">
          <p className="text-[11px] text-on-surface-variant flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
            <span>Tus datos están protegidos. KipuFin nunca pide contraseñas bancarias.</span>
          </p>
          <p className="text-[10px] text-outline">
            Hecho con ❤️ para la educación financiera en el Perú • Versión 2.0
          </p>
        </div>
      </div>
    </div>
  );
};
