// src/components/SearchBar.tsx
export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Search for cities"
      className="w-full bg-card text-white p-4 rounded-xl outline-none"
      onKeyDown={(e: any) => {
        if (e.key === 'Enter') onSearch(e.target.value);
      }}
    />
  );
}
