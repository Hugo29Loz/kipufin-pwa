import React, { useState } from 'react';
import { DICTIONARY_TERMS } from '../../data/mockData';
import { DictionaryTerm, UserState } from '../../types';

interface DiccionarioScreenProps {
  userState: UserState;
  onToggleBookmark: (termId: string) => void;
  onAddXP: (xp: number, reason: string) => void;
}

export const DiccionarioScreen: React.FC<DiccionarioScreenProps> = ({
  userState,
  onToggleBookmark,
  onAddXP,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(DICTIONARY_TERMS[0]);
  const [showTranslator, setShowTranslator] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'siglas', label: 'Siglas Clave' },
    { id: 'tarjetas', label: 'Tarjetas' },
    { id: 'prestamos', label: 'Préstamos' },
    { id: 'ahorro', label: 'Ahorro' },
    { id: 'gastos', label: 'Gastos' },
    { id: 'guardados', label: 'Favoritos ⭐' },
  ];

  const filteredTerms = DICTIONARY_TERMS.filter((term) => {
    const matchesSearch =
      term.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.explanation.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCategory === 'guardados') {
      return matchesSearch && userState.bookmarkedTerms.includes(term.id);
    }
    if (activeCategory === 'todos') {
      return matchesSearch;
    }
    return matchesSearch && term.category === activeCategory;
  });

  const bankingJargonList = [
    {
      phrase: '“Tasa de interés promocional desde 14.9%”',
      meaning: 'Esa es la TEA en letras gigantes. La TCEA final según la SBS con seguro de desgravamen y portes terminará costándote 40% a 75% o más.',
      action: 'Exige siempre que te entreguen la Hoja Resumen oficial con la TCEA y el cronograma de cuotas en soles.',
    },
    {
      phrase: '“Pago mínimo sugerido para mantenerte al día”',
      meaning: 'Casi el 90% es para pagar comisiones, desgravamen e intereses. Tu deuda en soles casi no disminuye y la estiras por más de una década.',
      action: 'Elige siempre en tu app bancaria la casilla “Pago Total Facturado del Mes” para tener costo financiero cero.',
    },
    {
      phrase: '“Tienes un crédito pre-aprobado listo en ventanilla o app”',
      meaning: 'No es un premio ni dinero regalado; es una invitación calculada para que pagues altos intereses.',
      action: 'Si no lo tenías presupuestado para una inversión productiva o emergencia real, no lo retires.',
    },
    {
      phrase: '“Mantenimiento de cuenta cero* (*con condiciones de saldo)”',
      meaning: 'Si tu saldo baja del promedio mensual o no recibes tu sueldo ahí, te descontarán S/ 10 a S/ 15 cada fin de mes.',
      action: 'Pide cuentas digitales “Cero Mantenimiento Ilimitadas” en bancos o Cajas Municipales reguladas por la SBS.',
    },
  ];

  const handleQuizAnswer = (index: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(index);
    if (index === 1) {
      onAddXP(30, '¡Correcto! En préstamos siempre manda la TCEA.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 pt-1">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-md font-extrabold uppercase">
            Glosario sin letra chica
          </span>
        </div>
        <h1 className="text-2xl text-on-surface font-extrabold mt-1">
          Diccionario Fácil 📖
        </h1>
        <p className="text-xs text-on-surface-variant">
          Las palabras raras de los bancos traducidas al español simple, con peras y manzanas.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca siglas o palabras: TCEA, corte, desgravamen..."
          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs rounded-2xl pl-10 pr-10 py-2.5 border border-surface-container shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {cat.label}
              {cat.id === 'guardados' && userState.bookmarkedTerms.length > 0 && (
                <span className="ml-1 text-[10px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.2 rounded-full font-bold">
                  {userState.bookmarkedTerms.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Translator Banner Toggle */}
      <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕵️‍♂️</span>
            <div>
              <h3 className="text-xs font-bold text-on-surface">
                Traductor de Jerga Bancaria
              </h3>
              <p className="text-[11px] text-on-surface-variant">
                Descifra las 4 trampas más repetidas en ventanilla y publicidad
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTranslator(!showTranslator)}
            className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-0.5"
          >
            {showTranslator ? 'Ocultar' : 'Ver frases'}
            <span className="material-symbols-outlined text-sm">
              {showTranslator ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {showTranslator && (
          <div className="mt-3 pt-3 border-t border-surface-container space-y-2.5">
            {bankingJargonList.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container-high/60 text-xs flex flex-col gap-1"
              >
                <p className="font-bold text-secondary">{item.phrase}</p>
                <p className="text-on-surface">
                  <span className="font-semibold text-primary">Significado real:</span> {item.meaning}
                </p>
                <p className="text-on-surface-variant bg-surface-container-lowest p-1.5 rounded-lg border border-surface-container mt-0.5">
                  🛡️ <strong>Tu jugada inteligente:</strong> {item.action}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Term Highlight (Hero Detail Box) */}
      {selectedTerm && (
        <div className="bg-surface-container-lowest p-4 rounded-3xl shadow-sm border-2 border-primary/40 flex flex-col gap-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {selectedTerm.badge}
            </span>
            <button
              onClick={() => onToggleBookmark(selectedTerm.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                userState.bookmarkedTerms.includes(selectedTerm.id)
                  ? 'bg-secondary-fixed text-secondary'
                  : 'bg-surface-container-low text-outline hover:text-secondary'
              }`}
              title="Guardar término"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{
                  fontVariationSettings: userState.bookmarkedTerms.includes(selectedTerm.id)
                    ? "'FILL' 1"
                    : "'FILL' 0",
                }}
              >
                star
              </span>
            </button>
          </div>

          <div>
            <h2 className="text-lg text-on-surface font-extrabold">
              {selectedTerm.sigla} — {selectedTerm.name}
            </h2>
            <p className="text-xs text-on-surface mt-1 leading-relaxed">
              {selectedTerm.explanation}
            </p>
          </div>

          {/* Golden Rule Callout */}
          <div className="bg-primary-fixed/20 p-2.5 rounded-xl border border-primary-fixed text-xs flex items-start gap-2">
            <span className="text-base select-none">💡</span>
            <div>
              <p className="font-bold text-primary">Regla de Oro KipuFin</p>
              <p className="text-on-surface-variant text-[11px] mt-0.5 leading-snug">
                {selectedTerm.ruleOfGold}
              </p>
            </div>
          </div>

          {/* Real World Example & Trap */}
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-surface-container-low p-2.5 rounded-xl">
              <span className="font-bold text-on-surface block text-[11px] mb-0.5">
                🌍 En la vida real:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-snug">
                {selectedTerm.realWorldExample}
              </p>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-xl">
              <span className="font-bold text-secondary block text-[11px] mb-0.5">
                ⚠️ La trampa habitual:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-snug">
                {selectedTerm.bankTrap}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms List Grid */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">
          {activeCategory === 'guardados' ? 'Tus Términos Guardados' : 'Explora el Diccionario'} (
          {filteredTerms.length})
        </h3>

        {filteredTerms.length === 0 ? (
          <div className="bg-surface-container-lowest p-6 rounded-2xl text-center border border-surface-container">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-xs font-bold text-on-surface">No encontramos términos con esa búsqueda</p>
            <p className="text-[11px] text-on-surface-variant mt-1">
              Prueba buscando "TCEA", "Corte", "Ahorro" o cambia de categoría.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredTerms.map((term) => {
              const isSelected = selectedTerm?.id === term.id;
              const isFav = userState.bookmarkedTerms.includes(term.id);
              return (
                <div
                  key={term.id}
                  onClick={() => setSelectedTerm(term)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-surface-container-lowest border-primary shadow-xs'
                      : 'bg-surface-container-lowest border-surface-container hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-bold text-xs text-primary shrink-0">
                      {term.sigla.slice(0, 4)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-on-surface">{term.name}</span>
                        {term.isPopular && (
                          <span className="text-[9px] bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.2 rounded font-bold">
                            Frecuente
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                        {term.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(term.id);
                      }}
                      className="p-1 text-outline hover:text-secondary cursor-pointer"
                      title="Favorito"
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {isFav ? 'star' : 'star_border'}
                      </span>
                    </button>
                    <span className="material-symbols-outlined text-sm text-outline-variant">
                      chevron_right
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mini Quiz Express */}
      <div className="bg-surface-container-lowest p-4 rounded-3xl border border-surface-container shadow-xs mt-1 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🎯</span>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Reto Express: ¿Qué sigla manda?
            </h4>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
            +30 XP
          </span>
        </div>

        <p className="text-xs text-on-surface mb-3 leading-snug">
          Estás en el banco y te ofrecen un préstamo para tu negocio. ¿Qué número debes exigir que te muestren para saber el costo 100% real?
        </p>

        <div className="space-y-2">
          {[
            'A) La TEA (Tasa Efectiva Anual)',
            'B) La TCEA (Tasa de Costo Efectivo Anual)',
            'C) La TREA (Tasa de Rendimiento)',
          ].map((option, idx) => {
            const isChosen = quizAnswered === idx;
            const isCorrect = idx === 1;
            return (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                disabled={quizAnswered !== null}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                  quizAnswered === null
                    ? 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                    : isCorrect
                    ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                    : isChosen
                    ? 'bg-red-50 border-red-400 text-red-900'
                    : 'bg-surface-container-low border-surface-container opacity-50'
                }`}
              >
                <span>{option}</span>
                {quizAnswered !== null && isCorrect && (
                  <span className="material-symbols-outlined text-green-600 text-sm">
                    check_circle
                  </span>
                )}
                {quizAnswered !== null && isChosen && !isCorrect && (
                  <span className="material-symbols-outlined text-red-500 text-sm">
                    cancel
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {quizAnswered !== null && (
          <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface">
            {quizAnswered === 1 ? (
              <p className="text-primary font-bold">
                ¡Exacto! 🎉 La TCEA suma todos los seguros y comisiones. ¡Ganaste +30 XP!
              </p>
            ) : (
              <p className="text-secondary font-bold">
                Casi, pero recuerda: la TEA no incluye seguros. ¡La que manda siempre es la TCEA!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
