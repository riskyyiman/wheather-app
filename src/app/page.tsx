'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import MainWeather from '@/components/MainWeather';
import HourlyForecast from '@/components/HourlyForecast';
import AirConditions from '@/components/AirConditions';
import WeeklyForecast from '@/components/WeeklyForecast';

export default function Home() {
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
      // Simulasi delay sedikit agar transisi loading terasa smooth
      setTimeout(() => setLoading(false), 500);
    }
  };

  // useEffect(() => {
  //   // Menggunakan auto:ip untuk kenyamanan pengguna (tanpa popup notifikasi)
  //   fetchWeather('auto:ip');
  // }, []);

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

  return (
    <main className="min-h-screen bg-[#0B131E] text-white p-4 lg:p-8 flex flex-col lg:flex-row gap-8 font-sans transition-all duration-500">
      {/* SIDEBAR: Modern fixed sidebar on desktop, hidden on mobile */}
      <aside className="hidden lg:flex w-24 shrink-0 h-[calc(100vh-4rem)] sticky top-8">
        <Sidebar />
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col gap-8 max-w-400 mx-auto w-full">
        {/* HEADER: Search & Real-time Clock */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:max-w-md lg:max-w-xl">
            <SearchBar onSearch={(value) => fetchWeather(value)} />
          </div>

          <div className="flex items-center gap-4 bg-[#202B3B]/50 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/5 shadow-xl">
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-400 tracking-wide uppercase">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-xl font-bold font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </header>

        {loading ? (
          <WeatherSkeleton />
        ) : error ? (
          <ErrorState onRetry={() => fetchWeather('auto:ip')} />
        ) : (
          weatherData && (
            <div className="grid grid-cols-12 gap-8 animate-in fade-in zoom-in duration-700">
              {/* LEFT COLUMN: Main info & Hourly */}
              <section className="col-span-12 lg:col-span-8 space-y-8">
                <div className="hover:scale-[1.01] transition-transform duration-300 cursor-default">
                  <MainWeather data={weatherData.current} location={weatherData.location} forecast={weatherData.forecast.forecastday[0]} />
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
                  <AirConditions current={weatherData.current} forecast={weatherData.forecast.forecastday[0]} />
                </div>
              </section>

              {/* RIGHT COLUMN: Weekly Forecast */}
              <section className="col-span-12 lg:col-span-4 group">
                <WeeklyForecast dailyData={weatherData.forecast.forecastday} />
              </section>
            </div>
          )
        )}
      </div>
    </main>
  );
}

// Komponen UX Tambahan: Skeleton Loading
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

// Komponen UX Tambahan: Error Handling
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <p className="text-xl text-textDim">Oops! Gagal memuat data cuaca.</p>
      <button onClick={onRetry} className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-bold transition-all active:scale-95">
        Coba Lagi
      </button>
    </div>
  );
}
