'use client';

import { useState } from 'react';
import { Bell, Globe, Thermometer, Shield, Info, Moon } from 'lucide-react';

export default function SettingsContent() {
  const [unit, setUnit] = useState('Celsius');
  const [notifications, setNotifications] = useState(true);

  const SettingItem = ({ icon: Icon, title, desc, children }: any) => (
    <div className="flex items-center justify-between p-6 bg-[#202B3B]/40 rounded-[25px] border border-white/5 backdrop-blur-sm hover:bg-[#202B3B]/60 transition-all group">
      <div className="flex gap-4 items-center">
        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
          <Icon size={22} />
        </div>
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <p className="text-xs text-[#9399A2]">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-[#9399A2] text-sm mt-1">Personalize your weather experience</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettingItem icon={Thermometer} title="Temperature Unit" desc="Choose Celsius or Fahrenheit">
          <div className="flex bg-[#0B131E] p-1 rounded-xl border border-white/5">
            {['Celsius', 'Fahrenheit'].map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${unit === u ? 'bg-blue-500 text-white shadow-lg' : 'text-[#9399A2] hover:text-white'}`}>
                {u === 'Celsius' ? '°C' : '°F'}
              </button>
            ))}
          </div>
        </SettingItem>

        <SettingItem icon={Bell} title="Notifications" desc="Get daily weather alerts">
          <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-blue-500' : 'bg-white/10'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
          </button>
        </SettingItem>

        <SettingItem icon={Globe} title="Language" desc="Select your preferred language">
          <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-1 ring-blue-500">
            <option>English (US)</option>
            <option>Bahasa Indonesia</option>
          </select>
        </SettingItem>

        <SettingItem icon={Moon} title="Dark Mode" desc="Automatic theme switching">
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md uppercase">Always On</span>
        </SettingItem>
      </div>

      <div className="mt-4 p-8 bg-linear-to-br from-blue-500/10 to-transparent border border-white/5 rounded-[35px] text-center">
        <Info size={32} className="mx-auto mb-4 text-blue-400 opacity-50" />
        <h4 className="font-bold text-lg mb-1">Weather App v1.2.0</h4>
        <p className="text-sm text-[#9399A2] mb-6">Designed with passion for the modern web.</p>
        <button className="text-xs font-bold text-blue-400 hover:underline">Check for updates</button>
      </div>
    </div>
  );
}
