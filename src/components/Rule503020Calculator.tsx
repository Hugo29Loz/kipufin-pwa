import React, { useState } from 'react';
import { UserState } from '../types';

interface Rule503020CalculatorProps {
  userState?: UserState;
  currencySymbol?: string;
  onSaveBudget?: (budget: {
    monthlyIncome: number;
    needs: number;
    wants: number;
    savings: number;
    updatedAt: string;
  }) => void;
  onAddXP?: (xp: number, reason: string) => void;
  compact?: boolean;
}

export const Rule503020Calculator: React.FC<Rule503020CalculatorProps> = ({
  userState,
  currencySymbol = 'S/',
  onSaveBudget,
  onAddXP,
  compact = false,
}) => {
  const initialIncome = userState?.savedBudget?.monthlyIncome || 1500;
  const [incomeInput, setIncomeInput] = useState<string>(initialIncome.toString());
  const [isSaved, setIsSaved] = useState<boolean>(Boolean(userState?.savedBudget));

  const parsedIncome = Math.max(0, parseFloat(incomeInput) || 0);

  // Exact 50/30/20 calculations
  const needsAmount = Math.round(parsedIncome * 0.5);
  const wantsAmount = Math.round(parsedIncome * 0.3);
  const savingsAmount = Math.round(parsedIncome * 0.2);

  const presets = [
    { label: 'S/ 1,025 (Mínimo)', value: 1025 },
    { label: 'S/ 1,500', value: 1500 },
    { label: 'S/ 2,200', value: 2200 },
    { label: 'S/ 3,500', value: 3500 },
  ];

  const handlePresetClick = (val: number) => {
    setIncomeInput(val.toString());
    setIsSaved(false);
  };

  const handleInputChange = (val: string) => {
    setIncomeInput(val);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (parsedIncome <= 0) return;

    const budgetData = {
      monthlyIncome: parsedIncome,
      needs: needsAmount,
      wants: wantsAmount,
      savings: savingsAmount,
      updatedAt: new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    if (onSaveBudget) {
      onSaveBudget(budgetData);
    }

    if (onAddXP) {
      onAddXP(25, '¡Presupuesto 50/30/20 vinculado a tu perfil!');
    }

    setIsSaved(true);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-4.5 border border-surface-container shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧮</span>
          <div>
            <h3 className="text-sm font-extrabold text-on-surface">
              Calculador Automático 50/30/20
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Tus montos exactos en soles al instante, sin matemáticas manuales
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
          En Tiempo Real
        </span>
      </div>

      {/* Input Section */}
      <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container space-y-2">
        <label className="text-xs font-bold text-on-surface flex items-center justify-between">
          <span>Ingresa tus ingresos del mes ({currencySymbol}):</span>
          <span className="text-[11px] text-primary font-mono font-bold">
            {currencySymbol} {parsedIncome.toLocaleString('es-PE')}
          </span>
        </label>

        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-xs font-black text-on-surface-variant font-mono">
            {currencySymbol}
          </span>
          <input
            type="number"
            min="0"
            step="50"
            value={incomeInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Ej. 1200"
            className="w-full bg-surface-container-lowest text-on-surface pl-10 pr-3 py-2.5 rounded-xl text-sm font-bold border border-surface-container focus:outline-none focus:border-primary font-mono shadow-2xs"
          />
        </div>

        {/* Quick Peruvian Salary Presets */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] text-on-surface-variant font-medium">Sugeridos:</span>
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePresetClick(p.value)}
              className={`text-[10px] px-2 py-0.5 rounded-lg font-bold border transition-all cursor-pointer ${
                parsedIncome === p.value
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest text-on-surface border-surface-container hover:bg-surface-container'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual 3-Color Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className="text-on-surface">Proporción de tus ingresos:</span>
          <span className="text-outline font-mono text-[10px]">100% distribuido</span>
        </div>

        <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-surface-container p-0.5 gap-0.5">
          {/* 50% Needs Bar */}
          <div
            className="h-full bg-emerald-600 rounded-l-full transition-all duration-300 flex items-center justify-center text-[9px] text-white font-extrabold select-none"
            style={{ width: '50%' }}
            title="50% Necesidades"
          >
            50%
          </div>
          {/* 30% Wants Bar */}
          <div
            className="h-full bg-amber-500 transition-all duration-300 flex items-center justify-center text-[9px] text-white font-extrabold select-none"
            style={{ width: '30%' }}
            title="30% Deseos"
          >
            30%
          </div>
          {/* 20% Savings Bar */}
          <div
            className="h-full bg-cyan-600 rounded-r-full transition-all duration-300 flex items-center justify-center text-[9px] text-white font-extrabold select-none"
            style={{ width: '20%' }}
            title="20% Ahorro"
          >
            20%
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-on-surface-variant font-medium px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Necesidades (50%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>Deseos (30%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block" />
            <span>Ahorro (20%)</span>
          </span>
        </div>
      </div>

      {/* The 3 Cards in Real Time */}
      <div className="grid grid-cols-1 gap-2.5">
        {/* 1. 50% Necesidades */}
        <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col gap-1.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <div>
                <h4 className="text-xs font-black text-emerald-950">50% Necesidades Básicas</h4>
                <p className="text-[10px] text-emerald-700">Lo indispensable para vivir</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-emerald-900 font-mono">
                {currencySymbol} {needsAmount.toLocaleString('es-PE')}
              </span>
              <span className="block text-[9px] text-emerald-700 font-bold">50% del total</span>
            </div>
          </div>
          <div className="bg-white/80 p-2 rounded-xl text-[10px] text-emerald-900 border border-emerald-100 space-y-0.5">
            <span className="font-bold block text-[10px] text-emerald-950">📋 Ejemplos fijos:</span>
            <ul className="list-disc list-inside text-emerald-800 space-y-0.5 pl-0.5">
              <li>Alquiler de vivienda o cuota hipotecaria</li>
              <li>Compras del mercado y comida diaria</li>
              <li>Servicios básicos (Sedapal, Enel/Luz del Sur, gas)</li>
              <li>Pasajes diarios de transporte o gasolina</li>
            </ul>
          </div>
        </div>

        {/* 2. 30% Deseos */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-col gap-1.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <div>
                <h4 className="text-xs font-black text-amber-950">30% Deseos & Calidad de Vida</h4>
                <p className="text-[10px] text-amber-700">Disfrutar sin culpa ni endeudarte</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-amber-900 font-mono">
                {currencySymbol} {wantsAmount.toLocaleString('es-PE')}
              </span>
              <span className="block text-[9px] text-amber-700 font-bold">30% del total</span>
            </div>
          </div>
          <div className="bg-white/80 p-2 rounded-xl text-[10px] text-amber-900 border border-amber-100 space-y-0.5">
            <span className="font-bold block text-[10px] text-amber-950">🍿 Ejemplos de gustos:</span>
            <ul className="list-disc list-inside text-amber-800 space-y-0.5 pl-0.5">
              <li>Salidas el fin de semana o pollito a la brasa</li>
              <li>Suscripciones (Netflix, Spotify, gimnasio)</li>
              <li>Compras personales, pasatiempos y ropa</li>
            </ul>
          </div>
        </div>

        {/* 3. 20% Ahorro */}
        <div className="p-3 bg-cyan-50/80 border border-cyan-200 rounded-2xl flex flex-col gap-1.5 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐷</span>
              <div>
                <h4 className="text-xs font-black text-cyan-950">20% Ahorro & Futuro</h4>
                <p className="text-[10px] text-cyan-700">Tu tranquilidad y libertad financiera</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-cyan-900 font-mono">
                {currencySymbol} {savingsAmount.toLocaleString('es-PE')}
              </span>
              <span className="block text-[9px] text-cyan-700 font-bold">20% del total</span>
            </div>
          </div>
          <div className="bg-white/80 p-2 rounded-xl text-[10px] text-cyan-900 border border-cyan-100 space-y-0.5">
            <span className="font-bold block text-[10px] text-cyan-950">🛡️ Destino del ahorro:</span>
            <ul className="list-disc list-inside text-cyan-800 space-y-0.5 pl-0.5">
              <li>Colchón de emergencia (primeros S/ 1,000 en cuenta remunerada)</li>
              <li>Amortización acelerada de deudas caras</li>
              <li>Ahorro para metas medianas (depósito a plazo / fondo mutuo)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Button Guardar mi Presupuesto */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={parsedIncome <= 0}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
            isSaved
              ? 'bg-emerald-700 text-white hover:bg-emerald-800'
              : 'bg-primary hover:bg-primary-container text-on-primary'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {isSaved ? 'check_circle' : 'bookmark_added'}
          </span>
          <span>
            {isSaved
              ? '¡Presupuesto Vinculado a tu Perfil!'
              : 'Guardar mi presupuesto en mi perfil (+25 XP)'}
          </span>
        </button>

        {isSaved && userState?.savedBudget && (
          <p className="text-[10px] text-center text-primary font-bold mt-1.5 flex items-center justify-center gap-1">
            <span>✓</span>
            <span>
              Vinculado a tu cuenta • {currencySymbol} {parsedIncome.toLocaleString('es-PE')} al mes
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
