import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-dark-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} TypeMaster - Improve your typing skills
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/legendxdevil" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-lg"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/nand-kishore-soni-036783317/" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;