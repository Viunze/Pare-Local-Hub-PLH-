// src/components/common/SearchBar.jsx

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ placeholder = "Cari..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // TODO: Implementasi logika navigasi atau filter pencarian global
      console.log("Mencari:", searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
      />
      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </button>
    </form>
  );
};
