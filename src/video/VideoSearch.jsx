import { useState } from "react";

export default function VideoSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-3 max-w-4xl mx-auto">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-3 border rounded-lg"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-orange-500 text-white px-6 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}