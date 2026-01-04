'use client';

import { Search, MapPin, Navigation } from 'lucide-react';

// Data Mock untuk daftar kota
const SAVED_CITIES = [
  { id: 1, name: 'Sokaraja', country: 'Indonesia', temp: '23°', condition: 'Heavy Rain', time: '10:20 PM', icon: '🌧️' },
  { id: 2, name: 'Jakarta', country: 'Indonesia', temp: '32°', condition: 'Sunny', time: '10:20 PM', icon: '☀️' },
  { id: 3, name: 'London', country: 'UK', temp: '12°', condition: 'Cloudy', time: '3:20 PM', icon: '☁️' },
  { id: 4, name: 'Tokyo', country: 'Japan', temp: '18°', condition: 'Mist', time: '12:20 AM', icon: '🌫️' },
];

interface CitiesProps {
  onCityClick: (cityName: string) => void;
}

export default function Cities({ onCityClick }: CitiesProps) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Halaman Cities */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Cities</h2>
          <p className="text-[#9399A2] text-sm mt-1">Manage and track your favorite cities</p>
        </div>

        {/* Search khusus di dalam halaman Cities */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9399A2] group-focus-within:text-blue-400 transition-colors" size={18} />
          <input type="text" placeholder="Search for cities..." className="w-full bg-[#202B3B]/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 ring-blue-500/20 transition-all text-sm backdrop-blur-md" />
        </div>
      </div>

      {/* Grid Daftar Kota */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SAVED_CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => onCityClick(city.name)}
            className="bg-[#202B3B]/50 hover:bg-[#202B3B] border border-white/5 p-6 rounded-[30px] flex items-center justify-between transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl text-left backdrop-blur-md"
          >
            <div className="flex gap-4 items-center">
              <div className="text-4xl">{city.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{city.name}</h3>
                <p className="text-[#9399A2] text-xs flex items-center gap-1">
                  <MapPin size={10} /> {city.country} • {city.time}
                </p>
                <p className="text-sm font-medium mt-1 text-white/80">{city.condition}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-3xl font-bold text-white">{city.temp}</span>
              <div className="mt-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Navigation size={18} className="rotate-45" />
              </div>
            </div>
          </button>
        ))}

        {/* Tombol Add New City (UX: Memberi tahu user bisa menambah kota) */}
        <button className="border-2 border-dashed border-white/10 hover:border-blue-500/50 rounded-[30px] p-6 flex flex-col items-center justify-center gap-2 text-[#9399A2] hover:text-blue-400 transition-all group min-h-30">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
            <span className="text-2xl">+</span>
          </div>
          <span className="text-sm font-bold">Add New City</span>
        </button>
      </div>
    </div>
  );
}
