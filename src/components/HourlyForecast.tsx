// src/components/HourlyForecast.tsx
export default function HourlyForecast({ hourlyData }: any) {
  // Ambil jam 6, 9, 12, 15, 18, 21
  const displayHours = hourlyData?.filter((_: any, index: number) => [6, 9, 12, 15, 18, 21].includes(index));

  return (
    <div className="bg-card p-6 rounded-[30px]">
      <h3 className="text-textDim text-xs font-bold uppercase mb-4">Today's Forecast</h3>
      <div className="flex justify-between border-t border-gray-700/30 pt-4">
        {displayHours?.map((item: any, i: number) => (
          <div key={i} className="flex flex-col items-center gap-2 px-2 border-r last:border-none border-gray-700/30">
            <span className="text-textDim text-[10px] font-bold uppercase">{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <img src={item.condition.icon} alt="icon" className="w-10 h-10" />
            <span className="text-lg font-bold">{Math.round(item.temp_c)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
