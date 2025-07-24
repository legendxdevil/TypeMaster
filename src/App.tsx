import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Practice from './components/Practice';
import Stats from './components/Stats';
import Tips from './components/Tips';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('typing-test');
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {activeSection === 'typing-test' && <TypingTest />}
        {activeSection === 'practice' && <Practice />}
        {activeSection === 'stats' && <Stats />}
        {activeSection === 'tips' && <Tips />}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;