// src/components/layout/BottomNav.jsx
// (Logika sama, hanya folder diubah)
import React from 'react';
import { Home, Map, Heart, User } from 'lucide-react'; 

const navItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Peta', icon: Map, path: '/maps' },
  { name: 'Favorit', icon: Heart, path: '/favorites' },
  { name: 'Profil', icon: User, path: '/profile' },
];

export const BottomNav = ({ activePath }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-2xl border-t border-gray-100 z-50 md:hidden">
      <div className="flex justify-around h-full">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <a 
              key={item.name} 
              href={item.path} 
              className={`flex flex-col items-center justify-center text-sm font-medium transition-colors 
                ${isActive ? 'text-green-500' : 'text-gray-500 hover:text-green-400'}`}
            >
              <item.icon size={24} className={isActive ? 'text-green-500' : 'text-gray-500'} />
              <span className="text-xs mt-1">{item.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
