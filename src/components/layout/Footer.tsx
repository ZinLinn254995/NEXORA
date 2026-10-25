import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HardDrive, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800/80 bg-[#08090e] text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Product Vision */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <span className="font-display font-semibold text-slate-200">
            NEXORA Studio
          </span>
          <span className="text-slate-600">·</span>
          <span>{t.welcomeSubtitle.slice(0, 65)}...</span>
        </div>

        {/* Right: Storage & Foundation Transparency */}
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>Local Storage Active</span>
          </div>
          <span className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            <span>Foundation Architecture v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
