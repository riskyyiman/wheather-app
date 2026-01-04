// src/components/AirConditions.tsx
export default function AirConditions({ current, forecast }: any) {
  return (
    <div className="bg-card p-6 rounded-[30px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-textDim text-xs font-bold uppercase">Air Conditions</h3>
        <button className="bg-accent text-white text-[10px] px-3 py-1 rounded-full font-bold">See more</button>
      </div>
      <div className="grid grid-cols-2 gap-y-6">
        <ConditionItem label="Real Feel" value={`${Math.round(current?.feelslike_c)}°`} />
        <ConditionItem label="Wind" value={`${current?.wind_kph} km/h`} />
        <ConditionItem label="Chance of rain" value={`${forecast?.day?.daily_chance_of_rain}%`} />
        <ConditionItem label="UV Index" value={current?.uv} />
      </div>
    </div>
  );
}

function ConditionItem({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-textDim text-xs">{label}</p>
      <p className="text-white text-lg font-bold">{value}</p>
    </div>
  );
}
