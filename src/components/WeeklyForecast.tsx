// src/components/WeeklyForecast.tsx
export default function WeeklyForecast({ dailyData }: any) {
  return (
    <div className="bg-card h-full p-6 rounded-[30px]">
      <h3 className="text-textDim text-xs font-bold uppercase mb-6">7-Day Forecast</h3>
      <div className="flex flex-col gap-1">
        {dailyData?.map((item: any, i: number) => {
          const dayName = i === 0 ? 'Today' : new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' });
          return (
            <div key={i} className="flex items-center justify-between py-4 border-b last:border-none border-gray-700/30">
              <span className="text-textDim text-sm w-12">{dayName}</span>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <img src={item.day.condition.icon} alt="icon" className="w-8 h-8" />
                <span className="font-bold text-sm">{item.day.condition.text}</span>
              </div>
              <span className="font-bold text-sm">
                {Math.round(item.day.maxtemp_c)}
                <span className="text-textDim">/{Math.round(item.day.mintemp_c)}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
