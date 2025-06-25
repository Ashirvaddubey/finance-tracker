import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

interface Stats {
  totalExpenses: number;
  monthlyExpenses: number;
  categoryBreakdown: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  monthlyTrend: Array<{
    _id: { year: number; month: number };
    total: number;
    count: number;
  }>;
}

interface ExpenseChartsProps {
  stats: Stats;
}

export default function ExpenseCharts({ stats }: ExpenseChartsProps) {
  // Category breakdown chart data
  const categoryData = {
    labels: stats.categoryBreakdown.map(item => item._id),
    datasets: [
      {
        data: stats.categoryBreakdown.map(item => item.total),
        backgroundColor: [
          '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
          '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  // Monthly trend chart data
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const trendData = {
    labels: stats.monthlyTrend.map(item => 
      `${monthNames[item._id.month - 1]} ${item._id.year}`
    ),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: stats.monthlyTrend.map(item => item.total),
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  };

  // Category count chart data
  const categoryCountData = {
    labels: stats.categoryBreakdown.map(item => item._id),
    datasets: [
      {
        label: 'Number of Expenses',
        data: stats.categoryBreakdown.map(item => item.count),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8
      }
    }
  };

  const pieOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Category Breakdown Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
        <div className="h-80">
          <Pie data={categoryData} options={pieOptions} />
        </div>
      </motion.div>

      {/* Monthly Trend Line Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
        <div className="h-80">
          <Line data={trendData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Category Count Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg lg:col-span-2"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Count by Category</h3>
        <div className="h-80">
          <Bar data={categoryCountData} options={chartOptions} />
        </div>
      </motion.div>
    </div>
  );
}