import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSyncAlt, FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';

export default function ProgressDashboard() {
  const { t } = useTranslation();

  // Set default to dark mode and check localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/progress');
      setData(response.data);
    } catch {
      setError(t('error.fetchProgress'));
    } finally {
      setLoading(false);
    }
  };

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const percentage = (value, total) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 px-4 py-6 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchProgress}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Refresh progress"
            >
              <FaSyncAlt /> {t('dashboard.refresh')}
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {/* Loader/Error */}
        {loading && <p>{t('dashboard.loading')}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Progress Stats */}
        {data && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Budget Card */}
            <div className="bg-white dark:bg-white/10 p-5 rounded-lg shadow-md transition-colors">
              <h2 className="text-xl font-semibold mb-3">{t('dashboard.cohort')}</h2>

              <div className="mb-3">
                <p className="font-medium">
                  {t('dashboard.budgetGoal')}: ${data.cycleRevenue.toLocaleString()} / 33,000
                </p>
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded mt-1">
                  <div
                    className="bg-green-500 h-3 rounded transition-all duration-700"
                    style={{ width: `${percentage(data.cycleRevenue, 33000)}%` }}
                  />
                </div>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  {percentage(data.cycleRevenue, 33000)}% {t('dashboard.budgetAchieved')}
                </p>
              </div>

              <div className="mb-3">
                <p className="font-medium">
                  {t('dashboard.maxGoal')}: ${data.cycleRevenue.toLocaleString()} / 59,000
                </p>
                <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded mt-1">
                  <div
                    className="bg-yellow-500 h-3 rounded transition-all duration-700"
                    style={{ width: `${percentage(data.cycleRevenue, 59000)}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-gray-400 dark:border-gray-600 pt-2 mt-2 text-sm">
                <p>
                  <strong>{t('dashboard.revenue')}:</strong> ${data.cycleRevenue.toLocaleString()}
                </p>
                <p>
                  <strong>{t('dashboard.budgetCap')}:</strong> ${data.budgetCap.toLocaleString()}
                </p>
                <p>
                  <strong>{t('dashboard.itinerary')}:</strong> {data.selectedItinerary}
                </p>
              </div>
            </div>

            {/* User Stats Card */}
            <div className="bg-white dark:bg-white/10 p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{t('dashboard.userStats')}</h2>
              <p>
                <strong>{t('dashboard.entries')}:</strong> {data.userEntries}
              </p>
              <p>
                <strong>{t('dashboard.points')}:</strong> {data.taskPoints}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
