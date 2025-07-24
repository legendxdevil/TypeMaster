import React, { useState, useEffect, useRef } from 'react';

// Practice categories with example texts
const practiceCategories = {
  'common-words': {
    title: 'Common Words',
    description: 'Practice typing the most frequently used words in English',
    texts: [
      "the and that have with this from they will what about which when their said them can make like time just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us",
      "if all my very she many such would there her been were one these has when who will more no out so up said what its about than into them can only other time new some could these two may first then do any like my now over such our man me even most made after also did many off before must well back through years where much your way down should because long day might very place well just world still own see men work here life being under never day same another know while last might us great old year still between life keep public many never where next system found free hand end following however home should away men going around every once place part over such our man me"
    ]
  },
  'numbers-symbols': {
    title: 'Numbers & Symbols',
    description: 'Improve your accuracy with numbers and special characters',
    texts: [
      "1234567890 !@#$%^&*() -=_+[]{}\\|;:'\",.<>/?",
      "The price of the item is $19.99 plus 8.25% tax. Call us at (555) 123-4567 for more information.",
      "User123 logged in at 09:45 AM on 2023-07-15 with IP address 192.168.1.1.",
      "The password must contain at least 1 uppercase letter, 1 number, and 1 special character like !@#$%^&*."
    ]
  },
  'code-snippets': {
    title: 'Code Snippets',
    description: 'Practice typing code in various programming languages',
    texts: [
      "function calculateSum(arr) {\n  return arr.reduce((total, num) => total + num, 0);\n}",
      "const fetchData = async () => {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n};",
      "import React, { useState, useEffect } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};"
    ]
  },
  'pangrams': {
    title: 'Pangrams',
    description: 'Sentences containing every letter of the alphabet',
    texts: [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "Sphinx of black quartz, judge my vow.",
      "How vexingly quick daft zebras jump!",
      "Bright vixens jump; dozy fowl quack.",
      "Jackdaws love my big sphinx of quartz."
    ]
  },
  'quotes': {
    title: 'Famous Quotes',
    description: 'Practice with inspirational and thought-provoking quotes',
    texts: [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Life is what happens when you're busy making other plans. - John Lennon",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
    ]
  }
};

type CategoryKey = keyof typeof practiceCategories;

const Practice: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('common-words');
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize practice with selected category
  useEffect(() => {
    initPractice();
  }, [selectedCategory, currentTextIndex]);

  const initPractice = () => {
    const categoryTexts = practiceCategories[selectedCategory].texts;
    const textToUse = categoryTexts[currentTextIndex % categoryTexts.length];
    
    setText(textToUse);
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setWpm(null);
    setAccuracy(null);
    
    // Focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Start timing when user begins typing
  const startPractice = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  // End practice session and calculate results
  const endPractice = () => {
    if (startTime && !endTime) {
      const end = Date.now();
      setEndTime(end);
      
      // Calculate results
      const timeInMinutes = (end - startTime) / 60000;
      const charactersTyped = userInput.length;
      
      // WPM calculation (standard: 5 characters = 1 word)
      const calculatedWpm = Math.round((charactersTyped / 5) / timeInMinutes);
      setWpm(calculatedWpm);
      
      // Accuracy calculation
      const correctChars = charactersTyped - errors;
      const calculatedAccuracy = Math.round((correctChars / charactersTyped) * 100);
      setAccuracy(calculatedAccuracy);
    }
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime && value) {
      startPractice();
    }
    
    // Check for errors
    if (value.length > 0) {
      const lastChar = value[value.length - 1];
      const expectedChar = text[value.length - 1];
      
      if (lastChar !== expectedChar) {
        setErrors(errors + 1);
      }
    }
    
    setUserInput(value);
    setCurrentIndex(value.length);
    
    // Check if practice is complete
    if (value.length === text.length) {
      endPractice();
      setIsFinished(true);
    }
  };

  // Format the text with highlighting for correct/incorrect/current characters
  const formatText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      
      if (index < currentIndex) {
        className = userInput[index] === char ? 'correct' : 'incorrect';
      } else if (index === currentIndex) {
        className = 'current';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Handle category change
  const handleCategoryChange = (category: CategoryKey) => {
    setSelectedCategory(category);
    setCurrentTextIndex(0);
  };

  // Navigate to next text in category
  const handleNextText = () => {
    const categoryTexts = practiceCategories[selectedCategory].texts;
    setCurrentTextIndex((currentTextIndex + 1) % categoryTexts.length);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold text-dark-800 dark:text-white mb-4">Practice Mode</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(Object.keys(practiceCategories) as CategoryKey[]).map((category) => (
            <button
              key={category}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600'
                  : 'border-gray-200 hover:border-primary-200 dark:border-dark-600 dark:hover:border-primary-800'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              <h3 className={`font-medium mb-1 ${
                selectedCategory === category
                  ? 'text-primary-700 dark:text-primary-400'
                  : 'text-dark-700 dark:text-gray-200'
              }`}>
                {practiceCategories[category].title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {practiceCategories[category].description}
              </p>
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-dark-800 dark:text-white">
              {practiceCategories[selectedCategory].title} - Text {currentTextIndex + 1}/{practiceCategories[selectedCategory].texts.length}
            </h3>
            
            <div className="flex space-x-2">
              <button 
                className="btn btn-secondary text-sm py-1"
                onClick={initPractice}
              >
                <i className="fas fa-redo-alt mr-1"></i> Reset
              </button>
              
              <button 
                className="btn btn-primary text-sm py-1"
                onClick={handleNextText}
              >
                <i className="fas fa-forward mr-1"></i> Next Text
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-dark-600 rounded-lg p-4">
            <div className="text-display mb-4 whitespace-pre-wrap">
              {formatText()}
            </div>
            
            <input
              ref={inputRef}
              type="text"
              className="input font-mono"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Start typing here..."
              disabled={isFinished}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
        
        {isFinished && wpm !== null && accuracy !== null && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-primary-700 dark:text-primary-300">
              Practice Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Speed</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {wpm} <span className="text-sm font-normal">WPM</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {accuracy}%
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Errors</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {errors}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-3 text-dark-800 dark:text-white">
          Practice Tips
        </h3>
        
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Regular practice with different text types improves versatility</li>
          <li>Focus on problem areas (numbers, symbols, or specific letter combinations)</li>
          <li>Try to maintain a consistent rhythm rather than typing in bursts</li>
          <li>Practice for short periods frequently rather than long sessions rarely</li>
        </ul>
      </div>
    </div>
  );
};

export default Practice;