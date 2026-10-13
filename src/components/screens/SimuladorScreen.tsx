import React, { useState } from 'react';
import { UserState } from '../../types';

interface SimuladorScreenProps {
  userState: UserState;
  initialAmount?: number;
  onAddXP: (xp: number, reason: string) => void;
}

export const SimuladorScreen: React.FC<SimuladorScreenProps> = ({
  userState,
  initialAmount = 180,
  onAddXP,
}) => {
  const [activeTab, setActiveTab] = useState<'capricho' | 'cuotas' | 'fondo'>('cuotas');

  // Simulator 1: Capricho
  const [caprichoName, setCaprichoName] = useState<string>('Celular o Capricho');
  const [caprichoPrice, setCaprichoPrice] = useState<number>(initialAmount);
  const [disposableIncome, setDisposableIncome] = useState<number>(500);
  const [hourlyWage, setHourlyWage] = useState<number>(10);

  // Simulator 2: Cuotas & TCEA
  const [loanAmount, setLoanAmount] = useState<number>(initialAmount > 0 ? initialAmount : 1200);
  const [installments, setInstallments] = useState<number>(6);
  const [tceaRate, setTceaRate] = useState<number>(45); // 45%
  const [hasSimulatedLoan, setHasSimulatedLoan] = useState<boolean>(false);

  // Simulator 3: Emergency Fund
  const [monthlyBasicExpenses, setMonthlyBasicExpenses] = useState<number>(700);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(1200);
  const [monthlySavingCapacity, setMonthlySavingCapacity] = useState<number>(200);

  // Capricho calculations
  const caprichoRatio = Math.round((caprichoPrice / Math.max(1, disposableIncome)) * 100);
  const hoursOfWork = Math.round(caprichoPrice / Math.max(1, hourlyWage));

  // Cuotas calculations
  // Monthly rate derived from TCEA
  const monthlyRate = Math.pow(1 + tceaRate / 100, 1 / 12) - 1;
  let monthlyPayment = 0;
  if (installments === 1) {
    monthlyPayment = loanAmount;
  } else if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, installments))) /
      (Math.pow(1 + monthlyRate, installments) - 1);
  } else {
    monthlyPayment = loanAmount / installments;
  }

  // Insurance desgravamen addition (typical flat $3 or 0.3% per month)
  const monthlyDesgravamen = 2.5;
  const totalMonthlyFee = monthlyPayment + (installments > 1 ? monthlyDesgravamen : 0);
  const totalPaid = installments === 1 ? loanAmount : totalMonthlyFee * installments;
  const extraCost = Math.max(0, totalPaid - loanAmount);
  const overpayPercent = Math.round((extraCost / Math.max(1, loanAmount)) * 100);

  // Emergency Fund calculations
  const totalFundTarget = monthlyBasicExpenses * targetMonths;
  const fundDeficit = Math.max(0, totalFundTarget - currentSavings);
  const monthsToReach =
    monthlySavingCapacity > 0 ? Math.ceil(fundDeficit / monthlySavingCapacity) : 99;
  const fundProgress = Math.min(100, Math.round((currentSavings / Math.max(1, totalFundTarget)) * 100));

  const handleRunLoanSimulation = () => {
    if (!hasSimulatedLoan) {
      setHasSimulatedLoan(true);
      onAddXP(30, '¡Simulaste cuotas y descubriste el costo real!');
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 pt-1">
      {/* Screen Title */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-md font-extrabold uppercase">
            Herramientas interactivas
          </span>
        </div>
        <h1 className="text-2xl text-on-surface font-extrabold mt-1">
          Simuladores Financieros 🧮
        </h1>
        <p className="text-xs text-on-surface-variant">
          Calcula cuotas reales, descubre cuánto regalas en intereses y decide tus compras sin culpa.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('cuotas')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
            activeTab === 'cuotas'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>💳 Cuotas & TCEA</span>
        </button>
        <button
          onClick={() => setActiveTab('capricho')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
            activeTab === 'capricho'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>⚖️ ¿Puedo Comprarlo?</span>
        </button>
        <button
          onClick={() => setActiveTab('fondo')}
          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
            activeTab === 'fondo'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>🛟 Colchón de Paz</span>
        </button>
      </div>

      {/* TAB 1: Cuotas e Intereses con TCEA */}
      {activeTab === 'cuotas' && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span>Calculadora de Cuotas y Trampa de Intereses</span>
              </h2>
              <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold">
                TCEA Real
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface mb-1">
                  <label>Monto de la compra o préstamo:</label>
                  <span className="text-primary font-bold font-mono">
                    {userState.currencySymbol} {loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(Number(e.target.value));
                    handleRunLoanSimulation();
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                  <span>{userState.currencySymbol} 100</span>
                  <span>{userState.currencySymbol} 5,000</span>
                  <span>{userState.currencySymbol} 10,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface mb-1">
                  <label>Número de cuotas mensuales:</label>
                  <span className="text-secondary font-bold">
                    {installments === 1 ? '1 cuota (Sin intereses)' : `${installments} cuotas`}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 3, 6, 12, 24].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setInstallments(n);
                        handleRunLoanSimulation();
                      }}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        installments === n
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {n === 1 ? '1' : `${n}m`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface mb-1">
                  <label>Tasa TCEA Anual Estimada (según SBS):</label>
                  <span className="text-primary font-bold font-mono">{tceaRate}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="110"
                  step="5"
                  value={tceaRate}
                  onChange={(e) => {
                    setTceaRate(Number(e.target.value));
                    handleRunLoanSimulation();
                  }}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                  <span>18% (Caja Municipal óptima)</span>
                  <span>55% (Tarjeta promedio en Perú)</span>
                  <span>95%+ (Tarjeta cara)</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container mt-1 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="text-xs text-on-surface-variant">Cuota mensual estimada:</span>
                <span className="text-base font-extrabold text-primary font-mono">
                  {userState.currencySymbol} {Math.round(totalMonthlyFee).toLocaleString()} / mes
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Total final que pagarás:</span>
                <span className="font-bold text-on-surface font-mono">
                  {userState.currencySymbol} {Math.round(totalPaid).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Plata regalada en intereses y seguro de desgravamen:</span>
                <span className={`font-bold font-mono ${extraCost > 0 ? 'text-secondary' : 'text-primary'}`}>
                  +{userState.currencySymbol} {Math.round(extraCost).toLocaleString()} ({overpayPercent}%)
                </span>
              </div>
            </div>

            {/* Veredicto KipuFin */}
            <div
              className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                installments === 1
                  ? 'bg-primary-fixed/20 border-primary-fixed text-primary'
                  : overpayPercent > 40
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-secondary-fixed/30 border-secondary-fixed text-on-secondary-fixed'
              }`}
            >
              <span className="text-lg">
                {installments === 1 ? '🎯' : overpayPercent > 40 ? '🚨' : '⚖️'}
              </span>
              <div className="flex-1">
                <p className="font-bold">
                  {installments === 1
                    ? '¡La jugada maestra!'
                    : overpayPercent > 40
                    ? '¡Cuidado, costo abusivo!'
                    : 'Costo moderado'}
                </p>
                <p className="text-[11px] mt-0.5 leading-snug">
                  {installments === 1
                    ? 'Pagando en 1 cuota en tu fecha de corte no regalas ni un sol en intereses ni desgravamen.'
                    : overpayPercent > 40
                    ? `Estás pagando casi la mitad más (${overpayPercent}%) solo por aplazar la compra a ${installments} meses. Si puedes ahorrar 2 meses y comprarlo al contado, te ahorras ${userState.currencySymbol} ${Math.round(extraCost)}.`
                    : `El costo financiero es de ${userState.currencySymbol} ${Math.round(extraCost)}. Solo hazlo si el bien te genera ingresos o es una necesidad impostergable.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ¿Puedo comprarlo? (Affordability Engine) */}
      {activeTab === 'capricho' && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs flex flex-col gap-3">
            <h2 className="text-sm font-bold text-on-surface">
              Termómetro de Compras & Caprichos ⚖️
            </h2>
            <p className="text-xs text-on-surface-variant">
              Descubre si esa compra cabe en tu presupuesto sin arruinar tus semanas siguientes.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  ¿Qué quieres comprarte?
                </label>
                <input
                  type="text"
                  value={caprichoName}
                  onChange={(e) => setCaprichoName(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-medium border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Ej: Celular, Zapatillas, Play..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-on-surface block mb-1">
                    Precio ({userState.currencySymbol}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={caprichoPrice}
                    onChange={(e) => setCaprichoPrice(Number(e.target.value))}
                    className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-on-surface block mb-1">
                    Dinero libre este mes ({userState.currencySymbol}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={disposableIncome}
                    onChange={(e) => setDisposableIncome(Number(e.target.value))}
                    className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-on-surface block mb-1">
                  Tu ganancia por hora de chamba ({userState.currencySymbol} aprox):
                </label>
                <input
                  type="number"
                  min="1"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Perspective Card */}
            <div className="bg-tertiary-fixed/40 p-3 rounded-2xl border border-tertiary-fixed flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏳</span>
                <div>
                  <p className="text-xs font-bold text-on-tertiary-fixed">
                    Costo en sudor y esfuerzo:
                  </p>
                  <p className="text-[11px] text-on-tertiary-fixed-variant">
                    {hoursOfWork} horas de tu vida laboral
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-tertiary bg-surface-container-lowest px-2 py-1 rounded-lg">
                ~{Math.round(hoursOfWork / 8)} días de trabajo
              </span>
            </div>

            {/* Verdict */}
            <div
              className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                caprichoRatio <= 40
                  ? 'bg-primary-fixed/20 border-primary-fixed text-primary'
                  : caprichoRatio <= 75
                  ? 'bg-secondary-fixed/30 border-secondary-fixed text-on-secondary-fixed'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <span className="text-xl">
                {caprichoRatio <= 40 ? '🟢' : caprichoRatio <= 75 ? '🟡' : '🔴'}
              </span>
              <div>
                <p className="font-bold">
                  {caprichoRatio <= 40
                    ? '¡Compra aprobada sin culpa!'
                    : caprichoRatio <= 75
                    ? 'Precaución: Ajustará tus próximas semanas'
                    : '¡Peligro de endeudamiento! Pospón esta compra'}
                </p>
                <p className="text-[11px] mt-0.5 leading-snug">
                  {caprichoRatio <= 40
                    ? `Ocupa solo el ${caprichoRatio}% de tu dinero libre. Cómpralo al contado y disfrútalo con total tranquilidad.`
                    : caprichoRatio <= 75
                    ? `Se lleva el ${caprichoRatio}% de tu plata disponible. Aplica la "Regla de las 72 horas": si dentro de 3 días aún lo deseas intensamente, búscalo.`
                    : `Representa el ${caprichoRatio}% de tu margen mensual. Comprarlo ahora te obligará a usar tarjeta de crédito o recortar comida/salud.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Fondo de Emergencia (Colchón de Paz) */}
      {activeTab === 'fondo' && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs flex flex-col gap-3">
            <h2 className="text-sm font-bold text-on-surface">
              Calculadora de Tu Colchón de Emergencia 🛟
            </h2>
            <p className="text-xs text-on-surface-variant">
              Tu seguro anti-estrés: el dinero intocable en soles que te protege si pierdes el empleo o surge un imprevisto.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Gastos básicos mensuales innegociables ({userState.currencySymbol}):
                </label>
                <input
                  type="number"
                  min="100"
                  step="50"
                  value={monthlyBasicExpenses}
                  onChange={(e) => setMonthlyBasicExpenses(Number(e.target.value))}
                  className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container"
                />
                <span className="text-[10px] text-on-surface-variant mt-0.5 block">
                  Techo + Comida + Servicios + Salud mínima.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Meses de protección deseados:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTargetMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        targetMonths === m
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {m} meses {m === 6 ? '⭐' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-on-surface block mb-1">
                    Ahorrado hoy ({userState.currencySymbol}):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-on-surface block mb-1">
                    Aporte mensual ({userState.currencySymbol}):
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={monthlySavingCapacity}
                    onChange={(e) => setMonthlySavingCapacity(Number(e.target.value))}
                    className="w-full bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-xs font-bold border border-surface-container"
                  />
                </div>
              </div>
            </div>

            {/* Target Breakdown */}
            <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container space-y-2 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Meta total del colchón:</span>
                <span className="font-extrabold text-primary font-mono text-sm">
                  {userState.currencySymbol} {totalFundTarget.toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${fundProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                <span>Progreso: {fundProgress}%</span>
                <span>Faltan: {userState.currencySymbol} {fundDeficit.toLocaleString()}</span>
              </div>
            </div>

            {/* Time to freedom */}
            <div className="bg-primary-fixed/20 p-3 rounded-2xl border border-primary-fixed text-xs text-primary flex items-center justify-between">
              <div>
                <p className="font-bold">
                  {fundDeficit === 0
                    ? '¡Tu fondo ya está 100% blindado! 🎉'
                    : `Meta alcanzable en aprox. ${monthsToReach} meses`}
                </p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Ahorrando {userState.currencySymbol} {monthlySavingCapacity}/mes con disciplina en cuenta de alta TREA con FSD.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
