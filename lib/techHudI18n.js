// Tech HUD translations for EN, AZ, RU
export const TECH_HUD_TRANSLATIONS = {
  EN: {
    diagnosticStream: 'DIAGNOSTIC STREAM',
    active: 'ACTIVE',
    systemStatus: 'SYSTEM STATUS',
    optimal: 'OPTIMAL',
    metrics: 'METRICS',
    liveMetrics: 'LIVE METRICS',
    realTimeAnalytics: 'Real-time Analytics',
    dataSecurity: 'Data Security',
    systemPerformance: 'System Performance',
    researchGrade: 'Research Grade',
  },
  AZ: {
    diagnosticStream: 'DİAQNOZ AXINI',
    active: 'FAALİYYƏTDƏ',
    systemStatus: 'SİSTEM VƏZIYYƏTI',
    optimal: 'OPTİMAL',
    metrics: 'ÖLÇÜLƏR',
    liveMetrics: 'CANLI ÖLÇÜLƏR',
    realTimeAnalytics: 'Real-time Analitika',
    dataSecurity: 'Məlumat Təhlükəsizliyi',
    systemPerformance: 'Sistem Performansı',
    researchGrade: 'Tədqiqat Keyfiyyəti',
  },
  RU: {
    diagnosticStream: 'ДИАГНОСТИЧЕСКИЙ ПОТОК',
    active: 'АКТИВЕН',
    systemStatus: 'СТАТУС СИСТЕМЫ',
    optimal: 'ОПТИМАЛЕН',
    metrics: 'ПОКАЗАТЕЛИ',
    liveMetrics: 'ПРЯМЫЕ ПОКАЗАТЕЛИ',
    realTimeAnalytics: 'Анализ в реальном времени',
    dataSecurity: 'Безопасность данных',
    systemPerformance: 'Производительность системы',
    researchGrade: 'Научный класс',
  },
};

export function getTechHudText(key, lang = 'EN') {
  return TECH_HUD_TRANSLATIONS[lang]?.[key] || TECH_HUD_TRANSLATIONS['EN'][key] || key;
}