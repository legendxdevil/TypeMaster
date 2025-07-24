import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TestResult {
  wpm: number;
  accuracy: number;
  errors: number;
  date: Date;
}

const Stats: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [averageWpm, setAverageWpm] = useState<number>(0);
  const [averageAccuracy, setAverageAccuracy] = useState<number>(0);
  const [bestWpm, setBestWpm] = useState<number>(0);
  const [bestAccuracy, setBestAccuracy] = useState<number>(0);
  const [totalTests, setTotalTests] = useState<number>(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');

  useEffect(() => {
    loadResults();
  }, [selectedTimeRange]);

  const loadResults = () => {
    const savedResults = localStorage.getItem('typingResults');
    
    if (savedResults) {
      let parsedResults: TestResult[] = JSON.parse(savedResults).map((result: any) => ({
        ...result,
        date: new Date(result.date)
      }));
      
      // Filter results based on selected time range
      const filteredResults = filterResultsByTimeRange(parsedResults, selectedTimeRange);
      
      // Sort results by date
      filteredResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setResults(filteredResults);
      calculateStats(filteredResults);
    }
  };

  const filterResultsByTimeRange = (results: TestResult[], timeRange: string): TestResult[] => {
    const now = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        // 'all' - return all results
        return results;
    }
    
    return results.filter(result => new Date(result.date) >= startDate);
  };

  const calculateStats = (results: TestResult[]) => {
    if (results.length === 0) {
      setAverageWpm(0);
      setAverageAccuracy(0);
      setBestWpm(0);
      setBestAccuracy(0);
      setTotalTests(0);
      return;
    }
    
    // Calculate averages
    const totalWpm = results.reduce((sum, result) => sum + result.wpm, 0);
    const totalAccuracy = results.reduce((sum, result) => sum + result.accuracy, 0);
    
    setAverageWpm(Math.round(totalWpm / results.length));
    setAverageAccuracy(Math.round(totalAccuracy / results.length));
    
    // Find best scores
    const bestWpmResult = Math.max(...results.map(result => result.wpm));
    const bestAccuracyResult = Math.max(...results.map(result => result.accuracy));
    
    setBestWpm(bestWpmResult);
    setBestAccuracy(bestAccuracyResult);
    
    // Set total tests count
    setTotalTests(results.length);
  };

  const getChartData = () => {
    // Format dates for chart labels
    const labels = results.map(result => {
      const date = new Date(result.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    return {
      labels,
      datasets: [
        {
          label: 'WPM',
          data: results.map(result => result.wpm),
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.5)',
          tension: 0.3,
        },
        {
          label: 'Accuracy (%)',
          data: results.map(result => result.accuracy),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          tension: 0.3,
        }
      ]
    };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#4b5563',
        }
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#4b5563',
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const clearStats = () => {
    if (window.confirm('Are you sure you want to clear all your typing statistics? This action cannot be undone.')) {
      localStorage.removeItem('typingResults');
      setResults([]);
      setAverageWpm(0);
      setAverageAccuracy(0);
      setBestWpm(0);
      setBestAccuracy(0);
      setTotalTests(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark-800 dark:text-white mb-3 sm:mb-0">Your Typing Statistics</h2>
          
          <div className="flex items-center space-x-3">
            <select
              className="select text-sm py-1"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            
            <button 
              className="btn btn-secondary text-sm py-1"
              onClick={clearStats}
            >
              <i className="fas fa-trash-alt mr-1"></i> Clear Stats
            </button>
          </div>
        </div>
        
        {totalTests > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Tests Completed</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {totalTests}
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Speed</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {averageWpm} <span className="text-sm font-normal">WPM</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Best Speed</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {bestWpm} <span className="text-sm font-normal">WPM</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Accuracy</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {averageAccuracy}%
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4 text-dark-800 dark:text-white">
                Progress Chart
              </h3>
              <div className="h-64">
                <Line data={getChartData()} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-dark-800 dark:text-white">
                Recent Tests
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-500">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Speed (WPM)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Errors
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-500">
                    {results.slice().reverse().slice(0, 10).map((result, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-dark-600/50' : ''}>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {new Date(result.date).toLocaleDateString()} {new Date(result.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {result.wpm}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {result.accuracy}%
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                          {result.errors}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-50 dark:bg-dark-600 rounded-lg p-8 text-center">
            <div className="text-5xl text-gray-300 dark:text-gray-600 mb-4">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No Statistics Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Complete some typing tests to see your statistics and track your progress.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: { section: 'typing-test' } });
                window.dispatchEvent(event);
              }}
            >
              <i className="fas fa-tachometer-alt mr-2"></i> Start Typing Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;