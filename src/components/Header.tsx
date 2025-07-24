import React from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  darkMode, 
  toggleDarkMode 
}) => {
  return (
    <header className="bg-white shadow-sm dark:bg-dark-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              <i className="fas fa-keyboard mr-2"></i>
              TypeMaster
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => setActiveSection('typing-test')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'typing-test'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-tachometer-alt mr-1"></i> Typing Test
            </button>
            
            <button
              onClick={() => setActiveSection('practice')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'practice'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-dumbbell mr-1"></i> Practice
            </button>
            
            <button
              onClick={() => setActiveSection('stats')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'stats'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-chart-line mr-1"></i> Stats
            </button>
            
            <button
              onClick={() => setActiveSection('tips')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'tips'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-lightbulb mr-1"></i> Tips
            </button>
          </nav>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                  }
                }}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setActiveSection('typing-test');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeSection === 'typing-test'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-tachometer-alt mr-2"></i> Typing Test
            </button>
            
            <button
              onClick={() => {
                setActiveSection('practice');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeSection === 'practice'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-dumbbell mr-2"></i> Practice
            </button>
            
            <button
              onClick={() => {
                setActiveSection('stats');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeSection === 'stats'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i> Stats
            </button>
            
            <button
              onClick={() => {
                setActiveSection('tips');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeSection === 'tips'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-600'
              }`}
            >
              <i className="fas fa-lightbulb mr-2"></i> Tips
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;