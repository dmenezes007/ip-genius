import React, { useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  sidebarItems: (isOpen: boolean) => ReactNode;
  onLogoClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebarItems, onLogoClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white text-gray-800 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between h-16 p-4 border-b">
          <button onClick={onLogoClick} className="flex items-center gap-2">
            <span className={`font-bold text-xl text-blue-600 ${!isSidebarOpen && 'hidden'}`}>
              IP Genius
            </span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isSidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
        </div>
        <nav className="py-4">{sidebarItems(isSidebarOpen)}</nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-end h-16 px-8 bg-white border-b">
          {/* Header content can go here, e.g., user profile */}
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export const SidebarItem: React.FC<{
  icon: ReactNode;
  text: string;
  active?: boolean;
  isOpen: boolean;
  onClick: () => void;
}> = ({ icon, text, active, isOpen, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-3 px-6 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800'
            : 'hover:bg-gray-100 text-gray-600'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          isOpen ? 'w-32 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {!isOpen && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};


export default Layout;
