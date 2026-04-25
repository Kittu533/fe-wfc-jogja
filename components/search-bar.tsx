import { Search } from "lucide-react";

type SearchBarProps = {
  defaultValue?: string;
  name?: string;
  placeholder?: string;
};

export function SearchBar({
  defaultValue,
  name = "q",
  placeholder = "Cari nama cafe, area, atau kebutuhanmu...",
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
        <input
          type="search"
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-6 rounded-full bg-emerald-50/50 border-none text-emerald-950 text-base outline-none ring-0 placeholder:text-emerald-900/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>
      <button
        type="submit"
        className="h-14 px-8 rounded-full bg-emerald-600 text-white font-bold text-base transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
      >
        Cari Cafe
      </button>
    </div>
  );
}
