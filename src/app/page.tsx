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

// ===================== MAP (NO SSR) =====================
const MapContent = dynamic(() => import('@/components/MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[#202B3B]/50 rounded-[35px] animate-pulse flex items-center justify-center">
      <p className="text-blue-400">Memuat Peta...</p>
    </div>
  ),
});

// ===================== ERROR TYPE =====================
type ErrorType = 'NONE' | 'NETWORK' | 'API_LIMIT' | 'INVALID_KEY' | 'NOT_FOUND';

export default function Home() {
  const [activeTab, setActiveTab] = useState('weather');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<ErrorType>('NONE');

  // ===================== FETCH WEATHER =====================
  const fetchWeather = async (query: string) => {
    setLoading(true);
    setErrorType('NONE');

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes&alerts=no`);

      const data = await res.json();

      if (data?.error) {
        switch (data.error.code) {
          case 2008:
            setErrorType('API_LIMIT');
            break;
          case 1002:
            setErrorType('INVALID_KEY');
            break;
          case 1006:
            setErrorType('NOT_FOUND');
            break;
          default:
            setErrorType('NETWORK');
        }
        return;
      }

      setWeatherData(data);
    } catch {
      setErrorType('NETWORK');
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // ===================== GEOLOCATION =====================
  useEffect(() => {
    if (!navigator.geolocation) {
      fetchWeather('Madrid');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      () => {
        fetchWeather('Madrid');
      }
    );
  }, []);

  // ===================== MAIN CONTENT =====================
  const renderMainContent = () => {
    if (!weatherData) return null;

    switch (activeTab) {
      case 'weather':
        return (
          <div className="grid grid-cols-12 gap-8 animate-in fade-in zoom-in duration-700">
            <section className="col-span-12 lg:col-span-8 space-y-8">
              <MainWeather data={weatherData.current} location={weatherData.location} forecast={weatherData.forecast.forecastday[0]} />
              <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
              <AirConditions current={weatherData.current} forecast={weatherData.forecast.forecastday[0]} />
            </section>

            <section className="col-span-12 lg:col-span-4">
              <WeeklyForecast dailyData={weatherData.forecast.forecastday} />
            </section>
          </div>
        );

      case 'cities':
        return (
          <Cities
            onCityClick={(city) => {
              fetchWeather(city);
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

  // ===================== RENDER =====================
  return (
    <main className="min-h-screen bg-[#0B131E] text-white p-4 lg:p-8 flex flex-col lg:flex-row gap-8 pb-28 lg:pb-8">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-24 sticky top-8">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col gap-8 max-w-400 mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between gap-6">
          <SearchBar onSearch={fetchWeather} />
          <TimeCard />
        </header>

        {loading && <WeatherSkeleton />}

        {!loading && errorType === 'API_LIMIT' && <ApiLimitState />}

        {!loading && errorType === 'INVALID_KEY' && <GenericError title="API Key Tidak Valid" message="Konfigurasi API bermasalah. Hubungi developer." />}

        {!loading && errorType === 'NOT_FOUND' && <GenericError title="Lokasi Tidak Ditemukan" message="Coba nama kota lain." onRetry={() => fetchWeather('Madrid')} />}

        {!loading && errorType === 'NETWORK' && <GenericError title="Gagal Memuat Data" message="Periksa koneksi internet." onRetry={() => fetchWeather('auto:ip')} />}

        {!loading && errorType === 'NONE' && renderMainContent()}
      </div>
    </main>
  );
}

// ===================== COMPONENTS =====================

function TimeCard() {
  return (
    <div className="bg-[#202B3B]/50 px-6 py-3 rounded-2xl border border-white/5">
      <p className="text-sm text-blue-400">{new Date().toLocaleDateString('en-US')}</p>
      <p className="text-xl font-mono">
        {new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-8 animate-pulse">
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="h-64 bg-[#202B3B]/50 rounded-[35px]" />
        <div className="h-48 bg-[#202B3B]/50 rounded-[35px]" />
      </div>
      <div className="col-span-12 lg:col-span-4 h-96 bg-[#202B3B]/50 rounded-[35px]" />
    </div>
  );
}

function ApiLimitState() {
  return <GenericError icon="⛔" title="API Limit Tercapai" message="Kuota API cuaca aplikasi ini telah habis. Silakan coba lagi besok." />;
}

function GenericError({ title, message, icon = '⚠️', onRetry }: { title: string; message: string; icon?: string; onRetry?: () => void }) {
  return (
    <div className="flex justify-center">
      <div className="bg-[#202B3B]/80 p-10 rounded-[40px] max-w-md text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-[#9399A2] mb-6">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold">
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
