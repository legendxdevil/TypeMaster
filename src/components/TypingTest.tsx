import React, { useState, useEffect, useRef } from 'react';

// Sample texts for typing practice
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
  "Typing speed is typically measured in words per minute (WPM). For this measurement, a word is standardized to five characters or keystrokes, including spaces and punctuation.",
  "The best way to improve your typing speed is through regular practice. Focus on accuracy first, and speed will follow naturally as you become more comfortable with the keyboard.",
  "Touch typing is the ability to use muscle memory to find keys quickly, without using the sense of sight, and with all the available fingers, just as piano players do."
];

interface TestResult {
  wpm: number;
  accuracy: number;
  errors: number;
  date: Date;
}

const TypingTest: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [results, setResults] = useState<TestResult | null>(null);
  const [testDuration, setTestDuration] = useState<number>(60); // seconds
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [testActive, setTestActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get a random text for the test
  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  };

  // Initialize or reset the test
  const initTest = () => {
    setText(getRandomText());
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setCurrentIndex(0);
    setErrors(0);
    setIsFinished(false);
    setResults(null);
    setTimeLeft(testDuration);
    setTestActive(false);
    
    // Focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Start the test when user starts typing
  const startTest = () => {
    if (!startTime) {
      setStartTime(Date.now());
      setTestActive(true);
    }
  };

  // End the test
  const endTest = () => {
    if (startTime && !endTime) {
      const end = Date.now();
      setEndTime(end);
      setTestActive(false);
      
      // Calculate results
      const timeInMinutes = (end - startTime) / 60000;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const charactersTyped = userInput.length;
      
      // WPM calculation (standard: 5 characters = 1 word)
      const wpm = Math.round((charactersTyped / 5) / timeInMinutes);
      
      // Accuracy calculation
      const correctChars = charactersTyped - errors;
      const accuracy = Math.round((correctChars / charactersTyped) * 100);
      
      setResults({
        wpm,
        accuracy,
        errors,
        date: new Date()
      });
      
      // Save results to localStorage
      saveResult({ wpm, accuracy, errors, date: new Date() });
    }
  };

  // Save test result to localStorage
  const saveResult = (result: TestResult) => {
    const savedResults = localStorage.getItem('typingResults');
    let results: TestResult[] = [];
    
    if (savedResults) {
      results = JSON.parse(savedResults);
    }
    
    results.push(result);
    
    // Keep only the last 10 results
    if (results.length > 10) {
      results = results.slice(results.length - 10);
    }
    
    localStorage.setItem('typingResults', JSON.stringify(results));
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!testActive && value) {
      startTest();
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
    
    // Check if test is complete
    if (value.length === text.length) {
      endTest();
      setIsFinished(true);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer: number;
    
    if (testActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testActive, timeLeft]);

  // Initialize test on component mount
  useEffect(() => {
    initTest();
  }, []);

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

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-dark-800 dark:text-white">Typing Test</h2>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              <span className="text-gray-500 dark:text-gray-400">Time: </span>
              <span className={`${timeLeft <= 10 ? 'text-red-500' : 'text-dark-700 dark:text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <select 
              className="select text-sm py-1"
              value={testDuration}
              onChange={(e) => {
                const newDuration = parseInt(e.target.value);
                setTestDuration(newDuration);
                setTimeLeft(newDuration);
              }}
              disabled={testActive}
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
              <option value="300">5 minutes</option>
            </select>
            
            <button 
              className="btn btn-primary text-sm py-1"
              onClick={initTest}
            >
              <i className="fas fa-redo-alt mr-1"></i> Reset
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-dark-600 rounded-lg p-4 mb-4">
          <div className="text-display mb-4">
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
        
        {results && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-primary-700 dark:text-primary-300">
              Test Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Speed</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {results.wpm} <span className="text-sm font-normal">WPM</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {results.accuracy}%
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Errors</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {results.errors}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-3 text-dark-800 dark:text-white">
          Quick Tips
        </h3>
        
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Focus on accuracy first, speed will come with practice</li>
          <li>Keep your eyes on the screen, not your keyboard</li>
          <li>Maintain proper posture with your wrists slightly elevated</li>
          <li>Take short breaks between tests to prevent fatigue</li>
        </ul>
      </div>
    </div>
  );
};

export default TypingTest;