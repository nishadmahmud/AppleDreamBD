"use client";

import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-4 sm:px-8 lg:px-10 py-3 transition-colors duration-300">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-gray-900 dark:text-white transition-colors duration-300">
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              Apple Dream BD
            </h2>
          </div>
          <nav className="hidden lg:flex items-center gap-9">
            <a
              href="#"
              className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              Phones
            </a>
            <a
              href="#"
              className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              Accessories
            </a>
            <a
              href="#"
              className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              Wearables
            </a>
            <a
              href="#"
              className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              Audio
            </a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-gray-500 dark:text-gray-400 flex bg-gray-100 dark:bg-background-dark/50 items-center justify-center pl-4 rounded-l-lg border-r-0 transition-colors duration-300">
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-background-dark/50 focus:border-none h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal transition-colors duration-300"
                placeholder="Search"
                defaultValue=""
              />
            </div>
          </label>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 dark:bg-background-dark/50 text-gray-800 dark:text-gray-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-background-dark transition-all duration-300"
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              <span className="material-symbols-outlined text-2xl">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 dark:bg-background-dark/50 text-gray-800 dark:text-gray-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-background-dark transition-colors duration-300">
              <span className="material-symbols-outlined text-2xl">person</span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 dark:bg-background-dark/50 text-gray-800 dark:text-gray-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-background-dark transition-colors duration-300">
              <span className="material-symbols-outlined text-2xl">
                favorite
              </span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 dark:bg-background-dark/50 text-gray-800 dark:text-gray-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-background-dark transition-colors duration-300">
              <span className="material-symbols-outlined text-2xl">
                shopping_bag
              </span>
            </button>
            <button className="flex lg:hidden max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-gray-100 dark:bg-background-dark/50 text-gray-800 dark:text-gray-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-gray-200 dark:hover:bg-background-dark transition-colors duration-300">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
