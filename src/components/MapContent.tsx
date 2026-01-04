'use client';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Maximize2, Layers } from 'lucide-react';

// Perbaikan icon default Leaflet yang sering hilang di Next.js/React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapContent() {
  const position: [number, number] = [-7.4244, 109.2307]; // Koordinat Sokaraja/Purwokerto

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-150 lg:h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Interactive Weather Map</h2>
          <p className="text-[#9399A2] text-sm mt-1">Explore real-time weather conditions globally</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-[#202B3B]/50 hover:bg-[#202B3B] rounded-xl border border-white/5 transition-all">
            <Layers size={20} className="text-blue-400" />
          </button>
          <button className="p-3 bg-[#202B3B]/50 hover:bg-[#202B3B] rounded-xl border border-white/5 transition-all">
            <Maximize2 size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Container Peta */}
      <div className="relative flex-1 bg-[#202B3B]/30 rounded-[35px] border border-white/5 overflow-hidden shadow-2xl z-0">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="z-0 grayscale-[0.2] invert-[0.9] hue-rotate-180" // Trik CSS untuk Dark Mode Map
        >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomControl position="topleft" />
          <Marker position={position}>
            <Popup>
              <div className="text-black font-sans">
                <p className="font-bold">Sokaraja</p>
                <p className="text-xs">Current: 23°C • Heavy Rain</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Floating Info Card (UX Friendly) */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 p-6 bg-[#0B131E]/90 backdrop-blur-xl rounded-[25px] border border-white/10 shadow-2xl z-1000">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-lg text-white">Current View</h4>
              <p className="text-xs text-[#9399A2]">Purwokerto Region</p>
            </div>
            <div className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md">LIVE RADAR</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#9399A2]">Map Layer</span>
              <span className="font-bold text-white">Precipitation</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[85%] shadow-[0_0_8px_#3b82f6]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
