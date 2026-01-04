'use client';

import { Wind, CloudSun, List, Map, Settings } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'weather', icon: CloudSun, label: 'Weather' },
  { id: 'cities', icon: List, label: 'Cities' },
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

// Menambahkan interface props
interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <nav className="bg-card h-full w-full rounded-[30px] lg:rounded-[35px] flex flex-row lg:flex-col items-center justify-around lg:justify-start py-4 lg:py-8 lg:gap-10 shadow-2xl border border-white/5 backdrop-blur-lg">
      <div className="hidden lg:flex p-3 bg-blue-500/20 rounded-2xl text-accent mb-4 shadow-inner">
        <Wind size={28} />
      </div>

      <div className="flex flex-row lg:flex-col items-center justify-around w-full lg:gap-8 px-4 lg:px-0">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)} // Menggunakan fungsi dari props
              className={`flex flex-col items-center gap-1 transition-all duration-300 group outline-none
                ${isActive ? 'text-white scale-110' : 'text-textDim hover:text-white hover:scale-105'}`}
            >
              <div className={`relative p-2 lg:p-0 rounded-xl transition-colors ${isActive && 'lg:bg-transparent'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <span className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_rgba(0,149,255,0.8)]" />}
              </div>
              <span className={`text-[10px] font-bold tracking-tight uppercase transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
