'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import MainWeather from '@/components/MainWeather';
import HourlyForecast from '@/components/HourlyForecast';
import AirConditions from '@/components/AirConditions';
import WeeklyForecast from '@/components/WeeklyForecast';

export default function Home() {
  const [city, setCity] = useState('Madrid');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes&alerts=no`);
      const data = await res.json();
      if (!data.error) setWeatherData(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B131E] text-white p-4 md:p-8 flex gap-6 overflow-hidden font-sans">
      <aside className="hidden lg:block w-20 shrink-0">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        <header className="flex items-center justify-between gap-4">
          {/* Kirim fungsi fetchWeather ke SearchBar */}
          <SearchBar onSearch={(value) => fetchWeather(value)} />

          <div className="text-right hidden sm:block">
            <p className="text-sm text-blue-400 font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            <p className="text-xs text-gray-400">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </header>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">Loading...</div>
        ) : (
          weatherData && (
            <div className="grid grid-cols-12 gap-6">
              <section className="col-span-12 lg:col-span-8 space-y-6">
                <MainWeather data={weatherData.current} location={weatherData.location} forecast={weatherData.forecast.forecastday[0]} />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
                  <AirConditions current={weatherData.current} forecast={weatherData.forecast.forecastday[0]} />
                </div>
              </section>

              <section className="col-span-12 lg:col-span-4">
                <WeeklyForecast dailyData={weatherData.forecast.forecastday} />
              </section>
            </div>
          )
        )}
      </div>
    </main>
  );
}
