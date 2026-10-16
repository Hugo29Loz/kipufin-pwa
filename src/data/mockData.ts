import { TopicLesson, DictionaryTerm, Achievement, DailyMission } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDLr06eQYG89i3BobAg5SuVUEW3xKLTN3rqbOTegA6fM0kgqC6cJ9W_lEvHfoCOSQtF-uXGDqifaESPAn5cvtiHXrh53-Ghxa16MGBg_WUspNU7LtR-q-c7caMTlqSyuPI0OdGgVcFIVWfQrnFtZrzF3WR33YOsrOVqkuW3yIzLRQ0WlvOK7swzIcjUcyDf-JsCf0cR7yJb2XvufE917W-Z25VkUBKyI2dO5swsgqVTENPoPDSeQgiurA";
export const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3uZGz4-ftAa4jCv4_a2tX224uShGR1H1CBeGTFqYJRE-DC7i19-w_1bus-JtGs1Lzoi61hJvOF06JpF4cqSF4AO3p_kx_kjciQ6qTIh7cHK13RboQi8imqxv22P2q4Z2KUmGmwEmVGmvJWhMk6JxspR4E1vqnasPJ9ZlIgp9oTcn-atHvis5jfVWJkdEO_PX52HfMwvyHvqwE-7wnl1JBeU8cVlNAjqJRo4xztP0F_-5utlWtBpovA";

export const ALL_TOPIC_LESSONS: TopicLesson[] = [
  // AHORRO
  {
    id: "les-ahorro-1",
    category: "Ahorro",
    categoryKey: "ahorro",
    badge: "Cápsula Recomendada",
    title: "La regla 50/30/20 explicada fácil",
    desc: "Aprende a dividir tus ingresos en soles: 50% necesidades básicas, 30% gustos y 20% para tu tranquilidad futura sin sentir que te estás privando de todo.",
    icon: "🐷",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Fondo de Liquidez"',
    conceptDesc: "No es plata congelada; es tu colchón de emergencia accesible al instante por Yape o transferencia si se rompe la tubería o surge una urgencia médica.",
    audioDuration: "00:57 min",
    audioTranscript: "Hola, bienvenido a la cápsula 1 de KipuFin: La regla 50/30/20. Organizar tu dinero no significa dejar de disfrutar. La clave está en dividir tus ingresos en tres partes: Primero, el 50% va destinado a tus necesidades básicas, como alquiler, comida del mercado, recibos de luz, agua y tus pasajes diarios. Segundo, el 30% es para tus gustos y calidad de vida: disfruta de una salidita el fin de semana, un pollito a la brasa o tus suscripciones sin culpa alguna. Y tercero, el 20% es para tu yo del futuro: separa este porcentaje inmediatamente para tu fondo de emergencia en una cuenta de alto rendimiento. Recuerda la regla de oro KipuFin: no se trata de vivir ajustado, sino de gastar tu 30% con total paz mental porque tus gastos fijos y tu ahorro ya están cubiertos. Aplica esta regla hoy mismo en nuestro calculador.",
    explanationList: [
      {
        title: "5 monedas (50%) - Lo innegociable",
        desc: "Alquiler o hipoteca, comida del mercado, recibo de luz (Luz del Sur/Enel), agua (Sedapal) y pasajes."
      },
      {
        title: "3 monedas (30%) - Gustos y calidad de vida",
        desc: "Salidas el fin de semana, un pollito a la brasa, streaming o compras personales. ¡Gástalo sin culpa!"
      },
      {
        title: "2 monedas (20%) - Tu 'yo' del futuro",
        desc: "Tu fondo de emergencia primero (en cuenta de alto rendimiento), y luego amortización de deudas o depósitos a plazo."
      }
    ],
    takeaway: "No se trata de vivir ajustado, sino de gastar tu 30% con total paz mental porque tus gastos fijos y tu ahorro ya están cubiertos.",
    quiz: {
      question: "Si este mes recibes un sueldo neto de S/ 1,500, ¿cuánto es lo ideal para destinar a tus ahorros según la regla 50/30/20?",
      options: [
        "A) S/ 75 (5% para no complicarte)",
        "B) S/ 300 (20% para tu fondo y futuro)",
        "C) S/ 750 (50% ahorrando al extremo)"
      ],
      correctIndex: 1,
      explanation: "¡Exacto! El 20% de S/ 1,500 son S/ 300 directos a tu cuenta de ahorros o fondo de emergencia para no endeudarte después.",
      xpBonus: 25
    }
  },
  {
    id: "les-ahorro-2",
    category: "Ahorro",
    categoryKey: "ahorro",
    badge: "Estrategia Práctica",
    title: "Cómo armar tu primer colchón de S/ 1,000",
    desc: "Tu primera gran meta en soles: juntar S/ 1,000 intactos que impidan que recurras a la tarjeta de crédito o préstamos informales ante cualquier imprevisto.",
    icon: "🛟",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Blindaje Inicial"',
    conceptDesc: "Es tu primera línea de defensa. Con S/ 1,000 resuelves el 90% de averías del hogar, consultas médicas privadas o compras de urgencia.",
    audioDuration: "03:45 min",
    explanationList: [
      {
        title: "Paso 1: Abre una cuenta sin comisiones",
        desc: "Elige una cuenta digital 'Cero Mantenimiento' en un banco o Caja Municipal regulada por la SBS con Fondo de Seguro de Depósitos (FSD)."
      },
      {
        title: "Paso 2: Automatiza o yapéate apenas cobres",
        desc: "Separa S/ 50 o S/ 100 apenas cobres tu quincena, antes de que el dinero empiece a esfumarse."
      },
      {
        title: "Paso 3: Busca la mejor TREA en soles",
        desc: "Las Cajas Municipales y bancos digitales suelen pagar entre 5% y 7.5% de TREA anual en cuentas de ahorro en soles."
      }
    ],
    takeaway: "Tener S/ 1,000 en reserva cambia por completo cómo duermes en las noches. Adiós pánico a fin de mes.",
    quiz: {
      question: "¿Dónde debes guardar tu fondo de emergencia en el Perú para que esté 100% seguro y gane intereses?",
      options: [
        "A) En efectivo debajo del colchón en tu casa",
        "B) En una entidad supervisada por la SBS con Fondo de Seguro de Depósitos (FSD) y alta TREA",
        "C) Prestárselo a un amigo que promete devolverte con intereses"
      ],
      correctIndex: 1,
      explanation: "¡Correcto! Las entidades reguladas por la SBS tienen el Fondo de Seguro de Depósitos (FSD) que protege tus ahorros por más de S/ 120,000 sin riesgo de quiebra.",
      xpBonus: 25
    }
  },

  // TARJETAS
  {
    id: "les-tarjetas-1",
    category: "Tarjetas de Crédito",
    categoryKey: "tarjetas",
    badge: "Estrategia Clave",
    title: "Paga el total, nunca el pago mínimo",
    desc: "Descubre la diferencia entre tu 'Fecha de Corte' y tu 'Fecha de Pago'. Domina el truco legal de los hasta 50 días sin pagar un sol de interés.",
    icon: "💳",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Fecha de Corte"',
    conceptDesc: "Es el día del mes que el banco cierra tu cuenta y suma tus consumos. Todo lo que compres al día siguiente recién lo pagas casi dos meses después.",
    audioDuration: "03:50 min",
    explanationList: [
      {
        title: "Fecha de Corte vs Fecha de Pago",
        desc: "La fecha de corte cierra el mes contable. La fecha de pago es el límite para abonar (suele ser 20 a 25 días después)."
      },
      {
        title: "El truco de los 50 días sin interés",
        desc: "Si tu corte es el 15, haz consumos fuertes el 16. Esa compra entrará al corte del mes siguiente y tendrás hasta 50 días de financiamiento gratuito."
      },
      {
        title: "La trampa del 'Pago Mínimo'",
        desc: "El pago mínimo en los bancos peruanos casi solo cubre intereses y el seguro de desgravamen. Pagar el mínimo por un celular de S/ 1,500 puede tardar 8 años y costarte más de S/ 3,500."
      }
    ],
    takeaway: "Trata la tarjeta de crédito como si fuera de débito: gasta solo lo que ya tienes en soles en tu cuenta y paga siempre 'Total del Mes'.",
    quiz: {
      question: "¿Por qué pagar solo el 'Pago Mínimo' de tu tarjeta de crédito bancaria es una trampa mortal?",
      options: [
        "A) Porque casi el 90% se va en intereses compensatorios y seguro de desgravamen, y la deuda real casi no baja",
        "B) Porque te bloquean el Yape inmediatamente",
        "C) Porque la SBS te multa al día siguiente"
      ],
      correctIndex: 0,
      explanation: "¡Así es! El pago mínimo alarga la deuda por años y terminas pagando dos o tres veces el valor original del producto.",
      xpBonus: 25
    }
  },
  {
    id: "les-tarjetas-2",
    category: "Tarjetas de Crédito",
    categoryKey: "tarjetas",
    badge: "Hack Financiero",
    title: "El truco legal de los 50 días sin interés",
    desc: "Cómo aprovechar el calendario bancario para apalancarte con el dinero del banco sin pagar un céntimo de costo financiero.",
    icon: "🗓️",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Apalancamiento Limpio"',
    conceptDesc: "Usar la tarjeta para tus compras programadas mientras tus soles en tu cuenta de ahorros siguen generando intereses.",
    audioDuration: "03:30 min",
    explanationList: [
      {
        title: "Identifica tu día clave en tu app bancaria",
        desc: "Revisa tu estado de cuenta y fíjate qué día es tu fecha de corte mensual (ejemplo: día 10 de cada mes)."
      },
      {
        title: "Programa tus compras fuertes",
        desc: "Compra el día 11. El banco recién facturará esa compra el día 10 del mes siguiente."
      },
      {
        title: "Paga antes del día de vencimiento",
        desc: "Paga el monto facturado total a 1 cuota. Resultado: 0% de interés, acumulas puntos o millas y mejoras tu historial crediticio en Infocorp y SBS."
      }
    ],
    takeaway: "Las tarjetas no son malas; son una herramienta fabulosa si dominas sus fechas con disciplina matemática.",
    quiz: {
      question: "Si tu fecha de corte es el día 15 de cada mes, ¿qué día te conviene hacer una compra grande para tener hasta 50 días libres de interés?",
      options: [
        "A) El 14 del mes (un día antes del corte)",
        "B) El 16 del mes (un día después del corte)",
        "C) El mismo día de pago límite"
      ],
      correctIndex: 1,
      explanation: "¡Excelente! Al comprar el 16, esa compra entrará recién al corte del próximo mes, ganando entre 45 y 50 días de crédito a costo cero.",
      xpBonus: 25
    }
  },

  // PRESTAMOS
  {
    id: "les-prestamos-1",
    category: "Préstamos",
    categoryKey: "prestamos",
    badge: "Evita Trampas",
    title: "TCEA: El costo real de pedir prestado",
    desc: "Entiende qué te cobran de verdad, cómo simular cuotas fijas y por qué los prestamistas informales 'gota a gota' arruinan vidas.",
    icon: "🤝",
    durationMin: 5,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Amortización"',
    conceptDesc: "Es la parte de tu cuota mensual en soles que realmente reduce tu deuda original, a diferencia de los intereses que son la ganancia del banco.",
    audioDuration: "04:15 min",
    explanationList: [
      {
        title: "La cortina de humo de la TEA",
        desc: "El banco promociona en gigantografías: 'TEA desde 16%'. Pero al pedir la Hoja Resumen obligatoria de la SBS, la tasa real sube."
      },
      {
        title: "Lo que esconde la TCEA",
        desc: "La TCEA incluye seguro de desgravamen obligatorio, comisiones de desembolso y portes. ¡En tarjetas puede llegar a 85% o más!"
      },
      {
        title: "Compara antes de firmar",
        desc: "Las Cajas Municipales (Caja Huancayo, Arequipa, Cusco) suelen ofrecer mejores TCEA para préstamos personales que los bancos tradicionales."
      }
    ],
    takeaway: "Siempre exige la Hoja Resumen y pregunta la frase clave: '¿Cuál es la TCEA final con todos los seguros incluidos?'.",
    quiz: {
      question: "Al comparar dos entidades financieras en Perú para pedir un préstamo personal, ¿qué indicador exigido por la SBS debes comparar obligatoriamente?",
      options: [
        "A) La TEA anunciada en los carteles publicitarios",
        "B) La TCEA que suma todos los seguros, portes y comisiones obligatorias",
        "C) El regalo o sorteo que te ofrecen en ventanilla"
      ],
      correctIndex: 1,
      explanation: "¡La TCEA (Tasa de Costo Efectivo Anual) es la única norma oficial de la SBS que refleja el costo 100% verídico del crédito!",
      xpBonus: 25
    }
  },
  {
    id: "les-prestamos-2",
    category: "Préstamos",
    categoryKey: "prestamos",
    badge: "Alerta Roja",
    title: "Por qué huir del préstamo informal 'gota a gota'",
    desc: "La trampa de los prestamistas informales: tasas de más del 500% anual, cobros diarios bajo presión y pérdida de tu tranquilidad.",
    icon: "⚠️",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Crédito Tóxico"',
    conceptDesc: "Parece una salida rápida hoy de S/ 500, pero se convierte en una trampa de cobros diarios impagables mañana.",
    audioDuration: "03:55 min",
    explanationList: [
      {
        title: "Cobro diario engañoso",
        desc: "Te dicen: 'Solo S/ 20 al día por S/ 300 prestados'. Al mes pagaste S/ 600 (¡100% de interés en apenas 30 días!)."
      },
      {
        title: "Cero regulación y extorsión",
        desc: "No existe contrato legal ni supervisión de la SBS ni Indecopi. Usan intimidación y violencia contra ti y tu familia."
      },
      {
        title: "La alternativa formal",
        desc: "Cajas municipales, cooperativas de ahorro y crédito o microfinancieras formales otorgan créditos legales y seguros."
      }
    ],
    takeaway: "Tu paz mental y la de tu familia valen más que cualquier urgencia. Nunca recurras al 'gota a gota'.",
    quiz: {
      question: "¿Cuál es el principal peligro del préstamo informal callejero 'gota a gota' en el Perú?",
      options: [
        "A) Que aplican tasas abusivas superiores al 500% anual y emplean métodos extorsivos e ilegales",
        "B) Que te piden boleta de pago o recibos de luz",
        "C) Que tardan semanas en depositarte por Yape"
      ],
      correctIndex: 0,
      explanation: "¡Exacto! El crédito informal destruye tu economía y tu paz. Siempre busca entidades financieras autorizadas y reguladas por la SBS.",
      xpBonus: 25
    }
  },

  // SERVICIOS
  {
    id: "les-servicios-1",
    category: "Servicios y Gastos Fijos",
    categoryKey: "servicios",
    badge: "Ahorro Inmediato",
    title: "Caza de vampiros eléctricos y gastos fantasma",
    desc: "Controla tus recibos de luz, agua y telefonía. Identifica esos S/ 40 a S/ 60 mensuales que se escapan en artefactos en reposo o fugas invisibles.",
    icon: "⚡",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Gasto Hormiga"',
    conceptDesc: "Esos S/ 5 o S/ 10 diarios en golosinas, cafés al paso, gaseosas o deliveries que parecen invisibles pero suman más de S/ 2,400 al año.",
    audioDuration: "03:40 min",
    explanationList: [
      {
        title: "Aparatos vampiro en modo Standby",
        desc: "Decodificadores de cable, microondas con reloj y cargadores enchufados aumentan tu recibo de luz (Luz del Sur/Enel) hasta un 12% al mes."
      },
      {
        title: "La prueba de las 2 semanas en suscripciones",
        desc: "Revisa los débitos automáticos en tu tarjeta: si no abriste la app en 14 días seguidos, cancélala hoy mismo."
      },
      {
        title: "Comisiones por transferencias interbancarias",
        desc: "Usa Yape o Plin para transferir hasta S/ 500 diarios sin pagar comisiones bancarias interbancarias."
      }
    ],
    takeaway: "Ahorrar S/ 50 en fugas al mes equivale a darte un aguinaldo extra de S/ 600 al año sin trabajar un minuto más.",
    quiz: {
      question: "¿Qué es un 'aparato vampiro' en el consumo de luz de tu casa?",
      options: [
        "A) Un electrodoméstico quemado que ya no enciende",
        "B) Aparatos en modo 'standby' (reloj digital, decodificadores, cargadores enchufados) que consumen energía continua las 24 horas",
        "C) Focos LED ahorradores de luz"
      ],
      correctIndex: 1,
      explanation: "¡Así es! Dejar cargadores enchufados y decodificadores prendidos en modo reposo puede inflar tu recibo mensual de luz innecesariamente.",
      xpBonus: 25
    }
  },
  {
    id: "les-servicios-2",
    category: "Servicios y Gastos Fijos",
    categoryKey: "servicios",
    badge: "Fuga Invisible",
    title: "Auditoría de suscripciones y planes móviles",
    desc: "Detecta apps de streaming, membresías olvidadas y planes de celular que pagan de más sin que te des cuenta.",
    icon: "📱",
    durationMin: 4,
    xpReward: 50,
    conceptTitle: 'Término sin rollos: "Suscripción Fantasma"',
    conceptDesc: "Cobros automáticos de S/ 20 a S/ 45 al mes que olvidaste cancelar tras el periodo de prueba gratis.",
    audioDuration: "03:20 min",
    explanationList: [
      {
        title: "Revisa tus estados de cuenta de los últimos 60 días",
        desc: "Filtra en tu app bancaria por cobros recurrentes de Netflix, Spotify, Disney o juegos móviles."
      },
      {
        title: "Negocia tu plan de celular",
        desc: "Las operadoras (Entel, Claro, Movistar) bajan tarifas constantemente. Cambiar de plan puede ahorrarte S/ 20 al mes con los mismos o más gigas."
      },
      {
        title: "Rotación inteligente de streaming",
        desc: "Contrata una sola plataforma por mes, disfruta tus series, cancélala y pasa a la siguiente. ¡Ahorras más de S/ 350 al año!"
      }
    ],
    takeaway: "Cancelar 2 suscripciones que no usas libera más de S/ 400 al año directamente para tus ahorros en soles.",
    quiz: {
      question: "¿Cuál es la 'regla de los 14 días' para optimizar tus gastos de streaming y apps?",
      options: [
        "A) Crear 14 cuentas de correo distintas",
        "B) Si no utilizaste el servicio en 14 días seguidos, cancelar la suscripción mensual de inmediato",
        "C) Mirar series 14 horas seguidas para que valga la pena"
      ],
      correctIndex: 1,
      explanation: "¡Exacto! Pagar por servicios que no usas en dos semanas es una fuga de dinero silenciosa. Cancélalo y reactívalo solo cuando lo necesites.",
      xpBonus: 25
    }
  }
];

export const TOPIC_LESSONS: Record<'ahorro' | 'tarjetas' | 'prestamos' | 'servicios', TopicLesson> = {
  ahorro: ALL_TOPIC_LESSONS[0],
  tarjetas: ALL_TOPIC_LESSONS[2],
  prestamos: ALL_TOPIC_LESSONS[4],
  servicios: ALL_TOPIC_LESSONS[6],
};

export const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    id: "tcea",
    sigla: "TCEA",
    name: "Tasa de Costo Efectivo Anual",
    category: "siglas",
    shortDesc: "Incluye comisiones, seguros y trampas.",
    badge: "★ La sigla que manda",
    isPopular: true,
    explanation: "¡La que de verdad importa según la SBS al pedir un préstamo o usar tarjeta! La TEA te dice la tasa limpia, pero la TCEA suma los seguros obligatorios (como el de desgravamen), gastos administrativos y comisiones. Nunca mires la TEA; exige siempre la TCEA para comparar bancos y cajas en el Perú.",
    ruleOfGold: "En préstamos y tarjetas en el Perú, siempre elige la TCEA más baja posible.",
    realWorldExample: "Un banco te ofrece TEA 18% con TCEA 45%, y una Caja Municipal te ofrece TEA 22% con TCEA 28%. ¡La Caja Municipal te saldrá MUCHO más barata!",
    bankTrap: "Publicitar la TEA en letreros gigantes y esconder la TCEA en letra pequeña tamaño 6 en el contrato."
  },
  {
    id: "tea",
    sigla: "TEA",
    name: "Tasa Efectiva Anual",
    category: "siglas",
    shortDesc: "El costo del dinero sin comisiones.",
    badge: "Tasa base teórica",
    isPopular: true,
    explanation: "Es el interés 'puro y duro' que te cobran por un crédito o te pagan por tu dinero en un año, sin meter seguros ni cargos extra. Suena atractiva en la publicidad bancaria, pero es engañosa porque en la práctica nunca pagarás solo la TEA.",
    ruleOfGold: "Úsala solo como referencia matemática, nunca para tomar la decisión final de endeudarte.",
    realWorldExample: "Es como el precio de un pasaje de bus o avión sin impuestos ni equipaje. El costo final que sale de tu bolsillo será mayor.",
    bankTrap: "Comparar dos créditos mirando solo la TEA. Te puedes llevar una sorpresa desagradable en la cuota mensual en soles."
  },
  {
    id: "trea",
    sigla: "TREA",
    name: "Tasa de Rendimiento Efectivo Anual",
    category: "siglas",
    shortDesc: "Lo que realmente ganas al ahorrar en soles.",
    badge: "★ La reina del ahorro",
    isPopular: true,
    explanation: "Es la tasa real que tu dinero va a ganar en una cuenta de ahorros, depósito a plazo fijo (DPF) o fondo mutuo. Toma el interés prometido y le resta comisiones de mantenimiento, portes y cobros del banco. Es lo que verdaderamente entra a tu bolsillo en soles.",
    ruleOfGold: "Para guardar o hacer crecer tus ahorros en soles, busca siempre la TREA más alta en entidades con Fondo de Seguro de Depósitos (FSD).",
    realWorldExample: "Si te prometen 6% pero te descuentan S/ 10 al mes por 'mantenimiento de cuenta', con poco saldo tu TREA puede terminar siendo negativa.",
    bankTrap: "Cuentas bancarias que prometen 'sorteos de camionetas' pero pagan una TREA de casi 0.1% anual."
  },
  {
    id: "desgravamen",
    sigla: "Desgravamen",
    name: "Seguro de Desgravamen",
    category: "prestamos",
    shortDesc: "Paga tu deuda si falleces, pero revisa la tasa.",
    badge: "Seguro obligatorio SBS",
    explanation: "Es un seguro exigido por la SBS en créditos y tarjetas. Si el titular fallece o sufre invalidez total, la aseguradora cancela la deuda pendiente y tu familia no hereda ese problema. Se calcula sobre el saldo deudor promedio del mes.",
    ruleOfGold: "Si pagas tu tarjeta al 100% antes de tu fecha de corte, muchas entidades no te cobran seguro de desgravamen ese mes.",
    realWorldExample: "En tarjetas peruanas suele costar entre 0.25% y 0.39% del saldo o una tarifa fija de S/ 5 a S/ 12 al mes si registras saldo deudor.",
    bankTrap: "Cobrarte tarifas fijas altas de desgravamen aunque tu saldo deudor a fin de mes sea de apenas S/ 5."
  },
  {
    id: "fecha-corte",
    sigla: "Corte vs Pago",
    name: "Fecha de Corte y Fecha de Pago",
    category: "tarjetas",
    shortDesc: "El truco para financiarte hasta 50 días gratis.",
    badge: "Hack financiero",
    isPopular: true,
    explanation: "La Fecha de Corte es el día que el banco 'toma la foto' de tus consumos del mes. La Fecha de Pago es el día límite para pagar esa foto (unos 20 a 25 días después). Si compras el día siguiente a tu corte, ganas casi 50 días sin pagar un sol de intereses.",
    ruleOfGold: "Anota en tu calendario tu día de corte y haz consumos fuertes programados justo 1 o 2 días después.",
    realWorldExample: "Corte: día 10. Pago: día 30. Compras el día 11: esa compra entrará al corte del siguiente mes (10 del próximo mes) y la pagarás el 30 del mes subsiguiente.",
    bankTrap: "Confundir la fecha de corte con la de pago y pagar tarde generando penalidad por mora de S/ 49 a S/ 69."
  },
  {
    id: "pago-minimo",
    sigla: "Pago Mínimo",
    name: "La trampa del Pago Mínimo",
    category: "tarjetas",
    shortDesc: "El camino directo al endeudamiento eterno.",
    badge: "¡Alerta peligro!",
    isPopular: true,
    explanation: "Es el monto más pequeño que el banco te exige para no reportarte como moroso a la SBS e Infocorp. Casi el 90% de este pago va a cubrir intereses compensatorios, seguros e impuestos, y apenas unos centavos amortizan la deuda real.",
    ruleOfGold: "Nunca pagues el mínimo salvo una extrema emergencia puntual. Paga siempre el 'Monto Total Facturado del Mes'.",
    realWorldExample: "Por una deuda de S/ 2,000 con TCEA de 65%, pagando el mínimo tardarás más de 10 años y habrás pagado más de S/ 5,500.",
    bankTrap: "Poner el botón de 'Pagar Mínimo' grande y resaltado en la app del banco y esconder la opción de pago total."
  },
  {
    id: "gasto-hormiga",
    sigla: "Gasto Hormiga",
    name: "Gastos Hormiga y Vampiro",
    category: "gastos",
    shortDesc: "Pequeñas fugas diarias que hunden el presupuesto.",
    badge: "Fuga silenciosa",
    explanation: "Son compras cotidianas de bajo monto que consideramos insignificantes (un café al paso, gaseosas, piqueos, compras compulsivas por Yape). Al sumarlas a fin de mes, representan frecuentemente entre el 12% y 20% del sueldo.",
    ruleOfGold: "No te prives de todo: asígnate un presupuesto semanal de gustos en tu billetera digital (Yape o Plin) solo para antojos.",
    realWorldExample: "Un antojo de S/ 8 diario = S/ 240 al mes = S/ 2,880 al año. ¡Casi tres sueldos mínimos en gastos invisibles!",
    bankTrap: "Comisiones de cajero ajeno de S/ 5 a S/ 8 por retirar dinero fuera de la red de tu banco."
  },
  {
    id: "fondo-liquidez",
    sigla: "Fondo Emergencia",
    name: "Fondo de Liquidez / Emergencia",
    category: "ahorro",
    shortDesc: "De 3 a 6 meses de gastos fijos innegociables en soles.",
    badge: "Tu escudo supremo",
    isPopular: true,
    explanation: "Es una reserva de dinero en soles guardada en una cuenta segura, de alta liquidez y separada de tu cuenta de gastos diarios. Su único objetivo es darte tranquilidad ante imprevistos graves (pérdida de empleo, emergencias médicas o familiares).",
    ruleOfGold: "No se invierte en negocios de riesgo: debe estar 100% disponible en una entidad con Fondo de Seguro de Depósitos (FSD).",
    realWorldExample: "Si tus gastos mínimos para vivir son S/ 1,200 al mes, tu colchón ideal debe rondar entre S/ 3,600 y S/ 7,200 en soles.",
    bankTrap: "Tener el fondo de emergencia en la misma tarjeta con la que yapéas tus salidas de fin de semana."
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "ach-1",
    title: "Ahorrador Inicial",
    icon: "🏆",
    category: "Ahorro",
    xpReward: 100,
    description: "Completaste tu primera microlección de ahorro y fijaste tu porcentaje 50/30/20.",
    completed: true,
    progressText: "Completado ✓"
  },
  {
    id: "ach-2",
    title: "Cero Deuda Oculta",
    icon: "🛡️",
    category: "Préstamos",
    xpReward: 100,
    description: "Aprendiste la diferencia vital entre TEA y TCEA y cómo desenmascarar comisiones.",
    completed: true,
    progressText: "Completado ✓"
  },
  {
    id: "ach-3",
    title: "Racha Semanal",
    icon: "⭐",
    category: "Constancia",
    xpReward: 150,
    description: "7 de 7 días completando al menos 1 píldora financiera diaria.",
    completed: true,
    progressText: "7 de 7 días",
    canClaim: true
  },
  {
    id: "ach-4",
    title: "Auditor de Recibos",
    icon: "📊",
    category: "Gastos",
    xpReward: 75,
    description: "Revisa y optimiza tus gastos fijos y aparatos vampiro.",
    completed: false,
    progressText: "2 / 3 listo"
  },
  {
    id: "ach-5",
    title: "Cazador de TCEA",
    icon: "🎯",
    category: "Préstamos",
    xpReward: 80,
    description: "Simula un crédito en el simulador de cuotas y compara dos entidades.",
    completed: false,
    progressText: "0 / 1 simulación"
  },
  {
    id: "ach-6",
    title: "Sin Pago Mínimo",
    icon: "💳",
    category: "Tarjetas",
    xpReward: 100,
    description: "Domina el truco de la fecha de corte y elimina la trampa de los mínimos.",
    completed: false,
    progressText: "0 / 1 cápsula"
  },
  {
    id: "ach-7",
    title: "Colchón de Emergencia",
    icon: "🛟",
    category: "Ahorro",
    xpReward: 120,
    description: "Calcula tu presupuesto de supervivencia de 3 meses.",
    completed: false,
    progressText: "Falta calcular"
  },
  {
    id: "ach-8",
    title: "Domador del Gasto Hormiga",
    icon: "🐜",
    category: "Gastos",
    xpReward: 90,
    description: "Descubre tus fugas invisibles con el calculador de antojos.",
    completed: false,
    progressText: "Bloqueado"
  },
  {
    id: "ach-9",
    title: "Maestro 50/30/20",
    icon: "⚖️",
    category: "Ahorro",
    xpReward: 110,
    description: "Configura tu balance de ingresos y distribuye tus 10 monedas.",
    completed: false,
    progressText: "Bloqueado"
  },
  {
    id: "ach-10",
    title: "Ninja de las Tarjetas",
    icon: "🥷",
    category: "Tarjetas",
    xpReward: 130,
    description: "Finánciate a 50 días calendario con 0% de interés.",
    completed: false,
    progressText: "Bloqueado"
  },
  {
    id: "ach-11",
    title: "Fuego Doble (14 Días)",
    icon: "🔥",
    category: "Constancia",
    xpReward: 200,
    description: "Mantén tu racha activa por 2 semanas consecutivas.",
    completed: false,
    progressText: "7 / 14 días"
  },
  {
    id: "ach-12",
    title: "Libertad Financiera",
    icon: "👑",
    category: "Maestría",
    xpReward: 500,
    description: "Alcanza el Nivel 5 y desbloquea todas las herramientas avanzadas.",
    completed: false,
    progressText: "Nivel 3 / 5"
  }
];

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "m-1",
    title: "Aprende una microlección de 4 min",
    xp: 50,
    completed: false,
    actionTab: "inicio"
  },
  {
    id: "m-2",
    title: "Prueba el simulador de cuotas y TCEA",
    xp: 30,
    completed: false,
    actionTab: "simulador"
  },
  {
    id: "m-3",
    title: "Consulta un término nuevo en el Diccionario",
    xp: 20,
    completed: false,
    actionTab: "diccionario"
  }
];
