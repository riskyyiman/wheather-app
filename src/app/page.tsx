'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import MainWeather from '@/components/MainWeather';
import HourlyForecast from '@/components/HourlyForecast';
import AirConditions from '@/components/AirConditions';
import WeeklyForecast from '@/components/WeeklyForecast';
import Cities from '@/components/Cities';
import SettingsContent from '@/components/SettingsContent';
import dynamic from 'next/dynamic';

// GUNAKAN HANYA INI untuk menghindari error "window is not defined" dari Leaflet
const MapContent = dynamic(() => import('@/components/MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[#202B3B]/50 rounded-[35px] animate-pulse flex items-center justify-center">
      <p className="text-blue-400">Memuat Peta...</p>
    </div>
  ),
});

export default function Home() {
  const [activeTab, setActiveTab] = useState('weather');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(false);
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes&alerts=no`);
      const data = await res.json();
      if (!data.error) {
        setWeatherData(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      // Delay halus agar transisi animasi terasa premium
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    // 1. Fungsi untuk mendapatkan lokasi user
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Jika user mengizinkan, ambil lat & long
            const { latitude, longitude } = position.coords;
            fetchWeather(`${latitude},${longitude}`);
          },
          (error) => {
            // Jika user menolak atau error, fallback ke lokasi default (misal: Madrid)
            console.warn('Akses lokasi ditolak, menggunakan lokasi default.');
            fetchWeather('Madrid');
          }
        );
      } else {
        // Browser tidak mendukung Geolocation
        fetchWeather('Madrid');
      }
    };

    getUserLocation();
  }, []); // Jalankan sekali saat mount
  // Fungsi Helper untuk merender konten utama berdasarkan navigasi Sidebar
  const renderMainContent = () => {
    switch (activeTab) {
      case 'weather':
        return (
          <div className="grid grid-cols-12 gap-8 animate-in fade-in zoom-in duration-700">
            {/* Kolom Kiri: Informasi Cuaca Utama */}
            <section className="col-span-12 lg:col-span-8 space-y-8">
              <div className="hover:scale-[1.01] transition-transform duration-300 cursor-default">
                <MainWeather data={weatherData.current} location={weatherData.location} forecast={weatherData.forecast.forecastday[0]} />
              </div>
              <div className="grid grid-cols-1 gap-8">
                <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
                <AirConditions current={weatherData.current} forecast={weatherData.forecast.forecastday[0]} />
              </div>
            </section>

            {/* Kolom Kanan: Forecast Mingguan */}
            <section className="col-span-12 lg:col-span-4 h-full">
              <WeeklyForecast dailyData={weatherData.forecast.forecastday} />
            </section>
          </div>
        );

      case 'cities':
        return (
          <Cities
            onCityClick={(cityName) => {
              fetchWeather(cityName);
              setActiveTab('weather');
            }}
          />
        );

      case 'map':
        return <MapContent />;

      case 'settings':
        return <SettingsContent />;

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#0B131E] text-white p-4 lg:p-8 flex flex-col lg:flex-row gap-8 font-sans pb-28 lg:pb-8">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex w-24 shrink-0 h-[calc(100vh-4rem)] sticky top-8">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* SIDEBAR MOBILE (Bottom Dock) */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50 h-20 shadow-2xl">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* AREA KONTEN */}
      <div className="flex-1 flex flex-col gap-8 max-w-400 mx-auto w-full">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:max-w-md lg:max-w-xl">
            <SearchBar onSearch={(value) => fetchWeather(value)} />
          </div>

          <div className="flex items-center gap-4 bg-[#202B3B]/50 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/5 shadow-xl">
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-400 tracking-wide uppercase">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-xl font-bold font-mono leading-none mt-1">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </header>

        {loading ? <WeatherSkeleton /> : error ? <ErrorState onRetry={() => fetchWeather('auto:ip')} /> : weatherData && renderMainContent()}
      </div>
    </main>
  );
}

// --- KOMPONEN INTERNAL UNTUK UX ---

function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-8 animate-pulse">
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="h-64 bg-[#202B3B]/50 rounded-[35px]"></div>
        <div className="h-48 bg-[#202B3B]/50 rounded-[35px]"></div>
        <div className="h-64 bg-[#202B3B]/50 rounded-[35px]"></div>
      </div>
      <div className="col-span-12 lg:col-span-4 h-full bg-[#202B3B]/50 rounded-[35px]"></div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
      <div className="bg-[#202B3B]/80 p-10 rounded-[40px] border border-white/5 shadow-2xl backdrop-blur-xl max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Gagal Memuat Data</h2>
        <p className="text-[#9399A2] text-sm mb-8 leading-relaxed">Terjadi kesalahan saat mengambil informasi cuaca. Periksa koneksi internet atau coba lagi nanti.</p>
        <button onClick={onRetry} className="w-full bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
