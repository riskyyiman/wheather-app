// src/components/MainWeather.tsx

export default function MainWeather({ data, location, forecast }: any) {
  // 1. Safety Check: Pastikan data ada sebelum render
  if (!data || !location || !forecast) {
    return null;
  }

  // 2. Logika Pemilihan Icon 3D (Custom)
  const getIcon3D = (conditionText: string) => {
    const text = conditionText.toLowerCase();

    // Cek kata kunci cuaca untuk menentukan gambar yang dipakai
    // Pastikan file gambar ini sudah ada di folder 'public'
    if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return '/rain.png';
    if (text.includes('storm') || text.includes('thunder')) return '/storm.png';
    if (text.includes('snow') || text.includes('blizzard')) return '/snow.png';
    if (text.includes('cloud') || text.includes('overcast') || text.includes('mist') || text.includes('fog')) return '/cloud.png';

    // Default jika cerah atau kondisi lain
    return '/sun.png';
  };

  // 3. Panggil fungsi untuk mendapatkan URL gambar
  const iconUrl = getIcon3D(data.condition.text);

  return (
    <div className="flex justify-between items-center px-4">
      {/* Bagian Kiri: Teks Informasi */}
      <div>
        <h1 className="text-5xl font-bold">{location.name}</h1>
        <p className="text-[#9399A2] mt-2">Chance of rain: {forecast.day.daily_chance_of_rain}%</p>
        <div className="text-7xl font-bold mt-10">{Math.round(data.temp_c)}°</div>
      </div>

      {/* Bagian Kanan: Gambar Icon 3D */}
      <div className="relative">
        {/* Glow effect di belakang icon */}
        <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-20 rounded-full" />

        {/* Render Image dari variabel iconUrl */}
        <img src={iconUrl} alt={data.condition.text} className="w-56 h-56 relative z-10 object-contain drop-shadow-2xl" />
      </div>
    </div>
  );
}
