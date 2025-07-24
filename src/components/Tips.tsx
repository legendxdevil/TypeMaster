import React, { useState } from 'react';

interface TipCategory {
  id: string;
  title: string;
  icon: string;
  tips: Tip[];
}

interface Tip {
  title: string;
  content: string;
}

const Tips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('basics');

  const tipCategories: TipCategory[] = [
    {
      id: 'basics',
      title: 'Typing Basics',
      icon: 'fas fa-keyboard',
      tips: [
        {
          title: 'Proper Hand Positioning',
          content: 'Place your fingers on the home row (ASDF for left hand, JKL; for right hand). Your thumbs should rest on the space bar. This position allows you to reach all keys with minimal hand movement.'
        },
        {
          title: 'Posture Matters',
          content: 'Sit up straight with your feet flat on the floor. Position your keyboard so your elbows form a 90-degree angle. Keep your wrists slightly elevated or use a wrist rest to prevent strain.'
        },
        {
          title: 'Look at the Screen, Not the Keyboard',
          content: 'Train yourself to look at the screen while typing, not your fingers. This "touch typing" technique dramatically improves speed and reduces errors over time.'
        },
        {
          title: 'Use All Ten Fingers',
          content: 'Each finger should be responsible for specific keys. For example, left pinky handles Q, A, and Z, while right index finger covers Y, H, and N. This division of labor increases efficiency.'
        },
        {
          title: 'Practice Rhythm and Consistency',
          content: 'Focus on typing at a steady pace rather than in bursts. Consistent rhythm helps build muscle memory and ultimately leads to faster typing speeds.'
        }
      ]
    },
    {
      id: 'speed',
      title: 'Improving Speed',
      icon: 'fas fa-tachometer-alt',
      tips: [
        {
          title: 'Accuracy First, Speed Later',
          content: 'Focus on typing accurately before trying to increase your speed. It\'s easier to build speed on a foundation of accuracy than to correct bad habits later.'
        },
        {
          title: 'Deliberate Practice',
          content: 'Identify your problem areas (certain keys, letter combinations, or punctuation) and practice them specifically. Use the Practice section to target these weaknesses.'
        },
        {
          title: 'Gradually Increase Pace',
          content: 'Push yourself to type just slightly faster than your comfortable speed. This "stretch zone" is where improvement happens, but don\'t sacrifice accuracy completely.'
        },
        {
          title: 'Learn Common Words',
          content: 'The 100 most common English words make up about 50% of written material. Practicing these frequently used words can significantly improve your overall typing speed.'
        },
        {
          title: 'Take Typing Tests Regularly',
          content: 'Regular testing helps you track progress and identifies areas for improvement. Aim for short, frequent practice sessions rather than occasional long ones.'
        }
      ]
    },
    {
      id: 'accuracy',
      title: 'Boosting Accuracy',
      icon: 'fas fa-bullseye',
      tips: [
        {
          title: 'Slow Down',
          content: 'If you\'re making too many errors, reduce your speed. Accuracy improves with deliberate, careful practice, and speed will follow naturally.'
        },
        {
          title: 'Don\'t Look at Your Hands',
          content: 'Resist the urge to look down at the keyboard. This forces you to develop muscle memory and improves accuracy over time.'
        },
        {
          title: 'Practice Problem Characters',
          content: 'Numbers, symbols, and certain letter combinations may cause more errors. Create custom practice sessions focusing on these challenging characters.'
        },
        {
          title: 'Don\'t Backspace While Practicing',
          content: 'When practicing, try to continue typing even after making an error rather than immediately correcting it. This helps you develop a forward flow and identify patterns in your mistakes.'
        },
        {
          title: 'Use Proper Finger Placement',
          content: 'Each finger should be responsible for specific keys. Using the wrong fingers creates inconsistency and increases error rates.'
        }
      ]
    },
    {
      id: 'ergonomics',
      title: 'Ergonomics & Health',
      icon: 'fas fa-heart',
      tips: [
        {
          title: 'Take Regular Breaks',
          content: 'Follow the 20-20-20 rule: every 20 minutes, take a 20-second break and look at something 20 feet away. This reduces eye strain and prevents repetitive stress injuries.'
        },
        {
          title: 'Stretch Your Hands and Wrists',
          content: 'Simple exercises like wrist rotations, finger stretches, and hand flexing help prevent strain during long typing sessions.'
        },
        {
          title: 'Adjust Your Setup',
          content: 'Position your screen at eye level, about an arm\'s length away. Your keyboard should allow your wrists to remain straight and your elbows to form a 90-degree angle.'
        },
        {
          title: 'Consider an Ergonomic Keyboard',
          content: 'Ergonomic keyboards are designed to reduce strain by positioning your hands in a more natural posture. They can help prevent repetitive stress injuries.'
        },
        {
          title: 'Stay Hydrated and Maintain Good Posture',
          content: 'Proper hydration helps maintain focus, while good posture prevents back and neck pain during long typing sessions.'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      icon: 'fas fa-graduation-cap',
      tips: [
        {
          title: 'Learn Keyboard Shortcuts',
          content: 'Keyboard shortcuts save time and reduce the need to switch between keyboard and mouse. Common shortcuts like Ctrl+C (copy), Ctrl+V (paste), and Alt+Tab (switch applications) can significantly boost productivity.'
        },
        {
          title: 'Practice with Different Content Types',
          content: 'Vary your practice material between prose, code, numbers, and special characters to become versatile in all typing scenarios.'
        },
        {
          title: 'Develop a Typing Rhythm',
          content: 'Professional typists often develop a rhythm or cadence to their typing. This flow state helps maintain consistent speed and reduces errors.'
        },
        {
          title: 'Use Typing Games for Variety',
          content: 'Typing games can make practice more engaging while still building essential skills. They often focus on specific challenges like speed or accuracy.'
        },
        {
          title: 'Learn to Type Without Looking at the Screen',
          content: 'Advanced typists can type accurately while looking at source material instead of the screen. This skill is particularly useful for data entry and transcription tasks.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold text-dark-800 dark:text-white mb-6">Typing Tips & Techniques</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {tipCategories.map((category) => (
            <button
              key={category.id}
              className={`p-4 rounded-lg border-2 transition-colors text-center ${
                activeCategory === category.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600'
                  : 'border-gray-200 hover:border-primary-200 dark:border-dark-600 dark:hover:border-primary-800'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className={`text-2xl mb-2 ${
                activeCategory === category.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                <i className={category.icon}></i>
              </div>
              <h3 className={`text-sm font-medium ${
                activeCategory === category.id
                  ? 'text-primary-700 dark:text-primary-400'
                  : 'text-dark-700 dark:text-gray-200'
              }`}>
                {category.title}
              </h3>
            </button>
          ))}
        </div>
        
        <div className="bg-gray-50 dark:bg-dark-600 rounded-lg p-6">
          {tipCategories.find(cat => cat.id === activeCategory)?.tips.map((tip, index) => (
            <div 
              key={index} 
              className={`mb-6 ${index !== 0 ? 'pt-6 border-t border-gray-200 dark:border-dark-500' : ''}`}
            >
              <h3 className="text-lg font-semibold mb-2 text-dark-800 dark:text-white">
                {tip.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-dark-800 dark:text-white">
          Typing Speed Benchmarks
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-500">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Skill Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  WPM Range
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-500">
              <tr className="bg-gray-50 dark:bg-dark-600/50">
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Beginner
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  10-25 WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Still looking at the keyboard, using few fingers
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Average
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  26-45 WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Typical for non-professional typists, casual computer users
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-dark-600/50">
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Proficient
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  46-65 WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Good speed for most professional purposes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Professional
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  66-80 WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Fast, efficient typing with high accuracy
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-dark-600/50">
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Expert
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  81-100 WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Very fast typing, typically professional typists
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                  Elite
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  100+ WPM
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  Exceptional speed, competitive typists
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tips;