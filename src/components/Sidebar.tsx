import { Wind, CloudSun, List, Map, Settings } from 'lucide-react';

export default function sidebar() {
  return (
    <div className="bg-card h-full rounded-[35px] flex flex-col items-center py-8 gap-10">
      <div className="p-3 bg-blue-500/20 rounded-xl text-accent">
        <Wind size={28} />
      </div>
      <div className="flex flex-col gap-8 text-textDim">
        <div className="flex flex-col items-center gap-1 text-white">
          <CloudSun size={24} />
          <span className="text-[10px] font-bold">Weather</span>
        </div>
        <List size={24} className="hover:text-white cursor-pointer" />
        <Map size={24} className="hover:text-white cursor-pointer" />
        <Settings size={24} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
}
